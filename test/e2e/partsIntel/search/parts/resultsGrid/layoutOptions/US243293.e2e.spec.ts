import {browser} from "protractor";
import {buttonNames, columnHeaders, meganavItems} from "../../../../../../../testData/global";
import {commonSearch, quickSearchData} from "../../../../../../../testData/search";
import {CustomLayoutLogic} from "../../../../../../../bussinesLayer/bomVault/customLayoutLogic";
import {Grid} from "../../../../../../../components/grid";
import {Login} from "../../../../../../../components/login";
import {Meganav} from "../../../../../../../components/meganav";
import {Toolbar} from "../../../../../../../components/toolbar";
import {PartsSearchLogic} from "../../../../../../../bussinesLayer/search/partsSearchLogic";
import {QuickSearch} from "../../../../../../../components/quickSearch";
import {gridElements, searchElements} from "../../../../../../../elements/elements";
import {Shade} from "../../../../../../../components/shade";
const customLayoutLogic: CustomLayoutLogic = new CustomLayoutLogic();
const grid: Grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const partsSearchLogic: PartsSearchLogic = new PartsSearchLogic();
const toolbar: Toolbar = new Toolbar();
const quickSearch: QuickSearch = new QuickSearch();
describe('US243293  Add Export Compliance Attributes to Manage Layouts for Part Search Results', () => {

    it('TC68498 - should be  Export Compliance Attributes attributes in custom layout', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrlPI);
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await Shade.openShadeWithButton(buttonNames.manageLayouts);
        await customLayoutLogic.selectCreateNewCustomLayout();
        await customLayoutLogic.addAttributeByRangeNames(['ECCN',
            'ECCN Governance', 'HTS Code', 'SB Code']);
        await customLayoutLogic.saveNewCustomLayout();
        await expect(await gridElements.newGridColumnHeaderNamesLockUnlock(1).getText()).toEqual(['ECCN',
        'ECCN Governance', 'HTS Code', 'SB Code']);
        await login.loginWithDirectLink(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await customLayoutLogic.openCreatedCustomLayout(commonSearch.manageLayout.defaultValues.length);
        await customLayoutLogic.deleteLayout();
    });


});
