import {browser} from "protractor";
import {buttonNames} from "../../../testData/global";
import {Link} from "../../../components/simple/link";
import {Login} from "../../../components/login";
import {Modal} from "../../../components/modal";
import {NewBrowserTab} from "../../../utils/newBrowserTab";
import {NewsLogic} from "../../../bussinesLayer/news/newsLogic";
import {newsData} from "../../../testData/news";

const link: Link = new Link();
const login: Login = new Login();
const modal: Modal = new Modal();
const newBrowserTab: NewBrowserTab = new NewBrowserTab();
const newsLogic: NewsLogic = new NewsLogic();
// skip this suite because of method browser.driver.getCurrentUrl() don't work in headless
xdescribe('News Navigation', () => {

    it("should open news modal from help icon ", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await newsLogic.openNewsModalFromHelpIcon();
    });

    it("should open release notes  window", async () => {
        await newBrowserTab.clickOnElementOpenNewBrowserAndCheckUrl(await link.returnElementByLinkName(newsData.whatsNew.whatsNewLink),
            newsData.whatsNew.whatsNewUrl);
    });

    it("Coronavirus (COVID-19) Component Supply Chain Impacts  more information ", async () => {
        await newBrowserTab.clickOnElementOpenNewBrowserAndCheckUrlWithWait(await link.returnElementByLinkNameAndIndex(newsData.whatsNew.forMoreInfo,
            0), newsData.whatsNew.firstMoreInfoLink);
    });

    it("should open Content Services for COTS and Regulatory Compliance more information ", async () => {
        await newBrowserTab.clickOnElementOpenNewBrowserAndCheckUrlWithWait(await link.returnElementByLinkNameAndIndex(newsData.whatsNew.forMoreInfo,
            1), newsData.whatsNew.secondMoreInfoLink);
    });

    it("should open XML Web Service for Parts Content Integration more information ", async () => {
        await newBrowserTab.clickOnElementOpenNewBrowserAndCheckUrlWithWait(await link.returnElementByLinkNameAndIndex(newsData.whatsNew.forMoreInfo,
            2), newsData.whatsNew.thirdMoreInfoLink);
    });

    it("should close news modal", async () => {
        await modal.closeModalWithXButton();
        await newsLogic.openNewsModalFromHelpIcon();
        await modal.closeModalWithButton(buttonNames.close);
    });

});
