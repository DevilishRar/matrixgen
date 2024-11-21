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
            '10': { prediction_x: 7.5382, prediction_y: 7.4032 },
            '20': { prediction_x: 7.5382, prediction_y: 7.4032 },
            '25': { prediction_x: 7.27, prediction_y: 7.1875 },
            '30': { prediction_x: 7.27, prediction_y: 7.1875 },
            '40': { prediction_x: 6.9124, prediction_y: 6.8999 },
            '50': { prediction_x: 5.331999778747559, prediction_y: 6.824999809265137 },
            '60': { prediction_x: 5.331999778747559, prediction_y: 6.824999809265137 },
            '70': { prediction_x: 6.12, prediction_y: 7.9975 },
            '80': { prediction_x: 6.12, prediction_y: 7.9975 },
            '90': { prediction_x: 6.12, prediction_y: 7.9975 },
            '100': { prediction_x: 6.12, prediction_y: 7.9975 },
            '110': { prediction_x: 6.12, prediction_y: 7.9975 },
            '120': { prediction_x: 5.88, prediction_y: 7.75249999 },
            '130': { prediction_x: 5.88, prediction_y: 7.75249999 },
            '135': { prediction_x: 5.88, prediction_y: 7.75249999 },
            '140': { prediction_x: 4.5600000000000005, prediction_y: 6.5600000000000005 },
            '145': { prediction_x: 4.5600000000000005, prediction_y: 6.5600000000000005 },
            '150': { prediction_x: 4.5600000000000005, prediction_y: 6.5600000000000005 },
            '155': { prediction_x: 4.5600000000000005, prediction_y: 6.5600000000000005 },
            '160': { prediction_x: 4.5600000000000005, prediction_y: 6.5600000000000005 },
            '165': { prediction_x: 4.5600000000000005, prediction_y: 6.5600000000000005 },
            '170': { prediction_x: 4.08, prediction_y: 6.08 },
            '175': { prediction_x: 4.08, prediction_y: 6.08 },
            '180': { prediction_x: 4.08, prediction_y: 6.08 },
            '185': { prediction_x: 4.08, prediction_y: 6.08 },
            '190': { prediction_x: 4.08, prediction_y: 6.08 },
            '200': { prediction_x: 4.141, prediction_y: 4.670999999999999 }
        };
        return predictions[ping.toString()] || null;
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
            prediction_x: predValues.prediction_x,
            prediction_y: predValues.prediction_y
        };

        const randomStr = generateRandomString(8);
        const configContent = `[Matrix Hub]
Prediction_X=${predValues.prediction_x}
Prediction_Y=${predValues.prediction_y}
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
            alert('Please generate a configuration first');
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
