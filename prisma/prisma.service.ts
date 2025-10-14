import {PrismaClient} from  '@prisma/client';
import {Injectable, OnModuleInit} from  '@nestjs/common';

// este servicio se encarga de la conexion a la base de datos y de inicializar el cliente de prisma 

@Injectable() // decorador que indica que esta clase es un servicio inyectable en otros componentes de nestjs
export class PrismaService extends PrismaClient implements OnModuleInit {

    // metodo que se ejecuta cuando el modulo se inicializa

    async onModuleInit() {
        await this.$connect();
    }

}