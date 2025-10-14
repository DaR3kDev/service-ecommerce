# Service E-commerce

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Descripción

API REST para un sistema de e-commerce construida con NestJS, TypeScript, Prisma y PostgreSQL. El proyecto implementa una arquitectura modular escalable con manejo de productos, categorías y carritos de compra.

## Tecnologías Utilizadas

- **NestJS**: Framework progresivo de Node.js
- **TypeScript**: Lenguaje de programación con tipado estático
- **Prisma ORM**: ORM moderno para trabajar con bases de datos
- **PostgreSQL**: Base de datos relacional
- **Docker**: Contenedorización de la base de datos
- **pnpm**: Gestor de paquetes rápido y eficiente
- **Class Validator**: Validación de DTOs
- **Class Transformer**: Transformación de objetos

- **Class Validator**: Validación de DTOs
- **Class Transformer**: Transformación de objetos

## Características

### Módulos Implementados

#### 1. **Products (Productos)**
- ✅ Crear producto
- ✅ Obtener todos los productos
- ✅ Obtener producto por ID
- ✅ Actualizar producto
- ✅ Eliminar producto
- ✅ Validaciones de DTOs
- ✅ Manejo de respuestas estandarizadas

#### 2. **Categories (Categorías)**
- ✅ Crear categoría
- ✅ Obtener todas las categorías
- ✅ Obtener categoría por ID
- ✅ Actualizar categoría
- ✅ Eliminar categoría
- ✅ Relación con productos

#### 3. **Database**
- ✅ Módulo centralizado de base de datos con Prisma
- ✅ Migraciones implementadas
- ✅ Modelos: Product, Category, Cart, CartItem

### Características Adicionales

- ✅ **Sistema de paginación**: Implementado en el módulo común
- ✅ **Validación de datos**: Pipes de validación personalizados
- ✅ **Manejo de errores**: Filtros de excepción HTTP
- ✅ **Respuestas estandarizadas**: Helper para respuestas consistentes
- ✅ **Docker Compose**: Base de datos PostgreSQL containerizada
- ✅ **ESLint**: Configuración de linting

## Modelo de Datos

### Product
```typescript
{
  id: string (CUID)
  name: string (max 50 caracteres)
  price: Decimal(10,2)
  stock: number (default: 0)
  status: boolean (default: true)
  categoryId: string (opcional)
  createdAt: DateTime
  updatedAt: DateTime
}
```

### Category
```typescript
{
  id: string (CUID)
  name: string (max 50 caracteres)
  products: Product[]
}
```

### Cart & CartItem
```typescript
Cart {
  id: string (CUID)
  createdAt: DateTime
  updatedAt: DateTime
  CartItems: CartItem[]
}

CartItem {
  id: string (CUID)
  cartId: string
  productId: string
  quantity: number (default: 1)
  subtotal: number
}
```

## Requisitos Previos

- Node.js (v18 o superior)
- pnpm (v8 o superior)
- Docker y Docker Compose
- PostgreSQL (si no se usa Docker)

## Instalación

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd service-ecommerce
```

### 2. Instalar dependencias

```bash
pnpm install
```

### 3. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/ecommerce_db"
POSTGRES_USER=usuario
POSTGRES_PASSWORD=contraseña
POSTGRES_DB=ecommerce_db
PORT=3000
```

### 4. Iniciar la base de datos con Docker

```bash
docker-compose up -d
```

### 5. Ejecutar migraciones de Prisma

```bash
pnpm run prisma:migrate
```

### 6. Generar el cliente de Prisma

```bash
pnpm run prisma:generate
```

## Ejecución del Proyecto

### Modo Desarrollo

```bash
# Iniciar en modo watch
pnpm run start:dev

# Iniciar en modo debug
pnpm run start:debug
```

### Modo Producción

```bash
# Compilar el proyecto
pnpm run build

# Ejecutar en producción
pnpm run start:prod
```

## Scripts Disponibles

### Desarrollo
```bash
pnpm run start          # Iniciar aplicación
pnpm run start:dev      # Iniciar en modo watch
pnpm run start:debug    # Iniciar con debugger
pnpm run build          # Compilar proyecto
```

### Prisma
```bash
pnpm run prisma:generate        # Generar cliente de Prisma
pnpm run prisma:migrate         # Crear y aplicar migraciones
pnpm run prisma:migrate:deploy  # Aplicar migraciones en producción
pnpm run prisma:studio          # Abrir Prisma Studio
pnpm run prisma:db:push         # Push del schema sin migraciones
pnpm run prisma:db:pull         # Pull del schema desde la DB
pnpm run prisma:reset           # Resetear base de datos
```

### Testing
```bash
pnpm run test           # Ejecutar tests unitarios
pnpm run test:watch     # Tests en modo watch
pnpm run test:cov       # Tests con cobertura
pnpm run test:e2e       # Tests end-to-end
```

