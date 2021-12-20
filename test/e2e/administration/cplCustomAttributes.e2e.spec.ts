import {buttonNames, meganavItems} from "../../../testData/global";
import {
    pageTitles, gridElements, commonElements, administrationElements, reportElements, importElements,
    cplElements, sliderElements
} from "../../../elements/elements";
import {browser} from "protractor";
import {cplImportData} from "../../../testData/cpl";
import {Button} from "../../../components/simple/button";
import {CustomAttributesLogic} from "../../../bussinesLayer/adminstration/customAttributesLogic";
import {HelpLogic} from "../../../bussinesLayer/help/helpLogic";
import {CplCustomAttributesLogic} from "../../../bussinesLayer/adminstration/cplCustomAttributesLogic";
import {CplImportLogic} from "../../../bussinesLayer/import/cplImportLogic";
import {TemplatesLogic} from "../../../bussinesLayer/reports/templatesLogic";
import {Dropdown} from "../../../components/dropdown";
import {InstructionPanel} from "../../../components/instructionPanel";
import {ImportLogic} from "../../../bussinesLayer/import/importLogic";
import {Login} from "../../../components/login";
import {Meganav} from "../../../components/meganav";
import {Toolbar} from "../../../components/toolbar";
import {Slider} from "../../../components/slider";

const button: Button = new Button();
const customAttributesLogic: CustomAttributesLogic = new CustomAttributesLogic();
const helpLogic: HelpLogic = new HelpLogic();
const cplImportLogic: CplImportLogic = new CplImportLogic();
const cplCustomAttributesLogic: CplCustomAttributesLogic = new CplCustomAttributesLogic();
const importLogic: ImportLogic = new ImportLogic();
const instructionPanel:InstructionPanel = new InstructionPanel();
const login: Login = new Login();
const meganav:Meganav = new Meganav();
const toolbar: Toolbar = new Toolbar();
const templatesLogic:  TemplatesLogic = new TemplatesLogic();

