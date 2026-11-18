
# Directorio de Usuarios - Angular y Vue

## Descripción del proyecto

Este proyecto consistio en la creacion de una aplicacion web con **Angular y Vue 3**.

El objetivo de este trabajo es comparar la creacion de una app usando dos frameworks distintos.

La aplicación consulta usuarios desde una API pública y los muestra mediante tarjetas que contienen nombre, correo electrónico y ciudad.

También permite buscar usuarios por nombre, seleccionar favoritos y visualizar un contador que se actualiza automáticamente.

## Tecnologías utilizadas

| Tecnología | Función |
|------------|---------|
| Angular | Desarrollo de la primera aplicación |
| Vue 3 | Desarrollo de la segunda aplicación |
| TypeScript | Programación en Angular |
| JavaScript | Programación en Vue |
| HTML | Estructura de las interfaces |
| CSS | Diseño de las aplicaciones |
| Node.js y npm | Instalación y ejecución |
| Vite | Servidor de desarrollo de Vue |
| Vitest | Pruebas unitarias |
| Git y GitHub | Control de versiones |

## Instalación y ejecución

Para ejecutar las aplicaciones es necesario tener instalado Node.js y npm.

### 1. Ejecutar Angular

Desde la carpeta principal del proyecto:

```bash
cd angular-app
npm install
npm start
```

También se puede utilizar:

```bash
npx ng serve -o
```

**Evidencia de ejecución:**

![Ejecución Angular](<angular-app/evidencias/Captura 1 Angular.png>)

### 2. Ejecutar Vue

Desde la carpeta principal del proyecto:

```bash
cd vue-app
npm install
npm run dev
```

**Evidencia de ejecución:**

![Ejecución Vue](<vue-app/evidencias/Captura Vue 1.png>)

## Consulta de datos desde la API

Ambas aplicaciones utilizan la API pública JSONPlaceholder.

**Enlace de la API:**

https://jsonplaceholder.typicode.com/users

Se utiliza el método HTTP `GET` para obtener información de los usuarios.

Los principales datos utilizados son:

- `id`: identificador.
- `name`: nombre completo.
- `email`: correo electrónico.
- `address.city`: ciudad.

No fue necesario utilizar JSON Server ni implementar una base de datos.

### Consulta en Angular

Angular utiliza `HttpClient` dentro del servicio `usuarios.service.ts`.

Este servicio realiza la petición HTTP y devuelve los datos al componente principal.

Se comprobó la respuesta mediante la pestaña Network de Chrome, donde se visualiza la solicitud a JSONPlaceholder y la información recibida.

**Evidencia:**

![Consulta API Angular](<angular-app/evidencias/Captura 2 Angular.png>)

### Consulta en Vue

Vue utiliza `fetch()` para consultar la API.

La respuesta se transforma a JSON y se almacena mediante una variable reactiva.

También se verificó la petición desde Network en Chrome.

**Evidencia:**

![Consulta API Vue](<vue-app/evidencias/Captura 2 Vue.png>)

## Componentes reutilizables

Se creó un componente reutilizable para representar a cada usuario mediante una tarjeta.

Cada tarjeta muestra:

- Nombre.
- Correo electrónico.
- Ciudad.
- Botón para agregar o quitar favoritos.

### Componente Angular

Se creó `usuario-tarjeta`, compuesto por:

- `usuario-tarjeta.ts`
- `usuario-tarjeta.html`
- `usuario-tarjeta.css`

El componente recibe la información del usuario mediante `input()`.

También utiliza `output()` para emitir un evento cuando se presiona el botón Favorito.

El componente principal recibe el evento y actualiza el estado de los favoritos.

### Componente Vue

Se creó el componente `UserCard.vue`.

Utiliza `defineProps()` para recibir los datos del usuario y `defineEmits()` para emitir el evento de favorito.

Este componente contiene la lógica, la estructura HTML y sus estilos.

De esta manera, se evita repetir el mismo código para mostrar todos los usuarios.

## Búsqueda de usuarios

Se implementó un buscador que filtra usuarios por nombre mientras se escribe.

No es necesario presionar un botón para realizar la búsqueda.

En Angular se utiliza `signal()` junto con `computed()`.

En Vue se utiliza `ref()` y `computed()`.

Ambas aplicaciones utilizan una función de filtrado que convierte los nombres y el texto de búsqueda a minúsculas.

Por ejemplo, al buscar `Leanne`, solamente aparece la tarjeta correspondiente a Leanne Graham.