### Code Quality
```bash
pnpm run lint           # Ejecutar ESLint
pnpm run format         # Formatear código con Prettier
```

## Endpoints API

### Products

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/products` | Crear nuevo producto |
| GET | `/products` | Obtener todos los productos |
| GET | `/products/:id` | Obtener producto por ID |
| PATCH | `/products/:id` | Actualizar producto |
| DELETE | `/products/:id` | Eliminar producto |

#### Ejemplo: Crear Producto
```json
POST /products
{
  "name": "Laptop HP",
  "price": 999.99,
  "stock": 10,
  "status": true,
  "categoryId": "clxxxxx..."
}
```

### Categories

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/categories` | Crear nueva categoría |
| GET | `/categories` | Obtener todas las categorías |
| GET | `/categories/:id` | Obtener categoría por ID |
| PATCH | `/categories/:id` | Actualizar categoría |
| DELETE | `/categories/:id` | Eliminar categoría |

#### Ejemplo: Crear Categoría
```json
POST /categories
{
  "name": "Electrónica"
}
```

## Estructura del Proyecto

```
src/
├── app.module.ts              # Módulo principal
├── main.ts                    # Punto de entrada
├── categories/                # Módulo de categorías
│   ├── categories.controller.ts
│   ├── categories.service.ts
│   ├── categories.module.ts
│   ├── dto/
│   └── entities/
├── products/                  # Módulo de productos
│   ├── products.controller.ts
│   ├── products.service.ts
│   ├── products.module.ts
│   └── dto/
├── common/                    # Utilidades compartidas
│   ├── filters/              # Filtros de excepción
│   ├── pagination/           # Sistema de paginación
│   ├── pipies/              # Pipes de validación
│   └── response/            # Helpers de respuesta
└── database/                 # Módulo de base de datos
    ├── database.module.ts
    └── database.service.ts

prisma/
├── schema.prisma             # Schema de Prisma
└── migrations/               # Historial de migraciones
```

## Prisma Studio

Para visualizar y editar los datos de la base de datos:

```bash
pnpm run prisma:studio
```

Esto abrirá una interfaz web en `http://localhost:5555`

## Validaciones Implementadas

El proyecto utiliza `class-validator` y `class-transformer` para validar los datos de entrada:

- Validación de tipos de datos
- Validación de longitud de strings
- Validación de campos requeridos/opcionales
- Transformación automática de tipos
- Mensajes de error personalizados

## Buenas Prácticas Implementadas

- ✅ Arquitectura modular de NestJS
- ✅ DTOs para validación de datos
- ✅ Separación de responsabilidades (Controllers, Services)
- ✅ Manejo centralizado de errores
- ✅ Respuestas estandarizadas de API
- ✅ Uso de Prisma ORM para gestión de datos
- ✅ Variables de entorno para configuración
- ✅ Docker para containerización
- ✅ TypeScript para tipado estático

## Próximas Funcionalidades

- [ ] Autenticación y autorización (JWT)
- [ ] Módulo de usuarios
- [ ] Módulo de órdenes
- [ ] Sistema de pagos
- [ ] Búsqueda y filtros avanzados
- [ ] Paginación en endpoints
- [ ] Carga de imágenes
- [ ] Tests unitarios y e2e completos
- [ ] Documentación con Swagger/OpenAPI
- [ ] Rate limiting
- [ ] Logging avanzado

## Problemas Comunes y Soluciones

### Error de conexión a la base de datos
```bash
# Verificar que el contenedor de PostgreSQL esté corriendo
docker ps

# Si no está corriendo, iniciarlo
docker-compose up -d

# Verificar los logs del contenedor
docker logs postgres
```

### Error "Cannot find module '@prisma/client'"
```bash
# Regenerar el cliente de Prisma
pnpm run prisma:generate
```

### Error en migraciones
```bash
# Resetear la base de datos (solo en desarrollo)
pnpm run prisma:reset

# Aplicar migraciones nuevamente
pnpm run prisma:migrate
```

## Contribuir

1. Fork el proyecto
2. Crea tu rama de feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Recursos Útiles

- [Documentación de NestJS](https://docs.nestjs.com)
- [Documentación de Prisma](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Docker Documentation](https://docs.docker.com/)

## Licencia

Este proyecto está bajo la Licencia UNLICENSED - consulta el archivo LICENSE para más detalles.

## Autores

- **DaR3kDev** - *Trabajo Inicial* - [DaR3kDev](https://github.com/DaR3kDev)

## Repositorio

- **Repositorio**: service-ecommerce
- **Rama actual**: julian
- **Rama principal**: master

---

⭐ Si este proyecto te ha sido útil, considera darle una estrella en GitHub

