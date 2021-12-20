import {browser} from "protractor";
import {buttonNames, exportOptions, meganavItems} from "../../../../testData/global";
import {gridElements} from "../../../../elements/elements";
import {cplData} from "../../../../testData/cpl";
import {Button} from "../../../../components/simple/button";
import {Dropdown} from "../../../../components/dropdown";
import {Grid} from "../../../../components/grid";
import {Login} from "../../../../components/login";
import {MatchMfrLogic} from "../../../../bussinesLayer/bomVault/matchMfrLogic";
import {Modal} from "../../../../components/modal";
import {Meganav} from "../../../../components/meganav";
import {Toolbar} from "../../../../components/toolbar";

const button: Button = new Button();
const grid: Grid = new Grid();
const login: Login = new Login();
const matchMfrLogic: MatchMfrLogic = new MatchMfrLogic();
const modal: Modal = new Modal();
const meganav: Meganav = new Meganav();
const toolbar: Toolbar = new Toolbar();


describe(' Match Manufacturers tab - Read Only User ', () => {

    it('should go to view single bom - Match Mfr', async () => {
        await login.loginWithDirectLink(browser.params.readOnlyUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.newGridUnlockedColumnRowCellsWithContent(0).get(0));
        await matchMfrLogic.goToMatchMfr();
    });

    it('should be disabled all main buttons - Match Mfr - Read Only User ', async () => {
        await grid.checkCheckboxRange(0, 1);
        await expect(button.returnButtonByText(buttonNames.ignoreMatch).isEnabled()).toBeFalsy();
        await expect(button.returnButtonByText(buttonNames.searchForMatch).isEnabled()).toBeFalsy();
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(cplData.matchMfr.filterOptions[3]);
        await grid.checkCheckboxRange(0, 1);
        await expect(button.returnButtonByText(buttonNames.acceptMatch).isEnabled()).toBeFalsy();
    });

    it('should export a file - Match Manufacturers - Read Only User ', async () => {
        await modal.checkingExportFile(buttonNames.export, buttonNames.export,
            gridElements.grid, exportOptions.bom.matchMfr.fileName)
    });
});