import {BomVaultLogic} from "../../../../bussinesLayer/bomVault/bomVaultLogic";
import {gridElements, growler, growlerNotificationPanel} from "../../../../elements/elements";
import {browser} from "protractor";
import {linksNames, meganavItems} from "../../../../testData/global";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Growlers} from "../../../../components/growlers";
import {Link} from "../../../../components/simple/link"

const link:Link = new Link();
const bomVaultLogic: BomVaultLogic = new BomVaultLogic();
const login: Login = new Login();
const meganav: Meganav = new Meganav();

describe('Growlers Notification Panel', () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.gridWrapper);
        await Growlers.muteGrowlersNotifications(false);
        await bomVaultLogic.reprocessBomWithoutWaitingForProcessedStatus('AUTOMATION_Indentured');
    });

    afterAll(async() => {
        await Growlers.muteGrowlersNotifications(true);
    });

    it('should open Notification Panel by menu-item button', async () => {
        await Growlers.openNotificationPanel();
        await expect(await growler.growlerBody.get(1).isPresent()).toBeFalsy();
        await expect(await growlerNotificationPanel.notificationPanelBody.isPresent()).toBeTruthy();
    });

    it('should close Notification Panel by menu-item button', async () => {
        await Growlers.closeNotificationPanel();
        await expect(await growlerNotificationPanel.notificationPanelBody.isPresent()).toBeFalsy();
    });

    it('should close Notification Panel by arrow', async () => {
        await Growlers.openNotificationPanel();
        await Growlers.closeNotificationPanelByArrow();
        await expect(await growlerNotificationPanel.notificationPanelBody.isPresent()).toBeFalsy();
    });

    it('should check Mute notification', async () => {
        await Growlers.openNotificationPanel();
        await Growlers.checkUncheckMuteNotifications();
        await expect(await growlerNotificationPanel.muteNotificationsCheckbox.isSelected()).toBeTruthy();
        await Growlers.closeNotificationPanel();
    });

    it('should verify notification badge on menu-item button', async () => {
        await bomVaultLogic.reprocessBomWithoutWaitingForProcessedStatus('Automation_BOM_With_Icons');
        await expect(await growlerNotificationPanel.notificationBadge.isPresent()).toBeTruthy();
        await Growlers.openNotificationPanel();
        await expect(await growler.growlerBody.get(0).isPresent()).toBeTruthy();
        await Growlers.checkUncheckMuteNotifications();
        await Growlers.closeNotificationPanel();
    });

});
