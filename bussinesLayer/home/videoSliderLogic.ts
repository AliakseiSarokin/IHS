import {Actions} from "../../utils/actions";
import {NewBrowserTab} from "../../utils/newBrowserTab";
import {browser} from "protractor";
import {Link} from "../../components/simple/link";
import {sliderElements, videoSliderElements} from "../../elements/elements";
import {Waiters as w} from "../../helper/waiters";
import {allureStep} from "../../helper/allure/allureSteps";

const link: Link = new Link();
const newBrowserTab: NewBrowserTab = new NewBrowserTab();
export class VideoSliderLogic {

    public static async presentVideoTabOnTheRightRail(){
        await expect(await videoSliderElements.videoTab.isDisplayed()).toBeTruthy();
    };

    public static async openVideoSlider(){
        await w.waitUntilElementIsDisplayed(videoSliderElements.videoTab);
        await w.waitUntilElementIsClickable(videoSliderElements.videoTab);
        await videoSliderElements.videoTab.click();
        await w.waitUntilElementIsDisplayed(sliderElements.openSliderBox);
        await w.waitUntilElementIsClickable(sliderElements.closeSliderTab);
        await w.waitUntilWorkingModalNotDisplayed();
        await w.waitUntilElementIsClickable(videoSliderElements.videoBox.get(0))
        await w.waitUntilElementIsDisplayed(await videoSliderElements.videoTitles.get(0))
    };

    public static async openVideoSliderByLinkName(linkName:string){
        await link.clickOnTheLinkByName(linkName);
        await w.waitUntilElementIsClickable(videoSliderElements.videoModal);
        await w.waitUntilElementIsClickable(videoSliderElements.videoBox.get(0))
    };

    public static async switchByLinkNameViewoInSlider(linkName: string) {
        await allureStep(`Switch in Video SLider by name ${linkName} `, async() => {
            await videoSliderElements.videoTitleByName(linkName).click();
            await w.waitUntilElementIsClickable(videoSliderElements.videoBox.get(0))
        });
    };

    public static async closeVideoSlider(){
        await sliderElements.closeSliderTab.click();
        await w.waitUntilElementNotDisplayed(sliderElements.openSliderBox);
    };

    public static async currentPlaybackTime(){
        let playedTime: any;
        await allureStep('Return current playback time',async () => {
            playedTime = await browser.executeScript(() => {
                let video = document.querySelectorAll('video')[0];
                video.pause();
                return video.currentTime;
            });
        });
        return playedTime;
    };

    public static async playingVideoChecking() {
        await browser.sleep(3000);
        await w.waitUntilElementIsClickable(videoSliderElements.videoModal);
        await Actions.uncertainClick();
        await browser.executeScript('document.querySelector("video").play()');
        await browser.sleep(7000);
        await expect(await this.currentPlaybackTime()).toBeGreaterThan(1);
    };

    public static async autoplayVideoChecking(autoplayEnabled: boolean = true) {
        await browser.sleep(7000);
        if(autoplayEnabled) {
            await expect(await this.currentPlaybackTime()).toBeGreaterThan(1);
        }
        else {
            await expect(await this.currentPlaybackTime()).toEqual(0);
        }
    };

    public static async openVideoInTheNewBrowserTab() {
        await link.clickOnTheLinksByNameAndIndex('View in Separate Window', 0);
        const browserTabs = await browser.driver.getAllWindowHandles();
        await browser.waitForAngularEnabled(false);
        await browser.driver.switchTo().window(browserTabs[1]);
        expect (await browserTabs.length).toEqual(2);
        await browser.driver.close();
        await browser.driver.switchTo().window(browserTabs[0]);
        await browser.waitForAngularEnabled(false);
    };

    public static async openVideoInTheNewBrowserTabAndSwitchToIt(linkText:string, index: number =0) {
        await allureStep('Open new browser tab and wait for video',async () => {
            await newBrowserTab.openNewBrowserTabByLinkTextAndIndex(linkText, index);
            await w.waitUntilElementIsClickable(videoSliderElements.videoModal);
        });
    };

    public static async closeActiveTabAndSwitchToDefaultTab() {
        await allureStep('Close active tab and switch to default tab',async () => {
            await newBrowserTab.closeCurrentBrowserTab()
        });
    };

}