// Эмуляция данных (в будущем бот будет передавать их реальные)
const userData = {
    isActive: true,
    dateEnd: "8 ноября 2026 г.",
    daysLeft: 4,
    trafficUsed: 0,
    trafficLimit: 15,
    refCount: 0,
    hasCoupon: false
};

// Отправка команды в бота (Telegram WebApp)
function sendCommandToBot(command, data = null) {
    let tg = window.Telegram.WebApp;
    // Отправляем данные боту
    if (data) {
        tg.sendData(JSON.stringify({ command: command, ...data }));
    } else {
        tg.sendData(JSON.stringify({ command: command }));
    }
    // Закрываем Mini App, чтобы пользователь вернулся в чат
    tg.close();
}