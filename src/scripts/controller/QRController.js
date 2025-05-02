import { QRModel } from '../model/QRModel.js';
import { QRView } from '../view/QRView.js';

export class QRController {
  constructor() {
    this.model = new QRModel();
    this.view = new QRView();
    this.initializeEventListeners();
  }

  initializeEventListeners() {
    // Get current tab URL
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      if (tabs.length > 0 && tabs[0].url.startsWith('http')) {
        const currentUrl = tabs[0].url;
        this.view.setCurrentUrl(currentUrl);
        this.model.setUrl(currentUrl);
        const qrCodeUrl = await this.model.generateQRCode();
        if (qrCodeUrl) {
          this.view.updateQRCode(qrCodeUrl);
        }
      }
    });

    // Link input submission
    document
      .getElementById('link-form')
      .addEventListener('submit', async (event) => {
        event.preventDefault();
        const url = this.view.getCurrentUrl();
        this.model.setUrl(url);
        const colors = this.view.getColors();
        this.model.setColors(colors.foreground, colors.background);
        const qrCodeUrl = await this.model.generateQRCode();
        this.view.updateQrGenButton('Ok!');
        setTimeout(() => this.view.updateQrGenButton('Generate QR'), 500);
        if (qrCodeUrl) {
          this.view.updateQRCode(qrCodeUrl);
        }
      });

    // Color pickers
    this.view.fgColorPicker.addEventListener('change', () =>
      this.handleColorChange()
    );
    this.view.bgColorPicker.addEventListener('change', () =>
      this.handleColorChange()
    );

    // Size input
    document.getElementById('set-size').addEventListener('input', (event) => {
      const size = parseInt(event.target.value);
      this.view.updateSizeValue(size);
      this.handleSizeChange();
    });

    // Margin input
    document.getElementById('set-margin').addEventListener('input', () => {
      this.handleMarginChange();
    });

    // Accuracy level select
    document.getElementById('accuracy-level-select').addEventListener('change', () => {
      this.handleAccuracyLevelChange();
    });

    // Download button
    document.querySelector('.dload-btn').addEventListener('click', (event) => {
      event.preventDefault();
      const qrCodeUrl = this.model.getQRCodeUrl();
      if (qrCodeUrl && qrCodeUrl.includes('api.qrserver.com')) {
        chrome.downloads.download({
          saveAs: true,
          url: qrCodeUrl,
          filename: 'qrcode.png',
        });
      }
      this.view.updateDloadButton('Ok!');
      setTimeout(() => this.view.updateDloadButton('Download'), 500);
    });

    // Copy button
    document
      .querySelector('.copy-btn')
      .addEventListener('click', async (event) => {
        event.preventDefault();
        const qrCodeUrl = this.model.getQRCodeUrl();
        if (qrCodeUrl && qrCodeUrl.includes('api.qrserver.com')) {
          try {
            const response = await fetch(qrCodeUrl);
            const blob = await response.blob();
            await navigator.clipboard.write([
              new ClipboardItem({ 'image/png': blob }),
            ]);
            this.view.updateCopyButton('Ok!');
            setTimeout(() => this.view.updateCopyButton('Copy'), 500);
          } catch (err) {
            console.error('Ошибка при копировании изображения:', err);
          }
        }
      });

    // Size setting page navigation
    document
      .getElementById('open-size-set-page')
      .addEventListener('click', () => {
        this.view.showSizePage();
      });

    // Color picker page navigation
    document
      .getElementById('open-color-picker')
      .addEventListener('click', () => {
        this.view.showColorPage();
      });

    // More settings page navigation
    document
      .getElementById('open-more-settings-page')
      .addEventListener('click', () => {
        this.view.showMoreSettingsPage();
      });

    // Show main page
    document.querySelectorAll('#confirm').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.view.showMainPage();
      });
    });
  }

  async handleColorChange() {
    const url = this.view.getCurrentUrl();
    this.model.setUrl(url);
    const colors = this.view.getColors();
    this.model.setColors(colors.foreground, colors.background);
    const qrCodeUrl = await this.model.generateQRCode();
    if (qrCodeUrl) {
      this.view.updateQRCode(qrCodeUrl);
    }
  }

  async handleSizeChange() {
    const url = this.view.getCurrentUrl();
    this.model.setUrl(url);
    let size = this.view.getSize();

    const minSize = 10;
    const maxSize = 1000;

    // Size validation
    if (size < 0) {
      size = minSize;
      this.view.updateSizeValue(size);
      this.view.setSizeInput(size);
    } else if (size < minSize) {
      size = minSize;
      this.view.updateSizeValue(size);
    } else if (size > maxSize) {
      size = maxSize;
      this.view.updateSizeValue(size);
      this.view.setSizeInput(size);
    } else if (isNaN(size)) {
      size = 200;
      this.view.updateSizeValue(size);
    }

    this.model.setSize(size);
    const qrCodeUrl = await this.model.generateQRCode();
    if (qrCodeUrl) {
      this.view.updateQRCode(qrCodeUrl);
    }
  }

  async handleMarginChange() {
    const url = this.view.getCurrentUrl();
    this.model.setUrl(url);
    let margin = this.view.getMarginSize();

    const minValue = 0;
    const maxValue = 50;

    // Margin value validation
    if (margin < minValue) {
      margin = minValue;
      this.view.setMarginInput(margin);
    } else if (margin > maxValue) {
      margin = maxValue;
      this.view.setMarginInput(margin);
    } else if (isNaN(margin)) {
      margin = 10;
    }

    this.model.setMargin(margin);
    const qrCodeUrl = await this.model.generateQRCode();
    if (qrCodeUrl) {
      this.view.updateQRCode(qrCodeUrl);
    }
  }

  async handleAccuracyLevelChange() {
    const url = this.view.getCurrentUrl();
    this.model.setUrl(url);
    const level = this.view.getAccuracyLevel();
    this.model.setAccuracyLevel(level);
    const qrCodeUrl = await this.model.generateQRCode();
    if (qrCodeUrl) {
      this.view.updateQRCode(qrCodeUrl);
    }
  }
}
