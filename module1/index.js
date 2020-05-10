const express = require('express')
const server = express();

server.use(express.json());
// Query params = ?teste=1 => req.query
// Route params = /users/1 => req.params
// Request Body = { name: 'Renato Franco', email: 'renato_ny@live.com' }

/*
    CRUD
    C = create
    R = read
    U = update
    D = delete
 */

const users = ['Renato', 'Ana', 'Pedro', 'Alice', 'Gabriel'];

// Middleware
server.use(function(req, res, next) {
    console.log(`Método: ${req.method}; URL: ${req.url}`);
    return next();
});

function checkUserExists(req, res, next) {
    if  (!req.body.name) {
        return res.status(400)
            .json({ error: 'User name is required', status: 400 });
    }

    return next();
}

function checkUserInArray(req, res, next) {
    const user = users[req.params.id];
    if (!user) {
        return res.status(400)
            .json({ error: 'User doesnt exists', status: 400 });
    }

    req.user = user;
    return next();
}

// List
// return all records from server
server.get('/users', function(req, res){
    return res.json({data: users});
})

// [R] = Read
// return a specific record from server
server.get('/users/:id', checkUserInArray, function(req, res) {
    const { id } = req.params;
    return res.json({data: req.user});
});

// [C] = Create
// create a new record
server.post('/users', checkUserExists, function (req, res) {
    const { name } = req.body;
    users.push(name);
    return res.json({data: users});
})

// [U] = Update
// Update a record from server
server.put('/users/:id', checkUserInArray, checkUserExists, function(req, res){
    const { id }  = req.params;
    const { name} = req.body;

    users[id] = name;
    return res.json({data: users})
})
 
// [D] Delete
// Delete a record from server
server.delete('/users/:id', checkUserInArray, function(req, res) {
    const { id } = req.params;
    users.splice(id, 1);
    return res.send();
});

server.listen(4000);
