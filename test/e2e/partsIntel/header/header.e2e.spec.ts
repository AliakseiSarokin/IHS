import {Login} from "../../../../components/login";
import {browser} from "protractor";
const login = new Login();
import {Meganav} from "../../../../components/meganav";
const megenav = new Meganav();
import {meganavItems, headerItems, urls, titles} from "../../../../testData/global";
import {Header} from "../../../../components/header";
import {
    homeElements, importElements, pageTitles, gridElements, searchElements, settings,
    bomElements, headerElements
} from "../../../../elements/elements";
import {homeItems,} from "../../../../testData/home";
import {Modal} from "../../../../components/modal";
const modal = new Modal();
import {NewBrowserTab} from "../../../../utils/newBrowserTab";
const newBroserTab = new NewBrowserTab();
import {Link} from "../../../../components/simple/link";
const link = new Link();
import {searchItems} from "../../../../testData/search";
import {Actions} from "../../../../utils/actions";
const actions = new Actions();
import {HomeLogic} from "../../../../bussinesLayer/home/homeLogic";
const homeLogin = new HomeLogic();
describe('Parts Intelligence Header Bar elements ', () => {

    it('should look for the all the elements on Meganav', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await expect(megenav.meganavItems.getText()).toEqual(meganavItems.meganavListPI)
    });

    it('should have header bar items', async () => {
        await expect(headerElements.helpIcon.isDisplayed).toBeTruthy();
        await expect(headerElements.feedbackIcon.isDisplayed).toBeTruthy();
        await expect(headerElements.settingsIcon.isDisplayed).toBeTruthy();
        await expect(headerElements.userIcon.isDisplayed).toBeTruthy();
    });

    it('should have help menu items', async () => {
        await Header.hoverOnHeaderItemAndWaitForDisplayedLink(headerElements.helpIcon, headerItems.helpLinks[0]);
        await expect(headerElements.helpMenuLinks.getText()).toEqual(headerItems.helpLinksPI)
    });

    it('should have Feedback menu items', async () => {
        await Header.hoverOnHeaderItemAndWaitForDisplayedLink(headerElements.feedbackIcon, headerItems.feedbackLinks[0]);
        await expect(headerElements.feedbackMenuLinks.getText()).toEqual(headerItems.feedbackLinks);
    });

    it('should have Settings menu items', async () => {
        await Header.hoverOnHeaderItemAndWaitForDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinksPI[0]);
        await expect(headerElements.settingsMenuLinks.getText()).toEqual(headerItems.settingsMenuLinksPI);
    });

    it('should have User menu items', async () => {
        await Header.hoverOnHeaderItemAndWaitForDisplayedLink(headerElements.userIcon, headerItems.userMenuLinks[0]);
        await expect(headerElements.userMenuLinks.getText()).toEqual(headerItems.userMenuLinks);
    });

});

describe('Parts Intelligence Header Bar through elements', () => {

    beforeEach(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
    });

    afterEach(async () => {
        await login.logout();
    });

    it(' should go to help page ', async () => {
        await Header.hoverOnHeaderItemAndWaitForDisplayedLink(headerElements.helpIcon, headerItems.goToHelp);
        await newBroserTab.clickOnElementOpenNewBrowserAndCheckUrl(link.returnElementByLinkName(headerItems.goToHelp)
            ,  urls.goToHelp);
    });

    xit('should open Feedback modal', async () => {
        await Header.hoverOnHeaderItemAndWaitForDisplayedLink(headerElements.feedbackIcon, headerItems.feedback);
        await modal.openModalWithLinkName(headerItems.feedback);
        await expect(modal.modalTitle.getText()).toEqual(headerItems.feedback);
        await modal.closeModalWithXButton();
    });
});