import { expect, test, Locator, Page } from '@playwright/test';
import { StorybookTestPOM } from '../../StoryBook.spec';

let storybookPOM: StorybookTestPOM;

const headerBodyClass = ".body-98";
const itemsClass = ".ms-FocusZone";
const headerTextClass = '.headerText'

test.beforeEach(async ({ page }) => {
  storybookPOM = new StorybookTestPOM(page);
  await storybookPOM.goto();

  const pageUrl = storybookPOM.getBaseUrl() + "?path=/story/header--header";
  await page.goto(pageUrl);
});


test.describe('Header tests', () => {
  test('should render the basic Header as per design', async ({ page }) => {
    const headerBodyElement = await storybookPOM.getElementFromPreview(headerBodyClass);
    const itemsElement = await storybookPOM.getElementFromPreview(itemsClass);

    // Check background color
    const backgroundColor = await storybookPOM.getComputedStyle(headerBodyElement, "background-color");
    await expect(backgroundColor).toBe("rgb(0, 120, 212)");

    // Check text color
    const color = await storybookPOM.getComputedStyle(headerBodyElement, "color");
    await expect(color).toBe("rgb(255, 255, 255)");

    // Check font weight
    const fontWeight = await storybookPOM.getComputedStyle(headerBodyElement, "font-weight");
    await expect(fontWeight).toBe("400");

    // Check header height
    const headerHeight = await storybookPOM.getComputedStyle(headerBodyElement, "height");
    await expect(headerHeight).toBe("40px");

    // Check items background color
    const itemsBackgroundColor = await storybookPOM.getComputedStyle(itemsElement, "background-color");
    await expect(itemsBackgroundColor).toBe("rgb(0, 120, 212)");

    // Check items text color
    const itemsColor = await storybookPOM.getComputedStyle(itemsElement, "color");
    await expect(itemsColor).toBe("rgb(255, 255, 255)");

    // Check items font weight
    const itemsFontWeight = await storybookPOM.getComputedStyle(itemsElement, "font-weight");
    await expect(itemsFontWeight).toBe("400");
  });
  test('the header should update on properties updates', async ({ page }) => {
    // Check the headerText prop
    const headerTextElement = await storybookPOM.getElementFromPreview(headerTextClass);
    await page.locator('textarea[name="headerText"]').fill("Hello");
    await expect(headerTextElement).toHaveText("Hello");

    // Check the headerLinkClickUrl prop
    await page.locator('textarea[name="headerHomePageUrl"]').fill("https://www.microsoft.com/");
    await headerTextElement.click();
    await expect(page).toHaveURL(/.*microsoft.com/);
  });

  // Accessibility voilations check
  test('to verify no accessibility violations are found', async ({ page }) => {
    // Check the Voilations tab under Accessibility
    await page.getByRole('tab', { name: 'Accessibility' }).click();
    await page.locator('button', { hasText: 'Violations' }).click();
    await expect(page.locator('.sto-142f1ph')).toHaveText('0 Violations');
  });
});