import {Login} from "../../../components/login";
import {browser} from "protractor";
import {Meganav} from "../../../components/meganav";
import {meganavItems, headerItems, urls, titles} from "../../../testData/global";
import {Header} from "../../../components/header";
import {
    homeElements, importElements, pageTitles, gridElements, searchElements, settings,
    bomElements, headerElements, toolbarElements, bomVaultElements
} from "../../../elements/elements";
import {homeItems,} from "../../../testData/home";
import {NewBrowserTab} from "../../../utils/newBrowserTab";
import {Link} from "../../../components/simple/link";
import {searchItems} from "../../../testData/search";
import {HomeLogic} from "../../../bussinesLayer/home/homeLogic";
import {HelpLogic} from "../../../bussinesLayer/help/helpLogic";
import {bomVaultData} from "../../../testData/bomVault";

const helpLogic: HelpLogic = new HelpLogic();
const login = new Login();
const megenav = new Meganav();
const newBroserTab = new NewBrowserTab();
const link = new Link();
const homeLogin = new HomeLogic();

describe('Header Bar and Home Panels elements ', () => {

    it('should look for the all the elements on Meganav', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await expect(megenav.meganavItems.getText()).toEqual(meganavItems.meganavList)
    });

    it("should open help panel and check title", async () => {
        await helpLogic.openAndCheckHelpPanelTitle('Getting around BOM Intelligence');
    });

    //skip test because of the defect with help panel
    xit("should open help panel and check opened subitem", async () => {
        await helpLogic.openHelpPanelAndCheckOpenedSubitem('Main ');
    });

    it('should have header bar items', async () => {
        await expect(headerElements.helpIcon.isDisplayed).toBeTruthy();
        await expect(headerElements.feedbackIcon.isDisplayed).toBeTruthy();
        await expect(headerElements.settingsIcon.isDisplayed).toBeTruthy();
        await expect(headerElements.userIcon.isDisplayed).toBeTruthy();
    });

    it('should have help menu items', async () => {
        await Header.hoverOnHeaderItemAndWaitForDisplayedLink(headerElements.helpIcon, headerItems.helpLinks[0]);
        await expect(headerElements.helpMenuLinks.getText()).toEqual(headerItems.helpLinks)
    });

    it('should have Feedback menu items', async () => {
        await Header.hoverOnHeaderItemAndWaitForDisplayedLink(headerElements.feedbackIcon, headerItems.feedbackLinks[0]);
        await expect(headerElements.feedbackMenuLinks.getText()).toEqual(headerItems.feedbackLinks);
    });

    it('should have Settings menu items', async () => {
        await Header.hoverOnHeaderItemAndWaitForDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[0]);
        await expect(headerElements.settingsMenuLinks.getText()).toEqual(headerItems.settingsMenuLinks);
    });

    it('should have User menu items', async () => {
        await Header.hoverOnHeaderItemAndWaitForDisplayedLink(headerElements.userIcon, headerItems.logout);
        await expect(headerElements.userMenuLinks.getText()).toEqual(headerItems.userMenuLinks);
    });

    it('should have home panels', async () => {
        await expect(homeElements.panelTitles.getText()).toEqual(homeItems.expectedPanelTitles);
    });

    it('should have links and image for BOMs panel', async () => {
        await expect(homeElements.bomsLinks.getText()).toEqual(homeItems.bomsPanelLinks);
        await expect(homeElements.bomsPanelImage.isDisplayed()).toBeTruthy();
    });

    it('should have links and image for Reporting panel', async () => {
        await expect(homeElements.reportingLinks.getText()).toEqual(homeItems.reportingPanelLinks);
        await expect(homeElements.reportingPanelImage.isDisplayed()).toBeTruthy();
    });

    it('should have links and image for Alerts panel', async () => {
        await expect(homeElements.alertsLinks.getText()).toEqual(homeItems.alertsPanelLinks);
        await expect(homeElements.alertPanelImage.isDisplayed()).toBeTruthy();
    });


    it('should have links and image for Parts Search panel', async () => {
        await expect(homeElements.partSearchLinks.getText()).toEqual(homeItems.searchPanelLinks);
        await expect(homeElements.searchPanelImage.isDisplayed()).toBeTruthy();
    });

    it('should have links and image for My Dashboard panel', async () => {
        await expect(homeElements.myDashboardLinks.getText()).toEqual(homeItems.myDashboardLinks);
        await expect(homeElements.dashboardPanelImage.isDisplayed()).toBeTruthy();
    });

    it('should have links and image for Other Tasks panel', async () => {
        await expect(homeElements.otherTasksLinks.getText()).toEqual(homeItems.otherTasksLinks);
        await expect(homeElements.otherTasksPanelImage.isDisplayed()).toBeTruthy();
    });

    it('should have links and image for Learn More panel', async () => {
        await expect(homeElements.learnMoreLinks.getText()).toEqual(homeItems.learnMoreLinks);
        await expect(homeElements.learnMorePanelImage.isDisplayed()).toBeTruthy();
    });

    it('should have links and image for Corparate Data panel', async () => {
        await expect(homeElements.corparateDataLinks.getText()).toEqual(homeItems.corporateDateLinks);
        await expect(homeElements.corparateDataLinks.isDisplayed()).toBeTruthy();
    });

});

