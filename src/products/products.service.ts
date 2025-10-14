import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from '@prisma/client';
import { UpdateProductDto } from './dto/update-product.dto';

// servicio que contiene la logica de negocio relacionada con los productos
// se importa el decorador injectable de nestjs, el servicio de prisma, el dto de creacion de productos y el modelo de producto de prisma

@Injectable()
export class ProductsService {
  constructor(private readonly database: DatabaseService) {}

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

  async getAllProducs(): Promise<Product[]>{
   return this.database.product.findMany(); //devuelve todos los productos creados 
  }

  // Obtener producto por ID
  async getProducsById(id: string ): Promise<Product | null>{
    return this.database.product.findUnique({
  where: {
           id
  }      
    })
  }

  // Actualizar producto
  async updateProduct(id: string, updateProductDto: UpdateProductDto) {

    return this.database.product.update({
      where: { id },
      data: {
        name: updateProductDto.name,
        price: updateProductDto.price,
        stock: updateProductDto.stock,
        categoryId: updateProductDto.categoryId,
        status: updateProductDto.status,
      },
    });

  }

  // Eliminar producto
  async remove(id:string ) {
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