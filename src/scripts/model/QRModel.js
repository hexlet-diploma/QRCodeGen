export class QRModel {
  constructor() {
    this.url = '';
    this.foregroundColor = '';
    this.backgroundColor = '';
    this.qrCodeUrl = '';
  }

  async generateQRCode() {
    if (!this.url) return null;

    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
      this.url
    )}&margin=10${
      this.foregroundColor ? `&color=${this.foregroundColor}` : ''
    }${this.backgroundColor ? `&bgcolor=${this.backgroundColor}` : ''}`;

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

  getQRCodeUrl() {
    return this.qrCodeUrl;
  }
}
