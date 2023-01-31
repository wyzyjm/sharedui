import { expect, test, Locator, Page } from '@playwright/test';
import { StorybookTestPOM } from '../../../StoryBook.spec';

let storybookPOM: StorybookTestPOM;

const dialogMainClass = ".ms-Dialog-main";
const wizardTitleClass = ".ms-Dialog-title";

test.beforeEach(async ({ page }) => {
  storybookPOM = new StorybookTestPOM(page);
  await storybookPOM.goto();

  const pageUrl = storybookPOM.getBaseUrl() + "?path=/story/wizard--wizard";
  await page.goto(pageUrl);
});


test.describe('WizardFlow tests', () => {
  test('should render wizardFlow as per design', async ({ page }) => {
    const dialogMainElement = await storybookPOM.getElementFromPreview(dialogMainClass);
    const wizardTitleElement = await storybookPOM.getElementFromPreview(wizardTitleClass);

    // Check background color
    const backgroundColor = await storybookPOM.getComputedStyle(dialogMainElement, "background-color");
    await expect(backgroundColor).toBe("rgb(255, 255, 255)");

    // Check text color
    const color = await storybookPOM.getComputedStyle(dialogMainElement, "color");
    await expect(color).toBe("rgb(50, 49, 48)");

    // Check font weight
    const fontSize = await storybookPOM.getComputedStyle(dialogMainElement, "font-size");
    await expect(fontSize).toBe("14px");

    // Check font weight
    const fontWeight = await storybookPOM.getComputedStyle(dialogMainElement, "font-weight");
    await expect(fontWeight).toBe("400");

    // Check width
    const width = await storybookPOM.getComputedStyle(dialogMainElement, "width");
    await expect(width).toBe("800px");

    // Check height
    const height = await storybookPOM.getComputedStyle(dialogMainElement, "height");
    await expect(height).toBe("350px");

    // Check title background color
    const titleBackgroundColor = await storybookPOM.getComputedStyle(wizardTitleElement, "background-color");
    await expect(titleBackgroundColor).toBe("rgba(0, 0, 0, 0)");

    // Check text color
    const titleColor = await storybookPOM.getComputedStyle(wizardTitleElement, "color");
    await expect(titleColor).toBe("rgb(50, 49, 48)");

    // Check font weight
    const titleFontSize = await storybookPOM.getComputedStyle(wizardTitleElement, "font-size");
    await expect(titleFontSize).toBe("20px");

    // Check font weight
    const titleFontWeight = await storybookPOM.getComputedStyle(wizardTitleElement, "font-weight");
    await expect(titleFontWeight).toBe("600");

    // Check width
    const titleWidth = await storybookPOM.getComputedStyle(wizardTitleElement, "width");
    await expect(titleWidth).toBe("768px");

    // Check height
    const titleHeight = await storybookPOM.getComputedStyle(wizardTitleElement, "height");
    await expect(titleHeight).toBe("27px");
  });

  test('the wizard flow should update on properties updates', async ({ page }) => {
    // Check the height prop
    await page.locator('textarea[name="height"]').fill("10px");
    const dialogMainElement = await storybookPOM.getElementFromPreview(dialogMainClass);
    const height = await storybookPOM.getComputedStyle(dialogMainElement, "height");
    await expect(height).toBe("268px");

    // Check the dialog hidden
    await page.locator('input[name="hidden"]').click();
    await expect(await page.locator(dialogMainClass).count()).toEqual(0);
  });

  test('to verify no accessibility violations are found', async ({ page }) => {
    // Check the Voilations tab under Accessibility
    await page.getByRole('tab', { name: 'Accessibility' }).click();
    await page.locator('button', { hasText: 'Violations' }).click();
    await expect(page.locator('.sto-142f1ph')).toHaveText('0 Violations');
  });
});