describe('CPL Custom Attributes', () => {

    it(" should go to custom attributes", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.cplCustomAttributes, administrationElements.customAttributes.attributesBody);
        await expect(await pageTitles.pageTitleShim2.getText()).toEqual('Administer Custom Attributes for Corporate Parts List (CPL)' );
    });

    it('should be instruction panel with option to hide/unhide',  async () => {
        await instructionPanel.instrPanelHidingUnhidingChecking('CPL Custom Attributes');
    });

    it("should open help panel and check title", async () => {
        await helpLogic.openAndCheckHelpPanelTitle('Administer CPL details');
    });

    it(" should be inactive save changes button", async () => {
        await customAttributesLogic.saveChangesButtonChecking();
    });

    it(" should have headers", async () => {
        const columnHeaders = ['System Name', 'Max Length (data)','Display Label (50 chars max)', 'Enabled' ];
        await expect(await administrationElements.cplCustomAttributes.headers.getText()).toEqual(columnHeaders)
    });

    it(" should have 1st row with Rename System Attributes", async () => {
        await cplCustomAttributesLogic.cplCheckingRowInRenameCustomAttrib(
            0,
            'Corp P/N Desc',
            '255',
        )
    });

    it(" should have 2st row with Rename System Attributes", async () => {
        await cplCustomAttributesLogic.cplCheckingRowInRenameCustomAttrib(
            1,
            'Mfr P/N Desc',
            '255',
        )
    });

    it(" should have 3st row with Rename System Attributes", async () => {
        await cplCustomAttributesLogic.cplCheckingRowInRenameCustomAttrib(
            2,
            'CPL Comments',
            '4000',
        )
    });

    it(" should have 4st row with Rename System Attributes", async () => {
        await cplCustomAttributesLogic.cplCheckingRowInRenameCustomAttrib(
            3,
            'Generic Number',
            '32',
        )
    });

    it(" should have 5st row with Rename System Attributes", async () => {
        await cplCustomAttributesLogic.cplCheckingRowInRenameCustomAttrib(
            4,
            'Corp Part Status',
            '32',
        )
    });

    it(" should have 6st row with Rename System Attributes", async () => {
        await cplCustomAttributesLogic.cplCheckingRowInRenameCustomAttrib(
            5,
            'Mfr Part Status',
            '32',
        )
    });

    it(" should have 1st row with attributes", async () => {
        await cplCustomAttributesLogic.cplCheckingRowCustomAttrib(
            6,
            'CPL Attribute 1',
            '255',
        )
    });

    it(" should have 2d row with attributes", async () => {
        await cplCustomAttributesLogic.cplCheckingRowCustomAttrib(
            7,
            'CPL Attribute 2',
            '255',
        )
    });

    it(" should be 3d row with attributes", async () => {
        await cplCustomAttributesLogic.cplCheckingRowCustomAttrib(
            8,
            'CPL Attribute 3',
            '255',
        )
    });

    it(" should be 4th row with attributes", async () => {
        await cplCustomAttributesLogic.cplCheckingRowCustomAttrib(
            9,
            'CPL Attribute 4',
            '255',
        )
    });

    it(" should be 5th row with attributes", async () => {
        await cplCustomAttributesLogic.cplCheckingRowCustomAttrib(
            10,
            'CPL Attribute 5',
            '255',
        )
    });

    it(" should be 6th row with attributes", async () => {
        await cplCustomAttributesLogic.cplCheckingRowCustomAttrib(
            11,
            'CPL Attribute 6',
            '255',
        )
    });

    it(" should be 7th row with attributes ", async () => {
        await cplCustomAttributesLogic.cplCheckingRowCustomAttrib(
            12,
            'CPL Attribute 7',
            '255',
        )
    });

    it(" should be 8th row with attributes ", async () => {
        await cplCustomAttributesLogic.cplCheckingRowCustomAttrib(
            13,
            'CPL Attribute 8',
            '255',
        )
    });

    it(" should be 9th row with attributes ", async () => {
        await cplCustomAttributesLogic.cplCheckingRowCustomAttrib(
            14,
            'CPL Attribute 9',
            '255',
        )
    });

    it(" should be 10 row with attributes ", async () => {
        await cplCustomAttributesLogic.cplCheckingRowCustomAttrib(
            15,
            'CPL Attribute 10',
            '1024',
        )
    });

    it(" should be active/inactive cancel changes button ", async () => {
        await customAttributesLogic.cancelChangesChecking(administrationElements.cplCustomAttributes.displayLabel(0));
    });

    it(" should be active/inactive save changes button ", async () => {
        await customAttributesLogic.saveChangesButtonChecking();
    });


    it(" should leave without saving changes ", async () => {
        await cplCustomAttributesLogic.leaveModalChecking();
    });

    it(" should be cpl custom attributes in cpl import ", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl, meganavItems.cplSublinks.import,
            importElements.aboutImport);
        await importLogic.goToStep1();
        await importLogic.uploadAValidFileToImport();
        await cplImportLogic.openOptionModalByTitle(cplImportData.settingTitles[1]);
        await Dropdown.openDropdownByClickOnElement(importElements.columnMappDropdown.get(0));
        await expect(await commonElements.dropdownItemByName(' CPL Custom 1 ').isPresent()).toBeTruthy();
        await expect(await commonElements.dropdownItemByName(' CPL Custom 2 ').isPresent()).toBeTruthy();
        await expect(await commonElements.dropdownItemByName(' CPL Custom 3 ').isPresent()).toBeTruthy();
        await expect(await commonElements.dropdownItemByName(' CPL Custom 4 ').isPresent()).toBeTruthy();
        await expect(await commonElements.dropdownItemByName(' CPL Custom 5 ').isPresent()).toBeTruthy();
        await expect(await commonElements.dropdownItemByName(' CPL Custom 6 ').isPresent()).toBeTruthy();
        await expect(await commonElements.dropdownItemByName(' CPL Custom 7 ').isPresent()).toBeTruthy();
        await expect(await commonElements.dropdownItemByName(' CPL Custom 8 ').isPresent()).toBeTruthy();
        await expect(await commonElements.dropdownItemByName(' CPL Custom 9 ').isPresent()).toBeTruthy();
        await expect(await commonElements.dropdownItemByName(' CPL Custom 10 ').isPresent()).toBeTruthy();
        await importLogic.closeOptionModalWithX();
        await importLogic.leaveImportWitLeaveModal();
    });

    it(" should  be cpl custom attributes in create template ", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.reports,
            meganavItems.reportsSubItems.createTemplate, reportElements.customTemplates.templateNameInput);
        await templatesLogic.goToStep2();
        await expect(await commonElements.itemName(' CPL Custom 1 ').isPresent()).toBeTruthy();
        await expect(await commonElements.itemName(' CPL Custom 2 ').isPresent()).toBeTruthy();
        await expect(await commonElements.itemName(' CPL Custom 3 ').isPresent()).toBeTruthy();
        await expect(await commonElements.itemName(' CPL Custom 4 ').isPresent()).toBeTruthy();
        await expect(await commonElements.itemName(' CPL Custom 5 ').isPresent()).toBeTruthy();
        await expect(await commonElements.itemName(' CPL Custom 6 ').isPresent()).toBeTruthy();
        await expect(await commonElements.itemName(' CPL Custom 7 ').isPresent()).toBeTruthy();
        await expect(await commonElements.itemName(' CPL Custom 8 ').isPresent()).toBeTruthy();
        await expect(await commonElements.itemName(' CPL Custom 9 ').isPresent()).toBeTruthy();
        await expect(await commonElements.itemName(' CPL Custom 10 ').isPresent()).toBeTruthy();
        await importLogic.leaveImportWitLeaveModal()
    });

    it(" should be Rename System cpl attributes in cpl import ", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl, meganavItems.cplSublinks.import,
            importElements.aboutImport);
        await importLogic.goToStep1();
        await importLogic.uploadAValidFileToImport();
        await cplImportLogic.openOptionModalByTitle(cplImportData.settingTitles[1]);
        await Dropdown.openDropdownByClickOnElement(importElements.columnMappDropdown.get(0));
        await expect(await commonElements.dropdownItemByName(' Corp P/N Desc ').isPresent()).toBeTruthy();
        await expect(await commonElements.dropdownItemByName(' Mfr P/N Desc ').isPresent()).toBeTruthy();
        await expect(await commonElements.dropdownItemByName(' CPL Comments ').isPresent()).toBeTruthy();
        await expect(await commonElements.dropdownItemByName(' Generic Number ').isPresent()).toBeTruthy();
        await expect(await commonElements.dropdownItemByName(' Corp Part Status ').isPresent()).toBeTruthy();
        await expect(await commonElements.dropdownItemByName(' Mfr Part Status ').isPresent()).toBeTruthy();
        await expect(await commonElements.dropdownItemByName(' CPL Custom 7 ').isPresent()).toBeTruthy();
        await importLogic.closeOptionModalWithX();
        await importLogic.leaveImportWitLeaveModal();
    });

    it(" should be Rename System cpl attributes in create template ", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.reports,
            meganavItems.reportsSubItems.createTemplate, reportElements.customTemplates.templateNameInput);
        await templatesLogic.goToStep2();
        await expect(await commonElements.itemName(' Corp P/N Desc ').isPresent()).toBeTruthy();
        await expect(await commonElements.itemName(' Mfr P/N Desc ').isPresent()).toBeTruthy();
        await expect(await commonElements.itemName(' CPL Comments ').isPresent()).toBeTruthy();
        await expect(await commonElements.itemName(' Generic Number ').isPresent()).toBeTruthy();
        await expect(await commonElements.itemName(' Corp Part Status ').isPresent()).toBeTruthy();
        await expect(await commonElements.itemName(' Mfr Part Status ').isPresent()).toBeTruthy();
        await importLogic.leaveImportWitLeaveModal()
    });

    it(" should  be cpl custom attributes add corp slider ", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.manageCpl, gridElements.grid);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await Slider.openSliderByClickingOnTheElement(button.returnButtonByText(buttonNames.addCorpParts));
        const fieldLabels =[ 'Corp P/N', 'Corp Name', 'Corp P/N Desc', 'CPL Comments',
            'Corp Part Status', 'Generic Number', 'CPL Custom 1', 'CPL Custom 2', 'CPL Custom 3',
            'CPL Custom 4', 'CPL Custom 5', 'CPL Custom 6', 'CPL Custom 7', 'CPL Custom 8',
            'CPL Custom 9', 'CPL Custom 10' ] ;
        await browser.sleep(2000);
        await expect(await cplElements.cplDetails.addSliderFirstSectionFieldsLabels.getText()).toEqual(fieldLabels);
        await Slider.closeSlider(sliderElements.xButtonSlider, gridElements.checkboxSelector.get(1));
    });

});