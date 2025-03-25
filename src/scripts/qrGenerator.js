/**
 * Функция генерации URL QR кода.
 * @param {string} url - Ссылка, из которой формируется QR код.
 * @param {string} [fgColor=''] - Основной цвет QR кода (без символа #).
 * @param {string} [bgColor=''] - Цвет фона QR кода (без символа #).
 * @returns {Promise<string|null>} URL QR кода или null в случае ошибки.
 */
export const generateQRCode = async (url, fgColor = '', bgColor = '') => {
  if (!url) return null;

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
    url
  )}&margin=10${fgColor ? `&color=${fgColor}` : ''}${
    bgColor ? `&bgcolor=${bgColor}` : ''
  }`;

  try {
    const response = await fetch(qrUrl);
    return response.url;
  } catch (error) {
    console.error('Ошибка при запросе к API:', error);
    return null;
  }
};
