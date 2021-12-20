import {Button} from "../../../../../components/simple/button";
import {browser} from "protractor";
import {buttonNames, meganavItems} from "../../../../../testData/global";
import {CustomLayoutLogic} from "../../../../../bussinesLayer/bomVault/customLayoutLogic";
import {commonSearch} from "../../../../../testData/search";
import {Grid} from "../../../../../components/grid";
import {gridElements, searchElements} from "../../../../../elements/elements";
import {Login} from "../../../../../components/login";
import {Meganav} from "../../../../../components/meganav";
import {PartsSearchLogic} from "../../../../../bussinesLayer/search/partsSearchLogic";
import {Shade} from "../../../../../components/shade";
import {Toolbar} from "../../../../../components/toolbar";

const button: Button = new Button();
const customLayoutLogic: CustomLayoutLogic = new CustomLayoutLogic();
const grid: Grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const partsSearchLogic: PartsSearchLogic = new PartsSearchLogic();
const toolbar: Toolbar = new Toolbar();

describe('DE104809', () => {

    const columns: string[] = ['FMD Information Exist'];

    afterEach(async () => {
        await customLayoutLogic.openCreatedCustomLayout(commonSearch.manageLayout.defaultValues.length);
        await customLayoutLogic.deleteLayout();
    });

    it('should show results for FMD Information Exist filter', async () => {
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
        await button.clickOnTheElement(gridElements.columnsSort.readchCompiliant.noRadioButtonLabel);
        await grid.peformSearchInColumnSort(gridElements.newGridCellByRowIndex(0).get(0));
        await expect(await gridElements.newGridSimpleTextCell.get(0).isPresent()).toBeTruthy();
    });
});
