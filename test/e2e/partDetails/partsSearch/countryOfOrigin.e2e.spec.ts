import {browser} from "protractor";
import {buttonNames, fieldStatuses, linksNames, meganavItems} from "../../../../testData/global";
import {CheckBox} from "../../../../components/simple/checkBox";
import {
    commonElements,
    COOElements,
    gridElements,
    homeElements,
    modalElements,
    searchElements,
    pageTitles, partDetailsElements
} from "../../../../elements/elements";
import {commonSearch} from "../../../../testData/search";
import {HelpLogic} from "../../../../bussinesLayer/help/helpLogic";
import {InstructionPanel} from "../../../../components/instructionPanel";
import {Link} from "../../../../components/simple/link";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {MultiSelect} from "../../../../components/multiSelect";
import {PartsSearchLogic} from "../../../../bussinesLayer/search/partsSearchLogic";
import {RadioButton} from "../../../../components/simple/radioButton";
import {SearchLogic} from "../../../../bussinesLayer/search/searchLogic";
import {TypeAhead} from "../../../../components/typeAhead";
import {COOLogic} from "../../../../bussinesLayer/countryOfOrigin/COOLogic";
import {Shade} from "../../../../components/shade";
import {Toolbar} from "../../../../components/toolbar";
import {Waiters as w} from "../../../../helper/waiters";
import {Grid} from "../../../../components/grid";
import {Modal} from "../../../../components/modal";

const toolbar = new Toolbar();
const cooLogic = new COOLogic();
const checkbox = new CheckBox();
const helpLogic: HelpLogic = new HelpLogic();
const instructionPanel: InstructionPanel = new InstructionPanel();
const link: Link = new Link();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const multiSelect: MultiSelect = new MultiSelect();
const partsSearchLogic: PartsSearchLogic = new PartsSearchLogic();
const radioButton = new RadioButton();
const searchLogic: SearchLogic = new SearchLogic();
const typeAhead: TypeAhead = new TypeAhead();
const grid:Grid = new Grid();
const modal:Modal = new Modal();
describe('Country Of Origin - part details page', () => {

    it('should navigate to search page', async () => {
        await login.loginWithDirectLink(browser.params.userAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await expect(browser.getCurrentUrl()).toContain("/search/parts");
    });

    it('should be Enter Part Number in search box having Country of origin details and verify country Name', async () => {
        await partsSearchLogic.performPartsSearch('09030006225');
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await link.clickOnTheLinkByName(buttonNames.cooLayout);
        await w.waitUntilWorkingModalNotDisplayed();
        await w.waitUntilElementIsClickable(await gridElements.gridWrapper);
        await w.waitUntilWorkingModalNotDisplayed();
        await w.waitUntilElementIsDisplayed(await gridElements.newGridCheckboxSelectorByIndex(0));
        await w.waitUntilElementIsClickable(await gridElements.newGridCheckboxSelectorByIndex(0));
        await modal.openModalWithElement(await link.returnElementByLinkName('09030006225'));
        await w.waitUntilElementIsDisplayed(await partDetailsElements.cell.first());
        await w.waitUntilElementIsClickable(await link.returnElementByLinkName('Basic'));
        await w.waitUntilElementNotDisplayed(gridElements.gridSpinner);
        await link.clickOnTheLinkByName('Basic');
        await cooLogic.openCOOPopOverPartDetails();
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
        await login.loginWithDirectLink(browser.params.userAdminUrl);
        await meganav.goToFeatureWithMeganav(meganavItems.home,homeElements.bomsLinks.get(0));
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await partsSearchLogic.performPartsSearch('1622838-1');
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await link.clickOnTheLinkByName(buttonNames.cooLayout);
        await w.waitUntilWorkingModalNotDisplayed();
        await w.waitUntilElementIsClickable(await gridElements.gridWrapper);
        await w.waitUntilWorkingModalNotDisplayed();
        await w.waitUntilElementIsDisplayed(await gridElements.newGridCheckboxSelectorByIndex(0));
        await w.waitUntilElementIsClickable(await gridElements.newGridCheckboxSelectorByIndex(0));
        await modal.openModalWithElement(await link.returnElementByLinkName('1622838-1'));
        await w.waitUntilElementIsDisplayed(await partDetailsElements.cell.first());
        await w.waitUntilElementIsClickable(await link.returnElementByLinkName('Basic'));
        await link.clickOnTheLinkByName('Basic');
        await cooLogic.openCOOPopOverPartDetails();
        await cooLogic.openCOOPopOverPartDetailsMultipleCountryName(0);
        await cooLogic.openCOOPopOverPartDetailsMultipleCountryName(1);
        await cooLogic.openCOOPopOverPartDetailsMultipleCountryName(2);
    });

    it('should be Enter Part Number in search box having multiple Country of origin details and verify overAll calculation is proper', async () => {
        await cooLogic.openCOOPopOverPartDetailsMultipleCountryName(0);
        await cooLogic.verifyOverallIndicatorCalcuation();
        await cooLogic.openCOOPopOverPartDetailsMultipleCountryName(1);
        await cooLogic.verifyOverallIndicatorCalcuation();
        await cooLogic.openCOOPopOverPartDetailsMultipleCountryName(2);
        await cooLogic.verifyOverallIndicatorCalcuation();
    });
    it('should Verify clicking outside popover button closes country of origin popover', async () => {
        await w.waitUntilElementIsDisplayed(await COOElements.COOPopOver.get(0));
        await link.clickOnTheLinkByName('Basic');
        await expect(COOElements.COOPopOver.get(0).isPresent()).toBeFalsy();
    });
});