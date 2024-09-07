const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('hy working!');
} )

module.exports = router;