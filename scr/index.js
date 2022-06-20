const express = require('express');
const app = express();
const port = 3000;
const MongoClient = require('mongodb').MongoClient
var url ='mongodb://localhost:27017/mejorescanciones'

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/', (req, res) => {
    var data = req.body;
    console.log(data)
    res.send(data)
})

let db;
let collection;

app.get('/canciones', (req, res) => {
    collection.find().toArray()
        .then(results => {
            res.json(results);
        }).catch(error => console.error(error));
})

app.get('/buscar', (req, res) => {
        collection.find({"Year":1969}).toArray()
        .then(results => {
            res.json(results);
        }).catch(error => console.error(error));
})

app.post('/canciones', (req, res) => {
    var data = req.body;
    collection.insertOne({
        data
    })
    res.send(); 
})


app.put('/canciones/:id', (req, res) => {
    collection.findOneAndUpdate(
        { _id: req.params.id },
        {
            $set: {
                Nombre: req.body.Nombre,
                Cantante: req.body.Cantante
            }
        },
        {
            upsert: true
        }
    ).then(result => { res.json('Updated') })
        .catch(error => console.error(error))
});

app.delete('/canciones/:id', (req, res) => {
    collection.deleteOne(
        { _id: req.params.id }
    )
        .then(result => {
            res.json('Deleted')
        }) 
        .catch(error => console.error(error))
})


MongoClient.connect(url, (err, client) => {
    if (err) return console.error(err)
    console.log('Connected to Database')
    db = client.db('mejorescanciones')
    collection= db.collection('primeras100')
})

app.listen(3000, function () {
    console.log('listening on '+port)
});