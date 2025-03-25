/* global chrome */
import { generateQRCode } from './qrGenerator.js';

document.addEventListener('DOMContentLoaded', async () => {
  // Элементы страницы
  const mainPage = document.getElementById('main-page');
  const colorPage = document.getElementById('color-page');
  const confirmColorBtns = document.querySelectorAll('#confirm');
  const linkInput = document.getElementById('link-input');
  const linkForm = document.getElementById('link-form');
  const qrImg = document.getElementById('qr');
  const openColorPicker = document.getElementById('open-color-picker');
  const fgColorPicker = document.getElementById('fg-color-picker');
  const bgColorPicker = document.getElementById('bg-color-picker');
  const downloadBtn = document.querySelector('.dload-btn');
  const copyBtn = document.querySelector('.copy-btn');

  // Получение URL активной вкладки
  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    if (tabs.length > 0 && tabs[0].url.startsWith('http')) {
      const currentUrl = tabs[0].url;
      linkInput.value = currentUrl;
      const qrCodeUrl = await generateQRCode(currentUrl);
      if (qrCodeUrl) {
        qrImg.src = qrCodeUrl;
      }
    }
  });

  // Обработка формы ввода ссылки
  linkForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const url = linkInput.value;
    const qrCodeUrl = await generateQRCode(
      url,
      fgColorPicker.value.replace('#', ''),
      bgColorPicker.value.replace('#', '')
    );
    if (qrCodeUrl) qrImg.src = qrCodeUrl;
  });

  // Обновление QR кода при изменении цвета
  const updateQRCode = async () => {
    const url = linkInput.value;
    const fgColor = fgColorPicker.value.replace('#', '');
    const bgColor = bgColorPicker.value.replace('#', '');
    const qrCodeUrl = await generateQRCode(url, fgColor, bgColor);
    if (qrCodeUrl) qrImg.src = qrCodeUrl;
  };

  fgColorPicker.addEventListener('change', updateQRCode);
  bgColorPicker.addEventListener('change', updateQRCode);

  // Обработка кнопки DOWNLOAD
  downloadBtn.addEventListener('click', (event) => {
    event.preventDefault();
    if (qrImg.src.includes('api.qrserver.com')) {
      chrome.downloads.download({
        url: qrImg.src,
        filename: 'qrcode.png',
      });
    }
  });

  // Обработка кнопки COPY
  copyBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    if (qrImg.src.includes('api.qrserver.com')) {
      try {
        const response = await fetch(qrImg.src);
        const blob = await response.blob();
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob }),
        ]);
        copyBtn.textContent = 'Ok!';
        setTimeout(() => (copyBtn.textContent = 'Copy'), 500);
      } catch (err) {
        console.error('Ошибка при копировании изображения:', err);
      }
    }
  });

  // Переключение на страницу выбора цвета
  openColorPicker.addEventListener('click', () => {
    mainPage.classList.add('hidden');
    colorPage.classList.remove('hidden');
  });

  // Возврат с выбора цвета на основную страницу
  confirmColorBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      colorPage.classList.add('hidden');
      mainPage.classList.remove('hidden');
    });
  });
});
