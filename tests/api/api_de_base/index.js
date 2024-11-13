const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // Pour traiter les requêtes JSON

// Définir une route simple pour tester l'API
app.get('/', (req, res) => {
    res.send('Bienvenue sur mon API !');
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur lancé sur http://localhost:${port}`);
});

const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
];

app.get('/users', (req, res) => {
    res.json(users);
});
