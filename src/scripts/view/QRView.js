export class QRView {
  constructor() {
    this.mainPage = document.getElementById('main-page');
    this.colorPage = document.getElementById('color-page');
    this.sizePage = document.getElementById('size-page');
    this.linkInput = document.getElementById('link-input');
    this.qrImg = document.getElementById('qr');
    this.fgColorPicker = document.getElementById('fg-color-picker');
    this.bgColorPicker = document.getElementById('bg-color-picker');
    this.copyBtn = document.querySelector('.copy-btn');
    this.dloadBtn = document.querySelector('.dload-btn');
    this.qrGenBtn = document.querySelector('.qr-gen-btn');
    this.sizeInput = document.getElementById('set-size');
    this.sizeValue = document.getElementById('size-value');
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

  showSizePage() {
    this.mainPage.classList.add('hidden');
    this.sizePage.classList.remove('hidden');
  }

  showMainPage() {
    this.colorPage.classList.add('hidden');
    this.sizePage.classList.add('hidden');

    this.mainPage.classList.remove('hidden');
  }

  updateCopyButton(text) {
    this.copyBtn.textContent = text;
  }

  updateDloadButton(text) {
    this.dloadBtn.textContent = text;
  }

  updateQrGenButton(text) {
    this.qrGenBtn.textContent = text;
  }

  getColors() {
    return {
      foreground: this.fgColorPicker.value,
      background: this.bgColorPicker.value,
    };
  }

  getSize() {
    return parseInt(this.sizeInput.value);
  }

  updateSizeValue(value) {
    this.sizeValue.textContent = value;
  }

  setSizeInput(value) {
    this.sizeInput.textContent = value;
  }

  getCurrentUrl() {
    return this.linkInput.value;
  }
}
