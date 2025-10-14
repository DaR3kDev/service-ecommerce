import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from '../common/pagination/dto/pagination.dto'
//mport { Product } from '@prisma/client';

// controlador que maneja las rutas relacionadas con los productos
// se importa el decorador controller de nestjs, el servicio de productos, los dto de creacion y actualizacion de productos y el modelo de producto de prisma

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post() // ruta para crear productos
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get() // ruta para obtener todos los productos
  async getAllProducs() {
    return this.productsService.getAllProducs();
  }

  @Get(':id')
  async getProducsById(@Param('id') id: string) {
    return this.productsService.getProducsById(id);
  }

  @Patch(':id')
  async updateProduct(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
