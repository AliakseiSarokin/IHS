import {browser} from "protractor";
import {commonSearch} from "../../../../../../testData/search";
import {Grid} from "../../../../../../components/grid";
import {Login} from "../../../../../../components/login";
import {QuickSearch} from "../../../../../../components/quickSearch";
import {Transpose} from "../../../../../../components/grid";


const grid: Grid = new Grid();
const login: Login = new Login();
const quickSearch: QuickSearch = new QuickSearch();
const transpose: Transpose = new Transpose();

describe('DE110581', () => {

    it('applied filter should be saved when move back from transpose to native grid ', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await quickSearch.performQuickSearch(commonSearch.commonValue);
        await grid.newGridFilteringExactColumnByOption('Part Status', 'Active');
        await transpose.switchToTransposeGrid();
        await transpose.switchToNewGrid();
        await grid.newGridFilterColumnCheck('Part Status', 'Active', true);
    });

});
