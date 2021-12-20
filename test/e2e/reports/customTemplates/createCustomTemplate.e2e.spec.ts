import {browser} from "protractor";
import {buttonNames, meganavItems, titles} from "../../../../testData/global";
import {dropdownElements, gridElements, modalElements, pageTitles, reportElements} from "../../../../elements/elements";
import {reportsData} from "../../../../testData/reports";
import {Button} from "../../../../components/simple/button";
import {Dropdown} from "../../../../components/dropdown";
import {Grid} from "../../../../components/grid";
import {Input} from "../../../../components/simple/input";
import {InstructionPanel} from "../../../../components/instructionPanel";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {MultiSelect} from "../../../../components/multiSelect";
import {Random} from "../../../../utils/random";
import {ReportsLogic} from "../../../../bussinesLayer/reports/reportsLogic";
import {TemplatesLogic} from "../../../../bussinesLayer/reports/templatesLogic";
import {TypeAhead} from "../../../../components/typeAhead";
const button: Button = new Button();
const grid: Grid = new Grid();
const input: Input = new Input();
const instructionPanel: InstructionPanel = new InstructionPanel();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const multiSelect: MultiSelect = new MultiSelect();
const random: Random = new Random();
const reportsLogic: ReportsLogic = new ReportsLogic();
const templatesLogic: TemplatesLogic = new TemplatesLogic();
import {HelpLogic} from "../../../../bussinesLayer/help/helpLogic";
import {expectToContain} from "../../../../helper/allure/allureSteps";
import {Waiters} from "../../../../helper/waiters";
import {JsScripts} from "../../../../utils/jsScripts";
import {Waiters as w} from "../../../../helper/waiters";
import {Growlers} from "../../../../components/growlers";
import {importItems} from "../../../../testData/import";
const helpLogic: HelpLogic = new HelpLogic();
const typeAhead: TypeAhead = new TypeAhead();


