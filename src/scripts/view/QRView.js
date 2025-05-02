export class QRView {
  constructor() {
    this.mainPage = document.getElementById('main-page');
    this.colorPage = document.getElementById('color-page');
    this.sizePage = document.getElementById('size-page');
    this.moreSettingsPage = document.getElementById('more-settings-page');
    this.linkInput = document.getElementById('link-input');
    this.qrImg = document.getElementById('qr');
    this.fgColorPicker = document.getElementById('fg-color-picker');
    this.bgColorPicker = document.getElementById('bg-color-picker');
    this.copyBtn = document.querySelector('.copy-btn');
    this.dloadBtn = document.querySelector('.dload-btn');
    this.qrGenBtn = document.querySelector('.qr-gen-btn');
    this.sizeInput = document.getElementById('set-size');
    this.sizeValue = document.getElementById('size-value');
    this.marginInput = document.getElementById('set-margin');
    this.marginValueLabel = document.getElementById('margin-value-label');
    this.accuracyLevel = document.getElementById('accuracy-level-select');
  }

  updateQRCode(url) {
    this.qrImg.src = url;
  }

  setCurrentUrl(url) {
    this.linkInput.value = url;
  }

  showMainPage() {
    this.colorPage.classList.add('hidden');
    this.sizePage.classList.add('hidden');
    this.moreSettingsPage.classList.add('hidden');

    this.mainPage.classList.remove('hidden');
  }

  showColorPage() {
    this.mainPage.classList.add('hidden');
    this.colorPage.classList.remove('hidden');
  }

  showSizePage() {
    this.mainPage.classList.add('hidden');
    this.sizePage.classList.remove('hidden');
  }

  showMoreSettingsPage() {
    this.mainPage.classList.add('hidden');
    this.moreSettingsPage.classList.remove('hidden');
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

  getMarginSize() {
    return parseInt(this.marginInput.value);
  }

  getAccuracyLevel() {
    return this.accuracyLevel.value;
  }

  updateSizeValue(value) {
    this.sizeValue.textContent = value;
  }

  updateMarginValue(value) {
    this.marginValueLabel.textContent = value;
  }

  setSizeInput(value) {
    this.sizeInput.value = value;
  }

  setMarginInput(value) {
    this.marginInput.value = value;
  }

  updateAccuracyLevelValue(value) {
    this.accuracyLevel.value = value;
  }

  getCurrentUrl() {
    return this.linkInput.value;
  }
}
