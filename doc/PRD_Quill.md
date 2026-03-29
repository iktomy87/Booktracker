# PRD — Quill: Aplicación Web de Registro de Lectura

**Versión:** 1.0  
**Fecha:** Marzo 2026  
**Estado:** En desarrollo

---

## 1. Resumen Ejecutivo

Quill es una aplicación web para lectores que desean llevar un registro organizado de sus lecturas. Permite al usuario controlar su progreso en cada libro, explorar el catálogo, publicar reseñas, ver estadísticas personales y establecer metas de lectura. El objetivo es transformar el hábito de lectura en una experiencia enriquecida, social y medible.

---

## 2. Problema y Oportunidad

Los lectores habituales no tienen una herramienta centralizada para:

- Saber en qué página dejaron un libro.
- Visualizar cuánto tiempo les tomó terminar una lectura.
- Organizar los libros que terminaron, están leyendo o tienen pendientes.
- Compartir sus opiniones sobre los libros que leyeron.

Quill cubre esa necesidad con una interfaz moderna, simple y enfocada en el lector.

---

## 3. Usuarios Objetivo

- Lectores habituales que consumen más de 5 libros al año.
- Personas que quieren construir un hábito de lectura constante.
- Usuarios que disfrutan descubrir libros nuevos y leer reseñas de otros lectores.

---

## 4. Stack Tecnológico (implementación actual)

**Frontend:** Next.js 15, React 19, TypeScript, Tailwind CSS v4, shadcn/ui  
**Backend:** Spring Boot 4 (Java 21), Spring Security, Spring Data JPA  
**Base de datos:** PostgreSQL (producción), H2 (tests)  
**Autenticación:** JWT con verificación por email  
**Infraestructura:** Docker (Dockerfile para frontend y backend)

---

## 5. Funcionalidades del Producto

### 5.1 Registro e Inicio de Sesión

**Descripción:** El usuario debe crearse una cuenta para acceder a las funcionalidades personales de la aplicación.

**Flujo:**

1. El usuario completa el formulario de registro con nombre de usuario, email y contraseña.
2. El sistema envía un código de verificación al email ingresado.
3. El usuario ingresa el código para activar su cuenta.
4. Una vez verificado, puede iniciar sesión con email y contraseña.
5. La sesión se gestiona mediante un token JWT con expiración de 24 horas.

**Reglas de negocio:**

- El email debe ser único en el sistema.
- El nombre de usuario debe ser único.
- El código de verificación expira a los 15 minutos. Se puede reenviar.
- Los usuarios no verificados no pueden iniciar sesión.

---

### 5.2 Carga de un Libro

**Descripción:** El usuario puede agregar un libro al catálogo de la plataforma.

**Campos obligatorios:**

- Título del libro
- Al menos un autor (seleccionado de los autores existentes o nuevo)

**Campos opcionales:**

- Descripción / sinopsis
- Total de páginas
- Editorial
- Géneros (uno o varios)
- Imagen de portada (subida como archivo; se almacena en el servidor)

**Reglas de negocio:**

- El título es obligatorio y no puede estar vacío.
- El libro debe tener al menos un autor asociado.
- El total de páginas debe ser mayor a 0 si se ingresa.
- La portada se sube mediante un endpoint dedicado (`POST /api/books/upload-cover`) y se devuelve una URL pública.

---

### 5.3 Progreso de Lectura

**Descripción:** El usuario puede registrar y visualizar su avance en cada libro que está leyendo.

**Funcionalidades:**

- Guardar el número total de páginas del libro.
- Registrar la página actual en la que se encuentra.
- Visualizar el porcentaje de progreso calculado automáticamente: `(página actual / total páginas) × 100`.
- Registrar la fecha en que comenzó a leer el libro.
- Al marcar un libro como terminado, el sistema registra automáticamente la fecha de finalización.
- El usuario puede consultar cuántos días le tomó completar un libro.

**Reglas de negocio:**

- La página actual no puede superar el total de páginas del libro.
- Si el total de páginas no fue cargado, no se puede mostrar el porcentaje de progreso.

