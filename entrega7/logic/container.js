//const fs = require('fs');
import fs from 'fs';

class Container{
    constructor(fileName){
        this.fileName = fileName;
    }

    async readFile(){
        return fs.promises.readFile(this.fileName, 'utf-8');
    }

    async getAll(){
        try {
            const data = await this.readFile();
            return JSON.parse(data);
        } catch (error) {
            console.log(error);
        }
    }

    async deleteAll(){
        try {
            await fs.promises.writeFile(this.fileName, "[]");
            return 
        } catch (error) {
            console.log(error);
        }
    }

    async save(product){
        try {
            const data = await this.getAll();
            product.id = this.createId(data);

            data.push(product);
            await fs.promises.writeFile(this.fileName, JSON.stringify(data));

            return product.id;
        } catch (error) {
            console.log(error);
        }
    }

    // Recibe un id y devuelve el objeto con ese id, o null si no está.
    async getById(id){
        try {
            const data = await this.getAll();
            const result = data.find((product) => product.id === id );

            return result ? result : null;
        } catch (error) {
            console.log(error);
        }
    }

    // Actualiza del archivo el objeto con el id buscado.
    async updateById(productToUpdate){
        try {
            const data = await this.getAll();
            let productFound = false;
            const result = data.map(
                (product) => {
                    if(product.id === productToUpdate.id ){
                        productFound = true;
                        productToUpdate.timestamp = product.timestamp;
                        return productToUpdate;
                    }else{
                        return product;
                    }
                } 
            );

            if(productFound === false){
                return {error: "el id no tuvo coincidencias."};
            }

            await fs.promises.writeFile(this.fileName, JSON.stringify(result));
            return {answer: "cambios realizados"};
        } catch (error) {
            console.log(error);
        }
    }

    // Elimina del archivo el objeto con el id buscado.
    async deleteById(id){
        try {
            const data = await this.getAll();
            const result = data.filter((product) => product.id !== id );

            if(result.length === data.length){
                return {error: "el id no tuvo coincidencias"};
            }

            await fs.promises.writeFile(this.fileName, JSON.stringify(result));
            return {answer: "eliminado"};
        } catch (error) {
            console.log(error);
        }
    }

    // ...que deberá ser siempre uno más que el id del último objeto agregado (o id 1 si es el primer objeto que se agrega) y no puede estar repetido.
    createId(data){
        const lastProduct = data.length ? data[data.length-1] : {id: 0};
        return lastProduct.id + 1;
    }
}

//module.exports = Container;
export default Container;