// Modell-Koeffizienten aus Python
const coefficients = [2.8529820535325916, 1.0184341923340547, 0.6128975819601035, 0.4805597547118858, 0.19380214006990176];
const intercept = -34.07558809191363;

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('prediction-form');
    const resultContainer = document.getElementById('result-container');
    const resultElement = document.getElementById('result');
    const performanceMessage = document.getElementById('performance-message');
    
    // Form Submission Handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Input-Werte abrufen und validieren
        const hoursStudied = parseFloat(document.getElementById('hours_studied').value);
        const previousScores = parseFloat(document.getElementById('previous_scores').value);
        const extracurricular = parseFloat(document.getElementById('extracurricular').value);
        const sleepHours = parseFloat(document.getElementById('sleep_hours').value);
        const practicePapers = parseFloat(document.getElementById('practice_papers').value);
        
        // Input-Validierung
        if (isNaN(hoursStudied) || isNaN(previousScores) || isNaN(extracurricular) || 
            isNaN(sleepHours) || isNaN(practicePapers)) {
            alert('Bitte füllen Sie alle Felder korrekt aus.');
            return;
        }
        
        // Berechne die Vorhersage
        const prediction = calculatePrediction(
            hoursStudied, previousScores, extracurricular, sleepHours, practicePapers
        );
        
        // Runde das Ergebnis auf 2 Dezimalstellen
        const roundedPrediction = Math.max(0, Math.min(100, prediction)).toFixed(2);
        
        // Zeige das Ergebnis an
        resultElement.textContent = roundedPrediction;
        
        // Bestimme die Leistungsbewertung und Nachricht
        const performanceLevel = getPerformanceLevel(prediction);
        performanceMessage.innerHTML = `<div class="performance-level ${performanceLevel.class}">${performanceLevel.message}</div>`;
        
        // Zeige den Ergebniscontainer mit Animation
        resultContainer.classList.add('active');
        
        // Scroll zum Ergebnis
        setTimeout(() => {
            resultContainer.scrollIntoView({ behavior: 'smooth' });
        }, 300);
    });
    
    // Funktion zur Berechnung der Vorhersage
    function calculatePrediction(hours, scores, extra, sleep, papers) {
        return intercept +
            (coefficients[0] * hours) +
            (coefficients[1] * scores) +
            (coefficients[2] * extra) +
            (coefficients[3] * sleep) +
            (coefficients[4] * papers);
    }
    
    // Funktion zur Bestimmung der Leistungsstufe basierend auf der Vorhersage
    function getPerformanceLevel(prediction) {
        if (prediction >= 90) {
            return {
                message: 'Ausgezeichnete Leistung erwartet!',
                class: 'excellent'
            };
        } else if (prediction >= 80) {
            return {
                message: 'Sehr gute Leistung erwartet!',
                class: 'very-good'
            };
        } else if (prediction >= 70) {
            return {
                message: 'Gute Leistung erwartet!',
                class: 'good'
            };
        } else if (prediction >= 60) {
            return {
                message: 'Befriedigende Leistung erwartet.',
                class: 'satisfactory'
            };
        } else if (prediction >= 50) {
            return {
                message: 'Ausreichende Leistung erwartet.',
                class: 'sufficient'
            };
        } else {
            return {
                message: 'Verbesserungspotenzial vorhanden.',
                class: 'improvement'
            };
        }
    }
    
    // Füge Event-Listener für Input-Validierung hinzu
    const numberInputs = document.querySelectorAll('input[type="number"]');
    numberInputs.forEach(input => {
        input.addEventListener('input', function() {
            validateInput(this);
        });
    });
    
    // Input-Validierung für numerische Felder
    function validateInput(input) {
        const value = parseFloat(input.value);
        const min = parseFloat(input.getAttribute('min')) || 0;
        const max = parseFloat(input.getAttribute('max')) || Infinity;
        
        if (isNaN(value)) {
            input.setCustomValidity('Bitte geben Sie eine gültige Zahl ein.');
        } else if (value < min) {
            input.setCustomValidity(`Der Wert muss mindestens ${min} sein.`);
        } else if (value > max) {
            input.setCustomValidity(`Der Wert darf maximal ${max} sein.`);
        } else {
            input.setCustomValidity('');
        }
    }
    
    // Füge Styling für die Leistungsbewertungen hinzu
    const style = document.createElement('style');
    style.textContent = `
        .performance-level {
            padding: 8px 16px;
            border-radius: 20px;
            display: inline-block;
            font-weight: 500;
            margin-top: 10px;
        }
        .excellent {
            background-color: #4ade80;
            color: #064e3b;
        }
        .very-good {
            background-color: #34d399;
            color: #065f46;
        }
        .good {
            background-color: #10b981;
            color: #065f46;
        }
        .satisfactory {
            background-color: #fbbf24;
            color: #78350f;
        }
        .sufficient {
            background-color: #f59e0b;
            color: #78350f;
        }
        .improvement {
            background-color: #f87171;
            color: #7f1d1d;
        }
    `;
    document.head.appendChild(style);
});