describe(' Create Custom Template - steps checking', () => {

    it(" should go to create a custom template page ", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.reports,
            meganavItems.reportsSubItems.createTemplate, reportElements.customTemplates.templateNameInput);
        await expect(await pageTitles.pageTitleShim2.getText()).toEqual(titles.createCustomTemplate);
    });

    it('should be instruction panel with option to hide/unhide', async () => {
        await browser.sleep(2000);
        await instructionPanel.instrPanelHidingUnhidingChecking('Create or Modify a Template');
    });

    it("should open help panel and check title", async () => {
        await helpLogic.openAndCheckHelpPanelTitle('Create or modify a Custom report template');
    });

    it("should open help panel and check opened subitem", async () => {
        await helpLogic.openHelpPanelAndCheckOpenedSubitem('Create a custom report template');
    });

    it(" should have name and description fields in step 1", async () => {
        await expect(await reportElements.customTemplates.step1FieldLabels.getText()).toEqual([ 'Name:', 'Description:']);
        await input.fillFieldWithValue(reportElements.customTemplates.templateNameInput, random.randomTextGenerator(43));
        await expect(await reportElements.customTemplates.step1FieldCounters.get(0).getText()).toEqual('0 of 40 characters remaining');
        await input.fillFieldWithValue(reportElements.customTemplates.templateDescInput, random.randomTextGenerator(83));
        await expect(await reportElements.customTemplates.step1FieldCounters.get(1).getText()).toEqual('0 of 80 characters remaining');
    });

    it(" should go to step 2 ", async () => {
        await templatesLogic.goToStep2();
        await expect(button.returnButtonByText(buttonNames.goToStep3WithoutDots).isEnabled()).toBeFalsy()
    });

    it("should be warning modal on leaving workflow without saving changes, US275243", async () => {
        await modal.openModalWithLinkName(meganavItems.home);
        await expect(await modal.modalTitle.getText()).toEqual(importItems.leaveModalTitle);
        await expect(await modal.modalBody.getText()).toEqual('Are you sure you want to leave without saving changes to your template?');
        await modal.closeModalWithXButton();
        await modal.openModalWithLinkName(meganavItems.home);
        await modal.closeModalWithButton(buttonNames.doNotLeavePage)
    });

    it(" should be help/Tips text available near to selected attributes. ", async () => {
        await expect(await reportElements.customTemplates.tipSection.get(0).getText()).toEqual('Select one or more attributes and use the Move Up and Move Down ' +
            'buttons to change the order of the selected attributes.');
        await expect(await reportElements.customTemplates.tipSection.get(1).getText()).toEqual('Recommend that the Imported Mfr P/N be included ' +
            'as a selected attribute in order to include all parts (matched and unmatched) ' +
            'in your report layout. Use the Attribute Group filters to see specific attributes. Once you have selected attributes,' +
            ' use the Move Up and Move Down buttons to finalize the column layout.')
    });

    it("should be 'All' attributes", async () => {
        await Dropdown.openDropdownByClickOnElement(reportElements.customTemplates.attributesToggle);
        await Dropdown.selectValueInDropdownByValueNameAndWaitForItem(reportsData.templates.optionsList[0], reportsData.templates.allAttributesList[0]);
        await expect(await reportElements.customTemplates.valueList.getText()).toEqual(reportsData.templates.allAttributesList);
    });
    it("should be 'Default' attributes", async () => {
        await Dropdown.openDropdownByClickOnElement(reportElements.customTemplates.attributesToggle);
        await Dropdown.selectValueInDropdownByValueNameAndWaitForItem(reportsData.templates.optionsList[1], reportsData.templates.defaultList[0]);
        await browser.sleep(1000);
        await expect(await reportElements.customTemplates.groupList.get(1).getText()).toEqual('Default');
        await expect(await reportElements.customTemplates.valueList.getText()).toEqual(reportsData.templates.defaultList);
    });

    it("should be options list ", async () => {
        await Dropdown.openDropdownByClickOnElement(reportElements.customTemplates.attributesToggle);
        await expect(await dropdownElements.dropdownValues.getText()).toEqual(reportsData.templates.optionsList);
        await Dropdown.closeDropdownByClickOnElement(reportElements.customTemplates.attributesToggle)
    });

    it("should be Additional BOM Data options ", async () => {
        await Dropdown.openDropdownByClickOnElement(reportElements.customTemplates.attributesToggle);
        await Dropdown.selectValueInDropdownByValueNameAndWaitForItem(reportsData.templates.optionsList[2],reportsData.templates.additionalBomList[0]);
        await expect(await reportElements.customTemplates.groupList.get(1).getText()).toEqual('Additional BOM Data');
        await expect(await reportElements.customTemplates.valueList.getText()).toEqual(reportsData.templates.additionalBomList);
    });
    it("should be 'Detailed Life Cycle' attributes", async () => {
        await Dropdown.openDropdownByClickOnElement(reportElements.customTemplates.attributesToggle);
        await Dropdown.selectValueInDropdownByValueNameAndWaitForItem(reportsData.templates.optionsList[3], reportsData.templates.DetailedLifeCycle[0]);
        await expect(await reportElements.customTemplates.groupList.get(1).getText()).toEqual('Detailed Life Cycle');
        await expect(await reportElements.customTemplates.valueList.getText()).toEqual(reportsData.templates.DetailedLifeCycle);
    });

    it("should be 'Detailed RoHS Data' attributes", async () => {
        await Dropdown.openDropdownByClickOnElement(reportElements.customTemplates.attributesToggle);
        await Dropdown.selectValueInDropdownByValueNameAndWaitForItem(reportsData.templates.optionsList[4], reportsData.templates.DetailedRoHSData[0]);
        await expect(await reportElements.customTemplates.groupList.get(1).getText()).toEqual('Detailed RoHS Data');
        await expect(await reportElements.customTemplates.valueList.getText()).toEqual(reportsData.templates.DetailedRoHSData);
    });
    it("should be 'Detailed China RoHS Data' attributes", async () => {
        await Dropdown.openDropdownByClickOnElement(reportElements.customTemplates.attributesToggle);
        await Dropdown.selectValueInDropdownByValueNameAndWaitForItem(reportsData.templates.optionsList[5], reportsData.templates.DetailedChinaRoHSData[0]);
        await expect(await reportElements.customTemplates.groupList.get(1).getText()).toEqual('Detailed China RoHS Data');
        await expect(await reportElements.customTemplates.valueList.getText()).toEqual(reportsData.templates.DetailedChinaRoHSData);
    });
    it("should be 'REACH Data' attributes", async () => {
        await Dropdown.openDropdownByClickOnElement(reportElements.customTemplates.attributesToggle);
        await Dropdown.selectValueInDropdownByValueNameAndWaitForItem(reportsData.templates.optionsList[6], reportsData.templates.REACHData[0]);
        await expect(await reportElements.customTemplates.groupList.get(1).getText()).toEqual('REACH Data');
        await expect(await reportElements.customTemplates.valueList.getText()).toEqual(reportsData.templates.REACHData);
    });
    it("should be 'Packaging Data' attributes", async () => {
        await Dropdown.openDropdownByClickOnElement(reportElements.customTemplates.attributesToggle);
        await Dropdown.selectValueInDropdownByValueNameAndWaitForItem(reportsData.templates.optionsList[7], reportsData.templates.PackagingData[0]);
        await expect(await reportElements.customTemplates.groupList.get(1).getText()).toEqual('Packaging Data');
        await expect(await reportElements.customTemplates.valueList.getText()).toEqual(reportsData.templates.PackagingData);
    });
    it("should be 'Corporate Parts List' attributes", async () => {
        await Dropdown.openDropdownByClickOnElement(reportElements.customTemplates.attributesToggle);
        await Dropdown.selectValueInDropdownByValueNameAndWaitForItem(reportsData.templates.optionsList[10], reportsData.templates.CorporatePartsList[0]);
        await expect(await reportElements.customTemplates.groupList.get(1).getText()).toEqual('Corporate Parts List');
        await expect(await reportElements.customTemplates.valueList.getText()).toEqual(reportsData.templates.CorporatePartsList);
    });
    it("should be 'DRC/Prop65 Data' attributes", async () => {
        await Dropdown.openDropdownByClickOnElement(reportElements.customTemplates.attributesToggle);
        await Dropdown.selectValueInDropdownByValueNameAndWaitForItem(reportsData.templates.optionsList[11], reportsData.templates.DRCProp65Data[0]);
        await expect(await reportElements.customTemplates.groupList.get(1).getText()).toEqual('DRC Prop65 Data');
        await expect(await reportElements.customTemplates.valueList.getText()).toEqual(reportsData.templates.DRCProp65Data);
    });
    it("should be 'Export Control Data' attributes", async () => {
        await Dropdown.openDropdownByClickOnElement(reportElements.customTemplates.attributesToggle);
        await Dropdown.selectValueInDropdownByValueNameAndWaitForItem(reportsData.templates.optionsList[12], reportsData.templates.ExportControlData[0]);
        await expect(await reportElements.customTemplates.groupList.get(1).getText()).toEqual('Export Control Data');
        await expect(await reportElements.customTemplates.valueList.getText()).toEqual(reportsData.templates.ExportControlData);
    });
    it("should be 'Part Notes' attributes", async () => {
        await Dropdown.openDropdownByClickOnElement(reportElements.customTemplates.attributesToggle);
        await Dropdown.selectValueInDropdownByValueNameAndWaitForItem(reportsData.templates.optionsList[13], reportsData.templates.PartNotes[0]);
        await expect(await reportElements.customTemplates.groupList.get(1).getText()).toEqual('Part Notes');
        await expect(await reportElements.customTemplates.valueList.getText()).toEqual(reportsData.templates.PartNotes);
    });
    it("should be 'Manufacturer Preferences' attributes", async () => {
        await Dropdown.openDropdownByClickOnElement(reportElements.customTemplates.attributesToggle);
        await Dropdown.selectValueInDropdownByValueNameAndWaitForItem(reportsData.templates.optionsList[14], reportsData.templates.ManufacturerPreferences[0]);
        await expect(await reportElements.customTemplates.groupList.get(1).getText()).toEqual('Manufacturer Preferences');
        await expect(await reportElements.customTemplates.valueList.getText()).toEqual(reportsData.templates.ManufacturerPreferences);
    });
    it("should be 'Alternates' attributes", async () => {
        await Dropdown.openDropdownByClickOnElement(reportElements.customTemplates.attributesToggle);
        await Dropdown.selectValueInDropdownByValueNameAndWaitForItem(reportsData.templates.optionsList[8], reportsData.templates.alternatesList[0]);
        await expect(await reportElements.customTemplates.groupList.get(1).getText()).toEqual('Alternates');
        await expect(await reportElements.customTemplates.valueList.getText()).toEqual(reportsData.templates.alternatesList);
    });

    it("should be 'Pricing and Availability' attributes", async () => {
        await Dropdown.openDropdownByClickOnElement(reportElements.customTemplates.attributesToggle);
        await Dropdown.selectValueInDropdownByValueNameAndWaitForItem(reportsData.templates.optionsList[9], reportsData.templates.pricingAndAvailabilityList[0]);
        await expect(await reportElements.customTemplates.groupList.get(1).getText()).toEqual('Pricing and Availability');
        await expect(await reportElements.customTemplates.valueList.getText()).toEqual(reportsData.templates.pricingAndAvailabilityList);
    });

    it(" should select values with select all ", async () => {
        await Dropdown.openDropdownByClickOnElement(reportElements.customTemplates.attributesToggle);
        await Dropdown.selectValueInDropdownByValueNameAndWaitForItem(reportsData.templates.optionsList[6], 'Candidate List Date');
        await browser.sleep(1000);
        await expect(await reportElements.customTemplates.groupList.get(1).getText()).toEqual('REACH Data');
        await expect(await reportElements.customTemplates.valueList.getText()).toEqual(reportsData.templates.REACHData);
        await templatesLogic.selectAllChecking(reportsData.templates.REACHData);
    });

    it(" should have move up and move down ", async () => {
        await templatesLogic.moveUpDownChecking();
    });

    it(" should be able to move attribute up  ", async () => {
        await templatesLogic.moveUp();
    });

    it(" should be able to move attribute down  ", async () => {
        await templatesLogic.moveDown();
    });

    it(" should remove values with remove all ", async () => {
        await templatesLogic.removeAllChecking();
    });

    it(" should have instruction for ordering   ", async () => {
        await templatesLogic.instractionBoxChecking();
    });

    it(" should have instruction for tips   ", async () => {
        await templatesLogic.instractionTipsChecking();
    });

    it(" should go to step 3  ", async () => {
        await templatesLogic.goToStep3();
    });

    it(" should show asc and desc sort items  ", async () => {
        await templatesLogic.showAscDesc();
    });

    it(" should sort - sort with asc  ", async () => {
        await templatesLogic.ascSort();
    });

    it(" should be tips for step 3 ", async () => {
        await templatesLogic.step3TipsChecking();
    });

    it(" should be option to unsort - unsort all  ", async () => {
        await templatesLogic.unsortChecking();
    });

    it(" should open/close clear sort option modal by selecting a checkbox ", async () => {
        await templatesLogic.showAscDesc();
        await templatesLogic.ascSort();
        await modal.openModalWithElement(reportElements.customTemplates.step3CheckboxLabel);
        await expect(await modal.modalTitle.getText()).toEqual('Clear sort options?');
        await expect(await modal.modalBody.getText()).toEqual('Sort options will be cleared if you select this option, continue?');
        await modal.closeSingleModalWithXButton();
        await modal.openModalWithElement(reportElements.customTemplates.step3CheckboxLabel);
        await modal.closeModalWithButton(buttonNames.no);
    });

    it(" should clear sort option modal by selecting a checkbox and accepting clear modal", async () => {
        await modal.openModalWithElement(reportElements.customTemplates.step3CheckboxLabel);
        await modal.closeModalWithButton(buttonNames.yes);
        await expect(await reportElements.customTemplates.step3CheckboxInput.isSelected()).toBeTruthy('checked checkbox');
        await expect(await reportElements.customTemplates.ascItem.isPresent()).toBeFalsy('asc icon');
        await expect(await reportElements.customTemplates.descItem.isPresent()).toBeFalsy('desc icon');
    });

    it(" should not be option to sort with unchecked checkbox", async () => {
        await templatesLogic.clickOnFirstStep3Row();
        await expect(await reportElements.customTemplates.ascItem.isPresent()).toBeFalsy('asc icon');
        await expect(await reportElements.customTemplates.descItem.isPresent()).toBeFalsy('desc icon');
    });

    it(" should go to step 4  ", async () => {
        await templatesLogic.goToStep4();
    });

    it(" verify fields labels  ", async () => {
        await expect(await reportElements.reports.step4Labels.getText()).toEqual(reportsData.templates.step4LabelsOnlyForCustomTemplates)
    });

    it(" should be Part Status multiselect options", async () => {
        await multiSelect.openMultiSelect(0);
        const partStatusMultiselectOptions =  [ 'Active', 'Active-Unconfirmed', 'Contact Mfr',
            'Discontinued', 'Discontinued-Unconfirmed', 'EOL', 'NRFND', 'Transferred' ];
        await expect(await multiSelect.multiSelectOptionLabels.getText()).toEqual(partStatusMultiselectOptions);
    });

    it(" should be option to select unselect in Part Status multiselect", async () => {
        await multiSelect.selectUnSelectAllChecking();
    });

    it(" should select options in Part Status multiselect and displayed selected options", async () => {
        await multiSelect.selectMultiSelectOptionAndDisplayInRow();
    });

    it(" should deselect options in Part Status", async () => {
        await multiSelect.deselectChecking(0);
    });

    it(" should be Life Cycle Stage multiselect options", async () => {
        await multiSelect.openMultiSelect(1);
        const lyfeCycleMultiselectOptions =  [ 'Decline', 'Discontinued', 'Discontinued-Transferred', 'Growth',
            'Introduction', 'Mature', 'Phase-Out', 'Reactivated' ];
        await expect(await multiSelect.multiSelectOptionLabels.getText()).toEqual(lyfeCycleMultiselectOptions);
    });

    it(" should be option to select unselect in Life Cycle Stage multiselect", async () => {
        await multiSelect.selectUnSelectAllChecking();
    });

    it(" should select options in Life Cycle Stage multiselect and displayed selected options", async () => {
        await multiSelect.selectMultiSelectOptionAndDisplayInRow();
    });

    it(" should deselect options in Life Cycle Stage status", async () => {
        await multiSelect.deselectChecking(1);
    });

    it(" should be highlighted selected items in Availability(YTEOL) multiselect", async () => {
        await multiSelect.openMultiSelect(2);
        const yteolMultiselectOptions =  [ '0', '1 - 2', '2 - 4', '4 - 8', '< 1', '> 8' ];
        await expect(await multiSelect.multiSelectOptionLabels.getText()).toEqual(yteolMultiselectOptions);
    });

    it(" should be Availability(YTEOL) multiselect", async () => {
        await multiSelect.selectUnSelectAllChecking();
    });

    it(" should create a custom template and go to View All Tempaltes ", async () => {
        await templatesLogic.createTemplate();
    });

    it(" should delete selected template ", async () => {
        await templatesLogic.deleteTemplate();
    });

    it(" should select values with select Detailed RoHS Data ", async () => {
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.reports,
            meganavItems.reportsSubItems.createTemplate, reportElements.customTemplates.templateNameInput);
        await templatesLogic.goToStep2();
        await Dropdown.openDropdownByClickOnElement(reportElements.customTemplates.attributesToggle);
        await Dropdown.selectValueInDropdownByValueNameAndWaitForItem(reportsData.templates.optionsList[4], reportsData.templates.detailedRohsData[0]);
        await browser.sleep(2000);
        await expect(await reportElements.customTemplates.valueList.getText())
            .toContain('DEHP (mg)');
        await expect(await reportElements.customTemplates.valueList.getText())
            .toContain( 'BBP (mg)' );
        await expect(await reportElements.customTemplates.valueList.getText())
            .toContain('DBP (mg)');
        await expect(await reportElements.customTemplates.valueList.getText())
            .toContain('DIBP (mg)');
    });

    it(" should select values with select all ", async () => {
        await Dropdown.openDropdownByClickOnElement(reportElements.customTemplates.attributesToggle);
        await Dropdown.selectValueInDropdownByValueNameAndWaitForItem(reportsData.templates.optionsList[0], reportsData.templates.alternatesList[0]);
        await expect(await reportElements.customTemplates.valueList.getText())
            .toContain('DEHP (mg)');
        await expect(await reportElements.customTemplates.valueList.getText())
            .toContain( 'BBP (mg)' );
        await expect(await reportElements.customTemplates.valueList.getText())
            .toContain('DBP (mg)');
        await expect(await reportElements.customTemplates.valueList.getText())
            .toContain('DIBP (mg)');
        await meganav.goToFeatureWithMeganav(meganavItems.home, modalElements.modalTitle);
        await await modal.closeModalWithButton(buttonNames.leaveAndDiscardUnsavedChanges);
    });
});

