/* global chrome */

document.addEventListener('DOMContentLoaded', async () => {
  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    const linkInput = document.getElementById('link-input');
    const form = document.getElementById('link-form');
    let sentUrl;

    // Отправка написанной ссылки
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      sentUrl = event.target.link.url;
    });
    // Получаем ссылку текущей страницы
    if (tabs.length === 0) return;
    const currentUrl = tabs[0].url;
    linkInput.value = currentUrl;

    // Генерируем QR-код
    const qrImg = document.getElementById('qr');
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${
      sentUrl || currentUrl
    }`;
    try {
      const res = await fetch(qrUrl);
      qrImg.src = res.url;
    } catch (error) {
      console.error('Ошибка при запросе к API:', error);
    }
  });
});
