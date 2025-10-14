import {Module} from "@nestjs/common";
import { PrismaService } from "./prisma.service";

// modulo que encapsula el servicio de prisma para que pueda ser inyectado en otros modulos de nestjs 
// se importa el decorador module de nestjs y el servicio de prisma

@Module({
    providers: [PrismaService], // se registra el servicio de prisma como proveedor del modulo
    exports: [PrismaService], // se exporta el servicio de prisma para que pueda ser utilizado en otros modulos
})

export class PrismaModule {}