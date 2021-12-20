import {browser} from "protractor";
import {buttonNames, meganavItems, columnHeaders, modalTitles,exportOptions} from "../../../../testData/global";
import {
    bomElements, commonElements, gridElements, quickSearchElements, pageTitles, bomVaultElements,
    shadeElements, dropdownElements
} from "../../../../elements/elements";
import {cplData} from "../../../../testData/cpl";
import {AddAPartLogic} from "../../../../bussinesLayer/bomVault/addAPartLogic";
import {BomTreePartsLogic} from "../../../../bussinesLayer/bomVault/bomTreePartsLogic";
import {Dropdown} from "../../../../components/dropdown";
import {Grid} from "../../../../components/grid";
import {InstructionPanel} from "../../../../components/instructionPanel";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {SingleBomLogic} from "../../../../bussinesLayer/bomVault/singleBomLogic";
import {Shade} from "../../../../components/shade";
import {Toolbar} from "../../../../components/toolbar";
import {HelpLogic} from "../../../../bussinesLayer/help/helpLogic";
const addAPartLogic: AddAPartLogic = new AddAPartLogic();
const bomTreePartsLogic: BomTreePartsLogic = new BomTreePartsLogic();
const grid: Grid = new Grid();
const instructionPanel: InstructionPanel = new InstructionPanel();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal;
const singleBomLogic: SingleBomLogic = new SingleBomLogic();
const toolbar: Toolbar = new Toolbar();
const helpLogic: HelpLogic = new HelpLogic();

describe(' BOM Tree Parts - Restricted', () => {

    it(" should go to BOM Tree Parts from meganav ", async () => {
        await login.loginWithDirectLink(browser.params.restrictedUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomTreeParts, bomVaultElements.bomTreeParts.bomTreeRows.get(0));
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

    it(" should show grid by clicking on the BOM", async () => {
        await bomTreePartsLogic.openBomByName('AutoRegBOM - Restr');
    });

    it('should open add part modal  - BOM Details',  async () => {
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await Shade.openShadeWithButton(buttonNames.addPart);
        await expect(await shadeElements.shadeTitle.getText()).toEqual( 'Add a Part');
    });

    it('should be add part modal tabs - BOM Details',  async () => {
        const tabs:string[] = [ 'Search for a Part', 'Enter Part Details', 'Select from Workspace' ];
        await expect(await commonElements.shadeNavTabs.getText()).toEqual(tabs);
    });

    it('should be ghost text depends on search types in in Search for a Part tab  - BOM Details',  async () => {
        await addAPartLogic.the2AccordionGhostTextChecking();
    });

    it('should clear search criteria by clicking on the X in in Search for a Part tab  - BOM Details',  async () => {
        await addAPartLogic.clearSearchCriteriaByX();
    });

    it('should be option to perform search in add a part modal - BOM Details',  async () => {
        await addAPartLogic.firstTabPerformSearch();
    });

    it('should save a state for the first tab in add a part modal - BOM Details',  async () => {
        await addAPartLogic.saveStateSearchTab();
    });

    it('should be fields for enter part details tab - BOM Details',  async () => {
        await addAPartLogic.fieldsForSecondTab();
    });

    it('should fill all fields for enter part details tab - BOM Details',  async () => {
        await addAPartLogic.fillSecondTabFields(1);
    });

    it('should save a state for the second tab in add a part modal - BOM Details',  async () => {
        await addAPartLogic.saveStateSecondTab(1);
    });

    it('should save a state for the third tab in add a part modal - BOM Details',  async () => {
        await addAPartLogic.saveStateThirdTab();
    });

    it('should be reset clear button and work properly - BOM Details',  async () => {
        await addAPartLogic.resetButtonChecking(1);
    });

    it('should close add part modal in BOM Details',  async () => {
        await Shade.closeShadeWithButton(buttonNames.cancel);
    });

    it('should add a part in BOM Details',  async () => {
        await addAPartLogic.addAPart();
    });

    it('should be modify button with dropdown list  - BOM Details',  async () => {
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

    it('should delete a part  - BOM  Details',  async () => {
        await addAPartLogic.deleteAPart();
    });

    it('should have layout filters',  async () => {
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        const expectedFilterOptions:string[] = [ 'Default', 'Environmental', 'Import', 'Lifecycle','COO_Layout', 'For Manage Users', ];
        await expect(await dropdownElements.dropdownValues.getText()).toEqual(expectedFilterOptions);
        await toolbar.closeToolbarDropdownByButtonName(buttonNames.layout);
    });

    it('should open reprocess Modal - BOM Details',  async () => {
        await modal.openModalWithButtonByName(buttonNames.reporcessPartList);
        await expect(await modal.modalTitle.getText()).toEqual( 'Reprocess Selected BOM(s)');
        await modal.closeModalWithXButton();
        await modal.openModalWithButtonByName(buttonNames.reporcessPartList);
        await modal.closeModalWithButton(buttonNames.noDoNotReporcess);
    });

    it ( 'should open research request modal by clicking on the research request button - Match Parts' , async () => {
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await modal.openModalWithButtonByName(buttonNames.resRequest);
        await expect(await modal.modalTitle.getText()).toEqual(modalTitles.singleResReq);
        await modal.closeModalWithXButton();
    });

    it('should open multiple research request modal - Match Parts', async () => {
        await grid.newMechanismCheckboxRangeChecking(1,2);
        await modal.openModalWithElement(await toolbar.returnToolbarButtonByValue(buttonNames.resRequest));
        await expect(await modal.modalTitle.getText()).toEqual(modalTitles.multiResReq);
        await modal.closeModalWithXButton();
    });

    it('should go to generate a report page when click on the gen rep button',  async () => {
        await bomTreePartsLogic.goToGenerateReportPageBomTreeParts();
    });

    it ( 'should open export modal - BOM Details' , async () => {
        await login.loginWithDirectLink(browser.params.restrictedUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomTreeParts, bomVaultElements.bomTreeParts.bomTreeRows.get(0));
        await bomTreePartsLogic.expandFolderBomTreeParts();
        await bomTreePartsLogic.openFirstBom();
        await modal.openModalWithButtonByName(buttonNames.export);
        await expect(await modal.modalTitle.getText()).toContain('Export BOM Tree Parts');
        await modal.exportModalAttributes(exportOptions.bom.common.labels, exportOptions.bom.common.options);
        await modal.closeModalWithXButton();
        await modal.openModalWithButtonByName(buttonNames.export);
        await modal.closeModalWithButton(buttonNames.cancel);
    });
});