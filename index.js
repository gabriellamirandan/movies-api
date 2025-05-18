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

app.get('/api/movies', async (req, res) => {
    // TODO pegar todos os filmes pelo nome usando GET
    //pegar o banco de dados e a collection movies dentro do banco
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    //usar o find() para buscar todos os filmes
    const moviesList = await collection.find({}).toArray();

    console.log(moviesList);
    res.status(200);
    res.json(moviesList);

    //retornar o resultado
    /*if (moviesList.length) {
        res.status(200);
        res.json(moviesList);
    } else {
        res.sendStatus(404);
    };*/
})

app.get('/api/movies/name/:name', async (req, res) => {
    // TODO pegar o filme pelo nome usando GET
    //pegar o banco de dados e a collection movies dentro do banco
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    //buscar filme pelo nome usando findOne
    const resultMovie = await collection.findOne({ name: req.params.name });

    //testar o resultado
    console.log(resultMovie);

    //responder o pedido. Se null, nao achou o filme. Se achou, retorna o objeto.
    if (resultMovie) {
        //res.status(200); (nao precisa, json ja manda 200)
        res.json(resultMovie);
    } else {
        res.sendStatus(404);
    }
})

app.delete('/api/movies/name/:name', async (req, res) => {
    // TODO deletar o filme pelo nome usando DELETE
    //pegar o banco de dados e a collection movies dentro do banco
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    //deletar filme pelo nome usando deleteOne
    const deletedMovie = await collection.deleteOne({ name: req.params.name });

    //testar o resultado
    console.log(deletedMovie);

    //responder o pedido de acordo com o numero de filmes deletados. Se nao deletou, 404 para nao encontrado. Se deletou, retorna que funcionou mas nao tem resposta.
    if (deletedMovie.deletedCount) {
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
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
});

app.put('/api/movies/name/:name', async (req, res) => {
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    const result = await collection.updateOne({
        name: req.params.name
    },
    {
        $set: {
            year: req.body.year,
            directors: req.body.directors,
            cast: req.body.cast,
            country: req.body.country,
            synopsis: req.body.synopsis,
            mpaa: req.body.mpaa
        }
    });

    console.log(result);

    if (result.matchedCount === 0) {
        return res.sendStatus(404);
    }
    res.sendStatus(204);
});

app.listen(port, () => {
    console.log(`App de exemplo esta rodando na porta ${port}`)
});
//olhar metodo do mongo updateone para atualizacao. Primeiro parametro vai ser a query, segundo o que e como sera atualizado. Vamos usar o SET.
// https://pt.wikipedia.org/wiki/REST