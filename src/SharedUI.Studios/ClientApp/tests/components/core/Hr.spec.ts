import { expect, test, Locator, Page } from '@playwright/test';
import { StorybookTestPOM } from '../../StoryBook.spec';

let storybookPOM: StorybookTestPOM;

const hrClass = ".sc-bcXHqe";

test.beforeEach(async ({ page }) => {
  storybookPOM = new StorybookTestPOM(page);
  await storybookPOM.goto();

  const pageUrl = storybookPOM.getBaseUrl() + "?path=/story/hr--hr";
  await page.goto(pageUrl);
});


test.describe('Horizontal rule tests', () => {
  test('should render the basic horizontal rule as per design', async ({ page }) => {
    const hrElement = await storybookPOM.getElementFromPreview(hrClass);

    // Check height
    const height = await storybookPOM.getComputedStyle(hrElement, "height");
    await expect(height).toBe("1px");

    // Check background color
    const backgroundColor = await storybookPOM.getComputedStyle(hrElement, "background-color");
    await expect(backgroundColor).toBe("rgb(0, 0, 0)");

    // Check margin top
    const marginTop = await storybookPOM.getComputedStyle(hrElement, "margin-top");
    await expect(marginTop).toBe("10px");

    // Check margin bottom
    const marginBottom = await storybookPOM.getComputedStyle(hrElement, "margin-bottom");
    await expect(marginBottom).toBe("10px");

    // Check opacity
    const opacity = await storybookPOM.getComputedStyle(hrElement, "opacity");
    await expect(opacity).toBe("0.3");
  });

  // Accessibility voilations check
  test('to verify no accessibility violations are found', async ({ page }) => {
    // Check the Voilations tab under Accessibility
    await page.getByRole('tab', { name: 'Accessibility' }).click();
    await page.locator('button', { hasText: 'Violations' }).click();
    await expect(page.locator('.sto-1551xjo')).toHaveText('0 Violations');
    await expect(page.locator('.sto-snh8f7')).toContainText('No accessibility violations found.');
  });
});