const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

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

    pool.query("INSERT INTO task (description) VALUES ($1) returning *",
     [req.body.description], (error, result) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({error: error.message});
        } else {
            console.log('Query result:', result);
            res.status(201).json({id : result.rows[0].id});
        }
    });
});

app.delete('/delete/:id', async(req, res) => {
    const pool = openDb();
    const id =parseInt(req.params.id);
    pool.query('DELETE FROM task WHERE id = $1',
     [id], 
     (error, result) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({error: error.message});
        } else {
            console.log('Query result:', result);
            res.status(200).json({id : id});
        }
    });
});



app.listen(port);