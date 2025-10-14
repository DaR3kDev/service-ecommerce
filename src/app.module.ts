import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';


@Module({
  imports: [ConfigModule.forRoot({isGlobal: true,}), // Carga las variables de entorno de forma global
    DatabaseModule,
    ProductsModule,
    CategoriesModule,
  ],

})
export class AppModule {}
