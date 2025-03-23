const express = require('express')
const app = express()
const port = 3000

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
    res.json(movies)
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
    res.json(movie)
})

app.post('/api/movies', (req, res) => {
    res.sendStatus(201);
})

app.listen(port, () => {
    console.log(`App de exemplo esta rodando na porta ${port}`)
})

// https://pt.wikipedia.org/wiki/REST