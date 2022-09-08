
/*
const t = {};
let temp = 0;

for (let index = 0; index < 1000; index++) {
    temp = Math.floor((Math.random() * 20) + 1);
    if(t[temp]){
        t[temp] = t[temp] + 1;
    }else{
        t[temp] = 1;
    }
    
}

console.log(t);
*/

const respuesta = {
    nombres: [],
    total: 0.00,
    promedio: 0.00,
    menor: Infinity,
    mayor: 0.00
};

const productos = [
    { id:1, nombre:'Escuadra', precio:323.45 },
    { id:2, nombre:'Calculadora', precio:234.56 },
    { id:3, nombre:'Globo Terráqueo', precio:45.67 },
    { id:4, nombre:'Paleta Pintura', precio:456.78 },
    { id:5, nombre:'Reloj', precio:67.89 },
    { id:6, nombre:'Agenda', precio:78.90 }
]

let temp = 0;

for (let index = 0; index < productos.length; index++) {
    temp = productos[index];
    respuesta.nombres.push(temp.nombre);
    respuesta.total += temp.precio;
    if(respuesta.menor > temp.precio){
        respuesta.menor = temp.precio;
    }else if(respuesta.mayor < temp.precio){
        respuesta.mayor = temp.precio;
    }
}

respuesta.promedio = (respuesta.total / productos.length).toFixed(2);
respuesta.total = respuesta.total.toFixed(2);

console.log(respuesta);