import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

// definimos la estructura de datos para actualizar una categoría
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {

        @IsString() // debe ser una cadena de texto
        @IsNotEmpty() // no debe estar vacío
        @MaxLength(25)// longitud máxima de 25 caracteres
        name: string; 
}
