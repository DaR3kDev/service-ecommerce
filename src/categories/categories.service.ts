import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { DatabaseService } from '../database/database.service';
import { ResponseHelper } from '../common/response/response.helper';
import { Category } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createCategory(createCategoryDto: CreateCategoryDto): Promise<ResponseHelper<void>> {
    const { name } = createCategoryDto;

    const existing = await this.databaseService.category.findFirst({
      where: {
        name,
      },
    });

    if (existing) throw new NotFoundException('Categoría ya existe');

    await this.databaseService.category.create({
      data: {
        name,
      },
    });

    return new ResponseHelper<void>('Categoría creada exitosamente');
  }

  async getAllCategories(): Promise<ResponseHelper<Partial<Category>[]>> {
    const categories = await this.databaseService.category.findMany({
      select: { id: true, name: true },
      orderBy: { name: 'asc' },
    });

    return new ResponseHelper<Partial<Category>[]>('Categorías obtenidas exitosamente', categories);
  }

  async getCategoryById(id: string): Promise<ResponseHelper<Category>> {
    const category = await this.databaseService.category.findUnique({ where: { id } });

    if (!category) throw new NotFoundException('Categoría no encontrada');

    return new ResponseHelper<Category>('Categoría obtenida exitosamente', category);
  }

  async updateCategory(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<ResponseHelper<void>> {
    const { name } = updateCategoryDto;

    const existing = await this.databaseService.category.findUnique({ where: { id } });

    if (!existing) throw new NotFoundException('Categoría no encontrada');

    await this.databaseService.category.update({
      where: { id },
      data: {
        name,
      },
    });

    return new ResponseHelper<void>('Categoría actualizada correctamente');
  }

  async deleteCategory(id: string): Promise<ResponseHelper<void>> {
    const existing = await this.databaseService.category.findUnique({ where: { id } });

    if (!existing) throw new NotFoundException('Categoría no encontrada');

    await this.databaseService.category.delete({ where: { id } });

    return new ResponseHelper<void>('Categoría eliminada exitosamente');
  }
}
