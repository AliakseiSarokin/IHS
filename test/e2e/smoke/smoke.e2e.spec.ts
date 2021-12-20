import {browser} from "protractor";
import {buttonNames, modalTitles, exportOptions, meganavItems, headerItems} from "../../../testData/global";
import {commonSearch} from "../../../testData/search";
import {
    partDetailsElements, searchElements, gridElements, importElements, settings, pageTitles, reportElements,
    dropdownElements, headerElements
} from "../../../elements/elements";
import {cplData} from "../../../testData/cpl";
import {importItems} from "../../../testData/import";
import {reportsData} from "../../../testData/reports";
import {resReqData} from "../../../testData/researchRequests";
import {AddAPartLogic} from "../../../bussinesLayer/bomVault/addAPartLogic";
import {AmlLogic} from "../../../bussinesLayer/bomVault/amlLogic";
import {BomImportSettingsLogic} from "../../../bussinesLayer/settings/bomImportSettingsLogic";
import {BomVaultLogic} from "../../../bussinesLayer/bomVault/bomVaultLogic";
import {Button} from "../../../components/simple/button";
import {CommonMatchingLogic} from "../../../bussinesLayer/matching/commonMatchingLogic";
import {Dropdown} from "../../../components/dropdown";
import {Grid} from "../../../components/grid";
import {Header} from "../../../components/header";
import {ImportLogic} from "../../../bussinesLayer/import/importLogic";
import {Login} from "../../../components/login";
import {MatchMfrLogic} from "../../../bussinesLayer/bomVault/matchMfrLogic";
import {Meganav} from "../../../components/meganav";
import {Modal} from "../../../components/modal";
import {MultiSelect} from "../../../components/multiSelect";
import {PartsSearchLogic} from "../../../bussinesLayer/search/partsSearchLogic";
import {ParametricSearchLogic} from "../../../bussinesLayer/search/parametricSearchLogic";
import {ReportsLogic} from "../../../bussinesLayer/reports/reportsLogic";
import {ResRequestLogic} from "../../../bussinesLayer/resRequest/resRequestLogic";
import {Shade} from "../../../components/shade";
import {SingleBomLogic} from "../../../bussinesLayer/bomVault/singleBomLogic";
import {TemplatesLogic} from "../../../bussinesLayer/reports/templatesLogic";
import {Toolbar} from "../../../components/toolbar";
import {QuickSearch} from "../../../components/quickSearch";


const addAPartLogic:AddAPartLogic = new AddAPartLogic();
const amlLogic: AmlLogic = new AmlLogic();
const bomImportSettingsLogic: BomImportSettingsLogic = new BomImportSettingsLogic();
const bomVaultLogic: BomVaultLogic = new BomVaultLogic();
const button: Button = new Button();
const commonMatchingLogic: CommonMatchingLogic = new CommonMatchingLogic();
const grid: Grid = new Grid();
const importLogic: ImportLogic = new ImportLogic();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const multiSelect: MultiSelect = new MultiSelect();
const matchMfrLogic: MatchMfrLogic = new MatchMfrLogic();
const parametricSearchLogic: ParametricSearchLogic = new ParametricSearchLogic();
const partsSearchLogic: PartsSearchLogic = new PartsSearchLogic();
const reportsLogic: ReportsLogic = new ReportsLogic();
const resReqLogic: ResRequestLogic = new ResRequestLogic();
const singleBomLogic: SingleBomLogic = new SingleBomLogic();
const templatesLogic: TemplatesLogic = new TemplatesLogic();
const toolbar: Toolbar = new Toolbar();
const quickSearch: QuickSearch = new QuickSearch();
describe(' Smoke - Search', () => {

    it(" Search for parts/alternate parts", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await quickSearch.performQuickSearch(commonSearch.commonValue);
        await modal.openModalWithElement(partDetailsElements.alertsIcon.first());
        await modal.openModalWithButtonByName(buttonNames.viewAlternates);
        await grid.checkCheckboxRange(0,4);
        await modal.openModalWithButtonByName(buttonNames.compareSelected);
        await expect(await modal.severalModalTitles.last().getText()).toEqual(modalTitles.compareParts('4'));
        await expect(await searchElements.comparePartsSubtitle.getText())
            .toEqual(commonSearch.comparePartsAlternatesSubtitle('4'));
        // await modal.checkingExportFile(buttonNames.export, 'nothing', gridElements.grid,
        //     exportOptions.search.compareParts.fileName);
    });

    it("Search for parts by attribute (parametric)", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parametric,
            searchElements.parametric.commodities.get(0));
        await parametricSearchLogic.performParametricSearch();
        await grid.checkCheckboxRange(0,4);
        await modal.openModalWithButtonByName(buttonNames.compareSelected);
        await expect(await modal.modalTitle.getText()).toEqual(modalTitles.compareParts('4'));
        await expect(await searchElements.comparePartsSubtitle.getText()).toEqual(commonSearch.comparePartsSubtitle('4'));
    });

    it("Change layout", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await Dropdown.selectValueInDropdownByValueName('Life Cycle');
        await expect(await toolbar.tagName.get(0).getText()).toEqual('Layout : Life Cycle');


    });

    xit(" Create new layout", async () => {

    });

});

