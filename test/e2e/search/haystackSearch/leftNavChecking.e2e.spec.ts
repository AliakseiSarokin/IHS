import {buttonNames, meganavItems, modalTitles, exportOptions} from "../../../../testData/global";
import {browser} from "protractor";
import {Meganav} from "../../../../components/meganav";
const meganav:Meganav = new Meganav();
import {searchElements,gridElements} from "../../../../elements/elements";
import {HaystackSearchLogic} from "../../../../bussinesLayer/search/haystackSearchLogic";
const haystackSearchLogic = new HaystackSearchLogic();
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
import {Slider} from "../../../../components/slider";
const slider = new Slider();
describe('Left Nav - Haystack Search', () => {

    it('should be left nav subitems - Haystack Search', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.haystack,
            searchElements.haystack.partNumberOrNsnX);
        await searchLogic.perform5Searches(commonSearch.haystackSearchArray, 6,
            haystackSearchLogic.performHaystackSearchWithRefine);
    });

    it('should be popover when hover on search - Haystack Search', async () => {
        await searchLogic.toolTipChecking("Haystack");
    });

    it('should go and change order by searches in the left nav - Haystack Search', async () => {
        await searchLogic.goBySearchesInTheLeftNav(commonSearch.haystackSearchArray);
    });

});