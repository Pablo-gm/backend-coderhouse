const express = require('express');
const { Router } = express;
const router = Router();
const { fork } = require('child_process');
const numCPUs = require("os").cpus().length;

// Info route
router.get('/info', (req, res) => {
    const info = {
        argumentos_de_entrada: process.argv.slice(2),
        path_de_ejecucion: process.execPath,
        sistema_operativo: process.platform,
        process_id: process.pid,
        version_node: process.version,
        carpeta_del_proyecto: process.cwd(),
        memoria_total_reservada: process.memoryUsage().rss,
        numero_CPUs: numCPUs
    };
    res.render("pages/info.hbs", {info});
});

// Randoms route
router.get('/api/randoms', (req, res) => {
    let { cant } = req.query;
    const forked = fork('./controllers/randomController.js');

    forked.send({cant});

    forked.on("error", (err) => {
      console.log(`Error en 'random' ${err}`);
    });
  
    forked.on("message", (obj) => {
      return res.json(obj);
    });
});

module.exports = router;
