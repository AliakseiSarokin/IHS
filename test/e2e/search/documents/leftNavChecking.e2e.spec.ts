import {buttonNames, meganavItems, modalTitles, exportOptions} from "../../../../testData/global";
import {browser} from "protractor";
import {Meganav} from "../../../../components/meganav";
const meganav:Meganav = new Meganav();
import {searchElements,gridElements} from "../../../../elements/elements";
import {DocumentsSearchLogic} from "../../../../bussinesLayer/search/documentsSearchLogic";
const documentsSearchLogic:DocumentsSearchLogic = new DocumentsSearchLogic();
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
describe('Left Nav - Documents Search', () => {

    it('should be left nav subitems - Documents Search', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.documents,
            searchElements.searchField);
        await searchLogic.perform5Searches(commonSearch.searchArray, 2, documentsSearchLogic.performDocumentsSearchWithRefine)
    });

    it('should be popover when hover on search - Documents Search', async () => {
        await searchLogic.toolTipChecking('Documents');
    });

    it('should go and change order by searches in the left nav - Documents Search', async () => {
        await searchLogic.goBySearchesInTheLeftNav(commonSearch.searchArray);
    });

});