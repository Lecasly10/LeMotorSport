const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

// URL de la page de classement des pilotes à scraper
const url = 'https://www.formula1.com/en/results/2024/drivers'; // Remplace par l'URL réelle
const app = express();
const port = 3000;

app.get('/driver-ranking', async (req, res) => {
    try {
        // Récupérer le contenu HTML de la page
        const { data } = await axios.get(url);
        
        // Charger le HTML avec Cheerio
        const $ = cheerio.load(data);
        
        // Sélectionner le tableau de classement des pilotes
        const rankings = [];

        // Itérer sur chaque ligne de classement des pilotes
        $('tbody tr').each((index, element) => {
            // Récupérer les données dans chaque cellule <td>
            const position = $(element).find('td').eq(0).find('p').text().trim();
            const driverName = $(element).find('td').eq(1).find('p').text().trim();
            const country = $(element).find('td').eq(2).find('p').text().trim();
            const teamName = $(element).find('td').eq(3).find('p').text().trim();
            const points = $(element).find('td').eq(4).find('p').text().trim();

            // Ajouter les informations dans le tableau des résultats
            rankings.push({
                position: parseInt(position),
                driverName: driverName,
                country: country,
                teamName: teamName,
                points: parseInt(points),
            });
        });

        res.json(rankings);
    } catch (error) {
        console.error('Erreur lors du scraping:', error);
    }
});

app.listen(port, () => {
    console.log(`Serveur lancé sur http://localhost:${port}`);
});
