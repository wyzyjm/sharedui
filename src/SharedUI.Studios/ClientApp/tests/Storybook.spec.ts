import { expect, Frame, FrameLocator, Locator, Page } from '@playwright/test';

export class StorybookTestPOM {
    readonly page: Page;
    private _frame: FrameLocator;
  
    constructor(page: Page) {
      this.page = page;
    }
  
    public async goto() { 
        await this.page.goto(this.getBaseUrl());

        return new Promise(async (resolve, reject) => {
            const intervalId = setInterval(async () => {
                await this.page.waitForLoadState();
                const bodyElement = await this.page.locator("body");
                const bodyContent = await bodyElement.innerText();
                if (bodyContent.toLowerCase().includes("Cannot GET /".toLowerCase())) {
                    await this.page.reload();
                } else if (bodyContent.length > 0) {
                    clearInterval(intervalId);
                    await this.page.getByRole("main");
                    console.log("Storybook page loaded");
                    resolve("loaded");
                }
            }, 3000);
        });
    }

    public getBaseUrl() {
        return 'http://localhost:6006/';
    }

    public async getElementFromPreview(selector: string) {
        this._frame = this._frame || (await this._getPreviewFrame());
        return this._frame.locator(selector);
    }

    public async getComputedStyle(element: Locator, propertyName: string) {
        return element.evaluate((el, property)  => {
            return window.getComputedStyle(el).getPropertyValue(property);
        }, propertyName);
    }

    private async _getPreviewFrame(): Promise<FrameLocator> { 
        return this.page.frameLocator("#storybook-preview-iframe");
    }
  }