export class QRView {
  constructor() {
    this.mainPage = document.getElementById('main-page');
    this.colorPage = document.getElementById('color-page');
    this.linkInput = document.getElementById('link-input');
    this.qrImg = document.getElementById('qr');
    this.fgColorPicker = document.getElementById('fg-color-picker');
    this.bgColorPicker = document.getElementById('bg-color-picker');
    this.copyBtn = document.querySelector('.copy-btn');
  }

  updateQRCode(url) {
    this.qrImg.src = url;
  }

  setCurrentUrl(url) {
    this.linkInput.value = url;
  }

  showColorPage() {
    this.mainPage.classList.add('hidden');
    this.colorPage.classList.remove('hidden');
  }

  showMainPage() {
    this.colorPage.classList.add('hidden');
    this.mainPage.classList.remove('hidden');
  }

  updateCopyButton(text) {
    this.copyBtn.textContent = text;
  }

  getColors() {
    return {
      foreground: this.fgColorPicker.value,
      background: this.bgColorPicker.value,
    };
  }

  getCurrentUrl() {
    return this.linkInput.value;
  }
}
