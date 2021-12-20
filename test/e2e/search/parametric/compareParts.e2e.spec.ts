import {buttonNames, meganavItems, modalTitles, exportOptions} from "../../../../testData/global";
import {browser} from "protractor";
import {Button} from "../../../../components/simple/button";

const button: Button = new Button();
import {Meganav} from "../../../../components/meganav";

const meganav: Meganav = new Meganav();
import {searchElements, gridElements, modalElements} from "../../../../elements/elements";
import {ParametricSearchLogic} from "../../../../bussinesLayer/search/parametricSearchLogic";

const parametricSearchLogic: ParametricSearchLogic = new ParametricSearchLogic();
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

const modal: Modal = new Modal();
import {Grid} from "../../../../components/grid";

const grid: Grid = new Grid();
import {ComparePartsLogic} from "../../../../bussinesLayer/search/comparePartsLogic";

const comparePartsLogic = new ComparePartsLogic();

describe('Compare Parts - Parametric Search', () => {

    beforeAll(async () => {
        browser.params.waitWebElementMaxTimeout = browser.params.maxElementWaitTime;
    });

    afterAll(async () => {
        browser.params.waitWebElementMaxTimeout = browser.params.defaultElementWaitTime;
    });

    it('should be inactive compare button whe one row is selected - Parametric Search', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parametric,
            searchElements.parametric.commodities.get(0));
        await parametricSearchLogic.performParametricSearch();
        await grid.newMechanismCheckboxRangeChecking(0, 1);
        await expect(button.returnButtonByText(buttonNames.compareSelected).isEnabled()).toBeFalsy();

    });

    it('should open compare button with selected 4 - Parametric Search', async () => {
        await grid.newMechanismCheckboxRangeChecking(1, 4);
        await expect(button.returnButtonByText(buttonNames.compareSelected).isEnabled()).toBeTruthy();
        await modal.openModalWithButtonByName(buttonNames.compareSelected);
        await expect(modal.modalTitle.getText()).toEqual(modalTitles.compareParts('4'));
        await expect(await searchElements.comparePartsSubtitle.getText()).toEqual(commonSearch.comparePartsSubtitle('4'));
    });


    it('should be locked first and second columns for compare selected modal- Parametric Search ', async () => {
        await expect(await modalElements.newGirdModalLockedHeaderColumns.count()).toEqual(2);
    });

    it('should set as anchor selected part for Compare Selected modal - Parametric Search ', async () => {
        await comparePartsLogic.setAsAnchorCompareModal();
    });

    it('should export file for Compare Parts - Parametric Search', async () => {
        await modal.checkingExportFile(buttonNames.export, 'nothing', gridElements.grid,
            exportOptions.search.compareParts.fileName);
    });

    it('should remove selected part for Compare Selected modal - Parametric Search', async () => {
        await comparePartsLogic.removePartCompareModal();
        await modal.closeModalWithXButton();
    });

});