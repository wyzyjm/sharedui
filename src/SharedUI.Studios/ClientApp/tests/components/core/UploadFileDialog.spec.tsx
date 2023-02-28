import { test, expect } from '@playwright/test';
import { StorybookTestPOM } from '../../StoryBook.spec';

let storybookPOM: StorybookTestPOM;
test.describe("privacy link", () => {
    test.beforeEach(async ({ page }) => {
        storybookPOM = new StorybookTestPOM(page);
        await storybookPOM.goto();
    
        const pageUrl = storybookPOM.getBaseUrl() + "?path=/story/uploadfiledialog--upload-file-dialog-component";
        await page.goto(pageUrl);
    });
    test("should render text", async ({ page }) => {
        const messageText = await (await storybookPOM.getElementFromPreview('.message')).getByText('Drag and drop.')
        await expect(messageText).toBeVisible();

        const textElement = await storybookPOM.getByRole('button', { name: 'Browse for a file' });
        await expect(textElement).toBeVisible();

        const jsonlText = await page.getByText(/^jsonl$/i);
        
        await expect(jsonlText).toHaveText('jsonl');
    });
    // Accessibility voilations check
    test('to verify no accessibility violations are found', async ({ page }) => {
        // Check the Voilations tab under Accessibility
        await page.getByRole('tab', { name: 'Accessibility' }).click();
        await page.locator('button', { hasText: 'Violations' }).click();
        await expect(page.locator('.sto-142f1ph')).toHaveText('0 Violations');
    });
  });
