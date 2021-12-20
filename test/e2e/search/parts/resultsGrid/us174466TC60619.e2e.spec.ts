import {Input} from "../../../../../components/simple/input";
import {Login} from "../../../../../components/login";
import {Modal} from "../../../../../components/modal";

const login: Login = new Login();
const input: Input = new Input();
const modal:Modal = new Modal();
import {Meganav} from "../../../../../components/meganav";
const meganav:Meganav = new Meganav();
import {RadioButton} from "../../../../../components/simple/radioButton";
const radioButton:RadioButton = new RadioButton();
import {PartsSearchLogic} from "../../../../../bussinesLayer/search/partsSearchLogic";
const partsSearchLogic:PartsSearchLogic = new PartsSearchLogic();
import {commonSearch, quickSearchData} from "../../../../../testData/search";
import {meganavItems} from "../../../../../testData/global";
import {searchElements, gridElements} from "../../../../../elements/elements";
import {browser} from "protractor";
import {SearchLogic} from "../../../../../bussinesLayer/search/searchLogic";
const searchLogic: SearchLogic = new SearchLogic();
import {QuickSearch} from "../../../../../components/quickSearch";
const quickSearch: QuickSearch = new QuickSearch();
import {Grid} from "../../../../../components/grid";
const grid: Grid = new Grid();
import {Toolbar} from "../../../../../components/toolbar";
import {SpecificToolbarButtons} from "../../../../../bussinesLayer/specificToolbarButtons";
const toolbar: Toolbar = new Toolbar();

describe('US174466 - Advanced Parts Search', () => {

    it('should search different values with OR - Adnvanced Parts Search', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await partsSearchLogic.orSearchCheckingAdvancedSearch('2N2201', 'Lm311', 'OR')
    });

    it('should search different values with or - Advanced Parts Search', async () => {
        await searchLogic.refineLinkChecking();
        await partsSearchLogic.orSearchCheckingAdvancedSearch('2N2201', 'Lm311', 'or')
    });

    it('should search different values with | - Advanced Parts Search', async () => {
        await searchLogic.refineLinkChecking();
        await partsSearchLogic.orSearchCheckingAdvancedSearch('2N2201', 'Lm311', '|')
    });
});

describe('US174466 - Quick Search', () => {


    it('should search different values with OR - Simple Parts Search', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await partsSearchLogic.orSearchCheckingSimpleSearch('2N2201', 'Lm311', 'OR')
    });

    it('should search different values with or - Simple Parts Search', async () => {
        await partsSearchLogic.orSearchCheckingSimpleSearch('2N2201', 'Lm311', 'or')
    });

    it('should search different values with | - Simple Parts Search', async () => {
        await partsSearchLogic.orSearchCheckingSimpleSearch('2N2201', 'Lm311', '|');
        await login.logout();
    });
});

describe('US174466 - TC60625', () => {

    it('should be option to search with entered more than 25 chars with OR', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        const searchValue: string = 'CFPO-DO-150S54.0FREQLF OR VT-700-EAE-3060-19M4400000 OR C052G339C2G5CP OR' +
            ' 2n2200 OR 2n211 OR 4040N561G251PH-HK OR 4040N132G251PH-HK OR GL6850 OR GP4020/IG/GQ1N OR MT90224AL' +
            ' OR FAGD1651132BA OR IDT77V107L25PF8 OR AFE1205E/1K OR XE2400 OR MAX3775CEE OR LUCL9313AP-D OR' +
            ' 728980JG8 OR LCP02-150M OR DS2153QN OR TISPPBL1SE OR MH88400-1 OR MV1445/IG/DPAS OR MH88636AD-4 OR' +
            ' PSB2197T OR HC1-5509A1-5 OR 2nn';
        await partsSearchLogic.performPartsSearchWithCustomWait(searchValue, modal.modalBody);
        const modalBodyText: string = 'OR condition limit exceeded. Maximum 25 values are allowed.';
        await expect(await modal.modalBody.getText()).toEqual(modalBodyText);
        await modal.closeModalWithXButton()
    });

});


describe('Search, Parts, Result Grid, US249008,View Mfr Suggested Alternates Toolbar Button', () => {

    it('should be active "Mfr Suggested Alternates Toolbar Button" for the part with Mfr Suggested Alternates', async () => {
        await quickSearch.openDropdownAndSetAType(quickSearchData.typeLabels[2]);
        await quickSearch.performQuickSearch(commonSearch.partWithMfrSuggestedAlternates);
        await grid.checkFirstCheckBoxIfNotChecked();
        await SpecificToolbarButtons.checkMfrSuggestedAlternatesButton(true);
    });

    it('should be disabled "Mfr Suggested Alternates Toolbar Button" for the part without Mfr Suggested Alternates', async () => {
        await quickSearch.openDropdownAndSetAType(quickSearchData.typeLabels[0]);
        await quickSearch.performQuickSearch(commonSearch.commonValue);
        await grid.checkFirstCheckBoxIfNotChecked();
        await SpecificToolbarButtons.checkMfrSuggestedAlternatesButton(false);
    });

});