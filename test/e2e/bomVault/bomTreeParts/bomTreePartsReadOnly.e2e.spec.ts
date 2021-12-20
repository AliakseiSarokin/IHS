import {browser} from "protractor";
import {buttonNames, meganavItems, columnHeaders, modalTitles,exportOptions} from "../../../../testData/global";
import {  bomElements, commonElements, gridElements, quickSearchElements, pageTitles, bomVaultElements} from "../../../../elements/elements";
import {BomTreePartsLogic} from "../../../../bussinesLayer/bomVault/bomTreePartsLogic";
import {Button} from "../../../../components/simple/button";
import {Grid} from "../../../../components/grid";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {Toolbar} from "../../../../components/toolbar";
const bomTreePartsLogic: BomTreePartsLogic = new BomTreePartsLogic();
const button: Button = new Button();
const grid: Grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal;
const toolbar: Toolbar = new Toolbar();


describe(' BOM Tree Parts - Read Only User', () => {

    it(" should go to BOM Tree Parts from meganav - Read Only User", async () => {
        await login.loginWithDirectLink(browser.params.readOnlyUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomTreeParts, bomVaultElements.bomTreeParts.bomNameLink.get(0));
        await expect(await pageTitles.pageTitle.getText()).toEqual('BOM Tree: View Parts in a BOM (BOM Details): Vault');
        await bomTreePartsLogic.expandFolderBomTreeParts();
        await bomTreePartsLogic.openFirstBom();
    });

    it('should not be active Add Dropdown Buttons - Read Only User',  async () => {
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await expect(await button.returnButtonByText(buttonNames.addPart).isEnabled()).toBeFalsy();
        await expect(await button.returnButtonByText(buttonNames.addPartNote).isEnabled()).toBeFalsy();
        await toolbar.closeToolbarDropdownByButtonName(buttonNames.add);
    });

    it('should not be active Modify New Folder Button  - Read Only User',  async () => {
        await toolbar.openToolbarDropdownByButtonName(buttonNames.modify);
        await expect(await button.returnButtonByText(buttonNames.modifyPart).isEnabled()).toBeFalsy();
        await toolbar.closeToolbarDropdownByButtonName(buttonNames.modify);
    });

    it('should not be active reprocess and delete part buttons - Read Only User', async () => {
        await expect(await button.returnButtonByText(buttonNames.deletePart).isEnabled()).toBeFalsy();
        await expect(await button.returnButtonByText(buttonNames.reporcessPartList).isEnabled()).toBeFalsy();
    });


    it('should open single research request modal - BOM Tree Parts - Read Only User', async () => {
        await browser.waitForAngular();
        await modal.openModalWithButtonByName(buttonNames.resRequest);
        await expect(await modal.modalTitle.getText()).toEqual(modalTitles.singleResReq);
        await modal.closeModalWithXButton();
    });

    it('should open multiple research request modal - BOM Tree Parts', async () => {
        await grid.checkCheckboxRangeNewGrid(1,2);
        await modal.openModalWithButtonByName(buttonNames.resRequest);
        await expect(await modal.modalTitle.getText()).toEqual(modalTitles.multiResReq);
        await modal.closeModalWithXButton();
    });

    it ( 'should open export modal - Bom Tree Parts' , async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await browser.waitForAngular();
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomTreeParts, bomVaultElements.bomTreeParts.bomNameLink.get(0));
        await bomTreePartsLogic.expandFolderBomTreeParts();
        await bomTreePartsLogic.openFirstBom();
        await modal.openModalWithButtonByName(buttonNames.export);
        await expect(await modal.modalTitle.getText()).toContain('Export BOM Tree Parts');
        await modal.exportModalAttributes(exportOptions.bom.common.labels, exportOptions.bom.common.options);
        await modal.closeModalWithXButton();
        await modal.openModalWithButtonByName(buttonNames.export);
        await modal.closeModalWithButton(buttonNames.cancel);
    });

    it('should go to generate a report page when select a bom and click on the gen rep button  - Read Only User', async () => {
        await bomTreePartsLogic.goToGenerateReportPageBomTreeParts();
    });

});