xdescribe('Smoke - Licenses', () => {

    it("Check to see if licensed for Haystack or not", async () => {
        await login.loginWithErc('ihspartsint', 'IHSPARTSINT');

    });
});

describe('Smoke - Import a BOM', () => {

    it("Import a BOM", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganav(meganavItems.import,
            importElements.aboutImport);
        await importLogic.goToStep1();
        await importLogic.uploadAValidFileToImport();
        await importLogic.setBomName();
        await importLogic.openOptionModalByTitle(importItems.optionTitles.bomImport.optionTitles[1]);
        await importLogic.mappingFieldsChecking();
        await importLogic.closeOptionModalWithButtonName(buttonNames.applyMapping);
        await importLogic.openOptionModalByTitle(importItems.optionTitles.bomImport.optionTitles[2]);
        await importLogic.addEmail();
        await importLogic.saveAlertOptions();
        await importLogic.openOptionModalByTitle(importItems.optionTitles.bomImport.optionTitles[3]);
        await importLogic.closeOptionModalWithX();
        await importLogic.openOptionModalByTitle(importItems.optionTitles.bomImport.optionTitles[5]);
        await importLogic.checkFieldLimitation(0, 50);
        await importLogic.checkFieldLimitation(1, 16);
        await importLogic.closeOptionModalWithX();
        await importLogic.selectSaveConfigByName(importItems.saveConfigName);
        await importLogic.importBom();
        await importLogic.showImportedBomInVault();
        await importLogic.waitingForProcessedStatus();
        await importLogic.deleteImportedBom();
    });
});

