import {Login} from "../../../../components/login";
import {browser} from "protractor";
import {Grid} from "../../../../components/grid";
import {commonSearch} from "../../../../testData/search";
import {Transpose} from "../../../../components/grid";
import {Toolbar} from "../../../../components/toolbar";
import {QuickSearch} from "../../../../components/quickSearch";
import {gridElements} from "../../../../elements/elements";


const login: Login = new Login();
const grid: Grid = new Grid();
const transpose: Transpose = new Transpose();
const toolbar: Toolbar = new Toolbar();
const quickSearch: QuickSearch = new QuickSearch();

describe('Parts search, Transpose, DE110668', () => {
    it('should reset filter after switch layout in transpose', async () =>{
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await quickSearch.performQuickSearch(commonSearch.commonValue);
        await grid.newGridFilteringExactColumnByOption('Part Status', 'Discontinued');
        await transpose.switchToTransposeGrid();
        await toolbar.switchLayout('Life Cycle');
        await browser.sleep(7000);
        await transpose.switchToNewGrid();
        await grid.newGridFilterColumnCheck('Part Status', 'Discontinued', true);
    });
});