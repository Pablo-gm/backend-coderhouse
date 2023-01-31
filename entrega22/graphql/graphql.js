const {buildSchema} = require('graphql')
const {graphqlHTTP} = require('express-graphql')
const ProductsService = require('../services/productsService')

const schema = buildSchema(`
  input InputProduct {
    title: String,
    price: Float,
    thumbnail: String,
    code: String,
    description: String,
    category: String,
    stock: Int,
  }

  type Product {
    id: ID!,
    title: String,
    price: Float,
    thumbnail: String,
    code: String,
    description: String,
    category: String,
    stock: Int,
    createdAt: String
  }

  type Answer {
    status: String,
    message: String,
  }

  type Query {
    getAllProducts: [Product],
    getProductById(id: String!): Product,
  }
  type Mutation {
    addProduct(product: InputProduct): Answer,
    updateProduct(id: String, product: InputProduct): Answer,
    deleteProduct(id: String): Answer,
  }
`);

class GraphQLController {
    constructor() {
        const ps = new ProductsService();
        return graphqlHTTP({
            schema: schema,
            rootValue: {
                getAllProducts: ps.getAllProductsGraphql,
                getProductById: ps.getProductByIdGraphql,
                addProduct: ps.addProductGraphql,
                updateProduct: ps.updateProductGraphql,
                deleteProduct: ps.deleteProductByIdGraphql,
            },
            graphiql: true
        })
    }
}

module.exports = GraphQLController