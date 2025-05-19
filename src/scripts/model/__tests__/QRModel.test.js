/* global describe, beforeEach, test, expect, jest */
import { QRModel } from '../QRModel.js';

describe('QRModel', () => {
  let qrModel;

  beforeEach(() => {
    qrModel = new QRModel();
  });

  test('should initialize with default values', () => {
    expect(qrModel).toBeDefined();
    expect(qrModel.url).toBe('');
    expect(qrModel.size).toBe(200);
    expect(qrModel.marginSize).toBe(2);
    expect(qrModel.level).toBe('L');
  });

  test('should set and get URL correctly', () => {
    const testUrl = 'https://example.com';
    qrModel.setUrl(testUrl);
    expect(qrModel.url).toBe(testUrl);
  });

  test('should set and get size correctly', () => {
    const testSize = 300;
    qrModel.setSize(testSize);
    expect(qrModel.size).toBe(testSize);
  });

  test('should set colors correctly', () => {
    const foreground = '#000000';
    const background = '#FFFFFF';
    qrModel.setColors(foreground, background);
    expect(qrModel.foregroundColor).toBe('000000');
    expect(qrModel.backgroundColor).toBe('FFFFFF');
  });

  test('should set margin size correctly', () => {
    const marginSize = 4;
    qrModel.setMargin(marginSize);
    expect(qrModel.marginSize).toBe(marginSize);
  });

  test('should set accuracy level correctly', () => {
    const level = 'H';
    qrModel.setAccuracyLevel(level);
    expect(qrModel.level).toBe(level);
  });

  test('should generate QR code URL', async () => {
    // Mock fetch
    global.fetch = jest.fn(() =>
      Promise.resolve({ url: 'https://api.qrserver.com/v1/create-qr-code/?data=https%3A%2F%2Fexample.com' })
    );
    const testUrl = 'https://example.com';
    qrModel.setUrl(testUrl);
    const qrCodeUrl = await qrModel.generateQRCode();
    expect(qrCodeUrl).toMatch(/^https:\/\/api\.qrserver\.com\/v1\/create-qr-code\/\?/);
    // Clean up
    global.fetch.mockClear();
    delete global.fetch;
  });
}); 