const express = require('express');
const { chats } = require('./data/data');
const app = express();
const cors = require('cors')
require('dotenv').config();

app.use(express.json());
app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    }
))

app.get('/', (req, res) => {
    res.send('API is Running.');
})

app.get('/api/chat', (req, res) => {
    res.send(chats);
})

app.get('/api/chat/:id', (req, res) => {
    // console.log(req.params.id);
    // console.log(req);
    
    // find a single chat
    const singleChat = chats.find((c) => c._id === req.params.id);
    res.send(singleChat);
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Sever started on PORT : ${PORT}`)
}) 