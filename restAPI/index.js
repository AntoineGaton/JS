const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json()); // MIDDLEWARE

const emojis = [
    {_id: 1, emoji: '😄'},
    {_id: 2, emoji: '🐒'},
    {_id: 3, emoji: '🌺'},
    {_id: 4, emoji: '🥳'},
    {_id: 5, emoji: '👍'}
];

app.get('/', (request, response) => {
    response.send("Testing RestAPI...");
});

app.get('/api/', (request, response) => {
    response.send(emojis)
});

app.get('/api/:id/', (request, response) => {
    const id = request.params.id;
    const emoji = emojis.find(e => e._id === parseInt(id));

    if (!emoji) {
        response.status(404).send(`The _id of ${id} doesn't have an emoji.`);
    }
    response.send(emoji);
});

app.post('/api/emoji', (request, response) => {
    const emoji = {
        _id: emojis.length + 1,
        name : request.body.name
    };
    emojis.push(emoji);
    response.send(emojis);
});
// app.post('/test/:id', (request, response) => {
//     const {id} = request.params;
//     const {emoji} = request.body
    
//     if(!emoji) {
//         response.status(404).send({message : 'We need an emoji!'})
//     }
//     response.send({message : id,emoji})
// })

app.listen(port, () => console.log(`Listening on port...${port}`));