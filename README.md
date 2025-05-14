
# 🧱 Hexagonal Architecture with NestJS

Este proyecto es una implementación de una API básica de tareas utilizando **NestJS** siguiendo los principios de la **arquitectura hexagonal (Ports & Adapters)**. La idea principal es separar las responsabilidades de forma que el dominio de negocio no dependa de frameworks ni de detalles de infraestructura.

---

## 🚀 Tecnologías utilizadas

- **NestJS** – Framework progresivo para Node.js
- **MongoDB + Mongoose** – Base de datos NoSQL
- **Arquitectura hexagonal (ports & adapters)** – Separación de capas y dependencias

---

## 📁 Estructura del proyecto

```bash
src/
├── adapters/
│   ├── in/                      # Entradas: Controladores HTTP
│   │   └── tasks.controller.ts
│   └── out/                     # Salidas: Persistencia (MongoDB)
│       ├── mongodb/
│       │   ├── repositories/
│       │   │   └── tasks.mongodb.repository.ts
│       │   └── schemas/
│       │       └── tasks.schema.ts
├── application/                # Casos de uso de la aplicación
│   └── services/
│       └── tasks.application.service.ts
├── domain/                     # Reglas de negocio (entidades y puertos)
│   ├── entities/
│   │   └── tasks.entity.ts
│   ├── ports/
│   │   ├── in/
│   │   │   └── tasks.service.port.ts     # Lo que la aplicación necesita
│   │   └── out/
│   │       └── tasks.repository.port.ts  # Lo que el dominio espera
│   └── services/
│       └── tasks.domain.service.ts
├── infrastructure/
│   └── tasks.modules.ts        # Configuración de DI (inyección de dependencias)
├── main.ts                     # Punto de entrada
```

---

## 🧠 ¿Qué es la arquitectura hexagonal?

La arquitectura hexagonal busca que la lógica de negocio (dominio) esté completamente desacoplada del mundo exterior (bases de datos, controladores, etc.). Esto se logra mediante **puertos** (interfaces) y **adaptadores** (implementaciones).

- **Dominio:** No sabe nada del framework ni de cómo se guardan los datos.
- **Aplicación:** Orquesta el flujo entre entrada y lógica de negocio.
- **Adaptadores:** Interfases de entrada (controladores) y salida (repositorios, base de datos).
- **Infraestructura:** Se encarga de vincular todo mediante **inyección de dependencias** (NestJS).

---

## 🧩 Inyección de dependencias (por token)

NestJS permite inyectar clases mediante **tokens** para desacoplar aún más:

```ts
export const TASK_REPOSITORY_PORT = Symbol('TASK_REPOSITORY_PORT');
```

Luego en el módulo:

```ts
{
  provide: TASK_REPOSITORY_PORT,
  useClass: TaskRepository,
}
```

Esto permite que el dominio dependa de interfaces (`TaskRepositoryPort`) y no de clases concretas (`TaskRepository`). Así, se puede cambiar la implementación sin afectar el dominio.

---

## 📌 Cómo se ejecuta el flujo

1. Un cliente realiza una petición a una ruta del controlador (`TaskController`).
2. El controlador llama al servicio de aplicación (`TaskApplicationService`).
3. Este servicio invoca la lógica de negocio desde el dominio (`TaskDomainService`).
4. El dominio utiliza un puerto (`TaskRepositoryPort`) para guardar, buscar o eliminar tareas.
5. Finalmente, la infraestructura (adaptador de salida: `TaskRepository`) implementa ese puerto y guarda los datos en MongoDB.

---

## ▶️ Comenzar

1. Clona el repositorio:

```bash
git clone https://github.com/ezexedge/hexagonal-architecture-nestjs.git
cd hexagonal-architecture-nestjs
```

2. Instala las dependencias:

```bash
npm install
```

3. Configura MongoDB en `.env` (si es necesario).

4. Ejecuta el proyecto:

```bash
npm run start:dev
```

---

## 🧪 Próximos pasos

- Agregar tests unitarios (cada capa por separado).
- Implementar más entidades o casos de uso (ej. usuarios, etiquetas).
- Validación más robusta en DTOs.
- Usar casos de uso como objetos (Command Pattern).

---

## 🧠 Conclusión

Este proyecto es una buena base para comprender cómo aplicar arquitectura hexagonal en NestJS, usando inyección por token y separando completamente el dominio del resto del sistema. Si bien es un ejemplo sencillo, la estructura está preparada para escalar de forma limpia y mantenible.

