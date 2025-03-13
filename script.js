// Modell-Koeffizienten aus Python
const coefficients = [2.8529820535325916, 1.0184341923340547, 0.6128975819601035, 0.4805597547118858, 0.19380214006990176];
const intercept = -34.07558809191363;

document.getElementById('prediction-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Eingaben holen
    const hoursStudied = parseFloat(document.getElementById('hours_studied').value);
    const previousScores = parseFloat(document.getElementById('previous_scores').value);
    const extracurricular = parseFloat(document.getElementById('extracurricular').value);
    const sleepHours = parseFloat(document.getElementById('sleep_hours').value);
    const practicePapers = parseFloat(document.getElementById('practice_papers').value);

    // Vorhersage berechnen
    const prediction = intercept +
        (coefficients[0] * hoursStudied) +
        (coefficients[1] * previousScores) +
        (coefficients[2] * extracurricular) +
        (coefficients[3] * sleepHours) +
        (coefficients[4] * practicePapers);

    // Ergebnis anzeigen
    document.getElementById('result').innerText = `Predicted Performance Index: ${prediction.toFixed(2)}`;
});
