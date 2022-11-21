import { expect, test, Locator, Page } from '@playwright/test';
import { StorybookTestPOM } from '../../StoryBook.spec';

let storybookPOM: StorybookTestPOM;

const headerBodyClass = ".body-98";
const itemsClass = ".ms-FocusZone";

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
    await page.locator('textarea[name="headerText"]').fill("Hello");
    const headerTextElement = await storybookPOM.getByRole('link', { name: 'Hello' });
    expect(headerTextElement).toHaveText("Hello");

    // Check the headerLinkClickUrl prop
    const hClass = ".sto-crh05v"
    await page.locator('textarea[name="headerLinkClickUrl"]').fill("https://www.google.com/");
    (await storybookPOM.getByRole('link', { name: 'Hello' })).click();
    await expect(page).toHaveURL('https://www.google.com/');
  });

  // Accessibility tests
  test('to verify no accessibility checks are incomplete or needs review', async ({ page }) => {
    // Check the Incomplete tab under Accessibility
    await page.getByRole('tab', { name: 'Accessibility' }).click();
    await page.locator('button', { hasText: 'Incomplete' }).click();
    await expect(page.locator('.sto-1551xjo')).toHaveText('0 Incomplete');
    await expect(page.locator('.sto-snh8f7')).toContainText('No accessibility checks incomplete.');
  });

  test('to verify no accessibility violations are found', async ({ page }) => {
    // Check the Voilations tab under Accessibility
    await page.getByRole('tab', { name: 'Accessibility' }).click();
    await page.locator('button', { hasText: 'Violations' }).click();
    await expect(page.locator('.sto-1551xjo')).toHaveText('0 Violations');
    await expect(page.locator('.sto-snh8f7')).toContainText('No accessibility violations found.');
  });
});