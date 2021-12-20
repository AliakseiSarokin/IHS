import {buttonNames, meganavItems, modalTitles, exportOptions} from "../../../../../../testData/global";
import {browser} from "protractor";
import {Button} from "../../../../../../components/simple/button";
const button: Button = new Button();
import {Meganav} from "../../../../../../components/meganav";
const meganav:Meganav = new Meganav();
import {searchElements, gridElements, modalElements} from "../../../../../../elements/elements";
import {PartsSearchLogic} from "../../../../../../bussinesLayer/search/partsSearchLogic";
const partsSearchLogic:PartsSearchLogic = new PartsSearchLogic();
import {Login} from "../../../../../../components/login";
const login: Login = new Login();
import {Toolbar} from "../../../../../../components/toolbar";
const toolbar: Toolbar = new Toolbar();
import {Dropdown} from "../../../../../../components/dropdown";
const dropdown: Dropdown = new Dropdown();
import {SearchLogic} from "../../../../../../bussinesLayer/search/searchLogic";
const searchLogic: SearchLogic = new SearchLogic();
import {commonSearch} from "../../../../../../testData/search";
import {Modal} from "../../../../../../components/modal";
const modal:Modal = new Modal();
import {Grid} from "../../../../../../components/grid";
const grid:Grid = new Grid();
import {ComparePartsLogic} from "../../../../../../bussinesLayer/search/comparePartsLogic";
const comparePartsLogic = new ComparePartsLogic();
import {File} from "../../../../../../utils/file";
const file: File = new File();

describe('TC51023 Compare Parts - Locked Column and Buttons', () => {

    it('should be inactive compare button whe one row is selected - Parts Search', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await grid.newMechanismCheckboxRangeChecking(0,4);
        const partNumberCellValues: string[] = await grid.newGridReturnCellValuesByColumnName(0,
            'Part Number');
        await modal.openModalWithButtonByName(buttonNames.compareSelected);
        await expect(await modalElements.newGirdModalLockedHeaderColumns.get(1).getText()).toContain(partNumberCellValues[0]);
        await expect(await modalElements.newGirdModalUnlockedHeaderColumns.get(0).getText()).toContain(partNumberCellValues[1])

    });

    it('should be locked first and second columns for compare selected modal- Parts Search ', async () => {
        await expect(await searchElements.comparePartsAttributesLabel.getText()).toEqual('Attributes');
        await expect(await modalElements.newGirdModalLockedHeaderColumns.count()).toEqual(2);
    });

    it('should set as anchor selected part for Compare Selected modal - Parts Search ', async () => {
        await comparePartsLogic.setAsAnchorCompareModal();
    });
});