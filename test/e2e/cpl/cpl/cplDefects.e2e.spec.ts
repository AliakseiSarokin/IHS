import {Login} from "../../../../components/login";
import {browser} from "protractor";
import {Meganav} from "../../../../components/meganav";
import {linksNames, meganavItems} from "../../../../testData/global";
import {
    cplElements, gridElements, modalElements, partDetailsElements,
    searchElements
} from "../../../../elements/elements";
import {Link} from "../../../../components/simple/link";
import {Shade} from "../../../../components/shade";
import {ConsoleErrors} from "../../../../helper/consoleErrors";
import {Button} from "../../../../components/simple/button";
import {cplData} from "../../../../testData/cpl";
import {CplSearchLogic} from "../../../../bussinesLayer/search/cplSearchLogic";

const login: Login = new Login();
const meganav: Meganav = new Meganav();
const link: Link = new Link();
const button: Button = new Button();
const cplSearchLogic = new CplSearchLogic();

describe(`Manage CPL defect, DE115400`, () => {

    it(`CPL: console error on navigating between CPL tabs`, async () => {
        await login.loginWithDirectLink(browser.params.userAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.manageCpl, gridElements.checkboxSelector.get(1));
        await button.clickOnTheElementAndWait(cplElements.tabs.get(3), gridElements.newGridRows.get(1));
        await Shade.openShadeWithLink(cplData.noMatchesTry);
        await button.clickOnTheElementAndWait(cplElements.tabs.get(1), gridElements.grid);
        await expect(await ConsoleErrors.getConsoleErrors()).toEqual([]);
    });
});

describe(`CPL search results page`, () => {

    it(`should not be Blank Modal on click on Mfr Icon, 373219`, async () => {
        await login.loginWithDirectLink(browser.params.userAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.cpl,
            searchElements.cplSearchField);
        await cplSearchLogic.performCplSearch('102-001229');
        await expect(await searchElements.mfrPrefIcon.get(0).isDisplayed()).toBeTruthy();
        await searchElements.mfrPrefIcon.get(0).click();
        await expect(modalElements.modalTitle.isPresent()).toBeFalsy();
    });

    it(`should not be PDF icon for unmatched CPL part, 370109`, async () => {
        await expect(await partDetailsElements.pdfIcon.get(0).isPresent()).toBeFalsy();
    });
});