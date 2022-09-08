const Contenedor = require('./contenedor');

const archivo = new Contenedor('productos.txt');


const prueba = async () => {

    const productoInicial = {
        title: "Papel",                                                                                                                          
        price: 11.58,                                                                                                                                     
        thumbnail: "https://via.placeholder.com/150",                                   
    }

    const nuevoProducto = {
        title: "Pluma",                                                                                                                          
        price: 34.34,                                                                                                                                     
        thumbnail: "https://via.placeholder.com/150",                                   
    }

    // El archivo vacio se llena con un producto con ID 1
    const primerProductoId = await archivo.save(productoInicial);
    console.log(`ID primer producto ${primerProductoId}`);

    // Nuevo producto se llena con ID del anterior + 1  (2 en este caso)
    const nuevoProductoId = await archivo.save(nuevoProducto);
    console.log(`ID nuevo producto ${nuevoProductoId}`)

    // Encontramos producto por ID
    const productoIdUno = await archivo.getById(1);
    console.log("Producto con ID 1:");
    console.log(productoIdUno);

    // Producto inexistente
    const productoIdInexistente = await archivo.getById(1000);
    console.log("Producto con ID 1000:");
    console.log(productoIdInexistente);

    // Mostramos todos los productos
    const contenido = await archivo.getAll();
    console.log("Todo los productos:");
    console.log(contenido);

    // Borramos por ID
    console.log("Borramos el producto con ID 2:");
    await archivo.deleteById(2);

    const contenidoDos = await archivo.getAll();
    console.log("Todo los productos sin producto con ID 2:");
    console.log(contenidoDos);

    // Borramos todos los productos
    console.log("Borramos productos:")
    await archivo.deleteAll();

    const contenidoVacio = await archivo.getAll();
    console.log("Todo los productos borrados:");
    console.log(contenidoVacio);
} 

prueba();
