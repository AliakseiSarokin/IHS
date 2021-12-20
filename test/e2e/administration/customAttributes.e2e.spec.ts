import {AddAPartLogic} from "../../../bussinesLayer/bomVault/addAPartLogic";
import {AmlLogic} from "../../../bussinesLayer/bomVault/amlLogic";
import {
    administrationElements, bomElements, commonElements, gridElements,
    headerElements, importElements, pageTitles, reportElements
} from "../../../elements/elements";
import {browser} from "protractor";
import {
    buttonNames, fieldStatuses, headerItems, meganavItems
} from "../../../testData/global";
import {CustomAttributesLogic} from "../../../bussinesLayer/adminstration/customAttributesLogic";
import {Dropdown} from "../../../components/dropdown";
import {Grid} from "../../../components/grid";
import {Header} from "../../../components/header";
import {HelpLogic} from "../../../bussinesLayer/help/helpLogic";
import {ImportLogic} from "../../../bussinesLayer/import/importLogic";
import {Input} from "../../../components/simple/input";
import {InstructionPanel} from "../../../components/instructionPanel";
import {importItems} from "../../../testData/import";
import {Login} from "../../../components/login";
import {Meganav} from "../../../components/meganav";
import {Modal} from "../../../components/modal";
import {SingleBomLogic} from "../../../bussinesLayer/bomVault/singleBomLogic";
import {Shade} from "../../../components/shade";
import {TemplatesLogic} from "../../../bussinesLayer/reports/templatesLogic";
import {Toolbar} from "../../../components/toolbar";

const addAPartLogic: AddAPartLogic = new AddAPartLogic();
const amlLogic: AmlLogic = new AmlLogic();
const customAttributesLogic: CustomAttributesLogic = new CustomAttributesLogic();
const grid: Grid = new Grid();
const helpLogic: HelpLogic = new HelpLogic();
const importLogic: ImportLogic = new ImportLogic();
const instructionPanel: InstructionPanel = new InstructionPanel();
const input: Input = new Input();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const singleBomLogic: SingleBomLogic = new SingleBomLogic();
const templatesLogic: TemplatesLogic = new TemplatesLogic();
const toolbar: Toolbar = new Toolbar();

