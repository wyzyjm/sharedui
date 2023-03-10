import { expect, test, Locator, Page } from '@playwright/test';
import { StorybookTestPOM } from '../../../StoryBook.spec';

let storybookPOM: StorybookTestPOM;

const bannerClass = '.gdTdqJ';
const bannerTitleClass = ".fazzSX";

test.beforeEach(async ({ page }) => {
  storybookPOM = new StorybookTestPOM(page);
  await storybookPOM.goto();

  const pageUrl = storybookPOM.getBaseUrl() + "?path=/story/banner--guiding-banner";
  await page.goto(pageUrl);
});


test.describe('Guiding Banner tests', () => {
  test('should render the Guiding Banner as per design', async ({ page }) => {
    const bannerElement = await storybookPOM.getElementFromPreview(bannerClass);
    const bannerTitleElement = await storybookPOM.getElementFromPreview(bannerTitleClass);


    // Check background color
    const backgroundColor = await storybookPOM.getComputedStyle(bannerElement, "background-color");
    await expect(backgroundColor).toBe("rgb(243, 242, 241)");

    // Check border-radius
    const borderRadius = await storybookPOM.getComputedStyle(bannerElement, "border-radius");
    await expect(borderRadius).toBe("8px");

    // Check font-size
    const fontSize = await storybookPOM.getComputedStyle(bannerTitleElement, "font-size");
    await expect(fontSize).toBe("16px");

    // Check font-weight
    const fontWeight = await storybookPOM.getComputedStyle(bannerTitleElement, "font-weight");
    await expect(fontWeight).toBe("600");
  });

  // Accessibility voilations check
  test('to verify no accessibility violations are found', async ({ page }) => {
    // Check the Voilations tab under Accessibility
    await page.getByRole('tab', { name: 'Accessibility' }).click();
    await page.locator('button', { hasText: 'Violations' }).click();
    await expect(page.locator('.sto-142f1ph')).toHaveText('0 Violations');
  });
});