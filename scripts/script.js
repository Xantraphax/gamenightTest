// Basisdatum: Starttermin (z. B. 2. Januar 2025)
const startDate = new Date('2025-01-21');

// Funktion zum Berechnen des nächsten Termins
function getNextEventDate() {
    const today = new Date();
    const twoWeeksInMs = 14 * 24 * 60 * 60 * 1000; // 14 Tage in Millisekunden

    // Suche das nächste Datum basierend auf dem Startdatum
    let nextDate = new Date(startDate);
    while (nextDate < today) {
        nextDate = new Date(nextDate.getTime() + twoWeeksInMs);
    }
    return nextDate;
}

// Funktion, um das Datum auf der Webseite anzuzeigen
function displayNextEventDate() {
    const nextDate = getNextEventDate();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('current-date').textContent = nextDate.toLocaleDateString('de-DE', options);
}

// Initialisiere die Anzeige
displayNextEventDate();
