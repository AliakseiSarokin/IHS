import {Login} from "../../../../../../components/login";
const login: Login = new Login();
import {Grid} from "../../../../../../components/grid";
import {ElementAttributes} from "../../../../../../utils/elementAttributes";
import {Modal} from "../../../../../../components/modal";
import {PartsSearchLogic} from "../../../../../../bussinesLayer/search/partsSearchLogic";
import {RadioButton} from "../../../../../../components/simple/radioButton";
import {SearchLogic} from "../../../../../../bussinesLayer/search/searchLogic";
import {QuickSearch} from "../../../../../../components/quickSearch";
import {commonSearch} from "../../../../../../testData/search";
import {fieldStatuses, meganavItems, modalTitles} from "../../../../../../testData/global";
import {searchElements, gridElements, quickSearchElements} from "../../../../../../elements/elements";
import {browser} from "protractor";
const grid: Grid = new Grid();
const elementAttributes: ElementAttributes = new ElementAttributes();
const modal: Modal = new Modal();
const partsSearchLogic:PartsSearchLogic = new PartsSearchLogic();
const radioButton:RadioButton = new RadioButton();
const searchLogic: SearchLogic = new SearchLogic();
const quickSearch: QuickSearch = new QuickSearch();
const invalidSearchCriteria: string = 'sdfsdfsdfsdf';

describe('TC67357 - "Part # Contains" option of part search', () => {

    beforeEach(async() => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
    });

    afterAll(async () => {
        await login.logout();
    });

    it('should be option to search with entered more than 3 symbols', async () => {
        await quickSearch.setATypeAndPerformAQuickSearch('Part # Contains',
            '11111', gridElements.grid);
        const partNumberCells: string [] = await grid.newGridReturnCellValuesByColumnName(0,
            'Part Number');

    });

    it('should be option to search with entered  special chars - 123@123', async () => {
        await quickSearch.setATypeAndPerformAQuickSearch('Part # Contains',
            '123@123', gridElements.grid)
    });

    it('should be option to search with entered  special chars - lm%123', async () => {
        await quickSearch.setATypeAndPerformAQuickSearch('Part # Contains',
            'lm%123', gridElements.grid)
    });

    it('should be warning modal with entered special chars - &$%@#', async () => {
        await quickSearch.setATypeAndPerformAQuickSearch('Part # Contains',
            '&$%@#', modal.returnModalTitleByName('Error Notification'));
        await expect(await modal.modalBody.getText())
            .toEqual('The search term must contain at least 4 alphanumeric characters. Examples are \'2n222\', \'F245\', etc.');
        await modal.closeModalWithXButton()
    });

    it('should be disabled and checked ignore spec char checkbox', async () => {
        await quickSearch.openDropdownAndSetAType('Part # Contains');
        await expect(await elementAttributes.getElementAttribute(quickSearchElements.ignoreSpecCharInput, 'disabled'))
            .toEqual('true');
        await expect(await quickSearchElements.ignoreSpecCharInput.isSelected()).toBeTruthy()
    });

});