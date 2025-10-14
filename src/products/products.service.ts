import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from '@prisma/client';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly database: DatabaseService) { }

  // Crear producto
  async create(createProductDto: CreateProductDto) {
    const newProduct = await this.database.product.create({
      data: {
        name: createProductDto.name,
        price: createProductDto.price,
        stock: createProductDto.stock,
        status: createProductDto.status,
        categoryId: createProductDto.categoryId,
      },
    });
    return { message: 'Producto creado correctamente', newProduct };
  }

  // Obtener todos los productos
  async getAllProducs(): Promise<Product[]> {
    return this.database.product.findMany({
      include: {
        Category: true,
      },
    });
  }

  // Obtener producto por ID
  async getProducsById(id: string): Promise<Product | null> {
    return this.database.product.findUnique({
      where: { id },
    });
  }

  // Actualizar producto
  async updateProduct(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.database.product.findUnique({ where: { id } });

    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }

    let newStock = product.stock;

    if (updateProductDto.stock !== undefined) {
      if (updateProductDto.stock < product.stock) {
        newStock = product.stock - updateProductDto.stock;
      } else {
        newStock = product.stock + updateProductDto.stock;
      }

      if (newStock < 0) {
        throw new BadRequestException('Stock insuficiente');
      }
    }

    const updated = await this.database.product.update({
      where: { id },
      data: {
        name: updateProductDto.name,
        price: updateProductDto.price,
        stock: newStock, // Usamos newStock en lugar de updateProductDto.stock
        categoryId: updateProductDto.categoryId,
        status: updateProductDto.status,
      },
    });

    return { message: 'Producto actualizado correctamente', data: updated };
  }

  // Eliminar producto
  async remove(id: string) {
    const product = await this.database.product.findUnique({ where: { id } });

    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }

    const deleted = await this.database.product.delete({ where: { id } });

    return { message: ' Producto eliminado correctamente', data: deleted };
  }
}