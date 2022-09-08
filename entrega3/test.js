const http = require('http');

const server = http.createServer((peticion, respuesta) => {
    const ahora = new Date();
    const horas = ahora.getHours()
    let mensaje = "Buenos días";

    if(horas > 12 && horas < 20){
        mensaje = "Buenas tardes";
    }else if(horas > 19 && horas < 6){
        mensaje = "Buenas noches";
    }

    respuesta.end('Hola mundo ' + mensaje);
})

const port = 8080;

const connectedServer = server.listen(port, () => {
    console.log(`Servidor Http escuchando en el puerto ${connectedServer.address().port}`)
 })