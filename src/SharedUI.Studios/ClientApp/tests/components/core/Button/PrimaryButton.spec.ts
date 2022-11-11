import { expect, test, Locator, Page } from '@playwright/test';
import { StorybookTestPOM } from '../../../StoryBook.spec';

let storybookPOM: StorybookTestPOM;

const buttonClass = ".ms-Button";
const buttonLabelClass = ".ms-Button-label";

test.beforeEach(async ({ page }) => {
  storybookPOM = new StorybookTestPOM(page);
  await storybookPOM.goto();

  const pageUrl = storybookPOM.getBaseUrl() + "?path=/story/button--primary";
  await page.goto(pageUrl);
});


test.describe('Primary Button tests', () => {
  test('should render the basic primary button as per design', async ({ page }) => {
    const primaryButtonElement = await storybookPOM.getElementFromPreview(buttonClass);

    // Check background color
    const backgroundColor = await storybookPOM.getComputedStyle(primaryButtonElement, "background-color");
    await expect(backgroundColor).toBe("rgb(0, 120, 212)");

    // Check text color
    const color = await storybookPOM.getComputedStyle(primaryButtonElement, "color");
    await expect(color).toBe("rgb(255, 255, 255)");

    // Check button label
    const buttonLabelElement = await storybookPOM.getElementFromPreview(buttonLabelClass);
    const buttonLabel = await buttonLabelElement.textContent();
    await expect(buttonLabel).toBe("Primary");

    // Check font weight
    const fontWeight = await storybookPOM.getComputedStyle(buttonLabelElement, "font-weight");
    await expect(fontWeight).toBe("600");
  });

  test('the primary button should update on properties updates', async ({ page }) => {
    // Check the title prop
    await page.locator('textarea[name="title"]').fill("Hello");
    let primaryButtonElement = await storybookPOM.getElementFromPreview(buttonClass);
    const buttonTitle = await primaryButtonElement.getAttribute("title")
    expect(buttonTitle).toBe("Hello");

    // Check the text prop
    await page.locator('textarea[name="text"]').fill("World");
    let buttonLabelElement = await storybookPOM.getElementFromPreview(buttonLabelClass);
    expect(buttonLabelElement).toHaveText("World");

    // Check the disabled prop
    await page.locator('input[name="disabled"]').check();
    primaryButtonElement = await storybookPOM.getElementFromPreview(buttonClass);
    const backgroundColor = await storybookPOM.getComputedStyle(primaryButtonElement, "background-color");
    await expect(backgroundColor).toBe("rgb(243, 242, 241)");

    buttonLabelElement = await storybookPOM.getElementFromPreview(buttonLabelClass);
    const fontColor = await storybookPOM.getComputedStyle(buttonLabelElement, "color");
    await expect(fontColor).toBe("rgb(161, 159, 157)");

    const cursorStyle = await storybookPOM.getComputedStyle(buttonLabelElement, "cursor");
    await expect(cursorStyle).toBe("default");
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