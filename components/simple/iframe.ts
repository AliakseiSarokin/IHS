import {browser} from "protractor";

export class Iframe {

    public async switchToIframe(iframeElement: any) {
        await browser.switchTo().frame(iframeElement);
    };

    public async switchToDefaultContent() {
        await browser.switchTo().defaultContent();

    };
}