describe(' Custom Attributes', () => {

    afterAll(async () => {
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[6],
            administrationElements.customAttributes.attributesBody);
        await customAttributesLogic.checkUncheckBomDetailCheckoxesRange(fieldStatuses.fillField, 0, 2)
        await customAttributesLogic.saveChanges();
        await login.logout();
    });

    it(" should go to custom attributes", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[6],
            administrationElements.customAttributes.attributesBody);
        await expect(await pageTitles.settingsTitle.getText()).toEqual('Administer Custom Attributes for Imported BOMs');
    });

    it('should be instruction panel with option to hide/unhide', async () => {
        await instructionPanel.instrPanelHidingUnhidingChecking('Administer Custom Attributes');
    });

    it("should open help panel and check title", async () => {
        await helpLogic.openAndCheckHelpPanelTitle('Administer custom attributes for imported BOMs');
    });

    it(" should be active/inactive cancel changes button ", async () => {
        await customAttributesLogic.cancelChangesChecking(administrationElements.customAttributes.rowInput);
    });

    it(" should be inactive save changes button", async () => {
        await customAttributesLogic.saveChangesButtonChecking(false);
    });

    it(" should have headers", async () => {
        const columnHeaders: string[] = ['System Name',
        'Max Length (data)',  'Display Label (50 chars max)',
            'Advanced Reports', 'Email Alerts', 'Import', 'BOM Details'];
        await expect(await administrationElements.customAttributes.headers.getText()).toEqual(columnHeaders);
    });

    it(" should have 1st row with attributes", async () => {
        await customAttributesLogic.checkingRowCustomAttrib(
            0,
            'Attribute 1',
            '255',
            fieldStatuses.fillField
        )
    });

    it(" should have 2d row with attributes", async () => {
        await customAttributesLogic.checkingRowCustomAttrib(
            1,
            'Attribute 2',
            '255',
            fieldStatuses.fillField
        )
    });

    it(" should be 3d row with attributes", async () => {
        await customAttributesLogic.checkingRowCustomAttrib(
            2,
            'Attribute 3',
            '50',
            fieldStatuses.emptyField
        )
    });

    it(" should be 4th row with attributes", async () => {
        await customAttributesLogic.checkingRowCustomAttrib(
            3,
            'Attribute 4',
            '50',
            fieldStatuses.emptyField
        )
    });

    it(" should be 5th row with attributes", async () => {
        await customAttributesLogic.checkingRowCustomAttrib(
            4,
            'Attribute 5',
            '50',
            fieldStatuses.emptyField
        )
    });

    it(" should be 6th row with attributes", async () => {
        await customAttributesLogic.checkingRowCustomAttrib(
            5,
            'Attribute 6',
            '50',
            fieldStatuses.emptyField
        )
    });

    it(" should be 7th row with attributes ", async () => {
        await customAttributesLogic.checkingRowCustomAttrib(
            6,
            'Attribute 7',
            '255',
            fieldStatuses.emptyField
        )
    });

    it(" should be 8th row with attributes ", async () => {
        await customAttributesLogic.checkingRowCustomAttrib(
            7,
            'Attribute 8',
            '255',
            fieldStatuses.emptyField
        )
    });

    it(" should be 9th row with attributes ", async () => {
        await customAttributesLogic.checkingRowCustomAttrib(
            8,
            'Attribute 9',
            '255',
            fieldStatuses.emptyField
        )
    });

    it(" should be 10 row with attributes ", async () => {
        await customAttributesLogic.checkingRowCustomAttrib(
            9,
            'URL Attribute',
            '1024',
            fieldStatuses.emptyField
        )
    });

    it(" should have confirm modal about leaving", async () => {
        await input.fillFieldWithValue(administrationElements.customAttributes.rowInput.get(0), 'test');
        await modal.openModalWithLinkName('HOME');
        await expect(await modal.modalTitle.getText()).toEqual('Leave this page?');
        await modal.closeModalWithButton(buttonNames.leaveAndDiscardUnsavedChanges);
        await expect(await administrationElements.customAttributes.attributesBody.isPresent()).toBeFalsy();
    });

    it(" should display custom attributes in column mapping ", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganav(meganavItems.import,
            importElements.aboutImport);
        await importLogic.goToStep1();
        await importLogic.uploadAValidFileToImport();
        await importLogic.openOptionModalByTitle(importItems.optionTitles.bomImport.optionTitles[1]);
        await Dropdown.openDropdownByClickOnElement(importElements.columnMappDropdown.get(0));
        await expect(await commonElements.dropdownItemByName('Custom 1').isPresent()).toBeTruthy();
        await expect(await commonElements.dropdownItemByName('Custom 2').isPresent()).toBeTruthy();
        await importLogic.closeOptionModalWithX();
    });

    it(" should display custom attributes in optional attributes ", async () => {
        await importLogic.openOptionModalByTitle(importItems.optionTitles.bomImport.optionTitles[5]);
        await expect(await commonElements.labelByName('Custom 1').isPresent()).toBeTruthy();
        await expect(await commonElements.labelByName('Custom 2').isPresent()).toBeTruthy();
        await importLogic.closeOptionModalWithX();
        await importLogic.leaveImportWitLeaveModal();
    });

    it(" should display custom attributes in create templates ", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.reports,
            meganavItems.reportsSubItems.createTemplate, reportElements.customTemplates.templateNameInput);
        await templatesLogic.goToStep2();
        await expect(await commonElements.itemName('Custom 1').isPresent()).toBeTruthy();
        await expect(await commonElements.itemName('Custom 2').isPresent()).toBeTruthy();
        await importLogic.leaveImportWitLeaveModal()
    });

    it(" should show custom attributes in add a part slider when all bom details checkboxes are checked ", async () => {
        await login.loginWithDirectLink(browser.params.userAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[6],
            administrationElements.customAttributes.attributesBody);
        await customAttributesLogic.checkUncheckBomDetailCheckoxes(fieldStatuses.statusBool[fieldStatuses.fillField]);
        await customAttributesLogic.saveChanges();
        await login.logout();
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.checkboxSelector.get(1));
        await singleBomLogic.openFirstSingleBom();
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await Shade.openShadeWithButton(buttonNames.addPart);
        await addAPartLogic.goToTab('Enter Part Details');
        await browser.sleep(1000);
        const fields = ['BOM Hierarchy Level:', 'Internal Part Number:', 'Imported Part Number - (REQUIRED):', 'Imported Manufacturer Name:',
            'Description:', 'Quantity (Numbers Only):', 'Reference Designator:', 'Custom 1:', 'Custom 2:',
            'Custom 3:', 'Custom 4:', 'Custom 5:', 'Custom 6:', 'Custom 7:', 'Custom 8:', 'Custom 9:', 'URL Attribute:'];
        await expect(await bomElements.addAPartShade.fieldLabels.getText()).toEqual(fields);
    });

    it(" should not show custom attributes in modify part modal when all bom details checkboxes are unchecked ", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.checkboxSelector.get(1));
        await singleBomLogic.openFirstSingleBom();
        await grid.checkFirstCheckBoxIfNotChecked();
        await toolbar.openToolbarDropdownByButtonName(buttonNames.modify);
        await modal.openModalWithButtonByName(buttonNames.modifyPart);
        const fields = ['BOM Hierarchy Level:', 'Internal Part Number:', 'Imported Part Number - (REQUIRED):', 'Imported Manufacturer Name:',
            'Description:', 'Quantity (Numbers Only):', 'Reference Designator:', 'Custom 1:', 'Custom 2:', 'Custom 3:',
            'Custom 4:', 'Custom 5:', 'Custom 6:', 'Custom 7:', 'Custom 8:', 'Custom 9:', 'URL Attribute:'];
        await expect(await bomElements.addAPartShade.fieldLabels.getText()).toEqual(fields);
        await modal.closeSingleModalWithXButton()
    });

    it(" should not show custom attributes in aml modal when all bom details checkboxes are checked ", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.checkboxSelector.get(1));
        await singleBomLogic.openSingleBomByName('AML_IPN_ON');
        await amlLogic.openAmlModal();
        await amlLogic.openAddAmlPartModal();
        await addAPartLogic.goToTab('Enter Part Details');
        const fields = ['BOM Hierarchy Level:', 'Internal Part Number:', 'Imported Part Number - (REQUIRED):', 'Imported Manufacturer Name:',
            'Description:', 'Quantity (Numbers Only):', 'Reference Designator:', 'Custom 1:', 'Custom 2:',
            'Custom 3:', 'Custom 4:', 'Custom 5:', 'Custom 6:', 'Custom 7:', 'Custom 8:', 'Custom 9:', 'URL Attribute:'];
        await expect(await bomElements.addAPartShade.fieldLabels.getText()).toEqual(fields);
        await modal.closeSingleModalWithXButton();

    });

    it(" should show all custom attributes in add a part slider when all bom details checkboxes are unchecked ", async () => {
        await login.loginWithDirectLink(browser.params.userAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[6],
            administrationElements.customAttributes.attributesBody);
        await customAttributesLogic.checkUncheckBomDetailCheckoxes(fieldStatuses.emptyField);
        await customAttributesLogic.saveChanges();
        await login.logout();
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.checkboxSelector.get(1));
        await singleBomLogic.openFirstSingleBom();
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await Shade.openShadeWithButton(buttonNames.addPart);
        await addAPartLogic.goToTab('Enter Part Details');
        const fields = ['BOM Hierarchy Level:', 'Internal Part Number:', 'Imported Part Number - (REQUIRED):',
            'Imported Manufacturer Name:', 'Description:', 'Quantity (Numbers Only):', 'Reference Designator:'];
        await expect(await bomElements.addAPartShade.fieldLabels.getText()).toEqual(fields);
    });

    it(" should show all custom attributes in modify part when all bom details checkboxes are unchecked ", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.checkboxSelector.get(1));
        await singleBomLogic.openFirstSingleBom();
        await grid.checkFirstCheckBoxIfNotChecked();
        await toolbar.openToolbarDropdownByButtonName(buttonNames.modify);
        await modal.openModalWithButtonByName(buttonNames.modifyPart);
        const fields = ['BOM Hierarchy Level:', 'Internal Part Number:', 'Imported Part Number - (REQUIRED):', 'Imported Manufacturer Name:',
            'Description:', 'Quantity (Numbers Only):', 'Reference Designator:'];
        await expect(await bomElements.addAPartShade.fieldLabels.getText()).toEqual(fields);
        await modal.closeSingleModalWithXButton()
    });

    it(" should show all custom attributes in aml modal when all bom details checkboxes are checked ", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.checkboxSelector.get(1));
        await singleBomLogic.openSingleBomByName('AML_IPN_ON');
        await amlLogic.openAmlModal();
        await amlLogic.openAddAmlPartModal();
        await addAPartLogic.goToTab('Enter Part Details');
        const fields = ['BOM Hierarchy Level:', 'Internal Part Number:', 'Imported Part Number - (REQUIRED):', 'Imported Manufacturer Name:',
            'Description:', 'Quantity (Numbers Only):', 'Reference Designator:'];
        await expect(await bomElements.addAPartShade.fieldLabels.getText()).toEqual(fields);
        await modal.closeSingleModalWithXButton();
        await login.loginWithDirectLink(browser.params.userAdminUrl);
    });
});
