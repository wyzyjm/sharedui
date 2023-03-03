import { test, expect } from '@playwright/test';
import { StorybookTestPOM } from '../../../StoryBook.spec';

let storybookPOM: StorybookTestPOM;

const pagePropsItems = [
    {
        title: 'Azure directory',
        class: '.crw-review-item-selectedDirectory',
        inputId: '#control-selectedDirectory',
    },
    {
        title: 'Subscription',
        class: '.crw-review-item-selectedSubscription',
        inputId: '#control-selectedSubscription',
    },
    {
        title: 'Resource',
        class: '.crw-review-item-selectedResource',
        inputId: '#control-selectedResource',
    },
    {
        title: 'Location',
        class: '.crw-review-item-selectedLocation',
        inputId: '#control-selectedLocation',
    },
    {
        title: 'PricingTier',
        class: '.crw-review-item-selectedPricingTier',
        inputId: '#control-selectedPricingTier',
    },
];

test.describe("page summary-step", () => {
    test.beforeEach(async ({ page }) => {
        storybookPOM = new StorybookTestPOM(page);
        await storybookPOM.goto();

        const pageUrl = storybookPOM.getBaseUrl() + "?path=/story/create-resource-wizard--summary-step-component";
        await page.goto(pageUrl);
    });

    test("has learn more link", async ({ page }) => {
        const linkElement = await storybookPOM.getByRole('link', { name: /Azure portal/ });
        linkElement.click();
        const [newPage] = await Promise.all([
            page.waitForEvent('popup'),
        ]);
        await expect(newPage).toHaveURL(/.*microsoft.com/);
    });

    pagePropsItems.forEach(item => test(`item ${item.title} changes when props change`, async ({ page }) => {
        const randomText = `${Math.random()}`;

        await page.locator(item.inputId).fill(randomText);

        const display = await storybookPOM.getElementFromPreview(item.class);
        await expect(display).toContainText(randomText);
    }));


    // Accessibility voilations check
    test('to verify no accessibility violations are found', async ({ page }) => {
        // Check the Voilations tab under Accessibility
        await page.getByRole('tab', { name: 'Accessibility' }).click();
        await page.locator('button', { hasText: 'Violations' }).click();
        await expect(page.locator('.sto-142f1ph')).toHaveText('0 Violations');
    });
});

