import { expect, test, Locator, Page } from '@playwright/test';
import { StorybookTestPOM } from '../../../StoryBook.spec';

let storybookPOM: StorybookTestPOM;

const bannerClass = ".ms-MessageBar";
const bannerContentClass = ".studio-banner-left";

test.beforeEach(async ({ page }) => {
  storybookPOM = new StorybookTestPOM(page);
  await storybookPOM.goto();

  const pageUrl = storybookPOM.getBaseUrl() + "?path=/story/banner--rating-banner";
  await page.goto(pageUrl);
});


test.describe('Rating Banner tests', () => {
  test('should render the rating Banner as per design', async ({ page }) => {
    const bannerElement = await storybookPOM.getElementFromPreview(bannerClass);
    const bannerContentElement = await storybookPOM.getElementFromPreview(bannerContentClass);

    // Check background color
    const backgroundColor = await storybookPOM.getComputedStyle(bannerElement, "background-color");
    await expect(backgroundColor).toBe("rgb(243, 242, 241)");

    // Check font-size
    const fontSize = await storybookPOM.getComputedStyle(bannerContentElement, "font-size");
    await expect(fontSize).toBe("12px");

    // Check text color
    const color = await storybookPOM.getComputedStyle(bannerElement, "color");
    await expect(color).toBe("rgb(50, 49, 48)");

  });

  test('the rating banner should update on properties updates', async ({ page }) => {
    const radioBtnLabel = await (await storybookPOM.getElementFromPreview('.rating-number-label')).filter({ 
      hasText: '10'
    });

    await radioBtnLabel.click();
    await (await storybookPOM.getByRole('button', { name: 'Submit' })).click();

    // Check panel width
    const panelClass = ".ms-Panel-main";
    const panelElement = await storybookPOM.getElementFromPreview(panelClass);
    const panelWidth = await storybookPOM.getComputedStyle(panelElement, "width");
    await expect(panelWidth).toBe("380px");
  });

  // Accessibility voilations check
  test('to verify no accessibility violations are found', async ({ page }) => {
    // Check the Voilations tab under Accessibility
    await page.getByRole('tab', { name: 'Accessibility' }).click();
    await page.locator('button', { hasText: 'Violations' }).click();
    await expect(page.locator('.sto-142f1ph')).toHaveText('0 Violations');
  });
});