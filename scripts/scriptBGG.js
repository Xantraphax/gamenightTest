document.addEventListener("DOMContentLoaded", function () {
    const spielelisteDiv = document.getElementById("spieleliste");
    const username = "Rauwolfs"; // Ersetze mit deinem BGG-Nutzernamen
    const url = `https://boardgamegeek.com/xmlapi2/collection?username=${username}`;

    // Vorschau-Container hinzufügen
    const preview = document.createElement("div");
    preview.id = "preview";
    preview.style.position = "absolute";
    preview.style.display = "none";
    preview.style.border = "3px solid #05a895";
    preview.style.background = "beige";
    preview.style.padding = "10px";
    document.body.appendChild(preview);
	
    // Daten von der API abrufen
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Netzwerkproblem");
            }
            return response.text();
        })
        .then((data) => {
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
            items.forEach((item) => {
                const name = item.querySelector("name").textContent;
                const year = item.querySelector("yearpublished")?.textContent || "N/A";
                const image = item.querySelector("image")?.textContent || ""; // Bild-URL abrufen
                const link = `https://boardgamegeek.com/boardgame/${item.getAttribute("objectid")}`;

                html += `
                    <li style="position: relative;" 
                        data-image="${image}" 
                        data-link="${link}">
                        <a href="${link}" target="_blank">${name} (${year})</a>
                    </li>`;
            });
            html += "</ul>";
            spielelisteDiv.innerHTML = html;

            // Hover-Effekte hinzufügen
            const listItems = document.querySelectorAll("#spieleliste li");
            listItems.forEach((li) => {
                li.addEventListener("mouseover", (event) => {
                    const image = li.getAttribute("data-image");
                    if (image) {
                        preview.style.display = "block";
                        preview.innerHTML = `<img src="${image}" alt="Vorschau" style="max-width: 200px; max-height: 200px;">`;
                        preview.style.top = `${event.pageY + 10}px`;
                        preview.style.left = `${event.pageX + 10}px`;
                    }
                });

                li.addEventListener("mousemove", (event) => {
                    preview.style.top = `${event.pageY + 10}px`;
                    preview.style.left = `${event.pageX + 10}px`;
                });

                li.addEventListener("mouseout", () => {
                    preview.style.display = "none";
                });
            });
        })
        .catch((error) => {
            console.error("Fehler beim Abrufen der Spieleliste:", error);
            spielelisteDiv.innerHTML = "<p>Fehler beim Laden der Spieleliste.</p>";
        });
});
