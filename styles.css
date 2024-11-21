document.addEventListener('DOMContentLoaded', () => {

    const pingInput = document.getElementById('pingInput');
    const generateBtn = document.getElementById('generateBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const showPredBtn = document.getElementById('showPredBtn');
    const predDisplay = document.getElementById('predDisplay');
    const presetBtns = document.querySelectorAll('.preset-btn');
    const usersCount = document.getElementById('usersCount');
    const configsCount = document.getElementById('configsCount');

    let currentUsers = 0;
    let currentConfigs = 0;
    const targetUsers = Math.floor(Math.random() * (1000 - 500) + 500);
    const targetConfigs = Math.floor(Math.random() * (5000 - 2000) + 2000);

    function animateStats() {
        if (currentUsers < targetUsers) {
            currentUsers += Math.ceil(targetUsers / 100);
            usersCount.textContent = Math.min(currentUsers, targetUsers).toLocaleString();
        }
        if (currentConfigs < targetConfigs) {
            currentConfigs += Math.ceil(targetConfigs / 100);
            configsCount.textContent = Math.min(currentConfigs, targetConfigs).toLocaleString();
        }
        if (currentUsers < targetUsers || currentConfigs < targetConfigs) {
            requestAnimationFrame(animateStats);
        }
    }

    setTimeout(animateStats, 1000);

    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.querySelector('.notifications').appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    pingInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/[^0-9]/g, '');
        if (value > 999) value = '999';
        e.target.value = value;
    });

    function calculatePrediction(ping) {
        ping = parseInt(ping);
        let prediction;
        
        if (ping <= 20) prediction = 0.11525;
        else if (ping <= 40) prediction = 0.12575;
        else if (ping <= 60) prediction = 0.13625;
        else if (ping <= 80) prediction = 0.14675;
        else if (ping <= 100) prediction = 0.15725;
        else if (ping <= 120) prediction = 0.16775;
        else if (ping <= 140) prediction = 0.17825;
        else if (ping <= 160) prediction = 0.18875;
        else if (ping <= 180) prediction = 0.19925;
        else if (ping <= 200) prediction = 0.20975;
        else prediction = 0.21 + ((ping - 200) * 0.0002);

        return prediction.toFixed(5);
    }

    function generateRandomString(length = 8) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        return Array.from({length}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    }

    function generateConfig(ping) {
        const prediction = calculatePrediction(ping);
        return `-- Matrix Hub Configuration
-- Generated for ping: ${ping}ms
-- Timestamp: ${new Date().toLocaleString()}

getgenv().Prediction = ${prediction}
getgenv().AimPart = "HumanoidRootPart"
getgenv().Key = "Q"
getgenv().DisableKey = "P"

getgenv().FOV = 100
getgenv().ShowFOV = false
getgenv().FOVColor = Color3.fromRGB(47, 234, 255)

getgenv().SmoothLock = true
getgenv().Smoothness = 0.5

getgenv().PredictionVelocity = 7.33

getgenv().Notifications = true
getgenv().AirCheck = true
getgenv().WallCheck = false
getgenv().AutoPrediction = false

-- End of configuration`;
    }

    generateBtn.addEventListener('click', () => {
        const ping = pingInput.value;
        if (!ping) {
            showNotification('Please enter your ping first!', 'error');
            return;
        }
        if (ping < 0 || ping > 999) {
            showNotification('Ping must be between 0 and 999!', 'error');
            return;
        }
        showNotification('Configuration generated successfully!', 'success');
        predDisplay.style.display = 'none';
    });

    downloadBtn.addEventListener('click', () => {
        const ping = pingInput.value;
        if (!ping) {
            showNotification('Please generate a configuration first!', 'error');
            return;
        }

        const config = generateConfig(ping);
        const blob = new Blob([config], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `matrix_${ping}ms_${generateRandomString()}.txt`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        showNotification('Configuration downloaded successfully!', 'success');
    });

    showPredBtn.addEventListener('click', () => {
        const ping = pingInput.value;
        if (!ping) {
            showNotification('Please enter your ping first!', 'error');
            return;
        }
        const prediction = calculatePrediction(ping);
        predDisplay.textContent = `Prediction: ${prediction}`;
        predDisplay.style.display = 'block';
    });

    presetBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const preset = btn.parentElement;
            const ping = preset.dataset.ping;
            pingInput.value = ping;
            generateBtn.click();
            showNotification(`Preset applied: ${preset.querySelector('h3').textContent}`, 'success');
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    const title = document.querySelector('.title');
    title.addEventListener('mouseover', () => {
        title.style.animation = 'glitch 0.3s infinite';
    });
    title.addEventListener('mouseout', () => {
        title.style.animation = 'none';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
});
