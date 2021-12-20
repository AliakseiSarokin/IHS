import {JasmineTimeout} from "../../../../helper/jasmineTimeout";
import {browser} from "protractor";
import {buttonNames, columnHeaders, meganavItems, titles} from "../../../../testData/global";
import {
    bomVaultElements,
    commonElements,
    gridElements,
    pageTitles,
    reportElements
} from "../../../../elements/elements";
import {reportsData} from "../../../../testData/reports";
import {Grid} from "../../../../components/grid";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {ReportsLogic} from "../../../../bussinesLayer/reports/reportsLogic";
import {Dropdown} from "../../../../components/dropdown";
import {Actions} from "../../../../utils/actions";
import {Waiters as w} from "../../../../helper/waiters";
import {Button} from "../../../../components/simple/button";
import {ImportLogic} from "../../../../bussinesLayer/import/importLogic";
import {Toolbar} from "../../../../components/toolbar";
import {Link} from "../../../../components/simple/link";
import {BomVaultLogic} from "../../../../bussinesLayer/bomVault/bomVaultLogic";

const bomVaultLogic = new BomVaultLogic();
const button: Button = new Button();
const grid: Grid = new Grid();
const importLogic: ImportLogic = new ImportLogic();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const reportsLogic: ReportsLogic = new ReportsLogic();
const toolbar: Toolbar = new Toolbar();
const link: Link = new Link();

describe("Generate a Report from BOM summary doesn't show up in left panel for recently used BOMs, DE365190", () => {
    beforeAll(async () => {
        await JasmineTimeout.setJasmineTimeout(260000);
    });

    afterAll(async () => {
        await JasmineTimeout.setJasmineTimeout(browser.params.defaultElementWaitTime);
    });

    it('Generate a Report from BOM summary page', async () => {
        const reportName: string = 'testReportBOMSummary';
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomSummary, gridElements.checkboxSelector.get(1));
        let BOMNames: string[] = await bomVaultLogic.goToGenerateReportPageMultipleSelectionFromBOMSummary();
        await reportsLogic.goToStep2WithStandardReport(reportsData.reports.standardReportsList[1]);
        await reportsLogic.goToStep3WithReportName(reportName);
        await reportsLogic.generateReportWithReportName(reportName);
        await reportsLogic.reportStatusShouldNotBeError();
        await reportsLogic.verifyBOMNamesPresentInLeftNav(BOMNames);
        await grid.newMechanismCheckboxRangeChecking(0, 1);
        await reportsLogic.deleteReport();
    });
});

describe("Generate a Report, DE114291", () => {

    it("View All reports page: case sensitive column filter Lower Case", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.reports,
            meganavItems.reportsSubItems.viewReports, gridElements.gridWrapper);
        await grid.newGridOpenFilterBoxByName('Report Status');
        await button.clickOnTheElement(await reportElements.reports.reportStatusColumnFilterCheckboxByLabel('(Select All)'));
        await button.clickOnTheElement(await reportElements.reports.reportStatusColumnFilterCheckboxByLabel('Completed'));
        await button.clickOnTheElement(await reportElements.reports.reportStatusColumnFilterCheckboxByLabel('Archived'));
        await button.clickByButtonNameAndWait(buttonNames.applyFilter, gridElements.newGridRows.get(0));
        let reportName: string[] = await grid.newGridReturnCellValuesByColumnName(1, 'Report Name');
        await grid.newGridOpenFilterBoxByName('Report Name');
        await Dropdown.openDropdownByClickOnElementInSortBox(gridElements.columnsSort.dropdown);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(columnHeaders.bom.filterOptions[0]);
        await Actions.sendKeys(gridElements.columnsSort.input, await reportName[0].toLowerCase().split(' ')[1]);
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        let reportNameAfterFilter: string[] = await grid.newGridReturnCellValuesByColumnName(1, 'Report Name');
        await expect(await reportNameAfterFilter[0]).toEqual(reportName[0]);
    });

    it("View All reports page: case sensitive column filter Upper Case", async () => {
        await grid.newGridOpenFilterBoxByName('Report Name');
        await button.clickOnTheElementAndWait(button.returnButtonByText(buttonNames.clearFilter), gridElements.newGridRows.get(0));
        let reportName: string[] = await grid.newGridReturnCellValuesByColumnName(1, 'Report Name');
        await grid.newGridOpenFilterBoxByName('Report Name');
        await Dropdown.openDropdownByClickOnElementInSortBox(gridElements.columnsSort.dropdown);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(columnHeaders.bom.filterOptions[0]);
        await Actions.sendKeys(gridElements.columnsSort.input, await reportName[0].toUpperCase().split(' ')[1]);
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        let reportNameAfterFilter: string[] = await grid.newGridReturnCellValuesByColumnName(1, 'Report Name');
        await expect(await reportNameAfterFilter[0]).toEqual(reportName[0]);
    });
});

