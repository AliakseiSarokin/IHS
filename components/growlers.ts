import {Button} from "./simple/button";
import {Waiters, Waiters as w} from "../helper/waiters";
import {allureStep} from "../helper/allure/allureSteps";
import {growler, growlerNotificationPanel} from "../elements/elements";
import {browser} from "protractor";

const button = new Button();

export class Growlers {

    public static async closeGrowlerByX() {
        await allureStep('Click on X to close growler', async () => {
            await w.waitUntilElementIsDisplayed(await growler.growlerCrossButton);
            await growler.growlerCrossButton.click();
        });
    };

    public static async openNotificationPanel() {
        await allureStep("Open navigation panel", async () => {
            await  w.waitUntilElementIsClickable(growlerNotificationPanel.menuIcon)
            await growlerNotificationPanel.menuIcon.click();
            await Waiters.waitUntilElementIsDisplayed(growlerNotificationPanel.notificationPanelBody)
        });
    }

    public static async closeGrowlerInNotificationPanel() {
        await allureStep("Click on X to close growler in notification ", async () => {
            await Waiters.waitUntilElementIsDisplayed(growlerNotificationPanel.growlerCrossButton);
            await growlerNotificationPanel.growlerCrossButton.click();
        });
    }

    public static async closeNotificationPanel() {
        await allureStep("Close notification panel", async () => {
            await w.waitUntilElementIsClickable(growlerNotificationPanel.menuIcon);
            if(growlerNotificationPanel.notificationPanelBody.isDisplayed()){
            await growlerNotificationPanel.menuIcon.click();
            }
            await Waiters.waitUntilElementNotDisplayed(growlerNotificationPanel.notificationPanelBody)
        });
    }

    public static async closeNotificationPanelByArrow() {
        await allureStep("Close notification panel by Arrow", async () => {
            await growlerNotificationPanel.arrowButton.click();
            await Waiters.waitUntilElementNotDisplayed(growlerNotificationPanel.notificationPanelBody)
        });
    }

    public static async checkUncheckMuteNotifications() {
        await allureStep("Check Mute Notifications checkbox", async () => {
            await w.waitUntilElementIsClickable(growlerNotificationPanel.muteNotificationsCheckbox);
            await growlerNotificationPanel.muteNotificationsCheckbox.click();
        });
    }

    public static async clickOnLinkInGrowler() {
        await allureStep("Click on link in growler box", async () => {
            let cplLink: any =await growler.selectLink.last();
            await button.clickOnTheElement(cplLink);

        });
    }

    public static async closeGrowlerIfDisplayed() {
        await allureStep("Click on X to close growler if displayed", async () => {
            if(await growler.growlerCrossButton.isPresent()){
                if (await growler.growlerCrossButton.isDisplayed()) {
                    await growler.growlerCrossButton.click();
                    await w.waitUntilElementNotDisplayed(await growler.growlerCrossButton);
                }
            }
        });
    };

    public static async muteGrowlersNotifications(set: boolean) {    // true = selected
        await allureStep("set condition Growlers Notifications", async () => {
            await this.openNotificationPanel();
            await w.waitUntilElementIsDisplayed(await growlerNotificationPanel.muteNotificationsCheckbox);
            if(set){
                if(await growlerNotificationPanel.muteNotificationsCheckbox.isSelected()){
                }
                else{
                    await growlerNotificationPanel.muteNotificationsCheckbox.click();
                    await w.waitUntilElementIsDisplayed(growlerNotificationPanel.muteNotificationsCheckbox);
                    await expect(await growlerNotificationPanel.muteNotificationsCheckbox.isSelected()).toBe(true);
                }
            }
            else {
                if(await growlerNotificationPanel.muteNotificationsCheckbox.isSelected()){
                     await growlerNotificationPanel.muteNotificationsCheckbox.click();
                     await w.waitUntilElementIsDisplayed(growlerNotificationPanel.muteNotificationsCheckbox);
                     await expect(await growlerNotificationPanel.muteNotificationsCheckbox.isSelected()).toBe(false);
                    }
            }
            await this.closeNotificationPanel();
        });
    };

    public static async waitUntilCPLGrowlerIsReady() {
        await allureStep("wait until growler shows 100% completion", async () => {
            let growlerCompletionPercentage:string = await growler.growlerReadyStatus.getAttribute('style');
            if(growlerCompletionPercentage.includes('100%')){
                let cplLink: any =await growler.selectLink.last();
                await button.clickOnTheElement(cplLink);
                await w.waitUntilWorkingModalNotDisplayed();
            }
            else{
                await browser.sleep(4000);
                await this.waitUntilCPLGrowlerIsReady();
            }

        });
    }


 }
