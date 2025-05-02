export class QRModel {
  constructor() {
    this.url = '';
    this.foregroundColor = '';
    this.backgroundColor = '';
    this.qrCodeUrl = '';
    this.size = 200;
    this.marginSize = 2;
    this.level = 'L';
  }

  async generateQRCode() {
    if (!this.url) return null;

    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
      this.url
    )}&qzone=${this.marginSize}${this.foregroundColor ? `&color=${this.foregroundColor}` : ''}${
      this.backgroundColor ? `&bgcolor=${this.backgroundColor}` : ''
    }&size=${this.size}x${this.size}&ecc=${this.level}`;

    try {
      const response = await fetch(qrUrl);
      this.qrCodeUrl = response.url;
      return this.qrCodeUrl;
    } catch (error) {
      console.error('Ошибка при запросе к API:', error);
      return null;
    }
  }

  setUrl(url) {
    this.url = url;
  }

  setColors(foreground, background) {
    this.foregroundColor = foreground.replace('#', '');
    this.backgroundColor = background.replace('#', '');
  }

  setSize(size) {
    this.size = size;
  }

  setMargin(marginSize) {
    this.marginSize= marginSize;
  }

  setAccuracyLevel(level) {
    this.level= level;
  }

  getQRCodeUrl() {
    return this.qrCodeUrl;
  }
}
