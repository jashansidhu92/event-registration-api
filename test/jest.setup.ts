jest.mock("../config/firebaseConfig", () => ({
  db: {
    collection: jest.fn(() => ({
      add: jest.fn(),
      get: jest.fn(),
      doc: jest.fn(() => ({
        get: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      })),
    })),
  },
}));

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  jest.resetModules();
});