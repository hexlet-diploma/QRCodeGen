/* global chrome */

document.addEventListener('DOMContentLoaded', async () => {
  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    const mainPage = document.getElementById('main-page');
    const colorPage = document.getElementById('color-page');
    const confirmColorBtns = document.querySelectorAll('#confirm');

    const linkInput = document.getElementById('link-input');
    const linkForm = document.getElementById('link-form');
    const qrImg = document.getElementById('qr');

    const openColorPicker = document.getElementById('open-color-picker');
    const fgColorPicker = document.getElementById('fg-color-picker');
    const bgColorPicker = document.getElementById('bg-color-picker');

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
    async function generateQRCode(url, fgColor, bgColor) {
      if (!url) return;

      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?
        data=${encodeURIComponent(url)}&
        margin=10&
        color=${fgColor}&
        bgcolor=${bgColor}`;
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

    // Настройка кнопки выбора цвета QR кода
    openColorPicker.addEventListener('click', () => {
      mainPage.classList.add('hidden');
      colorPage.classList.remove('hidden');
    });

    for (const btn of confirmColorBtns) {
      btn.addEventListener('click', () => {
        colorPage.classList.add('hidden');
        mainPage.classList.remove('hidden');
      });
    }

    // Основной цвет
    fgColorPicker.addEventListener('change', (event) => {
      const selectedColor = event.target.value.replace('#', '');
      generateQRCode(
        document.getElementById('link-input').value,
        selectedColor,
        bgColorPicker.value.replace('#', '')
      );
    });

    // Цвет фона
    bgColorPicker.addEventListener('change', (event) => {
      const selectedColor = event.target.value.replace('#', '');
      generateQRCode(
        document.getElementById('link-input').value,
        fgColorPicker.value.replace('#', ''),
        selectedColor
      );
    });
  });
});