---

### 5.4 Biblioteca Personal

**Descripción:** El usuario tiene una biblioteca organizada en tres estados para sus libros.

**Estados disponibles:**

| Estado | Descripción |
|--------|-------------|
| **Leyendo actualmente** | Libros en curso, con progreso activo. |
| **Terminados** | Libros completados, con fecha de inicio y fin. |
| **Pendientes** | Libros que el usuario quiere leer en el futuro. |

**Funcionalidades:**

- El usuario puede mover un libro entre estados en cualquier momento.
- La vista de "Leyendo actualmente" muestra el progreso de cada libro.
- La vista de "Terminados" muestra la duración de cada lectura.

---

### 5.5 Exploración de Libros y Géneros

**Descripción:** El usuario puede navegar el catálogo de libros disponible en la plataforma.

**Funcionalidades:**

- Listar todos los libros disponibles en la plataforma.
- Filtrar libros por género.
- Ver la información detallada de un libro: título, autores, descripción, editorial, páginas, géneros y portada.
- Ver la información de un autor: nombre, biografía, fecha de nacimiento y lista de libros asociados.

**Géneros disponibles (iniciales):** Fantasía, Ciencia Ficción, Terror (extensibles por el administrador).

---

### 5.6 Reseñas de Libros

**Descripción:** El usuario puede publicar una reseña textual de un libro que haya leído.

**Funcionalidades:**

- Escribir y publicar una reseña asociada a un libro.
- Asignar una calificación al libro (ej. de 1 a 5 estrellas).
- Ver las reseñas publicadas por otros usuarios en la página de detalle del libro.

**Reglas de negocio:**

- Solo los usuarios registrados y verificados pueden publicar reseñas.
- Un usuario solo puede publicar una reseña por libro.

---

### 5.7 Perfil de Usuario

**Descripción:** El usuario puede personalizar su perfil público dentro de la plataforma.

**Información del perfil:**

- Nombre de usuario
- Avatar / foto de perfil
- Biografía breve
- Top 5 de libros favoritos (seleccionados manualmente por el usuario)
- Estadísticas visibles: total de libros leídos, libros en curso, meta anual y progreso.

**Funcionalidades:**

- El usuario puede editar su nombre, foto de perfil y biografía.
- El usuario puede seleccionar hasta 5 libros como favoritos para mostrarlos en su perfil.
- El perfil puede ser visible para otros usuarios de la plataforma.

---

### 5.8 Estadísticas de Lectura

**Descripción:** El usuario puede ver métricas sobre sus hábitos de lectura.

**Métricas disponibles:**

- Total de libros leídos (histórico).
- Total de libros leídos en el año en curso.
- Promedio de páginas por día.
- Tiempo promedio para terminar un libro.
- Géneros más leídos.
- Racha diaria de lectura (días consecutivos con actividad registrada).

---

### 5.9 Metas de Lectura

**Descripción:** El usuario puede definir objetivos anuales de lectura y hacer seguimiento de su cumplimiento.

**Funcionalidades:**

- Establecer una meta de cantidad de libros a leer en el año.
- Visualizar el progreso hacia la meta: libros completados vs. meta definida.
- Recibir indicadores visuales cuando se cumple o supera la meta.

---

## 6. Flujos Principales

### Flujo: Agregar un libro a "Leyendo actualmente"

1. El usuario navega al catálogo o busca un libro.
2. Selecciona el libro y abre su página de detalle.
3. Presiona "Empezar a leer".
4. El sistema crea un registro de progreso con fecha de inicio = hoy.
5. El libro aparece en la sección "Leyendo actualmente" de la biblioteca.

### Flujo: Actualizar progreso

1. El usuario accede a su biblioteca → "Leyendo actualmente".
2. Selecciona el libro en curso.
3. Ingresa la página actual.
4. El sistema valida que no supere el total de páginas y guarda el registro.
5. Se actualiza la barra de progreso.

### Flujo: Marcar un libro como terminado

