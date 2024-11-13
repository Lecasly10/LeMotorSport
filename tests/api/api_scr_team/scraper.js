const axios = require('axios');
const cheerio = require('cheerio');

// URL de la page de classement à scraper
const url = 'https://www.formula1.com/en/results/2024/team'; // Remplace par l'URL réelle

async function scrapeRanking() {
    try {
        // Récupérer le contenu HTML de la page
        const { data } = await axios.get(url);
        
        // Charger le HTML avec Cheerio
        const $ = cheerio.load(data);
        
        // Sélectionner le tableau de classement
        const rankings = [];

        // Itérer sur chaque ligne de classement
        $('tbody tr').each((index, element) => {
            // Récupérer les données dans chaque cellule
            const position = $(element).find('td').eq(0).find('p').text().trim();
            const teamName = $(element).find('td').eq(1).find('p').text().trim();
            const points = $(element).find('td').eq(2).find('p').text().trim();

            // Ajouter l'équipe au tableau des résultats
            rankings.push({
                position: parseInt(position),
                teamName: teamName,
                points: parseInt(points)
            });
        });

        console.log('Classement:', rankings);
    } catch (error) {
        console.error('Erreur lors du scraping:', error);
    }
}

// Exécuter le scraping
scrapeRanking();