describe('TC66408, TC66410 - Add Supply Chain attributes to Reports - Validate Fields.', () => {

    beforeAll(async () => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 520000;
    });

    afterAll(async () => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000;
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.reports,
            meganavItems.reportsSubItems.viewTemplates,gridElements.checkboxSelector.get(1));
        await templatesLogic.deleteTemplate();
    });
    it("should be Pricing And Availability options ", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.reports,
            meganavItems.reportsSubItems.createTemplate, reportElements.customTemplates.templateNameInput);
        await expect(await pageTitles.pageTitleShim2.getText()).toEqual(titles.createCustomTemplate);
        await input.fillFieldWithValue(reportElements.customTemplates.templateNameInput, reportsData.templates.templateName);
        await templatesLogic.goToStep2();
        await Dropdown.openDropdownByClickOnElement(reportElements.customTemplates.attributesToggle);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(reportsData.templates.optionsList[9]);
        await browser.sleep(2000);
        await expect(await reportElements.customTemplates.valueList.getText()).toEqual(reportsData.templates.pricingAndAvailabilityList);
    });

   it("should be Pricing And Availability attributes in View Custom Template Modal", async () => {
        await templatesLogic.selectAllChecking(reportsData.templates.pricingAndAvailabilityList);
        await templatesLogic.createTemplate();
        await modal.openModalWithLinkName(reportsData.templates.templateName);
        await w.waitUntilElementIsDisplayed(reportElements.customTemplates.attributeBoxInsideTemplateModal);
        await expect(await reportElements.customTemplates.attributesSortList.getText())
            .toEqual(reportsData.templates.pricingAndAvailabilityList);
        await modal.closeModalWithXButton();
    });

    it("should be Pricing And Availability attributes in Modify template", async () => {
        await templatesLogic.selectTemplateRowByName();
        await templatesLogic.goToModifyTemplate();
        await templatesLogic.goToStep2();
        await w.waitUntilElementIsDisplayed(await reportElements.customTemplates.selectedValueList.get(1));
        await expect(await reportElements.customTemplates.selectedValueList.getText())
            .toEqual(reportsData.templates.pricingAndAvailabilityList);
        await button.clickByButtonName(buttonNames.CancelDoNotModify);
        await button.clickByButtonName(buttonNames.YesCancel);
    });

    //to long report generating
    it("should be Pricing And Availability attributes in View Reports Modal", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.reports,
            meganavItems.reportsSubItems.generateReport, reportElements.reports.standardReports.get(1));
        await reportsLogic.goToStep2WithAdvancedReport(reportsData.templates.templateName);
        await reportsLogic.goToStep3();
        await reportsLogic.selectElementFromBomTree();
        await reportsLogic.generateReport();
        await reportsLogic.reportStatusShouldNotBeError();
        await modal.openModalWithLinkName(reportsData.reports.reportName);
        await expect(await reportElements.reports.attributesList.getText())
            .toEqual(reportsData.templates.pricingAndAvailabilityList);
        await modal.closeModalWithXButton();
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await reportsLogic.deleteReport();
    });

    //to long report generating
    it("should be Pricing And Availability attributes in View Reports Modal for IHS Alternates Template", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.reports,
            meganavItems.reportsSubItems.generateReport, reportElements.reports.standardReports.get(1));
        await reportsLogic.goToStep2WithAdvancedReport("(IHS) Alternates");
        await reportsLogic.goToStep3();
        await reportsLogic.selectElementFromBomTree();
        await reportsLogic.generateReport();
        await reportsLogic.reportStatusShouldNotBeError();
        await modal.openModalWithLinkName(reportsData.reports.reportName);
        await expect((await reportElements.reports.attributesList.getText()).toString()
            .includes(reportsData.templates.pricingAndAvailabilityListForIhsAlternates.toString()))
            .toBeTruthy();
        await modal.closeModalWithXButton();
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await reportsLogic.deleteReport();
    });

    //to long report generating
    it("should be Pricing And Availability attributes in View Reports Modal for  (IHS) Procurement Data (3k Max)", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.reports,
            meganavItems.reportsSubItems.generateReport, reportElements.reports.standardReports.get(1));
        await reportsLogic.goToStep2WithAdvancedReport( "(IHS) Procurement Data (3k Max)");
        await reportsLogic.goToStep3();
        await reportsLogic.selectElementFromBomTree();
        await reportsLogic.generateReport();
        await reportsLogic.reportStatusShouldNotBeError();
        await modal.openModalWithLinkName(reportsData.reports.reportName);
        await expect((await reportElements.reports.attributesList.getText()).toString()
            .includes(reportsData.templates.pricingAndAvailabilityListForProcData.toString()))
            .toBeTruthy();
        await modal.closeModalWithXButton();
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await reportsLogic.deleteReport();
    });
});


