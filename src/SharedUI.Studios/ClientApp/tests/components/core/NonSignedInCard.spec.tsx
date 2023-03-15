import { test, expect } from '@playwright/test';
import { StorybookTestPOM } from '../../StoryBook.spec';

let storybookPOM: StorybookTestPOM;

test.beforeEach(async ({ page }) => {
    storybookPOM = new StorybookTestPOM(page);
    await storybookPOM.goto();

    const pageUrl = storybookPOM.getBaseUrl() + "?path=/story/nonsignedincard--non-signed-in-cards";
    await page.goto(pageUrl);
});

test.describe("NonSignedInCard compoment", () => {
    test('should render the basic NonSignedInCard as per design', async () => {
        const headerElement = await storybookPOM.getElementFromPreview('.ms-TeachingBubble-headline');

        const headerFontWeight = await storybookPOM.getComputedStyle(headerElement, "font-weight");
        expect(headerFontWeight).toBe("600")

        const headerColor = await storybookPOM.getComputedStyle(headerElement, "Color");
        expect(headerColor).toBe("rgb(255, 255, 255)")
    })

    test('the NonSignedInCard should update on properties updates', async ({ page }) => {
        // Check the headerText prop
        const headerTextElement = await storybookPOM.getElementFromPreview('.ms-TeachingBubble-headline');
        await page.locator('textarea[name="title"]').fill("Hello");
        await expect(headerTextElement).toHaveText("Hello");
    });


    // Accessibility voilations check
    test('to verify no accessibility violations are found', async ({ page }) => {
        // Check the Voilations tab under Accessibility
        await page.getByRole('tab', { name: 'Accessibility' }).click();
        await page.locator('button', { hasText: 'Violations' }).click();
        await expect(page.locator('.sto-142f1ph')).toHaveText('0 Violations');
    });
});
