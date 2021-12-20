import {searchElements, gridElements, bomElements, quickSearchElements} from "../../../../../../elements/elements";
import {browser} from "protractor";
import {Grid} from "../../../../../../components/grid";
import {Link} from "../../../../../../components/simple/link";
import {Login} from "../../../../../../components/login";
import {Toolbar} from "../../../../../../components/toolbar";
import {QuickSearch} from "../../../../../../components/quickSearch";
import {commonSearch} from "../../../../../../testData/search";
import {buttonNames} from "../../../../../../testData/global";
import {Dropdown} from "../../../../../../components/dropdown";
const grid: Grid = new Grid();
const link: Link = new Link();
const login: Login = new Login();
const toolbar: Toolbar = new Toolbar();
const quickSearch: QuickSearch = new QuickSearch();
describe('DE107964 - Parts Search results page: Toolbar filter doesn\'t discard checkbox selections', () => {

    it('should unckeck row selection after applying filter', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await quickSearch.performQuickSearch(commonSearch.commonValue);
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await Dropdown.selectValueInDropdownByValueName('Life Cycle');
        await expect(await gridElements.newGridCheckboxSelectorByIndex(0).isSelected()).toBeFalsy();
    });

});