const express = require('express');
const UserModel = require('../src/models/user.model');

const app = express()
app.use(express.json())

app.set('view engine', 'ejs')
app.set('views', 'src/views')

app.use((req, res, next) => {
    console.log("req type: ", req.method);
    console.log("content type: ", req.headers["content-type"]);
    next()
})

app.get('/views/users', async (req, res) => {
    const users = await UserModel.find({})

    res.render('index', { users })
})

app.get('/users', async (req, res) => {
    try {
        const users = await UserModel.find({})
        res.status(200).json(users)
    } catch (err) {
        return res.status(500).send(err.message)
    }

})

app.get('/users/:id', async (req, res) => {
    try {
        const id = req.params.id
        const user = await UserModel.findById(id)

        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).send(error.message)
    }
})

app.post('/users', async (req, res) => {
    try {
        const user = await UserModel.create(req.body)

        res.status(201).json(user)
    } catch (err) {
        res.status(500).send(err.message)
    }
})

app.patch('/users/:id', async (req, res) => {
    try {
        const id = req.params.id
        const user = await UserModel.findByIdAndUpdate(id, req.body, { new: true })

        res.status(200).json(user)
    } catch (err) {
        res.status(500).send(err.message)
    }
})

app.delete('/users/:id', async (req, res) => {
    try {
        const id = req.params.id
        const user = await UserModel.findByIdAndRemove(id)

        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).send(error.message)
    }
})

app.listen(8080, () => {
    console.log('rodando com express no 8080');
})