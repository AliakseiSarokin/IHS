import {ImportLogic} from "../../../bussinesLayer/import/importLogic";
import {Link} from "../../../components/simple/link";
import {Login} from "../../../components/login";
import {Meganav} from "../../../components/meganav";
import {VideoSliderLogic} from "../../../bussinesLayer/home/videoSliderLogic";
import {browser, by, element} from "protractor";
import {meganavItems} from "../../../testData/global";
import {gridElements, importElements, videoSliderElements} from "../../../elements/elements";
import {videoLinks} from "../../../testData/video";
import {JasmineTimeout} from "../../../helper/jasmineTimeout";

const importLogic: ImportLogic = new ImportLogic();
const link: Link = new Link();
const login: Login = new Login();
const meganav: Meganav = new Meganav();

describe('Video Tab ', () => {

    beforeAll(async () => {
        await JasmineTimeout.setJasmineTimeout(300000);
    });

    afterAll(async() => {
        await JasmineTimeout.setJasmineTimeout(browser.params.defaultElementWaitTime);
    });

    it('should display video tab on the right rail - home page ', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await VideoSliderLogic.presentVideoTabOnTheRightRail()
    });

    it('should open video slider on the home page - home page', async () => {
        await VideoSliderLogic.openVideoSlider();
    });

    it('should be video titles, US243044', async () => {
        await expect(await videoSliderElements.videoTitles.getText()).toEqual(videoLinks.homePage);
    });

    it('should be "View in separate window" sublinks, US243044', async () => {
        await expect(await videoSliderElements.viewInSeparateWindow.count()).toEqual(videoLinks.homePage.length);
    });

    it('should play video', async () => {
        await VideoSliderLogic.playingVideoChecking();
    });

    it('should open video by title and play video', async () => {
        for (let i: number = 0; i < videoLinks.homePage.length; i++) {
            await VideoSliderLogic.switchByLinkNameViewoInSlider(videoLinks.homePage[i]);
            await VideoSliderLogic.playingVideoChecking();
        }
    });

    it('should check video autoplay inability in slider, US243044', async () => {
        for (let i:number =0; i < videoLinks.homePage.length; i++) {
            await VideoSliderLogic.switchByLinkNameViewoInSlider(videoLinks.homePage[i]);
            await VideoSliderLogic.autoplayVideoChecking(false);
        }
    });

    it('should open the video on the new browser tab and close it', async () => {
        await VideoSliderLogic.openVideoInTheNewBrowserTab();
    });
    // dont see elements on the new tab
    xit('should check video autoplay inability on the new browser tab, US243044', async () => {
        for(let i:number =0; i < videoLinks.homePage.length; i++) {
            await VideoSliderLogic.openVideoInTheNewBrowserTabAndSwitchToIt('View in Separate Window', i);
            await VideoSliderLogic.autoplayVideoChecking(false);
            await VideoSliderLogic.closeActiveTabAndSwitchToDefaultTab();
        }
    });
        // dont see elements on the new tab
    xit('should open video on the new browser tab and play it', async () => {

        for(let i:number =0; i < videoLinks.homePage.length; i++) {
            await VideoSliderLogic.openVideoInTheNewBrowserTabAndSwitchToIt('View in Separate Window', i);
            await VideoSliderLogic.playingVideoChecking();
            await VideoSliderLogic.closeActiveTabAndSwitchToDefaultTab();
        }
    });

    it('should close video slider on the home page ', async () => {
        await VideoSliderLogic.closeVideoSlider();
    });

    it('should display video tab on the right rail - import 1st step', async () => {
        await meganav.goToFeatureWithMeganav(meganavItems.import, importElements.aboutImport);
        await importLogic.goToStep1();
        await VideoSliderLogic.presentVideoTabOnTheRightRail();
    });

    it('should open video slider on the home page - import 1st step', async () => {
        await VideoSliderLogic.openVideoSlider();
    });

    it('should play video', async () => {
        await VideoSliderLogic.playingVideoChecking();
    });

    it('should open the video on the new browser tab and close it', async () => {
        await VideoSliderLogic.openVideoInTheNewBrowserTab();
    });

    it('should close video slider on the import 1st step ', async () => {
        await VideoSliderLogic.closeVideoSlider();
    });

});