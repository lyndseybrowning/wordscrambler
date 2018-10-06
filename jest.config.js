module.exports = {
  testURL: 'http://localhost',
  testEnvironment: 'jsdom',
  setupTestFrameworkScriptFile: '<rootDir>/config/enzyme.js',
  snapshotSerializers: ['enzyme-to-json/serializer'],
};
