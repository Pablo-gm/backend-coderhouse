require('dotenv').config();

let Products;
let Carts = [{algo: "prueba"}];
let method = process.env.PERSISTENCE_METHOD || "mongodb";

switch (method) {
    case "mongodb":
        const pm = require('./productDaoMongo');
        const cm = require('./cartDaoMongo');
        Products = new pm();
        Carts = new cm();
        break;
    case "firebase":
        const pf = require('./productDaoFirebase');
        const cf = require('./cartDaoFirebase');
        Products = new pf();
        Carts = new cf();
        break
    default:
}

module.exports = { Products, Carts }