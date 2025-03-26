const express = require('express');
const { MongoClient } = require('mongodb');

const port = 3000;
const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'movies';

const app = express();
const client = new MongoClient(mongoUrl);

const connectDb = async () => {
    await client.connect();
    console.log("Database connected")
}

const disconnectDb = async () => {
    await client.close();
    console.log("Database disconnected")
}

connectDb();

//Define a pasta publica
app.use(express.static("public"));

app.get('/api/movies', (req, res) => {
    const movies = [{
        _id: '123456',
        name: 'Ainda Estou Aqui',
        year: 2024,
        directors: ['Walter Salles'],
        cast: ['Fernanda Torres', 'Fernanda Montenegro', 'Selton Mello'],
        country: 'Brazil',
        synopsis: 'lorem ipsum',
        mpaa: 'PG-13'
    },
    {
        _id: '123456',
        name: 'Ainda Estou Aqui',
        year: 2024,
        directors: ['Walter Salles'],
        cast: ['Fernanda Torres', 'Fernanda Montenegro', 'Selton Mello'],
        country: 'Brazil',
        synopsis: 'lorem ipsum',
        mpaa: 'PG-13'
    }];
    res.json(movies);
})

app.get('/api/movies/:name', (req, res) => {
    const movie = {
        _id: '123456',
        name: 'Ainda Estou Aqui',
        year: 2024,
        directors: ['Walter Salles'],
        cast: ['Fernanda Torres', 'Fernanda Montenegro', 'Selton Mello'],
        country: 'Brazil',
        synopsis: 'lorem ipsum',
        mpaa: 'PG-13'
    };
    res.json(movie);
})

app.post('/api/movies', (req, res) => {
    res.sendStatus(201);
})

app.listen(port, () => {
    console.log(`App de exemplo esta rodando na porta ${port}`)
})

// https://pt.wikipedia.org/wiki/REST