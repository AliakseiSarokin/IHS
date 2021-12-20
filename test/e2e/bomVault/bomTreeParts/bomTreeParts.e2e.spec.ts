import {browser} from "protractor";
import {buttonNames, meganavItems, modalTitles,exportOptions} from "../../../../testData/global";
import {bomElements, commonElements, gridElements, pageTitles, bomVaultElements,
    shadeElements, dropdownElements
} from "../../../../elements/elements";
import {AddAPartLogic} from "../../../../bussinesLayer/bomVault/addAPartLogic";
import {BomTreePartsLogic} from "../../../../bussinesLayer/bomVault/bomTreePartsLogic";
import {Grid} from "../../../../components/grid";
import {InstructionPanel} from "../../../../components/instructionPanel";
import {Link} from "../../../../components/simple/link";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {Shade} from "../../../../components/shade";
import {Toolbar} from "../../../../components/toolbar";
import {VideoSliderLogic} from "../../../../bussinesLayer/home/videoSliderLogic";
import {HelpLogic} from "../../../../bussinesLayer/help/helpLogic";
import {WorkspaceLogic} from "../../../../bussinesLayer/worksapce/workspaceLogic";
import {Button} from "../../../../components/simple/button";
import {Actions} from "../../../../utils/actions";

const addAPartLogic: AddAPartLogic = new AddAPartLogic();
const bomTreePartsLogic: BomTreePartsLogic = new BomTreePartsLogic();
const button: Button = new Button();
const grid: Grid = new Grid();
const instructionPanel: InstructionPanel = new InstructionPanel();
const link: Link = new Link();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal;
const toolbar: Toolbar = new Toolbar();
const helpLogic: HelpLogic = new HelpLogic();
const workspaceLogic: WorkspaceLogic = new WorkspaceLogic();

