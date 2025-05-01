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

    // Color picker page navigation
    document
      .getElementById('open-color-picker')
      .addEventListener('click', () => {
        this.view.showColorPage();
      });

    // Size setting page navigation
    document
      .getElementById('open-size-set-page')
      .addEventListener('click', () => {
        this.view.showSizePage();
      });

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
    if (size < minSize) {
      size = minSize;
      this.view.updateSizeValue(size);
      this.view.updateSizeInput(size);
    } else if (size > maxSize) {
      size = maxSize;
      this.view.updateSizeValue(size);
      this.view.updateSizeInput(size);
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
}
