import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});

// Automatically cleanup after each test
afterEach(() => {
  cleanup();
});
