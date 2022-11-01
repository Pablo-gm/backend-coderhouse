# SEGUNDA ENTREGA DEL PROYECTO FINAL
## Deberás entregar el avance de tu aplicación eCommerce Backend correspondiente a la segunda entrega de tu proyecto final.

### Consigna
Basándose en los contenedores ya desarrollados (memoria, archivos) desarrollar dos contenedores más (que cumplan con la misma interfaz) que permitan realizar las operaciones básicas de CRUD en MongoDb (ya sea local o remoto) y en Firebase. Luego, para cada contenedor, crear dos clases derivadas, una para trabajar con Productos, y otra para trabajar con Carritos.

### Aspectos a incluir en el entregable:
- A las clases derivadas de los contenedores se las conoce como DAOs (Data Access Objects), y pueden ir todas incluidas en una misma carpeta de ‘daos’.
- En la carpeta de daos, incluir un archivo que importe todas las clases y exporte una instancia de dao de productos y una de dao de carritos, según corresponda. Esta decisión se tomará en base al valor de una variable de entorno cargada al momento de ejecutar el servidor (opcional: investigar el uso de imports dinámicos).
- Incluir un archivo de configuración (config) que contenga los datos correspondientes para conectarse a las bases de datos o medio de persistencia que corresponda.

### Opcional:
- Hacer lo mismo para bases de datos relacionales: MariaDB/SQLite3.

### Notas:
El proyecto sirve con bases de datos en mongodb y firebase.
Por default usa mongodb y se conecta a una base de datos llamada "ecommerce" en **'mongodb://127.0.0.1:27017/ecommerce**
Para cambiar esta conexión se requiere crear un archivo .env en el root del proyecto y agregar una variable llamada **MONGO_URI**
Se puede cambiar el puerto para el servidor express agregando una variable con nombre **PORT**

En caso de requerir firebase se requieren las siguientes variables en el archivo .env :

- PERSISTENCE_METHOD="firebase"
- TYPE=
- PROJECT_ID=
- PRIVATE_KEY_ID=
- PRIVATE_KEY=
- CLIENT_EMAIL=
- CLIENT_ID=
- AUTH_URI=
- TOKEN_URI=
- AUTH_PROVIDER_X509=
- CLIENT_X509=

La segunda entrega contiene una interfaz con handlebars. Por default, las rutas de acceso son las siguientes:

| Ruta         | Función     |
|--------------|-----------|
| http://localhost:8080/api/productos/view | Ver catálogo de productos, eliminar y añadir productos individualmente|
| http://localhost:8080/api/productos/update/:id | Formulario para modificar producto|
| http://localhost:8080/api/carritos/view      | Ver todos los carritos, eliminar y añadir carritos individualmente  |
| http://localhost:8080/api/carritos/update/:id      | Formulario para agregar o quitar productos de un carrito  |

