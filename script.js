// Инициализация Telegram WebApp
let tg = window.Telegram.WebApp;
tg.expand(); 
tg.setHeaderColor('#0f1713');

// ================= ОТПРАВКА КОМАНД В БОТА =================
function sendCommandToBot(command, data = null) {
    let payload = { command: command };
    if (data) {
        payload = { ...payload, ...data };
    }
    tg.sendData(JSON.stringify(payload));
    tg.close(); // Закрываем WebApp, чтобы вернуться в чат
}

// ================= ПЕРЕКЛЮЧЕНИЕ ВКЛАДОК =================
function showTab(tabName) {
    document.querySelectorAll('[id^="tab-"]').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    
    document.getElementById('tab-' + tabName).classList.remove('hidden');
    document.getElementById('nav-' + tabName).classList.add('active');
    
    if (tg.HapticFeedback) tg.HapticFeedback.impactOccurred('light');
}

// ================= ОТРИСОВКА ДАННЫХ =================
document.addEventListener("DOMContentLoaded", () => {
    let data = window.userData;

    // 1. Статус подписки
    if (data.isActive) {
        document.getElementById('sub-days').innerText = data.daysLeft + " дня";
        document.getElementById('sub-date').innerText = "до " + data.dateEnd;
        document.getElementById('sub-status').innerText = "Активна";
    } else {
        document.getElementById('sub-days').innerText = "0 дней";
        document.getElementById('sub-date').innerText = "Нет подписки";
        document.getElementById('sub-status').innerText = "Не активна";
        document.getElementById('sub-status').classList.add('inactive');
    }

    // 2. Прогресс-бар трафика
    let percent = Math.round((data.trafficUsed / data.trafficLimit) * 100);
    document.getElementById('traffic-percent').innerText = percent + "%";
    document.getElementById('traffic-text').innerText = data.trafficUsed + " МБ / " + data.trafficLimit + " ГБ";
    document.getElementById('traffic-bar').style.width = percent + "%";
    
    // 3. Рефералы и купон
    document.getElementById('ref-count').innerText = data.refCount;
    if (data.hasCoupon) {
        document.getElementById('coupon-card').style.display = 'block';
    }
});

// ================= ФУНКЦИИ КНОПОК =================
function applyPromo() {
    let code = document.getElementById('promo-input').value;
    if (code) sendCommandToBot('promo', { code: code });
}

function sendSupport() {
    let text = document.getElementById('support-text').value;
    if (text) sendCommandToBot('support', { text: text });
}

function copyLink() {
    const input = document.getElementById('ref-link');
    input.select();
    document.execCommand("copy");
    if (tg.HapticFeedback) tg.HapticFeedback.notificationOccurred('success');
}