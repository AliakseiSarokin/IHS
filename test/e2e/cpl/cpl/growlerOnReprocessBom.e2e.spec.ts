import {cplElements, gridElements, growler} from "../../../../elements/elements";
import {browser} from "protractor";
import {buttonNames, meganavItems} from "../../../../testData/global";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Growlers} from "../../../../components/growlers";
import {Modal} from "../../../../components/modal";
import {Waiters as  w} from "../../../../helper/waiters";
import {Link} from "../../../../components/simple/link";
import {Button} from "../../../../components/simple/button";
import {CplDetailsLogic} from "../../../../bussinesLayer/cpl/cpl/cplDetailsLogic";

const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const link: Link = new Link();
const button: Button = new Button();
const cplDetailsLogc: CplDetailsLogic = new CplDetailsLogic();

describe('Growlers appearance, US183659', () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.manageCpl, gridElements.checkboxSelector.get(1));
        await browser.waitForAngularEnabled(false);
        await Growlers.muteGrowlersNotifications(false);
    });

    afterAll(async() => {
        await Growlers.muteGrowlersNotifications(true);
    });

    it('should appear growler that informs about status of reprocess operation', async () => {
        await cplDetailsLogc.reprocessCplWithoutWaitingForProcessedStatus();
        await cplDetailsLogc.waitForGrowlerReadyStatus();
        await cplDetailsLogc.clickOnGrowlerCplLink();
        await Growlers.openNotificationPanel();
        await Growlers.closeGrowlerInNotificationPanel();
        await Growlers.closeNotificationPanel();
    });

    it('should inform about completed status of reprocess operation if growler closed by cross', async () => {
        await cplDetailsLogc.reprocessCplWithoutWaitingForProcessedStatus();
        browser.params.waitWebElementMaxTimeout = 250000;
        await Growlers.closeGrowlerByX();
        await expect(await growler.growlerBody.last().isDisplayed()).toBeFalsy();
        await w.waitUntilElementIsDisplayed(growler.growlerBody.last());
        await expect(await growler.growlerBody.last().isDisplayed()).toBeTruthy();
        await expect(await growler.growlerStatus.getText()).toEqual('CPL is now ready for viewing');
        browser.params.waitWebElementMaxTimeout = 50000;
        await Growlers.openNotificationPanel();
        await Growlers.closeGrowlerInNotificationPanel();
        await Growlers.closeNotificationPanel();
    });

    it('should check if page Manage CPL Details is disabled while Process in progress', async () => {
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.manageCpl, gridElements.checkboxSelector.get(1));
        await cplDetailsLogc.reprocessCplWithoutWaitingForProcessedStatus();
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.manageCpl, gridElements.checkboxSelector.get(1));
        await expect(await modal.modalTitle.getText()).toEqual('Notification');
        await expect(await modal.modalBody.getText()).toEqual('The CPL is currently being processed. It is not possible to access the requested CPL item until processing has been completed. Please try again after the CPL is processed.');
        await modal.closeModalWithButton('Okay, thanks');
        await w.waitUntilTextToBePresent(growler.growlerStatus, 'CPL is now ready for viewing', 250000);
    });

})
