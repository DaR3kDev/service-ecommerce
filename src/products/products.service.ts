import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from '@prisma/client';
import { UpdateProductDto } from './dto/update-product.dto';

// servicio que contiene la logica de negocio relacionada con los productos
// se importa el decorador injectable de nestjs, el servicio de prisma, el dto de creacion de productos y el modelo de producto de prisma

@Injectable()
export class ProductsService {
  constructor(private readonly database: PrismaService) { }

  // Crear producto
  async create(createProductDto: CreateProductDto) {
    try {
      const newProduct = await this.database.product.create({
        data: {
          name: createProductDto.name,
          price: createProductDto.price,
          stock: createProductDto.stock,
          status: createProductDto.status, // Asignar el valor del status desde el DTO
          categoryId: createProductDto.categoryId,
        },
      });
      return { message: '✅ Producto creado correctamente', newProduct };
    } catch (error) {
      console.error('Error al crear el producto:', error);
      throw new Error('❌ Error al crear el producto');
    }
  }

  // Obtener todos los productos

  async getAllProducs(): Promise<Product[]> {
    return this.database.product.findMany(); //devuelve todos los productos creados 
  }

  // Obtener producto por ID
  async getProducsById(id: string): Promise<Product | null> {
    return this.database.product.findUnique({
      where: {
        id
      }
    })
  }

  // Actualizar producto
  async updateProduc(id: string, UpdateProductDto: UpdateProductDto) {
    const updated = await this.database.product.update({
      where: { id },
      data: {
        name: UpdateProductDto.name,
        price: UpdateProductDto.price,
        stock: UpdateProductDto.stock,
        categoryId: UpdateProductDto.categoryId,
        status: UpdateProductDto.status,
      }
    });
    return { message: 'Producto actualizado correctamente!', updated };
  }


  // Eliminar producto
  async remove(id: string) {
    try {
      const deleted = await this.database.product.delete({
        where: { id },
      });
      return { message: '🗑️ Producto eliminado correctamente', deleted };
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      throw new Error('❌ Error al eliminar el producto');
    }
  }
}