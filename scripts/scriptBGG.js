document.addEventListener("DOMContentLoaded", function() {
    const spielelisteDiv = document.getElementById("spieleliste");
    const username = "Rauwolfs"; // Ersetze mit deinem BGG-Nutzernamen
    const url = `https://boardgamegeek.com/xmlapi2/collection?username=${username}`;

    // Daten von der API abrufen
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Netzwerkproblem");
            }
            return response.text();
        })
        .then(data => {
            // XML-Daten analysieren
            const parser = new DOMParser();
            const xml = parser.parseFromString(data, "application/xml");
            const items = xml.querySelectorAll("item");

            if (items.length === 0) {
                spielelisteDiv.innerHTML = "<p>Keine Spiele gefunden oder Sammlung ist privat.</p>";
                return;
            }

            // Spiele anzeigen
            let html = "<ul>";
            items.forEach(item => {
                const name = item.querySelector("name").textContent;
                const year = item.querySelector("yearpublished")?.textContent || "N/A";
                html += `<li>${name} (${year})</li>`;
            });
            html += "</ul>";

            spielelisteDiv.innerHTML = html;
        })
        .catch(error => {
            console.error("Fehler beim Abrufen der Spieleliste:", error);
            spielelisteDiv.innerHTML = "<p>Fehler beim Laden der Spieleliste.</p>";
        });
});
