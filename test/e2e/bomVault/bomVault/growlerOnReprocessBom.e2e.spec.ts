import {BomVaultLogic} from "../../../../bussinesLayer/bomVault/bomVaultLogic";
import {gridElements, growler} from "../../../../elements/elements";
import {browser} from "protractor";
import {meganavItems} from "../../../../testData/global";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Growlers} from "../../../../components/growlers";

const bomVaultLogic: BomVaultLogic = new BomVaultLogic();
const login: Login = new Login();
const meganav: Meganav = new Meganav();

describe('Growlers appearance', () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.gridWrapper);
        // await link.clickOnTheLinkByName(linksNames.clearAllTags);
        await Growlers.muteGrowlersNotifications(false);
        await bomVaultLogic.reprocessBomWithoutWaitingForProcessedStatus('Automation_BOM');
    });

    it('should appear growler that informs about status of reproccess operation ', async () => {
        await expect(await growler.growlerBody.get(1).isPresent()).toBeTruthy();
    });

    it('should close growler by cross', async () => {
        await Growlers.closeGrowlerByX();
        await expect(await growler.growlerBody.get(1).isPresent()).toBeFalsy();
    });

    it('growler should be present in navigation panel ', async () => {
        await Growlers.openNotificationPanel();
        await expect(await growler.growlerBody.get(0).isPresent()).toBeTruthy();
    });

    it('growler should be closed by X in navigation panel ', async () => {
        await Growlers.closeGrowlerInNotificationPanel();
        await expect(await growler.growlerBody.get(0).isPresent()).toBeFalsy();
    })
});
