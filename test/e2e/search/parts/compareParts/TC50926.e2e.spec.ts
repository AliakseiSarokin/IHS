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

describe('TC50926 Parts Search Compare Parts Modal Window', () => {

    it('should be inactive compare button whe one row is selected - Parts Search', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await grid.newMechanismCheckboxRangeChecking(0,4);
        await expect(button.returnButtonByText(buttonNames.compareSelected).isEnabled()).toBeTruthy();
        await modal.openModalWithButtonByName(buttonNames.compareSelected);
        await expect(modal.modalTitle.getText()).toEqual(modalTitles.compareParts('4'));
        await expect(await searchElements.comparePartsSubtitle.getText()).toEqual(commonSearch.comparePartsSubtitle('4'));
    });
    
    it('should remove selected part for Compare Selected modal - Parts Search', async () => {
        await comparePartsLogic.removePartCompareModal();
    });

    it('should close Compare Selected modal - Parts Search', async () => {
        await modal.closeModalWithXButton();
        await modal.openModalWithButtonByName(buttonNames.compareSelected);
        await modal.closeModalWithButton(buttonNames.closeAndReturnToPartsSearchResults)
    });

});