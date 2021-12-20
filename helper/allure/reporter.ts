import {browser} from "protractor";

declare let allure: any;

export function addTestComment(description: string) {
    allure.addArgument('comment', description);
}
export function takeScreenShot(screenshotName = 'Screenshot', done = undefined): Promise<any> {

    return (browser as any).takeScreenshot()
        .then((png) => allure.createAttachment(screenshotName,
                () => new Buffer(png, 'base64'),
                'image/png')())
        .then(() => {
            if (done) {
                done();
            }
        });
}
