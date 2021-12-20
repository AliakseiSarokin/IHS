import {Login} from "../../../../../../components/login";
const login: Login = new Login();
import {ElementAttributes} from "../../../../../../utils/elementAttributes";
import {Modal} from "../../../../../../components/modal";
import {PartsSearchLogic} from "../../../../../../bussinesLayer/search/partsSearchLogic";
import {RadioButton} from "../../../../../../components/simple/radioButton";
import {SearchLogic} from "../../../../../../bussinesLayer/search/searchLogic";
import {QuickSearch} from "../../../../../../components/quickSearch";
import {commonSearch} from "../../../../../../testData/search";
import {fieldStatuses, meganavItems} from "../../../../../../testData/global";
import {searchElements, gridElements, quickSearchElements} from "../../../../../../elements/elements";
import {browser} from "protractor";
const elementAttributes: ElementAttributes = new ElementAttributes();
const modal: Modal = new Modal();
const partsSearchLogic:PartsSearchLogic = new PartsSearchLogic();
const radioButton:RadioButton = new RadioButton();
const searchLogic: SearchLogic = new SearchLogic();
const quickSearch: QuickSearch = new QuickSearch();
const invalidSearchCriteria: string = 'sdfsdfsdfsdf';

describe('TC67343 - Validation of max part numbers allowed in search field and separeted with OR', () => {
    afterAll(async () => {
        await login.logout();
    });

    it('should be option to search with entered more than 25 chars with OR', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await quickSearch.clickOnX();
        const searchValue: string = 'CFPO-DO-150S54.0FREQLF OR VT-700-EAE-3060-19M4400000 OR C052G339C2G5CP OR' +
            ' 2n2200 OR 2n211 OR 4040N561G251PH-HK OR4040N132G251PH-HK OR GL6850 OR GP4020/IG/GQ1N OR ' +
            'MT90224AL OR FAGD1651132BA OR IDT77V107L25PF8 OR AFE1205E/1K OR XE2400 OR MAX3775CEE OR ' +
            'LUCL9313AP-D OR 728980JG8 OR LCP02-150M OR DS2153QN OR TISPPBL1SE OR MH88400-1 OR MV1445/IG/DPAS OR ' +
            'MH88636AD-4 OR PSB2197T OR HC1-5509A1-5 OR';
        await quickSearch.performQuickSearch(searchValue);
    });

    it('should be option to search with entered more than 25 chars with or', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await quickSearch.clickOnX();
        const searchValue: string = 'CFPO-DO-150S54.0FREQLF or VT-700-EAE-3060-19M4400000 or C052G339C2G5CP or 2n2200 ' +
            'or 2n211 or 4040N561G251PH-HK or 4040N132G251PH-HK or GL6850 or GP4020/IG/GQ1N or MT90224AL or FAGD1651132BA' +
            ' or IDT77V107L25PF8 or AFE1205E/1K or XE2400 or MAX3775CEE or LUCL9313AP-D or 728980JG8 or LCP02-150M ' +
            'or DS2153QN or TISPPBL1SE or MH88400-1 or MV1445/IG/DPAS or MH88636AD-4 or PSB2197T or HC1-5509A1-5 or';
        await quickSearch.performQuickSearch(searchValue);
    });

    it('should be notification modal with entered more than 25 chars with |', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await quickSearch.clickOnX();
        const searchValue: string = 'CFPO-DO-150S54.0FREQLF | VT-700-EAE-3060-19M4400000 | C052G339C2G5CP | 2n2200 | 2n211 |' +
            ' 4040N561G251PH-HK | 4040N132G251PH-HK | GL6850 | GP4020/IG/GQ1N | MT90224AL | FAGD1651132BA | IDT77V107L25PF8 |' +
            ' AFE1205E/1K | XE2400 | MAX3775CEE | LUCL9313AP-D | 728980JG8 | LCP02-150M | DS2153QN | TISPPBL1SE | MH88400-1 ' +
            '| MV1445/IG/DPAS | MH88636AD-4 | PSB2197T | HC1-5509A1-5 | ';
        await quickSearch.performQuickSearchWithWait(searchValue, modal.modalBody);
        await expect(await modal.modalBody.getText())
            .toEqual('OR condition limit exceeded. Maximum 25 values are allowed.');
        await modal.closeModalWithXButton()
    });

});