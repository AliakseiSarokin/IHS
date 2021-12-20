import {gridElements, growler, pageTitles, reportElements} from "../../../../elements/elements";
import {browser} from "protractor";
import {meganavItems, titles} from "../../../../testData/global";
import {Grid} from "../../../../components/grid";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Growlers} from "../../../../components/growlers";
import {Waiters as w} from "../../../../helper/waiters";
import {reportsData} from "../../../../testData/reports";
import {ReportsLogic} from "../../../../bussinesLayer/reports/reportsLogic";

const grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const reportsLogic: ReportsLogic = new ReportsLogic();

describe('Growlers appearance, US295965', () => {

    beforeEach(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.reports,
            meganavItems.reportsSubItems.generateReport, reportElements.reports.standardReports.get(1));
        await Growlers.muteGrowlersNotifications(false);
        await expect(await pageTitles.generereReportTitle.get(0).getText()).toEqual(titles.generateReport);
    });

    afterAll(async() => {
        await Growlers.muteGrowlersNotifications(true);
    });

    it('should appear growler that informs about status of Report Generation', async () => {
        await reportsLogic.goToStep2WithStandardReport(reportsData.reports.standardReportsList[3]);
        await reportsLogic.goToStep3();
        await reportsLogic.selectElementFromBomTree();
        await reportsLogic.generateReport();
        await reportsLogic.generateReportWithoutWaitingForProcessedStatus();
        await reportsLogic.waitForGrowlerReadyStatus();
        await reportsLogic.reportStatusShouldNotBeError();
        await Growlers.openNotificationPanel();
        await Growlers.closeGrowlerInNotificationPanel();
        await Growlers.closeNotificationPanel();
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await reportsLogic.deleteReport();
    });

    it('should inform about completed status of Report Generation if growler closed by cross', async () => {
        await reportsLogic.goToStep2WithStandardReport(reportsData.reports.standardReportsList[3]);
        await reportsLogic.goToStep3();
        await reportsLogic.selectElementFromBomTree();
        await reportsLogic.generateReport();
        await reportsLogic.generateReportWithoutWaitingForProcessedStatus();
        await Growlers.closeGrowlerByX();
        browser.params.waitWebElementMaxTimeout = 250000;
        await expect(await growler.growlerBody.last().isDisplayed()).toBeFalsy();
        await w.waitUntilElementIsDisplayed(growler.growlerBody.last());
        await expect(await growler.growlerBody.last().isDisplayed()).toBeTruthy();
        let reportGenerationStatus: string = await growler.growlerStatus.getText();
        let reportName: string = reportGenerationStatus.split(' ')[0];
        await expect(reportGenerationStatus).toEqual(`${reportName} is now ready for viewing`);
        browser.params.waitWebElementMaxTimeout = 50000;
        await reportsLogic.reportStatusShouldNotBeError();
        await Growlers.openNotificationPanel();
        await Growlers.closeGrowlerInNotificationPanel();
        await Growlers.closeNotificationPanel();
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await reportsLogic.deleteReport();
    });
});

describe('Growlers,Notifications Panel - Refresh Report Datagrid , US297860', () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Growlers.muteGrowlersNotifications(false);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.reports,
            meganavItems.reportsSubItems.generateReport, reportElements.reports.standardReports.get(1));
        await expect(await pageTitles.generereReportTitle.get(0).getText()).toEqual(titles.generateReport);
    });
    afterAll(async () => {
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await reportsLogic.deleteReport();
        await Growlers.muteGrowlersNotifications(true);
    });

    it('US297860, should refresh the view all reports page if user clicks on report name inside growler once report is ready to view', async () => {
        await reportsLogic.goToStep2WithStandardReport(reportsData.reports.standardReportsList[3]);
        await reportsLogic.goToStep3();
        await reportsLogic.selectElementFromBomTree();
        await reportsLogic.generateReport();
        await reportsLogic.waitForGrowlerReadyStatus();
        await Growlers.clickOnLinkInGrowler();
        await w.waitUntilElementIsClickable(await gridElements.newGridCellByRowIndex(0).get(0));
        await expect(pageTitles.pageTitleShim2.getText()).toEqual(titles.viewReports);
        await reportsLogic.reportStatusShouldNotBeError();

    });

    it('US297860, should refresh the view all reports page if user clicks on report name inside notification panel once report is ready to view', async () => {
        await Growlers.openNotificationPanel();
        await Growlers.clickOnLinkInGrowler();
        await w.waitUntilElementIsClickable(await gridElements.newGridCellByRowIndex(0).get(0));
        await expect(pageTitles.pageTitleShim2.getText()).toEqual(titles.viewReports);
        await reportsLogic.reportStatusShouldNotBeError();
    });

});
