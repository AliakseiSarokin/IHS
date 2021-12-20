import {browser} from "protractor";
import {buttonNames, meganavItems, titles} from "../../../../testData/global";
import {commonElements, gridElements, pageTitles, reportElements} from "../../../../elements/elements";
import {reportsData} from "../../../../testData/reports";
import {JasmineTimeout} from "../../../../helper/jasmineTimeout";
import {SingleBomLogic} from "../../../../bussinesLayer/bomVault/singleBomLogic";
import {Button} from "../../../../components/simple/button";
import {RadioButton} from "../../../../components/simple/radioButton";
import {Grid} from "../../../../components/grid";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {ReportsLogic} from "../../../../bussinesLayer/reports/reportsLogic";

const singleBomLogic: SingleBomLogic = new SingleBomLogic();
const button: Button = new Button();
const radioButton: RadioButton = new RadioButton();
const grid: Grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const reportsLogic: ReportsLogic = new ReportsLogic();

describe('Verify standard report names have tooltips, US276130', () => {
    it('Verify standard reports tooltips', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.reports,
            meganavItems.reportsSubItems.generateReport, reportElements.reports.standardReports.get(1));
        await expect(await pageTitles.generereReportTitle.get(0).getText()).toEqual(titles.generateReport);
        await reportsLogic.verifyStdReportTooltip(await reportsData.reports.stdReportTooltipDetails());
    });
});


describe('Generate a Report - Add Recent BOMs to Left Navigation test, 275534', () => {
    beforeAll(async () => {
        await JasmineTimeout.setJasmineTimeout(300000);
    });

    afterAll(async () => {
        await JasmineTimeout.setJasmineTimeout(browser.params.defaultElementWaitTime);
    });
    let BOMNamesOpened: string[] = [];
    it('Verify if recent BOMs opened from View all BOMS are displayed in the left navigation.', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await browser.refresh();
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.checkboxSelector.get(1));
        const BOMNames: string[] = await grid.newGridReturnCellValuesByColumnName(0, 'BOM Name');
        BOMNamesOpened = await singleBomLogic.openSingleBomsWithNames(BOMNames.slice(0, 10));
        expect(BOMNamesOpened.length).toEqual(10);
    });

    it('Verify if recent BOMs opened in View all BOMS page are displayed in the left navigation.', async () => {
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.reports,
            meganavItems.reportsSubItems.generateReport, reportElements.reports.standardReports.get(1));
        await reportsLogic.verifyBOMNamesPresentInLeftNav(BOMNamesOpened);
    });

    it('Verify add to report button functionality for generate report button in the left navigation.', async () => {
        await reportsLogic.verifyAddToReportLeftNav(BOMNamesOpened);
    });

    it('Generate a Report BOMS selected from recent BOMS available in left navigation- workflow enhancement, 306806', async () => {
        const reportName: string = 'testReportLeftNav-workFlowEnhancement';
        await reportsLogic.selectBOMsFromLeftNav(BOMNamesOpened);
        await reportsLogic.goToStep2WithStandardReport(reportsData.reports.standardReportsList[3]);
        await reportsLogic.enterNameAndVerifyGenerateReportEnabled(reportName);
    });

    it('Generate a Report BOMS selected from recent BOMS available in left navigation', async () => {
        const reportName: string = 'testReportLeftNav';
        await reportsLogic.goToStep3WithReportName(reportName);
        await reportsLogic.verifyBOMSAddedinStep3(BOMNamesOpened);
        await reportsLogic.generateReportWithReportName(reportName);
        await reportsLogic.reportStatusShouldNotBeError();
        await reportsLogic.verifyReportNameWithBraces(reportName);
        await reportsLogic.verifyBOMSAddedinStep3(BOMNamesOpened);
        await modal.closeModalWithXButton();
        await grid.newMechanismCheckboxRangeChecking(0, 1);
        await reportsLogic.deleteReport();
    });
});

describe('Allow Users to Select Multiple Report Types at Once, US275535', () => {

    it('Should be multiselect options for Standard Reports', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.reports,
            meganavItems.reportsSubItems.generateReport, reportElements.reports.standardReports.get(1));
        await radioButton.checkRadioButtonByLabelName(reportsData.reports.standardReportsList[0]);
        await radioButton.checkRadioButtonByLabelName(reportsData.reports.standardReportsList[1]);
        await expect((await commonElements.radioButtonInput.get(0)).isSelected()).toBeTruthy();
        await expect((await commonElements.radioButtonInput.get(1)).isSelected()).toBeTruthy();
    });

    it('Should be disabled Advanced Reports if more than one Standard Report is selected', async () => {
        await expect((gridElements.newGridCheckboxSelector.get(1)).isEnabled()).toBeFalsy();
    });

    it('Should be multiselect options for Advanced Reports', async () => {
        await radioButton.checkRadioButtonByLabelName(reportsData.reports.standardReportsList[1]);
        await grid.newMechanismCheckboxRangeChecking(0, 2);
    });

    it('Should be disabled Standard Reports if more than one Advanced Report is selected', async () => {
        await expect((commonElements.radioButtonInput.get(0)).isEnabled()).toBeFalsy();
    });

    it('Should be warning message if more than one report is selected', async () => {
        await expect(await reportElements.reports.amlWarningMessage.getText()).toEqual(reportsData.reports.multiselectMessage);
        await grid.newMechanismCheckboxRangeChecking(0, 2);
    });
});

describe('(IHS) Rare Earth Presence report, US360446', () => {

    const reportName: string = 'testReportLRareEarth';

    it('should go to step#3 with (IHS) Rare Earth Presence report', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.reports,
            meganavItems.reportsSubItems.generateReport, reportElements.reports.standardReports.get(1));
        await reportsLogic.goToStep2WithAdvancedReport(reportsData.reports.advancedReportsList[6]);
        await reportsLogic.goToStep3WithReportName(reportName);
    });

    it('should be disabled step#4', async () => {
        await reportsLogic.selectElementFromBomTree();
        await expect((button.returnButtonByText(buttonNames.goToStep4)).isEnabled()).toBeFalsy();
    });

    it('should generate a report', async () => {
        await reportsLogic.generateReportWithReportName(reportName);
        await reportsLogic.reportStatusShouldNotBeError();
        await grid.newMechanismCheckboxRangeChecking(0, 1);
        await reportsLogic.deleteReport();
    });
});