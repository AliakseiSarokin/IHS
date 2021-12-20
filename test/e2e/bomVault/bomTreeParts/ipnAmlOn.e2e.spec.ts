import {AddAPartLogic} from "../../../../bussinesLayer/bomVault/addAPartLogic";
import {AmlLogic} from "../../../../bussinesLayer/bomVault/amlLogic";
import {BomTreePartsLogic} from "../../../../bussinesLayer/bomVault/bomTreePartsLogic";
import {bomElements, bomVaultElements, commonElements, gridElements} from "../../../../elements/elements";
import {browser} from "protractor";
import {buttonNames, meganavItems} from "../../../../testData/global";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {SingleBomLogic} from "../../../../bussinesLayer/bomVault/singleBomLogic";
import {Shade} from "../../../../components/shade";
import {WorkspaceLogic} from "../../../../bussinesLayer/worksapce/workspaceLogic";

const addAPartLogic: AddAPartLogic = new AddAPartLogic();
const amlLogic: AmlLogic = new AmlLogic();
const bomTreePartsLogic: BomTreePartsLogic = new BomTreePartsLogic();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal;
const singleBomLogic: SingleBomLogic = new SingleBomLogic();
const workspaceLogic: WorkspaceLogic = new WorkspaceLogic();

describe(' BOM with checked "Use Internal Part Number to Build AML" option - BOM Tree Parts', () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await workspaceLogic.addToWorkspacePartIfNotAdded();
    });

    it('should not have hyperlinks in IPN cells for NON AML BOM', async () => {
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomTreeParts, bomVaultElements.bomTreeParts.bomTreePartsWait.get(4));
        await bomTreePartsLogic.expandFolderBomTreeParts();
        await singleBomLogic.openSingleBomByName('AML_IPN_OFF');
        await amlLogic.checkingBOmWithAmlOff();
    });

    it('should have hyperlinks in IPN cells AML BOM', async () => {
        await amlLogic.checkingBOmWithAmlOn();
    });

    it('should be active/inactive edit AML for IPN', async () => {
        await amlLogic.checkingEditAmlButton();
    });

    it('should open AML Modal by clicking on the edit AML for IPN', async () => {
        await amlLogic.openAmlClickingOnEditAml(1);
    });

    it('should show All AML Parts using AML fiter - BOM Details', async () => {
        await amlLogic.amlFilter();
    });

    it('should show Preferred AML Parts using AML fiter - BOM Details', async () => {
        await amlLogic.preferedAml();
    });

    it('should open AML modal by clicking on the IPN link - BOM Details', async () => {
        await amlLogic.openAmlModalBOMTree();
    });

    it('should be subtitle for AML modal - BOM Details', async () => {
        await amlLogic.amlModalSubtitle();
    });

    it('should have exect column headers for AML modal - BOM Details', async () => {
        await amlLogic.rightColumnHeaders();
    });

    it('should have tooltips for attributes AML modal - BOM Details', async () => {
        await amlLogic.tooltipsChecking();
    });

    it('should close AML modal - BOM Details', async () => {
        await modal.closeModalWithXButton();
        await amlLogic.openAmlModalBOMTree();
        await modal.closeModalWithButton(buttonNames.close);
    });

    it('should be values for preffered part - BOM Details', async () => {
        await amlLogic.checkValueForPreferredPart(true);
    });

    it('should select a part and open Add Part Modal - BOM Details', async () => {
        await amlLogic.openAddAmlPartModal();
    });

    it('should be add part modal tabs - BOM Details', async () => {
        const tabs: string[] = ['Search for a Part', 'Enter Part Details', 'Select from Workspace'];
        await expect(await commonElements.modalNavTabs.getText()).toEqual(tabs);
    });

    it('should be option to perform search in add a part modal - BOM Details', async () => {
        await addAPartLogic.firstTabPerformSearch();
    });

    it('should save a state for the first tab in add a part modal - BOM Details', async () => {
        await addAPartLogic.saveStateSearchTab(bomElements.amlModal.amlSearchForAPartCheckboxes);
    });

    it('should be fields for enter part details tab - BOM Details', async () => {
        await addAPartLogic.fieldsForSecondTab();
    });

    it('should fill all fields for enter part details tab - BOM Details', async () => {
        await addAPartLogic.fillSecondTabFields(2);
    });

    it('should save a state for the second tab in add a part modal - BOM Details', async () => {
        await addAPartLogic.saveStateSecondTab(2);
    });

    it('should save a state for the thirf tab in add a part modal - BOM Details', async () => {
        await addAPartLogic.saveStateThirdTab();
    });

    it('should be reset clear button and work properly - BOM Details', async () => {
        await addAPartLogic.resetButtonChecking(2);
    });

    it('should add a part for Add Part modal - AML', async () => {
        await amlLogic.addPartAml();
    });

    it('should set as prefered selected part for AML modal - BOM Details', async () => {
        await amlLogic.setAsPrefAmlModal();
    });

    it('should remove selected part for AML modal - BOM Details', async () => {
        await amlLogic.removePartAmlModal();
    });

    it('should close add a part AML modal - BOM Details', async () => {
        await amlLogic.openAddAmlPartModal();
        await Shade.closeShadeWithButton(buttonNames.cancel)
    });

    it('should close add a part AML modal through close modal - BOM Details', async () => {
        await amlLogic.openAddAmlPartModal();
        await amlLogic.goToTab('Enter Part Details');
        await addAPartLogic.fillSecondTabFields(2);
        await modal.openModalWithButtonByName(buttonNames.cancel);
        await expect(await modal.severalModalTitles.last().getText()).toEqual('Do not add part records?');
        await modal.closeModalWithElement(modal.modalX.get(1));
        await modal.openModalWithButtonByName(buttonNames.cancel);
        await modal.closeModalWithButton(buttonNames.doNotCloseModal);
        await modal.openModalWithButtonByName(buttonNames.cancel);
        await Shade.closeShadeWithButton(buttonNames.closeDoNotAddPartRecordsToTheAml);
        await modal.closeModalWithXButton();
    });
});