describe('Header Bar and Home Panels go through elements', () => {

    beforeEach(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
    });

    afterEach(async () => {
       // await login.logout();
    });

    it(' should go to help page ', async () => {
        await Header.hoverOnHeaderItemAndWaitForDisplayedLink(headerElements.helpIcon, headerItems.goToHelp);
        await newBroserTab.clickOnElementOpenNewBrowserAndCheckUrl(link.returnElementByLinkName(headerItems.goToHelp)
            ,  urls.goToHelp);
    });

    it('should open Feedback modal', async () => {
        await Header.hoverOnHeaderItemAndWaitForDisplayedLink(headerElements.feedbackIcon, headerItems.feedback);
        await newBroserTab.clickOnElementOpenNewBrowserAndCheckUrlWithWait(link.returnElementByLinkName(headerItems.feedback)
            ,  urls.feedback);
    });

    it('should go by BOMs panel links', async () => {
        await link.clickOnTheLinkByNameAndWaitForElement(homeItems.bomsPanelLinks[0], importElements.aboutImport);
        await expect(pageTitles.aboutImportPageTitle.getText()).toEqual(titles.bomImport);
        await homeLogin.goToHome();
        await link.clickOnTheLinkByNameAndWaitForElement(homeItems.bomsPanelLinks[1], gridElements.grid);
        await expect(pageTitles.pageTitle.getText()).toEqual(titles.bomVault);
        await expect(await toolbarElements.tagByName(bomVaultData.bomVault.filters[1]).isDisplayed()).toBeTruthy();
        await homeLogin.goToHome();
        await link.clickOnTheLinkByNameAndWaitForElement(homeItems.bomsPanelLinks[2], gridElements.grid);
        await expect(pageTitles.pageTitle.getText()).toEqual(titles.bomVault);
        await homeLogin.goToHome();
        await link.clickOnTheLinkByNameAndWaitForElement(homeItems.bomsPanelLinks[3], gridElements.grid);
        await expect(pageTitles.pageTitle.getText()).toEqual(titles.bomTree);
        await homeLogin.goToHome();
        await link.clickOnTheLinkByNameAndWaitForElement(homeItems.bomsPanelLinks[4], pageTitles.pageTitle);
        await expect(pageTitles.pageTitle.getText()).toEqual(titles.bomTreeParts);
    });

    it('should go by Reporting panel links', async () => {
        await link.clickOnTheLinkByNameAndWaitForElement(homeItems.reportingPanelLinks[0], gridElements.grid);
        await expect(pageTitles.pageTitleShim.getText()).toEqual(titles.viewReports);
        await homeLogin.goToHome();
        await link.clickOnTheLinkByNameAndWaitForElement(homeItems.reportingPanelLinks[1], gridElements.grid);
        await expect(pageTitles.pageTitleShim.getText()).toEqual(titles.viewReports);
        await homeLogin.goToHome();
        await link.clickOnTheLinkByNameAndWaitForElement(homeItems.reportingPanelLinks[2], gridElements.grid);
        await expect(pageTitles.generereReportTitle.get(0).getText()).toEqual(titles.generateReport);
        await homeLogin.goToHome();
        await link.clickOnTheLinkByNameAndWaitForElement(homeItems.reportingPanelLinks[3], gridElements.grid);
        await expect(pageTitles.pageTitleShim.getText()).toEqual(titles.viewTemplates);
        await homeLogin.goToHome();
    });

    it('should go by Parts Search panel links', async () => {
        await link.clickOnTheLinkByNameAndWaitForElement(homeItems.searchPanelLinks[0], searchElements.searchField);
        await expect(searchElements.activeSearchTab.getText()).toEqual(searchItems.leftNav.parts);
        await homeLogin.goToHome();
        await link.clickOnTheLinkByNameAndWaitForElement(homeItems.searchPanelLinks[1], searchElements.searchField);
        await expect(searchElements.activeSearchTab.getText()).toEqual(searchItems.leftNav.documents);
        await homeLogin.goToHome();
        await link.clickOnTheLinkByNameAndWaitForElement(homeItems.searchPanelLinks[2], searchElements.whereUsedSearchField.get(0));
        await expect(searchElements.activeSearchTab.getText()).toEqual(searchItems.leftNav.whereUsed);
        await homeLogin.goToHome();
        await link.clickOnTheLinkByNameAndWaitForElement(homeItems.searchPanelLinks[3], searchElements.parametric.commodities.get(0));
        await expect(searchElements.activeSearchTab.getText()).toEqual(searchItems.leftNav.parametric);
        await homeLogin.goToHome();
    });

    it('should go by My Dashboard panel links', async () => {
        await homeLogin.scrollDown();
        await link.clickOnTheLinkByNameAndWaitForElement(homeItems.myDashboardLinks[0], gridElements.grid);
        await expect(pageTitles.pageTitle.getText()).toEqual(titles.bomSummary);
        await homeLogin.goToHome();
        await homeLogin.scrollDown();
        await link.clickOnTheLinkByNameAndWaitForElement(homeItems.myDashboardLinks[1], bomElements.vaultSummary.vaultTable.get(0));
        await expect(pageTitles.pageTitle.getText()).toEqual(titles.vaultSummary);
        await homeLogin.goToHome();
    });

    it('should go by Other Tasks panel links', async () => {
        await homeLogin.scrollDown();
        await link.clickOnTheLinkByNameAndWaitForElement(homeItems.otherTasksLinks[0], gridElements.grid);
        await expect(pageTitles.pageTitleShim.getText()).toEqual(titles.mfrKnowledgeBase);
        await homeLogin.goToHome();
        await homeLogin.scrollDown();
        await link.clickOnTheLinkByNameAndWaitForElement(homeItems.otherTasksLinks[1], gridElements.grid);
        await expect(pageTitles.pageTitleShim.getText()).toEqual(titles.partsKnowledgeBase);
        await homeLogin.goToHome();
        await homeLogin.scrollDown();
        await link.clickOnTheLinkByNameAndWaitForElement(homeItems.otherTasksLinks[2], gridElements.grid);
        await expect(pageTitles.pageTitle.getText()).toEqual(titles.bomTree);
        await homeLogin.goToHome();
        await homeLogin.scrollDown();
        await link.clickOnTheLinkByNameAndWaitForElement(homeItems.otherTasksLinks[3], settings.module);
        await expect(pageTitles.settingsTitle.getText()).toEqual(titles.bomVaultSettings);
    });

    it('should go by Learn More panel links', async () => {
        await homeLogin.scrollDown();
        await newBroserTab.clickOnElementOpenNewBrowserAndCheckUrlWithWait(link.returnElementByLinkName(homeItems.learnMoreLinks[1])
            ,  urls.customCareLink);
        await homeLogin.scrollDown();
        await newBroserTab.clickOnElementOpenNewBrowserAndCheckUrlWithWait(link.returnElementByLinkName(homeItems.learnMoreLinks[2])
            ,  urls.productTrainingLink);
    });

    it('should go by Corparate Data Tasks panel links', async () => {
        await homeLogin.scrollDown();
        await link.clickOnTheLinkByNameAndWaitForElement(homeItems.corporateDateLinks[0], searchElements.cplSearchField);
        await expect(searchElements.activeSearchTab.getText()).toEqual(searchItems.leftNav.cpl);
        await homeLogin.goToHome();
        await homeLogin.scrollDown();
        await link.clickOnTheLinkByNameAndWaitForElement(homeItems.corporateDateLinks[1], gridElements.grid);
        await expect(searchElements.activeSearchTab.getText()).toEqual(searchItems.leftNav.cpl);
        await homeLogin.goToHome();
        await homeLogin.scrollDown();
        await link.clickOnTheLinkByNameAndWaitForElement(homeItems.corporateDateLinks[2], gridElements.grid);
        await homeLogin.goToHome();
        await homeLogin.scrollDown();
        await link.clickOnTheLinkByNameAndWaitForElement(homeItems.corporateDateLinks[3], gridElements.grid);
        await expect(pageTitles.pageTitleShim2.getText()).toEqual(titles.viewMfrPref);
    });

});