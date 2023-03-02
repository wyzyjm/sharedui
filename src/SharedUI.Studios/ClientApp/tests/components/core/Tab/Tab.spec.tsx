import { test, expect } from '@playwright/test';
import { StorybookTestPOM } from '../../../StoryBook.spec';

test.beforeEach(async ({ page }) => {
    storybookPOM = new StorybookTestPOM(page);
    await storybookPOM.goto();

    const pageUrl = storybookPOM.getBaseUrl() + "?path=/story/tab--setting-tab";
    await page.goto(pageUrl);
});
let storybookPOM: StorybookTestPOM;
test.describe("Tab compoment", () => {

    test('should render the basic Tab as per design', async () => {
        const selectedElement = (await storybookPOM.getElementFromPreview('.is-selected')).first()

        // Check font size
        const fontSize = await storybookPOM.getComputedStyle(selectedElement, "font-size");
        expect(fontSize).toBe("18px")

        // Check font weight
        const fontWeight = await storybookPOM.getComputedStyle(selectedElement, "font-weight");
        expect(fontWeight).toBe("600")
    })

    // Accessibility voilations check
    // test('to verify no accessibility violations are found', async ({ page }) => {
    //     // Check the Voilations tab under Accessibility
    //     await page.getByRole('tab', { name: 'Accessibility' }).click();
    //     await page.locator('button', { hasText: 'Violations' }).click();
    //     await expect(page.locator('.sto-142f1ph')).toHaveText('0 Violations');
    // });
});
