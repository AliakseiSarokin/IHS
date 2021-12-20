import {Login} from "../../../../../components/login";
import {browser} from "protractor";
import {Meganav} from "../../../../../components/meganav";
import {
    buttonNames,
    columnHeaders,
    meganavItems,
} from "../../../../../testData/global";
import {
    gridElements,
    searchElements,
    toolbarElements,
    transposeElements
} from "../../../../../elements/elements";
import {Grid} from "../../../../../components/grid";
import {PartsSearchLogic} from "../../../../../bussinesLayer/search/partsSearchLogic";
import {commonSearch} from "../../../../../testData/search";
import {Transpose} from "../../../../../components/grid";
import {Button} from "../../../../../components/simple/button";
import {Toolbar} from "../../../../../components/toolbar";
import {Waiters} from "../../../../../helper/waiters";

const login: Login = new Login();
const meganav: Meganav = new Meganav();
const grid: Grid = new Grid();
const partsSearchLogic: PartsSearchLogic = new PartsSearchLogic();
const transpose: Transpose = new Transpose();
const button: Button = new Button();
const toolbar: Toolbar = new Toolbar();

describe('Parts search, Transpose, DE110800', () => {
    it('should hide columns transpose grid and compare columns', async () =>{
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await grid.newGridHideColumnByName(columnHeaders.search.partsDefaultLayout[1]);
        await grid.newGridHideColumnByName(columnHeaders.search.partsDefaultLayout[2]);
        await grid.newGridHideColumnByName(columnHeaders.search.partsDefaultLayout[3]);
        let newGridHeaders: string[] = await gridElements.newGridHeaderNames.getText();
        await button.clickOnTheElementAndWait(toolbarElements.transposeButton, transposeElements.unlockedColumnCellsWithContent.get(0));
        let transposeHeaders: string[] = await transpose.transposeReturnCellValuesByColumnName(0,
            'Attributes');
        await transpose.checkingArrayContainSecondArray(newGridHeaders, transposeHeaders);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await toolbar.closeToolbarDropdownByButtonName('Life Cycle');
        transposeHeaders = await transpose.transposeReturnCellValuesByColumnName(0,
            'Attributes');
        await transpose.checkingArrayContainSecondArray(newGridHeaders, transposeHeaders);
    });

    it('should return on new grid and compare columns', async () =>{
        let transposeHeaders: string[] = await transpose.transposeReturnCellValuesByColumnName(0,
            'Attributes');
        await button.clickOnTheElementAndWait(toolbarElements.transposeButton, gridElements.newGridOpenHeaderSortButton.get(0));
        await Waiters.waitUntilElementIsClickable(gridElements.newGridHeaderNames.get(0));
        let newGridHeaders: string[] = await gridElements.newGridHeaderNames.getText();
        await transpose.checkingArrayContainSecondArray(newGridHeaders, transposeHeaders);
    });
});