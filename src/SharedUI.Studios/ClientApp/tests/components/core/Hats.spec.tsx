import { expect, test, Locator, Page } from '@playwright/test';
import { StorybookTestPOM } from '../../StoryBook.spec';

let storybookPOM: StorybookTestPOM;

const panelClass = ".ms-Panel-main";
const headerTextClass = ".ms-Panel-headerText";

test.beforeEach(async ({ page }) => {
    storybookPOM = new StorybookTestPOM(page);
    await storybookPOM.goto();

    const pageUrl = storybookPOM.getBaseUrl() + "?path=/story/hats--hats";
    await page.goto(pageUrl);
});


test.describe('Hats panel tests', () => {
    test('should render the basic Hats panel as per design', async ({ page }) => {
        const panelElement = await storybookPOM.getElementFromPreview(panelClass);
        const headerTextElement = await storybookPOM.getElementFromPreview(headerTextClass);

        // Check background color
        const backgroundColor = await storybookPOM.getComputedStyle(panelElement, "background-color");
        await expect(backgroundColor).toBe("rgb(255, 255, 255)");

        // Check header text color
        const color = await storybookPOM.getComputedStyle(headerTextElement, "color");
        await expect(color).toBe("rgb(50, 49, 48)");

        // Check font weight
        const fontWeight = await storybookPOM.getComputedStyle(panelElement, "font-weight");
        await expect(fontWeight).toBe("400");

        // Check panel width
        const panelWidth = await storybookPOM.getComputedStyle(panelElement, "width");
        await expect(panelWidth).toBe("380px");
    });

    test('the Hats panel should update on properties updates', async ({ page }) => {
        // Check the headerText prop
        await page.locator('textarea[name="headerText"]').fill("Hello");
        const headerTextElement = await storybookPOM.getByRole('heading', { name: 'Hello' });
        expect(headerTextElement).toHaveText("Hello");

        // Check Open in a new window
        await (await storybookPOM.getByRole('link', { name: 'Open in a new window' })).click();
        const [newPage] = await Promise.all([
            page.waitForEvent('popup'),
        ]);
        await expect(newPage).toHaveURL('https://microsoft.qualtrics.com/jfe/form/SV_40zWLBFYILTkRWl?Kind=FormRecognizer&From=Preview');
    });

    test('the Hats survey should be completed', async ({ page }) => {
        // Check sample survey flow
        await (await (storybookPOM.getByRoleIframe('group', { name: 'How likely is it that you would recommend Form Recognizer to a friend or colleague? Please select one.' }))).getByText('10').click();
        await (await storybookPOM.getByLabelIframe('(Optional) What, if anything, do you find frustrating or unappealing about Form Recognizer? What new capabilities would you like to see for Form Recognizer?')).click();
        await (await storybookPOM.getByLabelIframe('(Optional) What, if anything, do you find frustrating or unappealing about Form Recognizer? What new capabilities would you like to see for Form Recognizer?')).fill('All good');
        await (await storybookPOM.getByRoleIframe('button', { name: 'Next' })).click();
        await (await storybookPOM.getByLabelIframe('(Optional) What do you like best about Form Recognizer?')).click();
        await (await storybookPOM.getByLabelIframe('(Optional) What do you like best about Form Recognizer?')).fill('Form recognizer');
        await (await storybookPOM.getByRoleIframe('button', { name: 'Next' })).click();
        await (await storybookPOM.getByTextIframe('Large enterprise company (More than 25,000 people)')).click();
        await (await storybookPOM.getByTextIframe('App Developer: You create software applications, build/write computer code or de')).click();
        await (await storybookPOM.getLocatorIframe('label:has-text("Managing project timeline and resourcing")')).click();
        await (await storybookPOM.getByRoleIframe('button', { name: 'Next' })).click();
        await (await storybookPOM.getByTextIframe('Deploying a solution that uses Form Recognizer')).click();
        await (await storybookPOM.getByRoleIframe('cell', { name: 'Ease of use Extremely satisfied' })).locator('label').first().click();
        await (await storybookPOM.getByRoleIframe('cell', { name: 'Technical reliability Extremely satisfied' })).locator('label').first().click();
        await (await storybookPOM.getByRoleIframe('cell', { name: 'Features & capabilities Extremely satisfied' })).locator('label').first().click();
        await (await storybookPOM.getByRoleIframe('cell', { name: 'Visual appeal Extremely satisfied' })).locator('label').first().click();
        await (await storybookPOM.getByRoleIframe('cell', { name: 'Speed Extremely satisfied' })).locator('label').first().click();
        await (await storybookPOM.getByRoleIframe('cell', { name: 'Documentation Extremely satisfied' })).locator('label').first().click();
        await (await storybookPOM.getByRoleIframe('button', { name: 'Next' })).click();
        await (await storybookPOM.getByTextIframe('Education')).click();
        await (await storybookPOM.getByTextIframe('Experienced, I have developed with AI services like this more than 10 times')).click();
        await (await storybookPOM.getByRoleIframe('button', { name: 'Next' })).click();
        await (await storybookPOM.getByRoleIframe('button', { name: 'Next' })).click();
        await (await storybookPOM.getByTextIframe('We thank you for your time spent taking this survey. Your response has been reco'));
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