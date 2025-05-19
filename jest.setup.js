// Mock DOM elements and browser APIs
global.HTMLElement = class HTMLElement {};
global.document = {
  createElement: () => ({}),
  getElementById: () => ({}),
  querySelector: () => ({}),
};
global.window = {
  location: {},
  history: {
    pushState: () => {},
  },
}; 