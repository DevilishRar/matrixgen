document.addEventListener('DOMContentLoaded', () => {
    const pingInput = document.getElementById('pingInput');
    const generateBtn = document.getElementById('generateBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const showPredBtn = document.getElementById('showPredBtn');
    const predDisplay = document.getElementById('predDisplay');

    let currentConfig = null;

    function generateRandomString(length) {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    function getPredictionValues(ping) {
        const predictions = {
            20: { x: 6.2, y: 7.4 },
            30: { x: 6.0, y: 7.2 },
            40: { x: 7.61, y: 9.8 },
            50: { x: 7.48, y: 9.31 },
            60: { x: 4.97, y: 4.81 },
            70: { x: 7.34, y: 8.345 },
            80: { x: 6.87, y: 7.91 },
            90: { x: 6.52, y: 7.54 },
            100: { x: 6.11, y: 7.29 },
            110: { x: 5.63, y: 6.24 },
            120: { x: 5.39, y: 6.13 },
            130: { x: 5.21, y: 5.94 },
            140: { x: 4.91, y: 5.76 },
            150: { x: 4.87, y: 5.68 },
            170: { x: 4.84, y: 4.67 },
            180: { x: 4.71, y: 4.52 },
            190: { x: 4.59, y: 4.38 },
            200: { x: 4.82, y: 4.21 }
        };

        if (predictions.hasOwnProperty(ping)) {
            return predictions[ping];
        }

        return null;
    }

    pingInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
        if (parseInt(e.target.value) > 999) {
            e.target.value = '999';
        }
    });

    generateBtn.addEventListener('click', () => {
        const ping = parseInt(pingInput.value);
        if (!ping) {
            alert('Please enter a valid ping value');
            return;
        }

        const predValues = getPredictionValues(ping);
        if (!predValues) {
            alert('Ping entered hasn\'t been added yet.');
            return;
        }

        currentConfig = {
            ping: ping,
            prediction_x: predValues.x,
            prediction_y: predValues.y
        };

        const randomStr = generateRandomString(8);
        const configContent = `[Matrix Hub]
Prediction_X=${predValues.x}
Prediction_Y=${predValues.y}
Ping=${ping}`;

        const blob = new Blob([configContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `matrix-${randomStr}.cfg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    showPredBtn.addEventListener('click', () => {
        if (!currentConfig) {
            alert('Please download a configuration first');
            return;
        }

        predDisplay.style.display = predDisplay.style.display === 'none' ? 'block' : 'none';
        if (predDisplay.style.display === 'block') {
            predDisplay.innerHTML = `
                <h3>Prediction Values</h3>
                <p>X: ${currentConfig.prediction_x}</p>
                <p>Y: ${currentConfig.prediction_y}</p>
            `;
        }
    });
});
