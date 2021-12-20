import {growler, importElements, pageTitles} from "../../../../elements/elements";
import {browser} from "protractor";
import {meganavItems, titles} from "../../../../testData/global";
import {ImportLogic} from "../../../../bussinesLayer/import/importLogic";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Growlers} from "../../../../components/growlers";
import {CplImportLogic} from "../../../../bussinesLayer/import/cplImportLogic";
import {cplImportData} from "../../../../testData/cpl";
import {Waiters as w} from "../../../../helper/waiters";

const importLogic: ImportLogic = new ImportLogic();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const cplImportLogic: CplImportLogic = new CplImportLogic();

//reproces takes too long
xdescribe('Growlers appearance, US183658', () => {

    beforeEach(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl, meganavItems.cplSublinks.import,
            importElements.aboutImport);
        await Growlers.muteGrowlersNotifications(false);
        await expect(await pageTitles.pageTitleShim2.getText()).toEqual(titles.cplImport);
    });

    it('should appear growler that informs about status of importing operation', async () => {
        await importLogic.goToStep1();
        await importLogic.uploadAValidFileByName(importLogic.validXlsFileBomImport);
        await cplImportLogic.checkTypeOption('Replace', 0, cplImportData.settingTypeModalText[0]);
        await cplImportLogic.clickOnImportCpl();
        await cplImportLogic.importCplWithoutWaitingForProcessedStatus();
        await cplImportLogic.waitForGrowlerReadyStatus();
        await cplImportLogic.clickOnGrowlerCplLink();
        await Growlers.openNotificationPanel();
        await Growlers.closeGrowlerInNotificationPanel();
        await Growlers.closeNotificationPanel();
    });

    it('should inform about completed status of importing operation if growler closed by cross', async () => {
        await importLogic.goToStep1();
        await importLogic.uploadAValidFileByName(importLogic.validXlsFileCpl);
        await cplImportLogic.checkTypeOption('Replace', 0, cplImportData.settingTypeModalText[0]);
        await cplImportLogic.clickOnImportCpl();
        await cplImportLogic.importCplWithoutWaitingForProcessedStatus();
        browser.params.waitWebElementMaxTimeout = 500000;
        await Growlers.closeGrowlerByX();
        await expect(await growler.growlerBody.last().isDisplayed()).toBeFalsy();
        await w.waitUntilElementIsDisplayed(growler.growlerBody.last());
        await expect(await growler.growlerBody.last().isDisplayed()).toBeTruthy();
        await expect(await growler.growlerStatus.getText()).toEqual('CPL is now ready for viewing');
        browser.params.waitWebElementMaxTimeout = 50000;
        await Growlers.muteGrowlersNotifications(true);
    });
});