1. El usuario actualiza la página actual al valor igual al total de páginas, o presiona "Marcar como terminado".
2. El sistema registra la fecha de finalización.
3. El libro se mueve automáticamente al estado "Terminados".
4. Se calcula y muestra la duración total de la lectura.

---

## 7. Endpoints de la API (Backend actual)

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/auth/signup` | Registro de usuario |
| POST | `/auth/login` | Inicio de sesión, devuelve JWT |
| POST | `/auth/verify` | Verificación de cuenta por código |
| POST | `/auth/resend` | Reenvío del código de verificación |
| GET | `/users/me` | Datos del usuario autenticado |
| GET | `/api/books` | Listado de todos los libros |
| POST | `/api/books` | Crear un nuevo libro |
| POST | `/api/books/upload-cover` | Subir imagen de portada |

---

## 8. Modelo de Datos Principal

### Usuario (`users`)
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | Long | Identificador único |
| username | String | Nombre de usuario (único) |
| email | String | Email (único) |
| password | String | Contraseña encriptada (BCrypt) |
| enabled | Boolean | Cuenta verificada |
| verificationCode | String | Código de verificación por email |
| verificationCodeExpiresAt | LocalDateTime | Expiración del código |

### Libro (`books`)
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | Long | Identificador único |
| name | String | Título del libro |
| description | String | Descripción / sinopsis |
| totalPages | int | Total de páginas |
| publisher | String | Editorial |
| authors | Set\<Author\> | Relación ManyToMany |
| genres | Set\<Genre\> | Relación ManyToMany |

### Progreso de Lectura (`reading_progress`)
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | Long | Identificador único |
| user | User | Usuario que lee |
| book | Book | Libro en progreso |
| currentPage | int | Página actual |
| isReading | boolean | Indica si está activo |

---

## 9. Requisitos No Funcionales

- **Seguridad:** Autenticación JWT, contraseñas encriptadas con BCrypt, CORS configurado para el frontend en `localhost:3000`.
- **Escalabilidad:** Arquitectura en capas (Controller → Service → Repository). Preparado para contenedores Docker.
- **Rendimiento:** Queries con `JOIN FETCH` para evitar el problema N+1 en libros con autores y géneros.
- **Usabilidad:** Interfaz responsiva, compatible con dispositivos móviles y de escritorio.
- **Testing:** Tests de integración con base de datos H2 en memoria para el backend.

---

## 10. Criterios de Aceptación por Funcionalidad

| Funcionalidad | Criterio de Aceptación |
|---------------|------------------------|
| Registro | El usuario recibe un email con código y puede verificar su cuenta. |
| Login | El usuario autenticado recibe un JWT válido por 24 horas. |
| Carga de libro | El libro aparece en el listado con autores y géneros correctos. |
| Progreso | La barra de progreso refleja `(página actual / total) × 100%`. |
| Biblioteca | Los libros se muestran en el estado correcto (leyendo / terminado / pendiente). |
| Reseña | La reseña aparece en la página de detalle del libro. |
| Perfil | El top 5 de favoritos se muestra correctamente en el perfil público. |
| Estadísticas | Los contadores de libros leídos y racha se actualizan tras registrar actividad. |
| Meta anual | El progreso de la meta se actualiza al terminar un libro. |

---

## 11. Fuera del Alcance (v1.0)

- Integración con redes sociales (seguir a otros usuarios, feed de actividad).
- Notificaciones push.
- Importación de libros desde plataformas externas (Goodreads, Google Books).
- Aplicación móvil nativa.
- Sistema de roles y administración avanzada.

---

## 12. Próximos Pasos

1. Implementar endpoints faltantes: detalle de libro por ID, actualización de progreso, gestión del perfil, reseñas y metas.
2. Agregar autenticación completa en el frontend (manejo de JWT en cookies o localStorage).
3. Implementar la vista de biblioteca personal con los tres estados.
4. Conectar las estadísticas con datos reales del backend.
5. Agregar validación de formularios en el frontend con react-hook-form + zod.
6. Configurar CI/CD con Docker Compose para despliegue en producción.
