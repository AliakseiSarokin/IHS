// import {AddPartsToBomLogic} from "../../../../bussinesLayer/search/AddPartsToBomLogic";
import {BomTreeLogic} from "../../../../bussinesLayer/bomVault/bomTreeLogic";
import {BomVaultLogic} from "../../../../bussinesLayer/bomVault/bomVaultLogic";
import {Button} from "../../../../components/simple/button";
import {browser, by, element} from "protractor";
import {buttonNames, meganavItems, exportOptions} from "../../../../testData/global";
import {
    bomElements, gridElements, bomVaultElements, pageTitles, shadeElements, searchElements, modalElements
} from "../../../../elements/elements";
import {Link} from "../../../../components/simple/link";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";

// const addPartsToBomLogic: AddPartsToBomLogic = new AddPartsToBomLogic();
const bomTreeLogic: BomTreeLogic = new BomTreeLogic();
const bomVaultLogic: BomVaultLogic = new BomVaultLogic();
const button: Button = new Button();
const login: Login = new Login();
const link: Link = new Link();
const meganav: Meganav = new Meganav();

describe('DE110670', () => {

    it("should disable Generate report button for sub-assembly of indentured bom", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomTree, gridElements.checkboxSelector.get(2));
        await bomTreeLogic.expandFirstIndenturedBom();
        await bomTreeLogic.checkFirstOpenIndenturedBomNewGrid();
        await expect(await button.returnButtonByText(buttonNames.generateReportButton).isEnabled()).toBeTruthy();
        await bomTreeLogic.checkFirstOpenIndenturedBomNewGrid();
        await expect(await button.returnButtonByText(buttonNames.generateReportButton).isEnabled()).toBeFalsy();
        await bomTreeLogic.checkBomNewGridByName('A1-L1');
        await expect(await button.returnButtonByText(buttonNames.generateReportButton).isEnabled()).toBeFalsy();
    });

});
