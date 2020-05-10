const express = require('express')
const server = express();

// Query params = ?teste=1 => req.query
// Route params = /users/1 => req.params
// Request Body = { name: 'Renato Franco', email: 'renato_ny@live.com' }

server.get('/teste', function(req, res){
    const { nome } = req.query;
    res.json({ message: `Hello world ${nome}` })
})

server.get('/users/:id', function(req, res) {
    const { id } = req.params
    res.json({ message: `Buscado user ${id}` })
});


server.listen(4000)