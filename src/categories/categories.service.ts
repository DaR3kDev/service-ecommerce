import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { DatabaseService } from '../database/database.service'

@Injectable()
export class CategoriesService {

  // este constructor es para inyectar el servicio de base de datos
  constructor(private readonly databaseService: DatabaseService) { }

  //crear categoria
  async createCategory(createCategoryDto: CreateCategoryDto) {

    const newCategory = await this.databaseService.category.create({
      data: {
        name: createCategoryDto.name
      }
    });
    return { message: 'categoria creada ', newCategory };
  }

  // obtener todas las categorias
  async getAllCategories() {
    return this.databaseService.category.findMany(); // devuelve todas las categorias
  }

// buscar categoria por id
  async getCategoriesById(id: string) {
    const category = await this.databaseService.category.findUnique({ where: { id: id } });// busca una categoria por id
    if (!category) throw new NotFoundException('categoria no encontrada'); // aca estamos usando excepciones de nestjs para manejar errores
    return category;
  }

  // actualizar categoria
  async updateCategories(id: string, updateCategoryDto: UpdateCategoryDto) {

    const updatedCategory = this.databaseService.category.update({ where: { id }, data: { name: updateCategoryDto.name } });
    return { message: 'categoria actualizada', updatedCategory };
  }


  // eliminar categoria
  async deletedCategory(id: string) {

    const deletedCategory = await this.databaseService.category.delete({
      where: { id }
    });
    return { message: 'categoria eliminada', deletedCategory };
  }
}