describe('Smoke - Working with BOMs', () => {

    it("Set Best Part to Preferred", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.grid);
        await amlLogic.checkingBOmWithAmlOn();
        await amlLogic.setBestPartToPref();
    });

    it(" Add Parts to BOM", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.grid);
        await singleBomLogic.openFirstSingleBom();
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await Shade.openShadeWithButton(buttonNames.addPart);
        await addAPartLogic.firstTabPerformSearch();
        await addAPartLogic.fillSecondTabFields(1);
        await addAPartLogic.saveStateThirdTab();
        await addAPartLogic.resetButtonChecking(1);
        await Shade.closeShadeWithButton(buttonNames.cancel);
        await addAPartLogic.addAPart();
    });

    it("Modify Parts on BOM", async () => {
        await grid.checkCheckboxRange(0,1);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.modify);
        await modal.openModalWithButtonByName(buttonNames.modifyPart);
        await addAPartLogic.fillSecondTabFields(4);
        await modal.closeModalWithButton(buttonNames.modifyThisPart);
    });

    it("Delete Parts from BOM", async () => {
        await grid.checkCheckboxRange(0,1);
        await addAPartLogic.deleteAPart();
    });

    it(" Reprocess BOM", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.grid);
        await singleBomLogic.openFirstSingleBom();
        await bomVaultLogic.reprocessBomChecking(buttonNames.yesReporcessThisBom);
    });

    it("Generate Report – Advanced", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.grid);
        await bomVaultLogic.goToGenerateReportPage();
        await reportsLogic.goToStep2WithAdvancedReport(reportsData.reports.advancedReportsList[2]);
        await reportsLogic.goToStep3();
        await browser.executeScript("document.querySelector('#btnGenerateReport').scrollIntoView()");
        await reportsLogic.generateReport();
        await reportsLogic.reportStatusShouldNotBeError();
        await grid.checkCheckboxRange(0,1);
        await reportsLogic.deleteReport();
    });

    it("Generate Report – Standard", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.grid);
        await bomVaultLogic.goToGenerateReportPage();
        await reportsLogic.goToStep2WithStandardReport(reportsData.reports.standardReportsList[3]);
        await reportsLogic.goToStep3();
        await browser.executeScript("document.querySelector('#btnGenerateReport').scrollIntoView()");
        await reportsLogic.generateReport();
        await reportsLogic.reportStatusShouldNotBeError();
        await grid.checkCheckboxRange(0,1);
        await reportsLogic.deleteReport();
    });

    it("Delete BOM", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.grid);
        await grid.checkCheckboxRange(0,1);
        await expect(button.returnButtonByText(buttonNames.delete).isEnabled()).toBeTruthy();
        await login.loginWithDirectLink(browser.params.readOnlyUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.grid);
        await grid.checkCheckboxRange(0,1);
        await expect(button.returnButtonByText(buttonNames.delete).isEnabled()).toBeFalsy();
    });

    it("Match Parts/Manufacturers", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.grid);
        await matchMfrLogic.goToMatchMfr();
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(cplData.matchMfr.filterOptions[3]);
        await grid.checkCheckboxRange(0,1);
        await commonMatchingLogic.openAcceptMatch();
        await commonMatchingLogic.acceptMatchHighlight(buttonNames.acceptTheseMfrs, true);
        await commonMatchingLogic.saveChangesForViewSuggestAcceptMatch();
        await modal.closeModalWithXButton();
        await commonMatchingLogic.newGridUndoAndDeselectHighlight();
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(cplData.matchMfr.filterOptions[5]);
        await grid.checkCheckboxRange(0,1);
        await modal.openModalWithButtonByName(buttonNames.searchForMatch);
        await commonMatchingLogic.searchForMatchTypeAhead();
        await commonMatchingLogic.searchForMatchMfrModalAndHighlight(true);
        await commonMatchingLogic.newGridUndoAndDeselectHighlight();

    });
});

describe('Smoke - Alerts', () => {

    it(" View alerts by ID", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.alerts,
            meganavItems.alertsSubItems.alertsById[0], gridElements.grid);
        await expect(await pageTitles.pageTitleShim2.getText()).toEqual('View My Alerts by Alert ID');
    });

    it("Filter by date range", async () => {
        await toolbar.removeWithClearAllWithDefaultTag();
        await toolbar.showFilterOptionsTag(buttonNames.filterByDate);
    });

    xit("Export alerts", async () => {
        await modal.checkingExportFile(buttonNames.export, buttonNames.export, gridElements.grid,
            exportOptions.alertsById.fileName);
    });


});

describe('Smoke - Reports', () => {

    it(" Create report template.", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.reports,
            meganavItems.reportsSubItems.createTemplate, reportElements.customTemplates.templateNameInput);
        await templatesLogic.goToStep2();
        await Dropdown.openDropdownByClickOnElement(reportElements.customTemplates.attributesToggle);
        await Dropdown.selectValueInDropdownByValueNameAndWaitForItem(reportsData.templates.optionsList[6], 'Candidate List Date');
        await browser.sleep(2000);
        await expect(await reportElements.customTemplates.groupList.get(1).getText()).toEqual('REACH Data');
        await expect(await reportElements.customTemplates.valueList.getText()).toEqual(reportsData.templates.REACHData);
        await templatesLogic.selectAllChecking(reportsData.templates.REACHData);
        await templatesLogic.createTemplate();
        await templatesLogic.deleteTemplate();
    });

    it("Apply filters", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.reports,
            meganavItems.reportsSubItems.generateReport, gridElements.grid);
        await reportsLogic.goToStep2WithAdvancedReport(reportsData.reports.advancedReportsList[1]);
        await reportsLogic.goToStep3();
        await reportsLogic.selectElementFromBomTree();
        await reportsLogic.goToStep4();
        await multiSelect.openMultiSelect(0);
        const partStatusMultiselectOptions =  [ 'Active', 'Active-Unconfirmed', 'Contact Mfr',
            'Discontinued', 'Discontinued-Unconfirmed', 'EOL', 'NRFND', 'Transferred' ];
        await expect(await multiSelect.multiSelectOptionLabels.getText()).toEqual(partStatusMultiselectOptions);
        await multiSelect.selectUnSelectAllChecking();
        await multiSelect.selectMultiSelectOptionAndDisplayInRow();
        await multiSelect.deselectChecking(0);
        await multiSelect.openMultiSelect(1);
        const lyfeCycleMultiselectOptions =  [ 'Decline', 'Discontinued', 'Discontinued-Transferred', 'Growth',
            'Introduction', 'Mature', 'Phase-Out', 'Reactivated' ];
        await expect(await multiSelect.multiSelectOptionLabels.getText()).toEqual(lyfeCycleMultiselectOptions);
        await multiSelect.selectUnSelectAllChecking();
        await multiSelect.selectMultiSelectOptionAndDisplayInRow();
        await multiSelect.deselectChecking(1);
        await multiSelect.openMultiSelect(2);
        const yteolMultiselectOptions =  [ '0', '1 - 2', '2 - 4', '4 - 8', '< 1', '> 8' ];
        await expect(await multiSelect.multiSelectOptionLabels.getText()).toEqual(yteolMultiselectOptions);
        await multiSelect.selectUnSelectAllChecking();
        await modal.openModalWithButtonByName(buttonNames.cancelDoNotGenerate);
        await modal.closeModalWithButton(buttonNames.doNotContinueThisReport);
    });
});

