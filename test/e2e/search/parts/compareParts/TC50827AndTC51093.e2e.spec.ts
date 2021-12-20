import {buttonNames, meganavItems, modalTitles, exportOptions} from "../../../../../testData/global";
import {browser} from "protractor";
import {Button} from "../../../../../components/simple/button";
const button: Button = new Button();
import {Meganav} from "../../../../../components/meganav";
const meganav:Meganav = new Meganav();
import {searchElements, gridElements} from "../../../../../elements/elements";
import {PartsSearchLogic} from "../../../../../bussinesLayer/search/partsSearchLogic";
const partsSearchLogic:PartsSearchLogic = new PartsSearchLogic();
import {Login} from "../../../../../components/login";
const login: Login = new Login();
import {Toolbar} from "../../../../../components/toolbar";
const toolbar: Toolbar = new Toolbar();
import {Dropdown} from "../../../../../components/dropdown";
const dropdown: Dropdown = new Dropdown();
import {SearchLogic} from "../../../../../bussinesLayer/search/searchLogic";
const searchLogic: SearchLogic = new SearchLogic();
import {commonSearch} from "../../../../../testData/search";
import {Modal} from "../../../../../components/modal";
const modal:Modal = new Modal();
import {Grid} from "../../../../../components/grid";
const grid:Grid = new Grid();
import {ComparePartsLogic} from "../../../../../bussinesLayer/search/comparePartsLogic";
const comparePartsLogic = new ComparePartsLogic();
import {File} from "../../../../../utils/file";
const file: File = new File();

describe('TC50827 TC51093 Compare Parts - Export Button and XLS File Download', () => {

    it('should be inactive compare button whe one row is selected - Parts Search', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await expect(button.returnButtonByText(buttonNames.compareSelected).isEnabled()).toBeFalsy();
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await expect(button.returnButtonByText(buttonNames.compareSelected).isEnabled()).toBeFalsy();

    });

    it('should be active compare button whe two rows are selected - Parts Search', async () => {
        await grid.newMechanismCheckboxRangeChecking(1,2);
        await expect(button.returnButtonByText(buttonNames.compareSelected).isEnabled()).toBeTruthy();

    });

    it('should be inactive compare button whe more than 10 row is selected - Parts Search', async () => {
        await grid.newMechanismCheckboxRangeChecking(2,11);
        await expect(button.returnButtonByText(buttonNames.compareSelected).isEnabled()).toBeFalsy();
    });

    it('should be inactive compare button whe more than 10 row is selected on the next page - Parts Search', async () => {
        await searchLogic.refineLinkChecking();
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await grid.newMechanismCheckboxRangeChecking(0,6);
        await grid.goToTheNextPage();
        await expect(button.returnButtonByText(buttonNames.compareSelected).isEnabled()).toBeTruthy();
        await grid.checkCheckboxRangeNewGrid(1,6);
        await expect(button.returnButtonByText(buttonNames.compareSelected).isEnabled()).toBeFalsy();
    });

    it('should open compare button with selected 4 - Parts Search', async () => {
        await searchLogic.refineLinkChecking();
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await grid.checkCheckboxRange(1,5);
        await expect(button.returnButtonByText(buttonNames.compareSelected).isEnabled()).toBeTruthy();
        await modal.openModalWithButtonByName(buttonNames.compareSelected);
        await expect(modal.modalTitle.getText()).toEqual(modalTitles.compareParts('4'));
        await expect(await searchElements.comparePartsSubtitle.getText()).toEqual(commonSearch.comparePartsSubtitle('4'));
    });


    it('should be active export button', async () => {
        await expect(button.returnButtonByTextInModal(buttonNames.export).isEnabled()).toBeTruthy();
    });

    it('should export file for Compare Parts - Parts Search', async () => {
        await modal.checkingExportFile(buttonNames.export, 'nothing', gridElements.grid,
            exportOptions.search.compareParts.fileName);
    });

});