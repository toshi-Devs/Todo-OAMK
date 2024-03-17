const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const port = 3001;


const openDb = () => {
    const pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'todo',
        password: '12301230456',
        port: 5432,

    });
    return pool;
}

app.get('/', (req, res) => {
    const pool = openDb();

    pool.query('SELECT * FROM task', (error, result) => {
        if (error) {
            res.status(500).send({error: error.message});
        }
        res.status(200).send(result.rows);
    });
});

app.post('/new', (req, res) => {
    const pool = openDb();

    pool.query("INSERT INTO task (description) VALUES ($1)",
     [req.body.description], (error, result) => {
        if(error) {
            res.status(500).json({error: error.message});
        } else {
            res.status(201).json({id : result.rows[0].id});
        }
    });
});


app.listen(port);