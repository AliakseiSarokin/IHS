import {Button} from "../../../../../components/simple/button";
import {browser} from "protractor";
import {buttonNames, linksNames, meganavItems} from "../../../../../testData/global";
import {CustomLayoutLogic} from "../../../../../bussinesLayer/bomVault/customLayoutLogic";
import {commonSearch} from "../../../../../testData/search";
import {Grid} from "../../../../../components/grid";
import {gridElements, searchElements, toolbarElements} from "../../../../../elements/elements";
import {Link} from "../../../../../components/simple/link";
import {Login} from "../../../../../components/login";
import {Meganav} from "../../../../../components/meganav";
import {PartsSearchLogic} from "../../../../../bussinesLayer/search/partsSearchLogic";
import {Shade} from "../../../../../components/shade";
import {Toolbar} from "../../../../../components/toolbar";

const button: Button = new Button();
const customLayoutLogic: CustomLayoutLogic = new CustomLayoutLogic();
const grid: Grid = new Grid();
const link: Link = new Link();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const partsSearchLogic: PartsSearchLogic = new PartsSearchLogic();
const toolbar: Toolbar = new Toolbar();

describe('DE104915 and DE104908', () => {

    const columns: string[] = ['FMD Information Exist', 'REACH Compliant'];

    afterAll(async () => {
        await customLayoutLogic.openCreatedCustomLayout(commonSearch.manageLayout.defaultValues.length);
        await customLayoutLogic.deleteLayout();
    });

    it("DE104915 - should become discarded displaying value selected in Common filter, when Common filter is set to defaults", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await Shade.openShadeWithButton(buttonNames.manageLayouts);
        await customLayoutLogic.selectCreateNewCustomLayout();
        await customLayoutLogic.addAttributeByRangeNames(columns);
        await customLayoutLogic.saveNewCustomLayout();
        await grid.newGridOpenFilterBoxByName(columns[0]);
        await expect(await gridElements.columnsSort.readchCompiliant.yesRadioButtonInput.isSelected()).toBeFalsy();
        await expect(await gridElements.columnsSort.readchCompiliant.noRadioButtonInput.isSelected()).toBeFalsy();
    });

    it("DE104908 - 'Column Filters' button, from toolbar, should popover display selected value 'Yes'", async () => {
        await button.clickOnTheElement(gridElements.columnsSort.readchCompiliant.yesRadioButtonLabel);
        await grid.peformSearchInColumnSort(gridElements.grid);
        await button.clickOnTheElementAndWait(link.returnElementByLinkName(linksNames.columnFilters),
            toolbarElements.filterInfo.get(0));
        await expect(await toolbarElements.filterInfo.get(0).getText()).toEqual(columns[0] + ' : Yes');
    });

    it("DE104908 - 'Column Filters' button, from toolbar, should popover display selected value 'No'", async () => {
        await grid.newGridOpenFilterBoxByName(columns[1]);
        await button.clickOnTheElement(gridElements.columnsSort.readchCompiliant.noRadioButtonLabel);
        await grid.peformSearchInColumnSort(gridElements.grid);
        await button.clickOnTheElementAndWait(link.returnElementByLinkName(linksNames.columnFilters),
            toolbarElements.filterInfo.get(0));
        await expect(await toolbarElements.filterInfo.get(0).getText()).toEqual(columns[0] + ' : Yes');
        await expect(await toolbarElements.filterInfo.get(1).getText()).toEqual(columns[1] + ' : No');
    });
});
