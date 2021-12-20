import {browser} from "protractor";
import {buttonNames, columnHeaders, meganavItems} from "../../../../../testData/global";
import {CustomLayoutLogic} from "../../../../../bussinesLayer/bomVault/customLayoutLogic";
import {commonSearch} from "../../../../../testData/search";
import {Grid} from "../../../../../components/grid";
import {Login} from "../../../../../components/login";
import {Meganav} from "../../../../../components/meganav";
import {gridElements} from "../../../../../elements/elements";
import {Toolbar} from "../../../../../components/toolbar";
import {QuickSearch} from "../../../../../components/quickSearch";
import {Link} from "../../../../../components/simple/link";
import {ElementAttributes} from "../../../../../utils/elementAttributes";
import {CheckBox} from "../../../../../components/simple/checkBox";

const checkbox: CheckBox = new CheckBox();
const grid: Grid = new Grid();
const elementAttributes: ElementAttributes = new ElementAttributes();
const link: Link = new Link();
const login: Login = new Login();
const toolbar: Toolbar = new Toolbar();
const quickSearch: QuickSearch = new QuickSearch();

describe('Parts search, US307582', () => {

    it('should return 10-15 for Availability (YTEOL) when filtering by > 8 years.', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await quickSearch.performQuickSearchWithWait(commonSearch.commonValue, gridElements.newGridRows.first());
        await toolbar.switchLayout('Life Cycle');
        await grid.newGridHideColumnsRange([columnHeaders.search.partsLifeCycleLayout[7]]);
        await grid.newGridOpenFilterBoxByName(columnHeaders.search.partsLifeCycleLayout[9]);
        await checkbox.uncheckGridColumnSortCheckByName('(Select All)');
        await checkbox.checkGridColumnSortCheckByName('> 8 years');
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        await expect(await grid.returnCellValuesByColumnName(1, columnHeaders.search.partsLifeCycleLayout[9])).toContain('10 - 15');
    });
});
