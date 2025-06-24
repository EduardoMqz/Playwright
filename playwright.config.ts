import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config = ({
  testDir: './tests',//folder where the test are located
  timeout: 40*1000, //for element on screen
  expect: {
    timeout: 40*1000 //for assert
  },
  reporter: 'html',
  use: {
    browserName: 'chromium',
    headless: false
  },
});
module.exports = config
