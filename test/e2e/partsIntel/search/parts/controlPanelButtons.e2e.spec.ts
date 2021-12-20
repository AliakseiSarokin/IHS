import {buttonNames, meganavItems, modalTitles, exportOptions} from "../../../../../testData/global";
import {browser} from "protractor";
import {Meganav} from "../../../../../components/meganav";
import {Button} from "../../../../../components/simple/button";
const button: Button = new Button();
import {Input} from "../../../../../components/simple/input";
const input: Input = new Input();
const meganav: Meganav = new Meganav();
import {searchElements, gridElements, dropdownElements} from "../../../../../elements/elements";
import {PartsSearchLogic} from "../../../../../bussinesLayer/search/partsSearchLogic";

const partsSearchLogic: PartsSearchLogic = new PartsSearchLogic();
import {Login} from "../../../../../components/login";

const login: Login = new Login();
import {Toolbar} from "../../../../../components/toolbar";

const toolbar: Toolbar = new Toolbar();
import {Dropdown} from "../../../../../components/dropdown";

import {SearchLogic} from "../../../../../bussinesLayer/search/searchLogic";

const searchLogic: SearchLogic = new SearchLogic();
import {commonSearch} from "../../../../../testData/search";
import {Modal} from "../../../../../components/modal";

const modal: Modal = new Modal();
import {Grid} from "../../../../../components/grid";

const grid: Grid = new Grid();
import {StringArray} from "../../../../../utils/stringArray";

const stringArray: StringArray = new StringArray();
describe('Part Search - Search Results Page Control Panel Buttons  ', () => {

    it('should perform Parts Search and display results grid', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
    });

    it('should be unhide button with dropdown list  - Part Search Results Page', async () => {
        await toolbar.unhideDropdown();
    });

    it('should hide the column - Part Search Results Page', async () => {
        await grid.newGridHideColumnByName('Rel Info');
        await toolbar.displayHiddenColumnInDropdonwToolbar('Rel Info')
    });

    it('should unhide the column with Unhode All - Part Search Results Page', async () => {
        await toolbar.unhideCellNameWithUnhideAll('Rel Info');
    });

    it('should be filters - Part Search Results Page ', async () => {
        await Dropdown.openDropdownByClickOnElement(toolbar.layoutButton, dropdownElements.layoutTitles.last());
        await stringArray.arrayContain(commonSearch.partsLayout, await dropdownElements.dropdownValues.getText());
        await stringArray.arrayContain(commonSearch.groupTitle, await dropdownElements.layoutTitles.getText());
        await Dropdown.closeDropdownByClickOnElement(toolbar.layoutButton);
    });


    it('should open single research request modal - Part Search Results Page', async () => {
        await grid.newMechanismCheckboxRangeChecking(0, 1);
        await modal.openModalWithButtonByName(buttonNames.resRequest);
        await expect(modal.modalTitle.getText()).toEqual(modalTitles.singleResReq);
        await modal.closeModalWithXButton();
    });

    it('should open multiple research request modal - Part Search Results Page', async () => {
        await grid.newMechanismCheckboxRangeChecking(1, 2);
        await modal.openModalWithButtonByName(buttonNames.resRequest);
        await expect(modal.modalTitle.getText()).toEqual(modalTitles.multiResReq);
        await modal.closeModalWithXButton();
    });

    it('should be export modal attributes Part Search Results Page', async () => {
        await modal.openModalWithButtonByName(buttonNames.export);
        await expect(modal.modalTitle.getText()).toEqual(modalTitles.exportParts);
        await modal.exportModalAttributes(exportOptions.search.common.labels, exportOptions.search.common.options);
        await modal.closeModalWithXButton();
        await modal.openModalWithButtonByName(buttonNames.export);
        await modal.closeModalWithButton(buttonNames.cancel);
    });

    it('should export file for Details for Parts Search', async () => {
        await modal.checkingExportFile(buttonNames.export, buttonNames.export, gridElements.grid,
            exportOptions.search.common.fileName);
    });

    it('should open save search modal, should be save search modal attributes - - Part Search Results Page', async () => {
        await searchLogic.openSaveSearchModal();
    });

    it('should not be active save button when fill name filed with spaces - Parts Search results page', async () => {
        await input.fillFieldWithValue(searchElements.saveSearchNameField, commonSearch.spacesValue);
        await expect(button.returnButtonByText(buttonNames.saveAndReturnToResults).isEnabled()).toBeFalsy()
    });

    it('should save parts search', async () => {
        await searchLogic.saveSearch();
    });

    xit('should display saved parts search in recall searches dropdown ', async () => {
        await searchLogic.displaySaveSearchInRecall();
    });

    it('should display saved parts search in saved searches', async () => {
        await searchLogic.displaySaveSearchInSavedSearches();
    });

    it('should go to search results grid from Saved Searches - Parts search', async () => {
        await searchLogic.goToSearchFromSavedSearches();
    });

    it('should delete saved parts searches', async () => {
        await searchLogic.displaySaveSearchInSavedSearches();
        await searchLogic.deleteSaveSearch();
    });

});