describe('Smoke - Research Request', () => {

    it(" Create blank research request", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndWaitForDisplayedLink(headerElements.helpIcon, headerItems.createResReq);
        await modal.openModalWithLinkName(headerItems.createResReq);
        await Dropdown.openDropdownByClickOnElement(dropdownElements.modalDropdownToggle);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(resReqData.modalDropdownValues[2]);
        await resReqLogic.fillRequireFields();
        await expect(button.returnButtonByText(buttonNames.submitResReq).isEnabled())

    });

    it("Create research request for one part", async () => {
        await login.loginWithDirectLink(browser.params.userAdminUrl);
        await quickSearch.performQuickSearch('lm311');
        await grid.checkCheckboxRange(0,1);
        await modal.openModalWithButtonByName(buttonNames.resRequest);
        await Dropdown.openDropdownByClickOnElement(dropdownElements.modalDropdownToggle);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(resReqData.modalDropdownValues[2]);
        await resReqLogic.fillRequireFields();
        await expect(button.returnButtonByText(buttonNames.submitResReq).isEnabled())
        await modal.closeModalWithButton(buttonNames.cancelNotSubmit);
    });

    it("Create research request for multiple parts", async () => {
        await grid.checkCheckboxRange(1,2);
        await modal.openModalWithButtonByName(buttonNames.resRequest);
        await Dropdown.openDropdownByClickOnElement(dropdownElements.modalDropdownToggle);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(resReqData.modalDropdownValues[2]);
        await resReqLogic.fillRequireFields();
        await expect(button.returnButtonByText(buttonNames.submitResReq).isEnabled())
        await modal.closeModalWithButton(buttonNames.cancelNotSubmit);
    });

    it("Create research request and upload a file", async () => {
        await grid.checkCheckboxRange(0,1);
        await modal.openModalWithButtonByName(buttonNames.resRequest);
        await Dropdown.openDropdownByClickOnElement(dropdownElements.modalDropdownToggle);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(resReqData.modalDropdownValues[2]);
        await resReqLogic.uploadAFileInResReqModal();
        await resReqLogic.fillRequireFields();
        await expect(button.returnButtonByText(buttonNames.submitResReq).isEnabled())
        await modal.closeModalWithButton(buttonNames.cancelNotSubmit);
    });

    it("View research requests", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.helpIcon, headerItems.viewResReq, gridElements.grid);
        await resReqLogic.openViewResReqModal();
        await resReqLogic.goToTheNextTab(1);
        await resReqLogic.addComment();

    });


});

xdescribe('Smoke - Settings', () => {

    it(" Change import setting and confirm change in related workflow", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[1],
            settings.module);
        await bomImportSettingsLogic.openSelectDestinationFolder();
        await bomImportSettingsLogic.setDefaultFolder(2,'Vault/');
        await bomImportSettingsLogic.displaySelectedFolderInImport();
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[1],
            settings.module);
        await bomImportSettingsLogic.returnToPreviousValue();
    });

    it("Change CPL settings and confirm change in import.", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[1],
            settings.module);
        await bomImportSettingsLogic.cplCheckboxInImport(0,3)
    });
});