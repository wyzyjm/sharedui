import { expect, test, Locator, Page } from '@playwright/test';
import { StorybookTestPOM } from '../../../StoryBook.spec';

let storybookPOM: StorybookTestPOM;

const dialogMainClass = ".ms-Dialog-main";
const wizardHeaderClass = ".ms-Dialog-title";

test.beforeEach(async ({ page }) => {
  storybookPOM = new StorybookTestPOM(page);
  await storybookPOM.goto();

  const pageUrl = storybookPOM.getBaseUrl() + "?path=/story/wizardflow--wizard-flow";
  await page.goto(pageUrl);
});


test.describe('WizardFlow tests', () => {
  test('should render wizardFlow as per design', async ({ page }) => {
  //   const dialogMainElement = await storybookPOM.getElementFromPreview(dialogMainClass);

  //   // Check background color
  //   const backgroundColor = await storybookPOM.getComputedStyle(dialogMainElement, "background-color");
  //   await expect(backgroundColor).toBe("rgb(255, 255, 255)");

  //   // Check width
  //   const width = await storybookPOM.getComputedStyle(dialogMainElement, "width");
  //   await expect(width).toBe("800px");
  });

  test('to verify no accessibility violations are found', async ({ page }) => { 
  //   // Check the Voilations tab under Accessibility
  //   await page.getByRole('tab', { name: 'Accessibility' }).click();
  //   await page.locator('button', { hasText: 'Violations' }).click();
  //   await expect(page.locator('.sto-1551xjo')).toHaveText('0 Violations');
  //   await expect(page.locator('.sto-snh8f7')).toContainText('No accessibility violations found.');
  });
});