describe('Generate a Report with name having braces, DE296441', () => {
    beforeAll(async () => {
        await JasmineTimeout.setJasmineTimeout(260000);
    });

    afterAll(async () => {
        await JasmineTimeout.setJasmineTimeout(browser.params.defaultElementWaitTime);
    });

    it('Generate a Report with name having braces', async () => {
        const reportName: string = 'testReport[{(braces,./)}]';
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.reports,
            meganavItems.reportsSubItems.generateReport, reportElements.reports.standardReports.get(1));
        await expect(await pageTitles.generereReportTitle.get(0).getText()).toEqual(titles.generateReport);
        await reportsLogic.goToStep2WithStandardReport(reportsData.reports.standardReportsList[3]);
        await reportsLogic.goToStep3WithReportName(reportName);
        await reportsLogic.selectElementFromBomTree();
        await reportsLogic.generateReportWithReportName(reportName);
        await reportsLogic.reportStatusShouldNotBeError();
        await reportsLogic.verifyReportNameWithBraces(reportName);
        await modal.closeModalWithXButton();
        await grid.newMechanismCheckboxRangeChecking(0, 1);
        await reportsLogic.deleteReport();
    });
});

describe('Generate a Report with name having braces, DE296441', () => {
    beforeAll(async () => {
        await JasmineTimeout.setJasmineTimeout(260000);
    });

    afterAll(async () => {
        await JasmineTimeout.setJasmineTimeout(browser.params.defaultElementWaitTime);
    });

    it('Generate a Report with name having braces', async () => {
        const reportName: string = 'testReport[{(braces,./)}]';
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.reports,
            meganavItems.reportsSubItems.generateReport, reportElements.reports.standardReports.get(1));
        await expect(await pageTitles.generereReportTitle.get(0).getText()).toEqual(titles.generateReport);
        await reportsLogic.goToStep2WithStandardReport(reportsData.reports.standardReportsList[3]);
        await reportsLogic.goToStep3WithReportName(reportName);
        await reportsLogic.selectElementFromBomTree();
        await reportsLogic.generateReportWithReportName(reportName);
        await reportsLogic.reportStatusShouldNotBeError();
        await reportsLogic.verifyReportNameWithBraces(reportName);
        await modal.closeModalWithXButton();
        await grid.newMechanismCheckboxRangeChecking(0, 1);
        await reportsLogic.deleteReport();
    });
});

describe("Generate a Report, DE114465", () => {

    beforeAll(async () => {
        await JasmineTimeout.setJasmineTimeout(260000);
    });

    afterAll(async () => {
        await JasmineTimeout.setJasmineTimeout(browser.params.defaultElementWaitTime);
    });

    it("should be popover with names of BOMs on the first step", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.gridWrapper);
        await await grid.newMechanismCheckboxRangeChecking(0, 2);
        const bomNames: any = await grid.newGridReturnCellValuesByColumnName(0, 'BOM Name');
        await button.clickByButtonNameAndWait(buttonNames.generateReportButton, reportElements.reports.standardReports.get(1));
        await Actions.mouseMoveToElementAndWaitForTooltipStatic(pageTitles.multipleReports, commonElements.popoverMultiBomReportTitle);
        await expect(await commonElements.popoverMultiBomReportTitle.getText()).toContain(bomNames[0]);
        await expect(await commonElements.popoverMultiBomReportTitle.getText()).toContain(bomNames[1]);
    });
});

describe("Generate a Report, DE116057", () => {

    beforeAll(async () => {
        await JasmineTimeout.setJasmineTimeout(260000);
    });

    afterAll(async () => {
        await JasmineTimeout.setJasmineTimeout(browser.params.defaultElementWaitTime);
    });

    it("more than one BOM might be added to the 'Single BOM Dashboard' report", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.gridWrapper);
        await await grid.newMechanismCheckboxRangeChecking(0, 2);
        await button.clickByButtonNameAndWait(buttonNames.generateReportButton, reportElements.reports.standardReports.get(1));
        await reportsLogic.goToStep2WithStandardReport(reportsData.reports.standardReportsList[13]);
        await reportsLogic.goToStep3();
        await expect(await button.returnButtonByText(buttonNames.generateMyReport).isEnabled()).toBeFalsy();
        await expect(await button.returnButtonByText(buttonNames.addOrRemoveBomForThisReport).isEnabled()).toBeTruthy();
        await button.clickByButtonNameAndWait(buttonNames.addOrRemoveBomForThisReport, bomVaultElements.bomTree.bomTreeRows.get(0));
        await reportsLogic.selectEnabledSingleBOMStep3(1);
        await w.waitUntilElementIsClickable(button.returnButtonByText(buttonNames.generateMyReport));
        await expect(await button.returnButtonByText(buttonNames.generateMyReport).isEnabled()).toBeTruthy();
        await importLogic.leaveImportWitLeaveModal();
    });
});

describe("Generate a Report, DE114325", () => {

    it("Toolbar filter doesn't clearing with 'Clear Filter' option", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.reports,
            meganavItems.reportsSubItems.viewReports, gridElements.gridWrapper);
        await grid.newGridOpenFilterBoxByName('Report Status');
        await button.clickOnTheElement(await reportElements.reports.reportStatusColumnFilterCheckboxByLabel('(Select All)'));
        await button.clickOnTheElement(await reportElements.reports.reportStatusColumnFilterCheckboxByLabel('Completed'));
        await button.clickByButtonNameAndWait(buttonNames.applyFilter, gridElements.newGridRows.get(0));
        await expect(await reportElements.reports.returnPanelTitleByName('Show Completed Reports ').isPresent()).toBeTruthy();
        await toolbar.openToolbarDropdownByButtonName(buttonNames.filter);
        await link.clickOnTheLinkByNameAndWaitForElement('Clear Filter', gridElements.newGridRows.get(4));
        await expect(await reportElements.reports.returnPanelTitleByName('Show Completed Reports ').isPresent()).toBeFalsy();
    });
});


