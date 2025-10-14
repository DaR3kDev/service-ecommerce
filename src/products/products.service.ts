import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly database: DatabaseService) {}

  // Crear producto
  async create(createProductDto: CreateProductDto) {
    try {
      const newProduct = await this.database.product.create({
        data: {
          name: createProductDto.name,
          price: createProductDto.price,
          stock: createProductDto.stock,
          categoryId: createProductDto.categoryId,
        },
      });
      return { message: '✅ Producto creado correctamente', newProduct };
    } catch (error) {
      console.error('Error al crear el producto:', error);
      throw new Error('❌ Error al crear el producto');
    }
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