import {AmlLogic} from "../../../../bussinesLayer/bomVault/amlLogic";
import {BomVaultLogic} from "../../../../bussinesLayer/bomVault/bomVaultLogic";
import {Button} from "../../../../components/simple/button";
import {
    bomElements,
    cplElements,
    dropdownElements,
    gridElements,
    growler,
    importElements,
    pageTitles,
    reportElements,
    toolbarElements
} from "../../../../elements/elements";
import {browser} from "protractor";
import {buttonNames, columnHeaders, leftNavItems, meganavItems, titles} from "../../../../testData/global";
import {Grid} from "../../../../components/grid";
import {HelpLogic} from "../../../../bussinesLayer/help/helpLogic";
import {ImportLogic} from "../../../../bussinesLayer/import/importLogic";
import {InstructionPanel} from "../../../../components/instructionPanel";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {Toolbar} from "../../../../components/toolbar";
import {ElementAttributes} from "../../../../utils/elementAttributes";
import {Growlers} from "../../../../components/growlers";
import {CplImportLogic} from "../../../../bussinesLayer/import/cplImportLogic";
import {cplImportData} from "../../../../testData/cpl";
import {Waiters as w} from "../../../../helper/waiters";
import {JasmineTimeout} from "../../../../helper/jasmineTimeout";
import {reportsData} from "../../../../testData/reports";
import {ReportsLogic} from "../../../../bussinesLayer/reports/reportsLogic";

const amlLogic: AmlLogic = new AmlLogic();
const bomVaultLogic: BomVaultLogic = new BomVaultLogic();
const button: Button = new Button;
const grid = new Grid();
const elementAttributes: ElementAttributes = new ElementAttributes();
const helpLogic: HelpLogic = new HelpLogic();
const importLogic: ImportLogic = new ImportLogic();
const instructionPanel: InstructionPanel = new InstructionPanel();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const toolbar: Toolbar = new Toolbar();
const growlers = new Growlers();
const cplImportLogic: CplImportLogic = new CplImportLogic();
const reportsLogic: ReportsLogic = new ReportsLogic();

describe('Growlers appearance, US191585', () => {

    beforeEach(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.reports,
            meganavItems.reportsSubItems.viewReports, gridElements.grid);
        await Growlers.muteGrowlersNotifications(false);
        await expect(pageTitles.pageTitleShim2.getText()).toEqual(titles.viewReports);
    });

    afterAll(async() => {
        await Growlers.muteGrowlersNotifications(true);
    });

    it('should be growler for Regenerate Report process', async () => {
        await reportsLogic.getFirstCompletedStatus();
        await reportsLogic.waitForGrowlerQueuedStatus();
        await reportsLogic.waitForGrowlerReadyStatus();
        await reportsLogic.reportStatusShouldNotBeError();
        await Growlers.openNotificationPanel();
        await Growlers.closeGrowlerInNotificationPanel();
        await Growlers.closeNotificationPanel();
    });

    it('should inform about completed status of Regenerate Report if growler closed by cross', async () => {
        await reportsLogic.getFirstCompletedStatus();
        await reportsLogic.waitForGrowlerQueuedStatus();
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
    });

});
