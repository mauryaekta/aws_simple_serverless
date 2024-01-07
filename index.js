const express = require('express');
const Serverless = require('serverless-http')
const app = express();
app.use(express.json());

const port = 3000
let users = [
    {
        id: 1, name: 'John',
    },
    {
        id: 2, name: 'John',
    }
]

app.get('/', (req, res) => {
    res.json(users);
});

app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const user = users.find(u => u.id === id)
    if (!user) return res.status(404).send({ message: 'user not found' })
    return res.json(user);
})

// POST - Create a new user
app.post('/users', (req, res) => {
    const newUser = req.body;
    newUser.id = users.length + 1;
    users.push(newUser);
    res.status(201).json(newUser);
});

app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const updateUser = req.body
    const index = users.findIndex(u => u.id === id)
    if (index === -1) return res.status(404).send({ message: 'user not found' })
    users[index] = { ...users[index], ...updateUser };
    res.json(users[index]);
})
app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const index = users.findIndex(u => u.id === id)
    if (index === -1) return res.status(404).send({ message: 'No such user' })
    const deleteUser = users.splice(index, 1)
    return res.json(deleteUser[0])
})

// app.listen(port, () => {
//     console.log('server is listening on port', port);
// })

module.exports.handler = Serverless(app)