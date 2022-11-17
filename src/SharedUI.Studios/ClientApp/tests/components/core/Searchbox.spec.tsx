import { expect, test, Locator, Page } from '@playwright/test';
import { StorybookTestPOM } from '../../StoryBook.spec';

let storybookPOM: StorybookTestPOM;

const searchBoxClass = ".ms-SearchBox";
const searchBoxFieldClass = ".ms-SearchBox-field";
const clearButtonClass = ".ms-Button";

test.beforeEach(async ({ page }) => {
  storybookPOM = new StorybookTestPOM(page);
  await storybookPOM.goto();

  const pageUrl = storybookPOM.getBaseUrl() + "?path=/story/searchbox--search-box";
  await page.goto(pageUrl);
});


test.describe('Searchbox tests', () => {
  test('should render the basic searchbox as per design', async ({ page }) => {
    const searchBoxElement = await storybookPOM.getElementFromPreview(searchBoxClass);

    // Check background color
    const backgroundColor = await storybookPOM.getComputedStyle(searchBoxElement, "background-color");
    await expect(backgroundColor).toBe("rgb(255, 255, 255)");

    // Check searchbox width
    const searchBoxWidth = await storybookPOM.getComputedStyle(searchBoxElement, "width");
    await expect(searchBoxWidth).toBe("200px");

    // Check searchbox height
    const searchBoxHeight = await storybookPOM.getComputedStyle(searchBoxElement, "height");
    await expect(searchBoxHeight).toBe("32px");
  });

  test('the searchbox should update on properties updates', async ({ page }) => {
    // Check the placeholder prop
    await page.locator('textarea[name="placeholder"]').fill("Hello");
    let searchBoxFieldElement = await storybookPOM.getElementFromPreview(searchBoxFieldClass);
    const searchBoxPlaceholder = await searchBoxFieldElement.getAttribute("placeholder")
    expect(searchBoxPlaceholder).toBe("Hello");

    // Check the clear button
    const searchBoxInputElement = await storybookPOM.getElementFromPreview(searchBoxFieldClass);
    await searchBoxInputElement.fill('World');
    const clearButton = await storybookPOM.getElementFromPreview(clearButtonClass);
    await clearButton.click();
    const searchBoxValue = await searchBoxInputElement.getAttribute("value");
    expect(searchBoxValue).toBe("");
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