const axios = require('axios');
const cheerio = require('cheerio');

// URL de la page de classement à scraper
const url = 'https://www.formula1.com/en/teams/mclaren'; // Remplace par l'URL réelle

async function scrapeRanking() {
    try {
        // Récupérer le contenu HTML de la page
        const { data } = await axios.get(url);
        
        // Charger le HTML avec Cheerio
        const $ = cheerio.load(data);
        
        // Sélectionner le tableau de classement
        const res = [];

        // Itérer sur chaque ligne de classement
        $('tbody tr').each((index, element) => {
            // Récupérer les données dans chaque cellule
            const data_name = $(element).find('dl').find('dt').text().trim();
            const data_value = $(element).find('dl').find('dd').text().trim();

            // Ajouter l'équipe au tableau des résultats
            res.push({
                data_name: data_name,
                data_value: data_value
            });
        });

        console.log('Classement:', rankings);
    } catch (error) {
        console.error('Erreur lors du scraping:', error);
    }
}

// Exécuter le scraping
scrapeRanking();
