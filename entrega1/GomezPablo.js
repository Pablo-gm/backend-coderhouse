class Usuario{
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName(){
        return  `${this.nombre} ${this.apellido}`;
    }

    addMascota(nombre){
        this.mascotas.push(nombre);
    }

    countMascotas(){
        return this.mascotas.length;
    }

    addBook(nombre, autor){
        this.libros.push({ nombre, autor });
    }

    getBookNames(){
        return this.libros.map(libro => libro.nombre);
    }


}

const librosEjemplo = [
    {
        nombre: 'Las aventuras de Alicia en el país de las maravillas',
        autor: 'Lewis Carroll'
    },
    {
        nombre: 'El retrato de Dorian Gray',
        autor: 'Oscar Wilde'
    },
    {
        nombre: 'Guerra y paz',
        autor: 'León Tolstói'
    }
]

const usuario = new Usuario('John', 'Miller', librosEjemplo, ['Momo']);

console.log(usuario.getFullName());

console.log(usuario.countMascotas());
usuario.addMascota('bolillo');
console.log(usuario.countMascotas());

console.log(usuario.getBookNames());
usuario.addBook('La vuelta al mundo en ochenta días','Julio Verne y Peter Holeinone');
console.log(usuario.getBookNames());