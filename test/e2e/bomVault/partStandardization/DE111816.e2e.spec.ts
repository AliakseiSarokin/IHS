import {Button} from "../../../../components/simple/button";
import {bomVaultElements, gridElements, partStandardization} from "../../../../elements/elements";
import {browser, element, by} from "protractor";
import {buttonNames, meganavItems} from "../../../../testData/global";
import {Grid} from "../../../../components/grid";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {PartStandardizationLogic} from "../../../../bussinesLayer/bomVault/partStandardizationLogic";
const button: Button = new Button;
const grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const partStandardizationLogic: PartStandardizationLogic = new PartStandardizationLogic();

describe('DE111816', ()=> {

    it('should disable selection ability for sub-assambly of indentured BOMs on Add BOM(s) to Part Standardization Analysis slider', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await grid.newMechanismCheckboxRangeChecking(0, 1);
        await button.clickOnTheElement(partStandardization.toolbarButtons.get(0));
        await button.clickOnTheElementAndWait(partStandardization.dropdownMenuButtons.get(1), bomVaultElements.bomTree.bomTreeRows.get(1));
        await partStandardizationLogic.expandFirstIndenturedBomOnAddPartShade();
        await partStandardizationLogic.checkBomByNameOnShade('NumIndCodeL1-SA1');
        await expect(await button.returnElementByButtonTextAndIndex(buttonNames.addBomsToPartStandardizationAnalysis,
            1).isEnabled()).toBeFalsy();
        await partStandardizationLogic.checkFolderByNameOnShade('AUTOMATION_Indentured');
        await expect(await button.returnElementByButtonTextAndIndex(buttonNames.addBomsToPartStandardizationAnalysis,
            1).isEnabled()).toBeTruthy();
    });
});
