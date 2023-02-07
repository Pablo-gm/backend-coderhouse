require('dotenv').config();
const {MONGO_URI, PORT, USE_CLUSTER} = require('./config/options')
const Koa = require('koa');
const { koaBody } = require('koa-body');

const parseArgs  = require('minimist');
const args = parseArgs(process.argv.slice(2),  { alias: { m: "MODE"}, default: { MODE: "FORK" } });
const cluster = require(`cluster`);
const os = require(`os`);
const numCPUs = os.cpus().length;

const app = new Koa();

// middleware
app.use(koaBody());

// Require the routers
let productsRouter = require('./router/productsKOA');

// use the routes
app.use(productsRouter.routes());

const initServer = (PORT) => {
    app.listen(PORT, async () => {
        console.log(`Servidor http escuchando en el puerto ${PORT}`)
    });
}

const isCluster = (args.MODE == 'CLUSTER') || USE_CLUSTER;

if (isCluster) {
    if (cluster.isMaster) {
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }
        cluster.on('exit', worker => {
            console.log('Worker', worker.process.pid, 'died', new Date().toLocaleString())
            cluster.fork();
        });
    } else {
        initServer(PORT);
    }
} else {
    initServer(PORT);
}


//app.listen(PORT);