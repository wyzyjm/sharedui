import { expect, test, Locator, Page } from '@playwright/test';
import { StorybookTestPOM } from '../../../StoryBook.spec';

let storybookPOM: StorybookTestPOM;

const circularLoadingSpinnerClass = ".ms-Spinner-circle";

test.beforeEach(async ({ page }) => {
  storybookPOM = new StorybookTestPOM(page);
  await storybookPOM.goto();

  const pageUrl = storybookPOM.getBaseUrl() + "?path=/story/spinners--circular-loading-page-wide";
  await page.goto(pageUrl);
});


test.describe('Circular loading spinner page wide tests', () => {
  test('should render the basic spinner with circular loading page wide as per design', async ({ page }) => {
    const circularLoadingSpinnerElement = await storybookPOM.getElementFromPreview(circularLoadingSpinnerClass);

    // Check border style
    const borderStyle = await storybookPOM.getComputedStyle(circularLoadingSpinnerElement, "border-style");
    await expect(borderStyle).toBe("solid");

    // Check border top color
    const borderTopColor = await storybookPOM.getComputedStyle(circularLoadingSpinnerElement, "border-top-color");
    await expect(borderTopColor).toBe("rgb(0, 120, 212)");

    // Check border bottom color
    const borderBottomColor = await storybookPOM.getComputedStyle(circularLoadingSpinnerElement, "border-bottom-color");
    await expect(borderBottomColor).toBe("rgb(199, 224, 244)");

    // Check spinner width
    const spinnerWidth = await storybookPOM.getComputedStyle(circularLoadingSpinnerElement, "width");
    await expect(spinnerWidth).toBe("28px");

    // Check spinner height
    const spinnerHeight = await storybookPOM.getComputedStyle(circularLoadingSpinnerElement, "height");
    await expect(spinnerHeight).toBe("28px");

    // Check pagewide background color
    const locator = page.frameLocator('#storybook-preview-iframe').locator('#root div >> nth=1');
    await expect(locator).toHaveCSS("background-color", "rgb(255, 255, 255)");
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