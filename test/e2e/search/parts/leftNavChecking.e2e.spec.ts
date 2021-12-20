import {buttonNames, meganavItems, modalTitles, exportOptions} from "../../../../testData/global";
import {browser} from "protractor";
import {Meganav} from "../../../../components/meganav";
const meganav:Meganav = new Meganav();
import {searchElements,gridElements} from "../../../../elements/elements";
import {PartsSearchLogic} from "../../../../bussinesLayer/search/partsSearchLogic";
const partsSearchLogic:PartsSearchLogic = new PartsSearchLogic();
import {Login} from "../../../../components/login";
const login: Login = new Login();
import {Toolbar} from "../../../../components/toolbar";
const toolbar: Toolbar = new Toolbar();
import {Dropdown} from "../../../../components/dropdown";
const dropdown: Dropdown = new Dropdown();
import {SearchLogic} from "../../../../bussinesLayer/search/searchLogic";
const searchLogic: SearchLogic = new SearchLogic();
import {commonSearch} from "../../../../testData/search";
import {Modal} from "../../../../components/modal";
const modal:Modal = new Modal();
import {Grid} from "../../../../components/grid";
const grid:Grid = new Grid();
describe('Left Nav - Parts Search', () => {

    it('should be left nav subitems - Parts Search', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await searchLogic.perform5Searches(commonSearch.searchArray, 0, partsSearchLogic.performPartsSearchWithRefine)
    });

    it('should be popover when hover on search - Parts Search', async () => {
        await searchLogic.toolTipChecking("Parts");
    });

    it('should go and change order by searches in the left nav - Parts Search', async () => {
        await searchLogic.goBySearchesInTheLeftNav(commonSearch.searchArray);
    });

});