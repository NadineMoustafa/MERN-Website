const express = require('express');
const router = express.Router();

router.get('/ReturningEquation', async(req, res) => {
    res.json({data:{m:0.01,c:100}})
})

module.exports = router;