describe('Reports, Custom templates, DE110115', () => {

    it('Should save changed template filters creating new template based on existing one', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.reports,
            meganavItems.reportsSubItems.createTemplate, reportElements.customTemplates.templateNameInput);
        await templatesLogic.goToStep2();
        await templatesLogic.goToStep3();
        await templatesLogic.createTemplate();
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.reports,
            meganavItems.reportsSubItems.generateReport, gridElements.grid);
        await Growlers.muteGrowlersNotifications(true);
        await reportsLogic.goToStep2WithAdvancedReport(reportsData.templates.templateName);
        await reportsLogic.goToStep3();
        await reportsLogic.selectElementFromBomTree();
        await reportsLogic.goToStep4();
        await typeAhead.typeAheadChecking(reportElements.reports.searchForMfrInput, 'FINIS' );
        await JsScripts.scrollToElement(button.returnButtonByText(buttonNames.saveAsNew));
        await button.clickOnTheElementAndWait(await button.returnButtonByText(buttonNames.saveAsNew), modal.modalBody);
        const modifiedTemplateName: string = reportsData.templates.templateName + ' modified';
        await input.fillFieldWithValue(reportElements.customTemplates.saveAsNewModalNameField, modifiedTemplateName);
        await modal.closeModalWithButton(buttonNames.saveNewCustomTemplate);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.reports,
            meganavItems.reportsSubItems.viewTemplates, modal.modalBody);
        await await modal.closeModalWithButton(buttonNames.leaveAndDiscardUnsavedChanges);
        await Waiters.waitUntilElementIsDisplayed(gridElements.newGridCellWithoutContentByRowIndex(0).get(0));
        await templatesLogic.openViewCustomTemplateModalByName(modifiedTemplateName);
        await expect(await reportElements.customTemplates.filterContainerRows.get(0).getText()).toContain('FINIS');
        await modal.closeSingleModalWithXButton();
        await templatesLogic.deleteTemplateByName(modifiedTemplateName);
        await templatesLogic.deleteTemplateByName(reportsData.templates.templateName);
    });
});

