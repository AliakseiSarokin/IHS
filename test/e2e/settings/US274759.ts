import {Login} from "../../../components/login";
const login: Login = new Login();
import {headerItems, titles} from "../../../testData/global";
import {
    headerElements,
    settings,
    matchingElements,
    partDetailsElements
} from "../../../elements/elements";
import {browser} from "protractor";
import {Header} from "../../../components/header";
import {Waiters as w } from "../../../helper/waiters"
import {Link} from "../../../components/simple/link";
import {partDetailsData} from "../../../testData/partDetails";
const link:Link = new Link();
import {Modal} from "../../../components/modal"
import {QuickSearch} from "../../../components/quickSearch";
const modal:Modal = new Modal();
const quickSearch: QuickSearch = new QuickSearch();

describe('US274759, Allow BOM Intel Distributor Settings to Control Distributor Data in Parts Intel', () => {

    afterAll(async ()=>{
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[7],
            settings.distributors.distributorContainer);
        await w.waitUntilElementIsClickable(matchingElements.checkboxInput.get(0));
        await expect(settings.distributors.distributorHeading.getText()).toEqual(titles.distributorSetting);
        await matchingElements.checkboxInput.get(0).click();
        await w.waitUntilElementIsClickable(settings.distributors.saveButton);
        await settings.distributors.saveButton.click();
    })


    it('should check Group admin user in BOM Intel is able to make changes to distributors list which are reflected for other users also', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[7],
            settings.distributors.distributorContainer);
        await w.waitUntilElementIsClickable(matchingElements.checkboxInput.get(0));
        await expect(settings.distributors.distributorHeading.getText()).toEqual(titles.distributorSetting);
        await matchingElements.checkboxInput.get(0).click();
        await w.waitUntilElementIsClickable(settings.distributors.saveButton);
        await settings.distributors.saveButton.click();
        await quickSearch.performQuickSearch('lm311');
        await modal.openModalWithElement(partDetailsElements.distribIcon.get(1));
        await w.waitUntilElementIsClickable(link.returnElementByLinkName(partDetailsData.leftNav.itemManufacturer));
        await expect( partDetailsElements.distributorsPanel.isPresent()).toBeFalsy();

    })
    it('should check user in Parts Intel are shown the same distributors as saved by group admin user in BOM Intel ',async ()=>{
        await login.loginWithDirectLinkPI(browser.params.readOnlyUserUrlPI);
        await quickSearch.performQuickSearch('lm311');
        await modal.openModalWithElement(partDetailsElements.distribIcon.get(1));
        await w.waitUntilElementIsClickable(link.returnElementByLinkName(partDetailsData.leftNav.itemManufacturer));
        await expect( partDetailsElements.distributorsPanel.isPresent()).toBeFalsy();
    })
});