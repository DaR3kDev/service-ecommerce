import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaModule } from 'prisma/prisma.module';

// modulo que encapsula la logica de negocio relacionada con los productos
// se importa el decorador module de nestjs, el servicio de productos, el controlador de productos y el modulo de prisma
@Module({
  controllers: [ProductsController], // controlador que maneja las rutas relacionadas con los productos
  providers: [ProductsService], // servicio que contiene la logica de negocio relacionada con los productos
  imports: [PrismaModule], // importamos el modulo de prisma para poder usar el servicio de prisma en el servicio de productos
})
export class ProductsModule {}
