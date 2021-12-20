import {browser} from "protractor";
import {buttonNames, meganavItems, columnHeaders, modalTitles, exportOptions} from "../../../../testData/global";
import {bomElements, commonElements, gridElements, partDetailsElements, bomVaultElements, pageTitles} from "../../../../elements/elements";
import {cplData} from "../../../../testData/cpl";
import {BomTreeLogic} from "../../../../bussinesLayer/bomVault/bomTreeLogic";
import {BomTreePartsLogic} from "../../../../bussinesLayer/bomVault/bomTreePartsLogic";
import {BomTreeFilterLogic} from "../../../../bussinesLayer/bomVault/bomTreeFilterLogic";
import {BomVaultLogic} from "../../../../bussinesLayer/bomVault/bomVaultLogic";
import {Button} from "../../../../components/simple/button";
import {Grid} from "../../../../components/grid";
import {Dropdown} from "../../../../components/dropdown";
import {InstructionPanel} from "../../../../components/instructionPanel";
import {Link} from "../../../../components/simple/link";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {SingleBomLogic} from "../../../../bussinesLayer/bomVault/singleBomLogic";
import {Toolbar} from "../../../../components/toolbar";
import {Shade} from "../../../../components/shade";
import {bomVaultData} from "../../../../testData/bomVault";
const bomTreeLogic: BomTreeLogic = new BomTreeLogic();
const bomTreePartsLogic: BomTreePartsLogic = new BomTreePartsLogic();
const bomTreeFilterLogic: BomTreeFilterLogic = new BomTreeFilterLogic();
const bomVaultLogic: BomVaultLogic = new BomVaultLogic();
const button: Button = new Button();
const dropdown: Dropdown = new Dropdown();
const grid: Grid = new Grid();
const instructionPanel: InstructionPanel = new InstructionPanel();
const login: Login = new Login();
const link: Link = new Link();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal;
const singleBomLogic: SingleBomLogic = new SingleBomLogic();
const shade: Shade = new Shade();
const toolbar: Toolbar = new Toolbar();

describe(' BOM Tree - Read Only User', () => {

    it(" should go to BOM Tree from meganav - Read Only User", async () => {
        await login.loginWithDirectLink(browser.params.readOnlyUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomTree, gridElements.checkboxSelector.get(1));
        await expect(await pageTitles.pageTitle.getText()).toEqual('BOM Tree (Hierarchy of BOMs)');
    });

    it('should not be active Add New Folder Button  - Read Only User',  async () => {
        await bomTreeLogic.checkFolderNewGridRowByName('b4testrestricted');
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await expect(await button.returnButtonByText(buttonNames.modifyFolder).isEnabled()).toBeFalsy();
        await expect(await button.returnButtonByText(buttonNames.bomToSelectedFolder).isPresent()).toBeFalsy();
        await toolbar.closeToolbarDropdownByButtonName(buttonNames.add);
    });

    it('should not be active Modify New Folder Button  - Read Only User',  async () => {
        await expect(await toolbar.arrowButtom.get(1).getAttribute('class')).toContain('disabled');
        await bomTreeLogic.checkFolderNewGridRowByName('b4testrestricted');
        await expect(await toolbar.arrowButtom.get(1).getAttribute('class')).toContain('disabled');
        await bomTreeLogic.checkBomNewGridByName('114_1_1');
        await expect(await toolbar.arrowButtom.get(1).getAttribute('class')).toContain('disabled');
    });

    it('should not be active button affceted to BOM  - Read Only User', async () => {
        await expect(await button.returnButtonByText(buttonNames.reprocess).isEnabled()).toBeFalsy();
        await expect(await button.returnButtonByText(buttonNames.delete).isEnabled()).toBeFalsy();
        await expect(await button.returnButtonByText(buttonNames.reimport).isEnabled()).toBeFalsy();
    });

});