describe('Reports, Create custom template with All Attribute, DE222683', () => {

    it('Should create a new template all attributes and create a report with same template', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.reports,
            meganavItems.reportsSubItems.createTemplate, reportElements.customTemplates.templateNameInput);
        await templatesLogic.goToStep2();
        await templatesLogic.goToStep3();
        await templatesLogic.createTemplate();
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.reports,
            meganavItems.reportsSubItems.generateReport, reportElements.reports.elementByText(reportsData.templates.templateName));
        await w.waitUntilWorkingModalNotDisplayed();
        await browser.sleep(2000);
        await reportsLogic.goToStep2WithAdvancedReport(reportsData.templates.templateName);
        await reportsLogic.goToStep3();
        await reportsLogic.selectElementFromBomTree();
        await reportsLogic.generateReport();
        await reportsLogic.reportStatusShouldNotBeError();
        await modal.openModalWithLinkName(reportsData.reports.reportName);
        await reportsData.templates.allAttributesList.splice(55,1)
        await expect(await reportElements.reports.attributesList.getText())
            .toEqual(reportsData.templates.allAttributesList);
        await modal.closeModalWithXButton();
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await reportsLogic.deleteReport();
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.reports,
            meganavItems.reportsSubItems.viewTemplates, reportElements.reports.elementByText(reportsData.templates.templateName));
        await templatesLogic.deleteTemplateByName(reportsData.templates.templateName);

    });
});

