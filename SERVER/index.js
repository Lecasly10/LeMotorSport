const express = require('express');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const port = 3000;

// Servir les fichiers statiques (HTML, CSS, JS) depuis le répertoire public
app.use(express.static(path.join(__dirname, '../public')));

// Route pour récupérer le classement des pilotes
app.get('/driver-ranking', async (req, res) => {
    try {
        const url = 'https://www.formula1.com/en/results/2024/drivers'; // Remplace par l'URL réelle
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const rankings = [];

        $('tbody tr').each((index, element) => {
            const position = $(element).find('td').eq(0).find('p').text().trim();
            const driverName = $(element).find('td').eq(1).find('p').text().trim();
            const teamName = $(element).find('td').eq(2).find('p').text().trim();
            const points = $(element).find('td').eq(3).find('p').text().trim();
            const country = $(element).find('td').eq(4).find('p').text().trim();

            rankings.push({
                position: parseInt(position),
                driverName: driverName,
                teamName: teamName,
                points: parseInt(points),
                country: country
            });
        });

        res.json(rankings);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors du scraping des pilotes' });
    }
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur lancé sur http://localhost:${port}`);
});
