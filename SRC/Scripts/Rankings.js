document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'http://localhost:3000/driver-ranking';  // URL de l'API

    // Récupérer les données de l'API
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des données');
            }
            return response.json();
        })
        .then(data => {
            console.log('Données récupérées:', data);  // Vérifier les données récupérées

            const tableBody = document.querySelector('#ranking-table tbody');
            tableBody.innerHTML = ''; // Vider le tableau avant de le remplir

            // Ajouter les données au tableau
            data.forEach(driver => {
                const row = document.createElement('tr');

                const positionCell = document.createElement('td');
                positionCell.textContent = driver.position;

                const driverNameCell = document.createElement('td');
                driverNameCell.textContent = driver.driverName;

                const teamNameCell = document.createElement('td');
                teamNameCell.textContent = driver.teamName;

                const pointsCell = document.createElement('td');
                pointsCell.textContent = driver.points;

                const countryCell = document.createElement('td');
                countryCell.textContent = driver.country;

                // Ajouter les cellules à la ligne
                row.appendChild(positionCell);
                row.appendChild(driverNameCell);
                row.appendChild(teamNameCell);
                row.appendChild(pointsCell);
                row.appendChild(countryCell);

                // Ajouter la ligne au tableau
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données:', error);
            const errorMessage = document.getElementById('error-message');
            errorMessage.textContent = error.message;
        });
});