describe('Reports, Create custom template with xss injection text entered in template description, US277194', () => {
    let templateName:string = 'XSSInjectionTest';
    afterAll(async ()=>{
        await templatesLogic.deleteTemplateByName(templateName);
    });

    it('Should create a custom template with xss injection text entered in the description field', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.reports,
            meganavItems.reportsSubItems.createTemplate, reportElements.customTemplates.templateNameInput);

        let xssInjection:string = "This is <img src=x onerror=\"alert('XSS: ' + document.cookie)\" /> a test";
        await expect(await reportElements.customTemplates.step1FieldLabels.getText()).toEqual([ 'Name:', 'Description:']);
        await input.fillFieldWithValue(reportElements.customTemplates.templateNameInput, templateName);
        await input.fillFieldWithValue(reportElements.customTemplates.templateDescInput, xssInjection);
        await button.clickOnTheElement(reportElements.customTemplates.step2Button);
        await w.waitUntilElementIsClickable(reportElements.customTemplates.step2);
        await templatesLogic.goToStep3();
        await button.clickByButtonName(buttonNames.saveThisCustomTemplates);
        await w.waitUntilElementIsClickable(gridElements.checkboxSelector.get(0));
        await expect(await pageTitles.pageTitleShim.getText()).toEqual(titles.viewAllTemplates);
        await modal.openModalWithLinkName(templateName);
        await w.waitUntilElementIsDisplayed(reportElements.customTemplates.attributeBoxInsideTemplateModal);
        await expect(await reportElements.customTemplates.descriptionSummary.get(0).getText())
            .toEqual("Description: This is a test");
        await modal.closeModalWithXButton();

        });

});

