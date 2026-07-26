# PortalAuth

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.19.

## Solución completa con API de usuarios

La solución se organiza en dos proyectos hermanos:

- `proyectoIA/prueba1`: interfaz Angular servida por Nginx.
- `proyectoIA/usuario-api`: API REST independiente con Java 17, Spring Boot, Maven, JPA y H2.
- `POST /api/usuarios`: crea usuarios, valida los datos, evita correos duplicados y cifra las contraseñas con BCrypt.

Primero inicia la API desde `proyectoIA/usuario-api`:

```bash
docker compose up --build -d
```

Después inicia el frontend desde `proyectoIA/prueba1` con el mismo comando.
La interfaz queda disponible en `http://localhost:8080`, y la API en
`http://localhost:8081/api/usuarios`.

Para desarrollar Angular con `npm start`, deja la API de Docker activa. El
proxy de desarrollo enviará automáticamente las solicitudes `/api` al puerto
`8081`.

Para detener cada proyecto, ejecuta desde su carpeta:

```bash
docker compose stop
```

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
