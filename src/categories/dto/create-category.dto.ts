
import {IsNotEmpty, IsString, MaxLength} from 'class-validator';

// definimos la estructura de datos para crear una categoría

export class CreateCategoryDto {

    @IsString() // debe ser una cadena de texto
    @IsNotEmpty() // no debe estar vacío
    @MaxLength(25)// longitud máxima de 25 caracteres
    name: string; 

}