describe(' BOM Tree Parts', () => {

    beforeAll(async ()=> {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await workspaceLogic.addToWorkspacePartIfNotAdded();
    });

    it(" should go to BOM Tree Parts from meganav ", async () => {
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomTreeParts, bomVaultElements.bomTreeParts.bomTreePartsWait.get(0));
        await expect(await pageTitles.pageTitle.getText()).toEqual('BOM Tree: View Parts in a BOM (BOM Details): Vault');
    });

    it('should be instruction panel with option to hide/unhide',  async () => {
        await instructionPanel.instrPanelHidingUnhidingChecking('BOM Tree Parts');
    });

    it("should open help panel and check title", async () => {
        await helpLogic.openAndCheckHelpPanelTitle('BOM Tree Parts details');
    });

    it(" should expand folder", async () => {
        await bomTreePartsLogic.expandFolderBomTreeParts();
    });

    it("should disable Generate report button for sub-assembly of indentured bom, DE110670", async () => {
        await bomTreePartsLogic.expandFirstIndenturedBom();
        await bomTreePartsLogic.openBomByName('AUTOMATION_Indentured');
        await expect(await button.returnButtonByText(buttonNames.generateReportButton).isEnabled()).toBeTruthy();
        await bomTreePartsLogic.openBomByName('A1-L1');
        await expect(await button.returnButtonByText(buttonNames.generateReportButton).isEnabled()).toBeFalsy();
    });

    it(" should show grid by clicking on the BOM", async () => {
        await bomTreePartsLogic.openFirstBom(3);
    });

    it('should open Video slider, play video and close ',  async () => {
        await VideoSliderLogic.openVideoSlider();
        await VideoSliderLogic.playingVideoChecking();
        await VideoSliderLogic.closeVideoSlider();
    });

    it('should open add part modal  - BOM Tree Parts',  async () => {
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await Shade.openShadeWithButton(buttonNames.addPart);
        await expect(await shadeElements.shadeTitle.getText()).toEqual( 'Add a Part');
    });

    it('should be add part modal tabs - BOM Tree Parts',  async () => {
        const tabs:string[] = [ 'Search for a Part', 'Enter Part Details', 'Select from Workspace' ];
        await expect(await commonElements.shadeNavTabs.getText()).toEqual(tabs);
    });

    it('should be ghost text depends on search types in in Search for a Part tab  - BOM Tree Parts',  async () => {
        await addAPartLogic.the2AccordionGhostTextChecking();
    });

    it('should clear search criteria by clicking on the X in in Search for a Part tab  - BOM Tree Parts',  async () => {
        await addAPartLogic.clearSearchCriteriaByX();
    });

    it('should be option to perform search in add a part modal - BOM Tree Parts',  async () => {
        await addAPartLogic.firstTabPerformSearch();
    });

    it('should save a state for the first tab in add a part modal - BOM Tree Parts',  async () => {
        await addAPartLogic.saveStateSearchTab();
    });

    it('should be fields for enter part details tab - BOM Tree Parts',  async () => {
        await addAPartLogic.fieldsForSecondTab();
    });

    it('should fill all fields for enter part details tab - BOM Tree Parts',  async () => {
        await addAPartLogic.fillSecondTabFields(1);
    });

    it('should save a state for the second tab in add a part modal - BOM Tree Parts',  async () => {
        await addAPartLogic.saveStateSecondTab(1);
    });

    it('should save a state for the third tab in add a part modal - BOM Tree Parts',  async () => {
        await addAPartLogic.saveStateThirdTab();
    });

    it('should be reset clear button and work properly - BOM Tree Parts',  async () => {
        await addAPartLogic.resetButtonChecking(1);
    });

    it('should close add part modal in BOM Tree Parts',  async () => {
        await Shade.closeShadeWithButton(buttonNames.cancel);
    });

    it('should add a part in BOM Tree Parts',  async () => {
        await addAPartLogic.addAPart();
    });

    it('should be modify button with dropdown list  - BOM Tree Parts',  async () => {
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.modify);
        await modal.openModalWithButtonByName(buttonNames.modifyPart);
        await expect(await modal.modalTitle.getText()).toEqual('Modify a Part');
        const fields =  [ 'BOM Hierarchy Level:', 'Internal Part Number:', 'Imported Part Number - (REQUIRED):',
            'Imported Manufacturer Name:', 'Description:', 'Quantity (Numbers Only):', 'Reference Designator:','Custom 1:', 'Custom 2:'  ];
        await expect(await bomElements.addAPartShade.fieldLabels.getText()).toEqual(fields);
        await modal.closeModalWithXButton();
        await toolbar.openToolbarDropdownByButtonName(buttonNames.modify);
        await modal.openModalWithButtonByName(buttonNames.modifyPart);
        await modal.closeModalWithButton(buttonNames.cancelDoNotModifyThisPart);
    });


    it ( 'should open delete part modal' , async () => {
        await grid.checkFirstCheckBoxIfNotChecked();
        await modal.openModalWithButtonByName(buttonNames.deletePart);
        await expect(await modal.modalTitle.getText()).toEqual('Confirm Delete');
        await modal.closeModalWithXButton();
        await modal.openModalWithButtonByName(buttonNames.deletePart);
        await modal.closeModalWithButton(buttonNames.noDoNotDeleteThem)
    });

    it('should delete a part  - BOM Tree Parts',  async () => {
        await addAPartLogic.deleteAPart();
    });

    it('should have layout filters',  async () => {
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        const expectedFilterOptions:string[] = [ 'Default', 'Environmental', 'Import', 'Lifecycle','COO_Layout','For Manage Users' ];
        await expect(await dropdownElements.dropdownValues.getText()).toEqual(expectedFilterOptions);
        await toolbar.closeToolbarDropdownByButtonName(buttonNames.layout);
    });

    it('should open reprocess Modal - BOM Tree Parts',  async () => {
        await modal.openModalWithButtonByName(buttonNames.reporcessPartList);
        await expect(await modal.modalTitle.getText()).toEqual( 'Reprocess Selected BOM(s)');
        await modal.closeModalWithXButton();
        await modal.openModalWithButtonByName(buttonNames.reporcessPartList);
        await modal.closeModalWithButton(buttonNames.noDoNotReporcess);
    });

    it('should open reprocess Modal - BOM Tree Parts, open help panel and check opened subitem',  async () => {
        await modal.openModalWithButtonByName(buttonNames.reporcessPartList);
        await helpLogic.openHelpPanelAndCheckOpenedSubitem('Reprocess BOMs');
        await modal.closeModalWithButton(buttonNames.noDoNotReporcess);
    });

    it ( 'should open research request modal by clicking on the research request button' , async () => {
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await modal.openModalWithButtonByName(buttonNames.resRequest);
        await expect(await modal.modalTitle.getText()).toEqual(modalTitles.singleResReq);
        await modal.closeModalWithXButton();
    });

    it ( 'should open research request modal by clicking on the research request button, open help panel and check opened subitem' , async () => {
        await helpLogic.openAndCheckHelpPanelTitle('BOM Tree Parts details');
        await modal.openModalWithButtonByName(buttonNames.resRequest);
        await helpLogic.openHelpPanelAndCheckOpenedSubitem('Submit research requests for specific parts');
        await modal.closeModalWithXButton();
    });

    it('should open multiple research request modal', async () => {
        await grid.newMechanismCheckboxRangeChecking(1,2);
        await modal.openModalWithElement(await toolbar.returnToolbarButtonByValue(buttonNames.resRequest));
        await expect(await modal.modalTitle.getText()).toEqual(modalTitles.multiResReq);
        await modal.closeModalWithXButton();
    });

    //skip test because of the defect with help panel
    it('should open multiple research request modal - Match Parts, open help panel and check opened subitem', async () => {
        await Actions.mouseMoveToElementStatic(link.returnElementByLinkName(meganavItems.home));
        await modal.openModalWithElement(await toolbar.returnToolbarButtonByValue(buttonNames.resRequest));
        await helpLogic.openHelpPanelAndCheckOpenedSubitem('Submit research requests for multiple parts');
        await modal.closeModalWithXButton();
    });

    it('should go to generate a report page when click on the gen rep button',  async () => {
        await bomTreePartsLogic.goToGenerateReportPageBomTreeParts();
    });

    it ( 'should open export modal - BOM Tree Parts' , async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomTreeParts, bomVaultElements.bomTreeParts.bomTreePartsWait.get(2));
        await bomTreePartsLogic.expandFolderBomTreeParts();
        await bomTreePartsLogic.openFirstBom();
        await modal.openModalWithButtonByName(buttonNames.export);
        await expect(await modal.modalTitle.getText()).toContain('Export BOM Tree Parts');
        await modal.exportModalAttributes(exportOptions.bom.common.labels, exportOptions.bom.common.options);
        await modal.closeModalWithXButton();
        await modal.openModalWithButtonByName(buttonNames.export);
        await modal.closeModalWithButton(buttonNames.cancel);
    });

    it('should export file for Details',  async () => {
        await modal.closeModalIfPresent();
        await modal.checkingExportFile(buttonNames.export, buttonNames.export , gridElements.gridWrapper,
            exportOptions.bom.bomTreeParts.fileName);
    });
});