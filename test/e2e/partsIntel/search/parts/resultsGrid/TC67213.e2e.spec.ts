import {browser} from "protractor";
import {commonSearch} from "../../../../../../testData/search";
import {Button} from "../../../../../../components/simple/button";
import {Dropdown} from "../../../../../../components/dropdown";
import {Grid} from "../../../../../../components/grid";
import {Login} from "../../../../../../components/login";
import {Meganav} from "../../../../../../components/meganav";
import {Modal} from "../../../../../../components/modal";
import {buttonNames, columnHeaders, meganavItems} from "../../../../../../testData/global";
import {PartsSearchLogic} from "../../../../../../bussinesLayer/search/partsSearchLogic";
import {Toolbar} from "../../../../../../components/toolbar";
import {QuickSearch} from "../../../../../../components/quickSearch";
import {gridElements, searchElements} from "../../../../../../elements/elements";

const button: Button = new Button();
const grid: Grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const partsSearchLogic: PartsSearchLogic = new PartsSearchLogic();
const toolbar: Toolbar = new Toolbar();
const quickSearch: QuickSearch = new QuickSearch();
describe('TC67213 check for the part contains search behaviour in the application for quick search,part search and view single bom page', () => {

    it('should show grid with 85 chars and part contains - quick search', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        const searchValue: string = 'EN2287-120 DIN1850-4-M55D8X66Z8X56DIN1850-4' +
            '-N3D8X12Z8X4DIN1850-4-N28D8X42Z8X22NA0270C020080PNA0270-012021DNA0270A020095NA0270B022077RR';
        await quickSearch.setATypeAndPerformAQuickSearch('Part # Contains', searchValue, gridElements.grid);
    });

    it('should be warning modal for DIN1850-4-N28D8X42Z8X22 | NA0270C020080 - quick search', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        const searchValue: string = 'DIN1850-4-N28D8X42Z8X22 | NA0270C020080';
        await quickSearch.setATypeAndPerformAQuickSearch('Part # Contains', searchValue, modal.modalBody);
        const warningText: string = 'A Part Number Contains search does not support the use of the Boolean OR search operator. ' +
            'Please limit your search to a single part number, or change your search type to Part # Starts With or Exact Part #'
        await expect(await modal.modalBody.getText()).toEqual(warningText);
        await modal.closeModalWithXButton();
    });

    it('should be warning modal for DIN1850-4-N28D8X42Z8X22 OR NA0270C020080 - quick search', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        const searchValue: string = 'DIN1850-4-N28D8X42Z8X22 OR NA0270C020080 ';
        await quickSearch.setATypeAndPerformAQuickSearch('Part # Contains', searchValue, modal.modalBody);
        const warningText: string = 'A Part Number Contains search does not support the use of the Boolean OR search operator. ' +
            'Please limit your search to a single part number, or change your search type to Part # Starts With or Exact Part #'
        await expect(await modal.modalBody.getText()).toEqual(warningText);
        await modal.closeModalWithXButton();
    });

    it('should show grid with 85 chars and part contains - parts search', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        const searchValue: string = 'EN2287-120 DIN1850-4-M55D8X66Z8X56DIN1850-4' +
            '-N3D8X12Z8X4DIN1850-4-N28D8X42Z8X22NA0270C020080PNA0270-012021DNA0270A020095NA0270B022077RR';
        await partsSearchLogic.checkPartNamberRadioButton('Part Number Contains');
        await partsSearchLogic.performPartsSearchWithCustomWait(searchValue, gridElements.grid);

    });

    it('should be warning modal for DIN1850-4-N28D8X42Z8X22 | NA0270C020080 - parts search', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        const searchValue: string = 'DIN1850-4-N28D8X42Z8X22 | NA0270C020080';
        await partsSearchLogic.checkPartNamberRadioButton('Part Number Contains');
        await partsSearchLogic.performPartsSearchWithCustomWait(searchValue, modal.modalBody);
        const warningText: string = 'A Part Number Contains search does not support the use of the Boolean OR search operator. ' +
            'Please limit your search to a single part number, or change your search type to Part # Starts With or Exact Part #'
        await expect(await modal.modalBody.getText()).toEqual(warningText);
        await modal.closeModalWithXButton();
    });

    it('should be warning modal for DIN1850-4-N28D8X42Z8X22 OR NA0270C020080 - parts search', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        const searchValue: string = 'DIN1850-4-N28D8X42Z8X22 OR NA0270C020080 ';
        await partsSearchLogic.checkPartNamberRadioButton('Part Number Contains');
        await partsSearchLogic.performPartsSearchWithCustomWait(searchValue, modal.modalBody);
        const warningText: string = 'A Part Number Contains search does not support the use of the Boolean OR search operator. ' +
            'Please limit your search to a single part number, or change your search type to Part # Starts With or Exact Part #'
        await expect(await modal.modalBody.getText()).toEqual(warningText);
        await modal.closeModalWithXButton();
    });

});

