const e = require('express');
const express = require('express');
const { Router } = express;
const router = Router();

router.get('/', (req, res) => {
    res.render('pages/form');
})

module.exports = router;
