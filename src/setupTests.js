import '@testing-library/jest-dom/vitest'

// jsdom has no IntersectionObserver; motion's whileInView needs one.
globalThis.IntersectionObserver ??= class {
  observe() {}
  unobserve() {}
  disconnect() {}
}
