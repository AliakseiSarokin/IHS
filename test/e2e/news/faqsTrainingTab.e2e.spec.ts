import {browser} from "protractor";
import {Link} from "../../../components/simple/link";
import {Login} from "../../../components/login";
import {Modal} from "../../../components/modal";
import {NewBrowserTab} from "../../../utils/newBrowserTab";
import {NewsLogic} from "../../../bussinesLayer/news/newsLogic";
import {newsData} from "../../../testData/news";
import {newsElements} from "../../../elements/elements";
import {VideoSliderLogic} from "../../../bussinesLayer/home/videoSliderLogic";
import {videoLinks} from "../../../testData/video";

const link: Link = new Link();
const login: Login = new Login();
const modal: Modal = new Modal();
const newBrowserTab: NewBrowserTab = new NewBrowserTab();
const newsLogic: NewsLogic = new NewsLogic();

describe('News - FAQs, Training, and Videos Tab', () => {

    it('should go to FAQs, Training, and Videos Tab', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await newsLogic.openNewsModalFromHelpIcon();
        await newsLogic.openTabByName('FAQs, Training, and Videos');
    });

    it('should be video links', async () => {
        await expect(await newsElements.videoLinks.getText())
            .toEqual(videoLinks.homePage);
    });

    it('should be open video modal and play video by video slider ' +
        '(DE107557 - video slider is opened behind news modal)', async () => {
        await VideoSliderLogic.openVideoSlider();
        await VideoSliderLogic.closeVideoSlider();
        await VideoSliderLogic.openVideoSlider();
        await VideoSliderLogic.playingVideoChecking();
        await VideoSliderLogic.closeVideoSlider();
    });

    it('should be open video modal and play video by video link', async () => {
        await VideoSliderLogic.openVideoSliderByLinkName(videoLinks.homePage[5]);
        await VideoSliderLogic.playingVideoChecking();
        await VideoSliderLogic.closeVideoSlider();
        // await modal.closeModalWithXButton('Custom Search Results Layouts');
    });

    it('should open (FAQs) window', async () => {
        await newBrowserTab.clickOnElementOpenNewBrowserAndCheckUrl(await link.returnElementByLinkName(newsData.faqs.freqAskQuestionLink),
            newsData.faqs.freqAskQuestionUrl);
    });

    it('should open Online eCourses window', async () => {
        await newBrowserTab.clickOnElementOpenNewBrowserAndCheckUrl(await link.returnElementByLinkName(newsData.faqs.joinIhsLink),
            newsData.faqs.joinIhsUrl);
    });
});