### Evidencia Angular

![Búsqueda Angular](<angular-app/evidencias/Captura 3 angular.png>)

### Evidencia Vue

![Búsqueda Vue](<vue-app/evidencias/Captura 3 Vue.png>)

## Sistema de favoritos

Cada tarjeta tiene un botón para seleccionar o quitar usuarios favoritos.

Al seleccionar un favorito:

1. Se guarda el identificador del usuario.
2. Cambia el botón de la tarjeta.
3. Aumenta el contador de favoritos.
4. Se actualiza automáticamente la interfaz.

Se implementó un botón para limpiar los favoritos y volver a empezar nuevamente.

Además, como funcionalidad adicional, se utiliza `localStorage` para conservar los favoritos al actualizar la página.

### Evidencia Angular

En la siguiente captura se observa un usuario seleccionado como favorito y el contador actualizado.

![Favoritos Angular](<angular-app/evidencias/Captura 3 angular.png>)

### Evidencia Vue

Se observa el mismo funcionamiento en la aplicación desarrollada con Vue.

![Favoritos Vue](<vue-app/evidencias/Captura 3 Vue.png>)

## Manejo de carga y errores

Ambas aplicaciones controlan los estados de la petición HTTP.

### Estado de carga

Mientras se realiza la consulta a la API, aparece el mensaje:

**Cargando...**

Este mensaje desaparece cuando termina la solicitud.

![Carga Angular](<angular-app/evidencias/Cap 6 Angular.png>)

![Carga Vue](<vue-app/evidencias/Cap 6 Vue.png>)

### Estado de error

Si la consulta falla, se muestra:

**Error al cargar usuarios. Revisa tu conexión.**

También se incluye un botón **Reintentar**, que permite ejecutar nuevamente la petición.

Para verificar este funcionamiento se bloqueó temporalmente la solicitud a JSONPlaceholder desde las herramientas de desarrollo de Chrome.

### Evidencia Angular

![Error Angular](<angular-app/evidencias/Cap 4 Angular.png>)

### Evidencia Vue

![Error Vue](<vue-app/evidencias/Cap 4 Vue.png>)

## Pruebas unitarias

Se implementó una prueba unitaria para comprobar la función de búsqueda en cada framework.

Las pruebas utilizan Vitest.

El objetivo es verificar que el filtro encuentre correctamente un usuario sin importar si el texto está escrito en mayúsculas o minúsculas.

### Prueba Angular

**Archivo:**

`src/app/utils/filtrar-usuarios.spec.ts`

Se crearon dos usuarios de ejemplo:

- Ana Torres.
- Luis Perez.

Se realiza una búsqueda utilizando `ANA`.

La prueba verifica que solamente se devuelva el usuario Ana Torres.

**Comando de ejecución:**

Desde la carpeta `angular-app`:

```bash
npm test
```

**Resultado obtenido:** una prueba aprobada.

![Prueba Angular](<angular-app/evidencias/Captura 5 Angular.png>)

### Prueba Vue

**Archivo:**

`src/utils/filtrarUsuarios.test.js`

Se utilizó el mismo escenario para verificar la función de búsqueda.

Se realizó la búsqueda con `ANA` y se comprobó que la función devolviera solamente a Ana Torres.

**Comando de ejecución:**

Desde la carpeta `vue-app`:

```bash
npm test
```

**Resultado obtenido:** una prueba aprobada.

![Prueba Vue](<vue-app/evidencias/Captura 5 vue.png>)

## Comparación entre Angular y Vue

| Característica | Angular | Vue |
|----------------|---------|-----|
| Lenguaje | TypeScript | JavaScript |
| Peticiones HTTP | HttpClient | fetch |
| Estado reactivo | signal | ref |
| Datos calculados | computed | computed |
| Repetición de componentes | @for | v-for |
| Condicionales | @if | v-if |
| Propiedades recibidas | input | defineProps |
| Eventos | output | defineEmits |
| Pruebas | Vitest | Vitest |

## Conclusiones

La práctica permitió conocer cómo desarrollar una misma aplicación utilizando Angular y Vue.

Angular requiere trabajar con componentes, servicios y TypeScript, mientras que Vue permite crear componentes de manera más compacta utilizando JavaScript.

En ambos frameworks fue posible consultar una API pública, mostrar usuarios, realizar búsquedas, manejar favoritos y controlar los estados de carga y error.
