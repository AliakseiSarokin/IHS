import {Login} from "../../../../../components/login";
import {browser} from "protractor";
import {
    columnHeaders,
    meganavItems, modalTitles,
} from "../../../../../testData/global";
import {
    gridElements, modalElements,
    toolbarElements,
} from "../../../../../elements/elements";
import {Grid} from "../../../../../components/grid";
import {commonSearch} from "../../../../../testData/search";
import {Button} from "../../../../../components/simple/button";
import {QuickSearch} from "../../../../../components/quickSearch";
import {Transpose} from "../../../../../components/grid";

const login: Login = new Login();
const grid: Grid = new Grid();
const button: Button = new Button();
const quickSearch: QuickSearch = new QuickSearch();
const transpose: Transpose = new Transpose();

describe('Parts search, Transpose, DE110746', () => {
    it('should save sorting after we go on transpose and return on grid', async () =>{
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await quickSearch.performQuickSearch(commonSearch.commonValue);
        await grid.newGridOpenFilterBoxByName('Mfr Name');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.descSort, gridElements.newGridRows.get(0));
        await transpose.switchToTransposeGrid();
        await transpose.switchToNewGrid();
        await expect(await gridElements.descSortingHeaderIcon.isPresent()).toBeTruthy();
    });
});