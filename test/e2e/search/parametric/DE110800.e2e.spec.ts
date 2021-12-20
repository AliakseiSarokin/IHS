import {Login} from "../../../../components/login";
import {browser} from "protractor";
import {Meganav} from "../../../../components/meganav";
import {
    buttonNames,
    columnHeaders,
    meganavItems,
} from "../../../../testData/global";
import {
    gridElements,
    searchElements,
    toolbarElements,
    transposeElements
} from "../../../../elements/elements";
import {Grid} from "../../../../components/grid";
import {ParametricSearchLogic} from "../../../../bussinesLayer/search/parametricSearchLogic";
import {Transpose} from "../../../../components/grid";
import {Button} from "../../../../components/simple/button";
import {Toolbar} from "../../../../components/toolbar";

const login: Login = new Login();
const meganav: Meganav = new Meganav();
const grid: Grid = new Grid();
const parametricSearchLogic: ParametricSearchLogic = new ParametricSearchLogic();
const transpose: Transpose = new Transpose();
const button: Button = new Button();
const toolbar: Toolbar = new Toolbar();

describe('Parametric search, Transpose, DE110800', () => {
    it('should hide columns transpose grid and compare columns', async () =>{
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parametric,
            searchElements.parametric.commodities.get(0));
        await parametricSearchLogic.performParametricSearch();
        await grid.newGridHideColumnByName(columnHeaders.search.partsDefaultLayout[1]);
        await grid.newGridHideColumnByName(columnHeaders.search.partsDefaultLayout[2]);
        await grid.newGridHideColumnByName(columnHeaders.search.partsDefaultLayout[3]);
        const newGridHeaders: string[] = await grid.newGridGetVisibleColumnHeaders();
        await button.clickOnTheElementAndWait(toolbarElements.transposeButton, transposeElements.unlockedColumnCellsWithContent.get(0));
        let transposeHeaders: string[] = await transpose.transposeReturnCellValuesByColumnName(0,
            'Attributes');
        await transpose.checkingArrayContainSecondArray(newGridHeaders, transposeHeaders);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await toolbar.closeToolbarDropdownByButtonName('Add Risk Attributes');
        transposeHeaders = await transpose.transposeReturnCellValuesByColumnName(0,
            'Attributes');
        await transpose.checkingArrayContainSecondArray(newGridHeaders, transposeHeaders);
    });

    it('should return on new grid and compare columns', async () =>{
        let transposeHeaders: string[] = await transpose.transposeReturnCellValuesByColumnName(0,
            'Attributes');
        await button.clickOnTheElementAndWait(toolbarElements.transposeButton, gridElements.newGridOpenHeaderSortButton.get(0));
        const newGridHeaders: string[] = await grid.newGridGetVisibleColumnHeaders();
        await transpose.checkingArrayContainSecondArray(newGridHeaders, transposeHeaders);
    });
});