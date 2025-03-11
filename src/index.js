/* global chrome */

document.addEventListener('DOMContentLoaded', async () => {
  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    const linkInput = document.getElementById('link-input');
    const linkForm = document.getElementById('link-form');
    const qrImg = document.getElementById('qr');

    // Записываем в input ссылку текущей вкладки
    if (tabs.length > 0 && tabs[0].url.startsWith('http')) {
      const currentUrl = tabs[0].url;
      linkInput.value = currentUrl;

      // Генерируем QR код из ссылки вкладки
      generateQRCode(currentUrl);
    }

    // Записываем введенную пользователем ссылку
    linkForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const inputUrl = linkInput.value;
      generateQRCode(inputUrl);
    });

    // Функция генерации QR кода
    async function generateQRCode(url) {
      if (!url) return;

      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
        url
      )}&margin=10`;
      try {
        const res = await fetch(qrUrl);
        qrImg.src = res.url;
      } catch (error) {
        console.error('Ошибка при запросе к API:', error);
      }
    }

    // Настройка кнопки DOWNLOAD
    const downloadBtn = document.querySelector('.dload-btn');
    downloadBtn.addEventListener('click', (event) => {
      event.preventDefault();
      if (qrImg.src.includes('api.qrserver.com')) {
        chrome.downloads.download({
          url: qrImg.src,
          filename: 'qrcode.png',
        });
      }
    });

    // Настройка кнопки COPY
    const copyBtn = document.querySelector('.copy-btn');
    copyBtn.addEventListener('click', async (event) => {
      event.preventDefault();
      if (qrImg.src.includes('api.qrserver.com')) {
        try {
          const response = await fetch(qrImg.src);
          const blob = await response.blob();

          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob }),
          ]);

          // Показываем уведомление об успешном копировании
          copyBtn.textContent = 'Ok!';
          setTimeout(() => (copyBtn.textContent = 'Copy'), 500);
        } catch (err) {
          console.error('Ошибка при копировании изображения:', err);
        }
      }
    });
  });
});
