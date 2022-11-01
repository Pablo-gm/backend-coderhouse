require('dotenv').config();

const mongoUrl = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ecommerce';

const firebaseConfig = {
    serviceAccount: {
        "type": process.env.TYPE,
        "project_id": process.env.PROJECT_ID,
        "private_key_id": process.env.PRIVATE_KEY_ID,
        "private_key": process.env.PRIVATE_KEY,
        "client_email": process.env.CLIENT_EMAIL,
        "client_id": process.env.CLIENT_ID,
        "auth_uri":  process.env.AUTH_URI,
        "token_uri": process.env.TOKEN_URI,
        "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_X509,
        "client_x509_cert_url": process.env.CLIENT_X509
    }
}
module.exports = {mongoUrl, firebaseConfig};