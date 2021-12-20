import {gridElements} from "../../../../elements/elements";
import {browser} from "protractor";
import {buttonNames, columnHeaders, meganavItems} from "../../../../testData/global";
import {Grid} from "../../../../components/grid";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {PartStandardizationLogic} from "../../../../bussinesLayer/bomVault/partStandardizationLogic";
import {Button} from "../../../../components/simple/button";
import {Modal} from "../../../../components/modal";
import {JasmineTimeout} from "../../../../helper/jasmineTimeout";
import {Dropdown} from "../../../../components/dropdown";
import {Actions} from "../../../../utils/actions";

const grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const partStandardizationLogic: PartStandardizationLogic = new PartStandardizationLogic();
const button: Button = new Button();
const modal: Modal = new Modal();

describe('Part Standardization, DE115426', ()=> {
    beforeAll (async() =>{
        await JasmineTimeout.setJasmineTimeout(200000);
    });

    afterAll(async() =>{
        await JasmineTimeout.setJasmineTimeout(browser.params.defaultElementWaitTime);
    });

    it(` Summary tab: Error Notification modal appers for applyed column sorting for large amounts of data`, async() =>{
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.newGridRows.get(0));
        await grid.mechanismCheckCheckboxWithAmountGreaterThan('# of Parts', 10000);
        await partStandardizationLogic.goToSummaryTab();
        await grid.newGridOpenFilterBoxByName('Matched Mfr P/N');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.last());
        let value = (await partStandardizationLogic.returnCellValuesByColumnNameSummaryTab('Matched Mfr P/N'))[0];
        await grid.newGridOpenFilterBoxByName('Matched Mfr P/N');
        await grid.switchToFilterColumnMenu();
        await Dropdown.openDropdownByClickOnElementInSortBox(gridElements.columnsSort.dropdown);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(columnHeaders.bom.filterOptions[1]);
        await Actions.sendKeys(gridElements.columnsSort.input, value.toString());
        await grid.peformSearchInColumnSort(gridElements.newGridRows.last());
        await grid.newGridOpenFilterBoxByName('Matched Mfr P/N');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.last());
        await grid.newGridOpenFilterBoxByName('Matched Mfr P/N');
        await grid.switchToFilterColumnMenu();
        browser.params.waitWebElementMaxTimeout = 300000;
        await button.clickOnTheElementAndWait(await button.returnButtonByText(buttonNames.clearFilter), gridElements.newGridRows.last());   
        await expect(await modal.modalBody.isPresent()).toBeFalsy();
        browser.params.waitWebElementMaxTimeout = 50000;
    });
});