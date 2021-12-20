import {AmlLogic} from "../../../../bussinesLayer/bomVault/amlLogic";
import {BomVaultLogic} from "../../../../bussinesLayer/bomVault/bomVaultLogic";
import {Button} from "../../../../components/simple/button";
import {browser} from "protractor";
import {buttonNames, leftNavItems, meganavItems, titles} from "../../../../testData/global";
import {Grid} from "../../../../components/grid";
import {gridElements, pageTitles} from "../../../../elements/elements";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Toolbar} from "../../../../components/toolbar";

const amlLogic: AmlLogic = new AmlLogic();
const bomVaultLogic: BomVaultLogic = new BomVaultLogic();
const button: Button = new Button;
const grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const toolbar: Toolbar = new Toolbar();

describe(' BOM Vault - Read Only User', () => {

    it(" should go to BOM Vault", async () => {
        await login.loginWithDirectLink(browser.params.readOnlyUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.checkboxSelector.get(1));
        await expect(await pageTitles.pageTitle.getText()).toEqual(titles.bomVault);
    });

    it('should have add button with dropdown list  - BOM Details', async () => {
        await grid.newMechanismCheckboxRangeChecking(0, 1);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await expect(button.returnButtonByText(buttonNames.addToWorksapce).isEnabled()).toBeTruthy();
    });

    it('should not be active reimport. reprocess and delete part buttons', async () => {
        await expect(button.returnButtonByText(buttonNames.reimport).isEnabled()).toBeFalsy();
        await expect(button.returnButtonByText(buttonNames.reprocess).isEnabled()).toBeFalsy();
        await expect(button.returnButtonByText(buttonNames.delete).isEnabled()).toBeFalsy();
    });

    it('should go to generate a report page when select a bom and click on the gen rep button', async () => {
        await login.loginWithDirectLink(browser.params.readOnlyUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.checkboxSelector.get(1));
        await bomVaultLogic.goToGenerateReportPage();
    });

    it("should not set best bom to preferred another user's imported AML Bom", async () => {
        await login.loginWithDirectLink(browser.params.readOnlyUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.newGridRows.get(0));
        await amlLogic.checkingBOmWithAmlOn();
        await grid.changeGridWithLeftNavOptionByName(leftNavItems.bomOptions.viewAllBoms,
            gridElements.newGridCellByRowIndex(0).get(1));
        await bomVaultLogic.checkSetBestPartToPreferred('AML_IPN_ON', 'b4testadmin', false);
    });
});
