import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ResponseHelper } from '../common/response/response.helper';
import { DatabaseService } from '../database/database.service';
import { PaginationDto } from '../common/pagination/dto/pagination.dto';
import { PaginatedResponse } from '../common/pagination/interfaces/pagination.interface';
import { PaginationHelper } from '../common/pagination/pagination';

@Injectable()
export class ProductsService {
  constructor(private readonly database: DatabaseService) {}

  async create(createProductDto: CreateProductDto): Promise<ResponseHelper<void>> {
    const { name, price, stock, status, categoryId } = createProductDto;

    const category = await this.database.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!category) throw new NotFoundException('Categoría no encontrada');

    const product = await this.database.product.findFirst({
      where: {
        name: { equals: name, mode: 'insensitive' },
        categoryId,
      },
    });

    if (product) throw new NotFoundException('Producto ya existe');

    await this.database.product.create({
      data: {
        name,
        price,
        stock,
        status,
        categoryId,
      },
    });
    return new ResponseHelper<void>('Producto creado exitosamente');
  }

  async paginationProduct(
    paginationDto: PaginationDto,
  ): Promise<ResponseHelper<PaginatedResponse<Partial<Product>>>> {
    const { page, limit, search } = paginationDto;

    const where: Prisma.ProductWhereInput = {
      ...(search && {
        OR: [{ name: { contains: search, mode: 'insensitive' } }],
      }),
    };

    const products = await this.database.product.findMany({
      skip: (page - 1) * Number(limit),
      take: Number(limit),
      where,
    });

    const totalProducts = await this.database.product.count({ where });

    const safeProducts = products.map(({ id, name, price, stock, status, categoryId }) => ({
      id,
      name,
      price,
      stock,
      status,
      categoryId,
    }));

    const paginatedResponse = PaginationHelper.build(
      safeProducts,
      totalProducts,
      Number(page),
      Number(limit),
    );

    return new ResponseHelper<PaginatedResponse<Partial<Product>>>(
      'Productos obtenidos exitosamente',
      paginatedResponse,
    );
  }

  async getProductById(id: string): Promise<ResponseHelper<Product>> {
    const product = await this.database.product.findUnique({
      where: { id },
      include: { Category: true },
    });

    if (!product) throw new NotFoundException('Producto no encontrado');

    return new ResponseHelper<Product>('Producto obtenido exitosamente', product);
  }

  async updateProduct(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<ResponseHelper<Product>> {
    const product = await this.database.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException('Producto no encontrado');

    const { stock: newStockValue } = updateProductDto;
    const currentStock = product.stock;

    if (newStockValue == null)
      return new ResponseHelper<Product>('Producto actualizado sin cambios en stock', product);

    const newStock =
      newStockValue >= currentStock
        ? currentStock + (newStockValue - currentStock)
        : currentStock - (currentStock - newStockValue);

    if (newStock < 0) throw new NotFoundException('Stock insuficiente');

    const updatedProduct = await this.database.product.update({
      where: { id },
      data: {
        name: updateProductDto.name ?? product.name,
        price: updateProductDto.price ?? product.price,
        stock: newStock,
        categoryId: updateProductDto.categoryId ?? product.categoryId,
        status: updateProductDto.status ?? product.status,
      },
    });

    return new ResponseHelper<Product>(
      `Producto actualizado exitosamente. Stock actual: ${updatedProduct.stock}`,
      updatedProduct,
    );
  }

  async remove(id: string): Promise<ResponseHelper<void>> {
    const product = await this.database.product.findUnique({ where: { id } });

    if (!product) throw new NotFoundException('Producto no encontrado');

    await this.database.product.delete({ where: { id } });

    return new ResponseHelper<void>('Producto eliminado correctamente');
  }
}
