import "@testing-library/jest-dom";

// Node 26 exposes an unavailable global localStorage, which shadows jsdom's
// implementation. Provide an in-memory Storage so both `localStorage` and
// `window.localStorage` behave the same in tests.
if (typeof window !== "undefined" && !window.localStorage) {
  const store = new Map<string, string>();
  const storage: Storage = {
    get length() {
      return store.size;
    },
    clear: () => store.clear(),
    getItem: (key) => store.get(key) ?? null,
    key: (index) => Array.from(store.keys())[index] ?? null,
    removeItem: (key) => void store.delete(key),
    setItem: (key, value) => void store.set(key, String(value)),
  };
  Object.defineProperty(window, "localStorage", { configurable: true, value: storage });
  Object.defineProperty(globalThis, "localStorage", { configurable: true, value: storage });
}

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// jsdom lacks these APIs used by Radix
type ElementWithRadixHelpers = Element & {
  hasPointerCapture?: (pointerId: number) => boolean;
  scrollIntoView?: (arg?: boolean | ScrollIntoViewOptions) => void;
};

const elementPrototype = Element.prototype as ElementWithRadixHelpers;
if (!elementPrototype.hasPointerCapture) {
  elementPrototype.hasPointerCapture = () => false;
}
if (!elementPrototype.scrollIntoView) {
  elementPrototype.scrollIntoView = () => {};
}

if (typeof window !== "undefined" && !("IntersectionObserver" in window)) {
  class MockIntersectionObserver implements IntersectionObserver {
    readonly root: Element | Document | null = null;
    readonly rootMargin: string = "";
    readonly thresholds: ReadonlyArray<number> = [];
    disconnect(): void {}
    observe(): void {}
    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
    unobserve(): void {}
  }
  Object.defineProperty(window, "IntersectionObserver", {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
  });
  Object.defineProperty(globalThis, "IntersectionObserver", {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
  });
}