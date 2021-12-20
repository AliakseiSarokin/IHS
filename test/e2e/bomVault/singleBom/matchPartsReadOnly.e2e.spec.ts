import {browser} from "protractor";
import {buttonNames, meganavItems} from "../../../../testData/global";
import {gridElements} from "../../../../elements/elements";
import {cplData} from "../../../../testData/cpl";
import {Button} from "../../../../components/simple/button";
import {Dropdown} from "../../../../components/dropdown";
import {Grid} from "../../../../components/grid";
import {Login} from "../../../../components/login";
import {MatchPartsLogic} from "../../../../bussinesLayer/bomVault/matchPartsLogic";
import {Modal} from "../../../../components/modal";
import {Meganav} from "../../../../components/meganav";
import {Toolbar} from "../../../../components/toolbar";
import {bomVaultData} from "../../../../testData/bomVault";

const button: Button = new Button();
const grid: Grid = new Grid();
const login: Login = new Login();
const matchPartsLogic: MatchPartsLogic = new MatchPartsLogic();
const modal: Modal = new Modal();
const meganav: Meganav = new Meganav();
const toolbar: Toolbar = new Toolbar();

describe(' Match Parts tab - Read Only User', () => {

    it ( 'should go to view single bom - Match Parts' , async () => {
        await login.loginWithDirectLink(browser.params.readOnlyUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.newGridUnlockedColumnRowCellsWithContent(0).get(0));
        await matchPartsLogic.goToMatchParts();
    });

    it ( 'should be disabled all main buttons - Match Parts - Read Only User ' , async () => {
        await grid.checkCheckboxRange(0,1);
        await expect(button.returnButtonByText(buttonNames.ignoreMatch).isEnabled()).toBeFalsy();
        await expect(button.returnButtonByText(buttonNames.searchForMatch).isEnabled()).toBeFalsy();
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(cplData.matchParts.filterOptions[2]);
        await grid.checkCheckboxRange(0,1);
        await expect(button.returnButtonByText(buttonNames.acceptMatch).isEnabled()).toBeFalsy();
    });

    it('should export a file - Match Parts - Read Only User ', async () => {
        await modal.checkingExportFile(buttonNames.export, buttonNames.export,
            gridElements.grid, 'IHS_BOMPartExceptions.txt')
    });
});