const express = require('express');
const { MongoClient } = require('mongodb');

const port = 3000;
const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'projeto-movies';
const collectionName = 'movies';

const app = express();
const client = new MongoClient(mongoUrl);

//Function to connect with database
const connectDb = async () => {
    await client.connect();
    console.log("Database connected")
}

//Function to disconnect with database
const disconnectDb = async () => {
    await client.close();
    console.log("Database disconnected")
}

//Calling function to connect with database. Remember to start Docker.
connectDb();

//Defines public folder
app.use(express.static("public"));
//Middleware que converte o body da requisicao em objeto js e para disponibiliza-lo na req.body
app.use(express.json());

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

app.post('/api/movies', async (req, res) => {
    //dados no req.body
    const name = req.body.name;
    const year = req.body.year;
    const mpaa = req.body.mpaa;
    //validar nome, ano, mpaa
    if (
        name === "" ||
        year < 1888 ||
        mpaa === ""
    ) {
        // se nao tiver, retornar 400 (bad request)
        res.sendStatus(400);
    } else {
        //pegar o banco de dados e a collection movies dentro do banco
        const database = client.db(dbName);
        const collection = database.collection(collectionName);

        //inserir no banco usando insertOne
        const insertedMovie = await collection.insertOne({
            name,
            year,
            directors: req.body.directors,
            cast: req.body.cast,
            country: req.body.country,
            synopsis: req.body.synopsis,
            mpaa
        });
        //testar o resultado. O resultado retorna o insertedId que vamos usar para informar o filme adicionado.
        console.log('Inserted documents =>', insertedMovie);
        return res.sendStatus(201);
    }
})

app.listen(port, () => {
    console.log(`App de exemplo esta rodando na porta ${port}`)
})

// https://pt.wikipedia.org/wiki/REST