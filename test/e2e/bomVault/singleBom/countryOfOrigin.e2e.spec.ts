import {browser} from "protractor";
import {buttonNames, fieldStatuses, linksNames, meganavItems} from "../../../../testData/global";
import {
    COOElements,
    gridElements,
    homeElements,
} from "../../../../elements/elements";
import {Link} from "../../../../components/simple/link";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {COOLogic} from "../../../../bussinesLayer/countryOfOrigin/COOLogic";
import {Toolbar} from "../../../../components/toolbar";
import {Waiters as w} from "../../../../helper/waiters";
import {SingleBomLogic} from "../../../../bussinesLayer/bomVault/singleBomLogic";
import {Grid} from "../../../../components/grid";
import {Actions} from "../../../../utils/actions";
import {Button} from "../../../../components/simple/button";

const toolbar = new Toolbar();
const cooLogic = new COOLogic();
const link: Link = new Link();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const singleBomLogic: SingleBomLogic = new SingleBomLogic();
const grid: Grid = new Grid();
const button:Button = new Button();
describe('Country Of Origin - Single BOM', () => {

    it('should navigate to view all BOMS page', async () => {
        await login.loginWithDirectLink(browser.params.userAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.checkboxSelector.get(1));
    });

    it('should open BOM having Country of origin details and verify country Name', async () => {
        await singleBomLogic.openSingleBomByName('Automation_COO');
        await w.waitUntilElementIsDisplayed(gridElements.newGridCheckboxSelectorByIndex(1));
        await w.waitUntilWorkingModalNotDisplayed();
        await w.waitUntilElementIsDisplayed(gridElements.newGridRows.last());
        await browser.sleep(3000);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await link.clickOnTheLinkByName(buttonNames.cooLayout);
        await cooLogic.openCOOPopOverAndVerifyCountryName(0);
    });

    it('should verify all indicators in Country of origin details popover', async () => {
        await cooLogic.verifyIndicators();
    });
    it('should verify Overall indicators in Country of origin details popover matches to average value of other indicators', async () => {
        await cooLogic.verifyOverallIndicatorCalcuation();
    });
    it('should verify paragraph text inside Country of origin details popover', async () => {
        await cooLogic.verifyParagraphText();
    });
    it('should verify source logo and text are present inside Country of origin details popover', async () => {
        await cooLogic.verifyParagraphText();
    });
    it('should Verify to learn more link inside country of origin popover redirects to proper page', async () => {
        await cooLogic.verifyToLearnMoreLink();
    });
    it('should Verify close button closes country of origin popover', async () => {
        await cooLogic.verifyCloseButtonLearnMoreLink();
    });

    it('should be Enter Part Number in search box having multiple Country of origin details and verify country Name', async () => {
        await grid.newGridOpenFilterBoxByName('Matched P/N');
        await Actions.sendKeys(gridElements.columnsSort.input, '20222-680-JT');
        await button.clickByButtonName(buttonNames.applyFilter);
        await cooLogic.openCOOPopOverAndVerifyMultipleCountryName(0,0);
        await cooLogic.openCOOPopOverAndVerifyMultipleCountryName(0,1);
        await cooLogic.openCOOPopOverAndVerifyMultipleCountryName(0,2);
    });

    it('should be Enter Part Number in search box having multiple Country of origin details and verify overAll calculation is proper', async () => {
        await cooLogic.openCOOPopOverAndVerifyMultipleCountryName(0,0);
        await cooLogic.verifyOverallIndicatorCalcuation();
        await cooLogic.openCOOPopOverAndVerifyMultipleCountryName(0,1);
        await cooLogic.verifyOverallIndicatorCalcuation();
        await cooLogic.openCOOPopOverAndVerifyMultipleCountryName(0,2);
        await cooLogic.verifyOverallIndicatorCalcuation();
    });
    it('should Verify clicking outside popover button closes country of origin popover', async () => {
        await w.waitUntilElementIsDisplayed(await COOElements.COOPopOver.get(0));
        await meganav.goToFeatureWithMeganav(meganavItems.home,homeElements.bomsLinks.get(0));
        await expect(COOElements.COOPopOver.get(0).isPresent()).toBeFalsy();
    });
});