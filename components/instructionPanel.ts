import {Link} from "./simple/link";
import {linksNames} from "../testData/global";
import {element, by, browser} from "protractor";
import {Waiters as w} from "../helper/waiters";
import {Button} from "./simple/button";
import {allureStep} from "../helper/allure/allureSteps";

const button: Button = new Button();
const link: Link = new Link();

export class InstructionPanel {

    infoPanel: any;
    instructionPanelTitle: any;
    instructionPanelText: any;
    rightSideSmallHelp: any;

    constructor() {
        this.infoPanel = element(by.className('info-panel'));
        this.instructionPanelTitle = element(by.css('h2.Instruction_panel_head'));
        this.instructionPanelText = element(by.css('p.Instruction_panel_text_paragraph'));
        this.rightSideSmallHelp = element(by.css('.context-help-switch'));
    };

    public async hideIntructionPanel() {
        await allureStep('Hide instruction panel', async () => {
            if (await link.returnElementByLinkName(linksNames.collapse).isPresent()) {
                await link.clickOnTheLinkByName(linksNames.collapse);
                await w.waitUntilElementNotDisplayed(this.infoPanel);
            }
        });
    };

    public async unhideInstructionPanel() {
        await allureStep('Unhide instruction panel', async () => {
            await button.clickOnTheElement(this.rightSideSmallHelp);
            await w.waitUntilElementIsDisplayed(this.infoPanel);
            await w.waitUntilElementIsClickable(this.infoPanel);
            await w.waitUntilElementIsClickable(this.instructionPanelTitle);
        });
    };

    async instrPanelHidingUnhidingChecking(header: string) {
        if (await this.infoPanel.isPresent()) {
            // await w.waitUntilElementIsClickable(this.instructionPanelTitle);
            await w.waitUntilElementIsDisplayed(this.instructionPanelTitle);
            await browser.sleep(1000);
            await expect(this.instructionPanelTitle.getText()).toEqual(header);
            await this.hideIntructionPanel();
            await expect(this.rightSideSmallHelp.isPresent()).toBe(true);
            await this.unhideInstructionPanel();
        }
        else {
            await this.unhideInstructionPanel();
            await expect(this.instructionPanelTitle.getText()).toEqual(header)
        }
    };

    async instrPanelHidingUnhidingCheckingWithText(header: string, infoText: string) {
        if (await this.infoPanel.isPresent()) {
            // await w.waitUntilElementIsClickable(this.instructionPanelTitle);
            await w.waitUntilElementIsDisplayed(this.instructionPanelTitle);
            await expect(this.instructionPanelTitle.getText()).toEqual(header);
            await expect(this.instructionPanelText.getText()).toEqual(infoText);
            await this.hideIntructionPanel();
            await expect(this.rightSideSmallHelp.isPresent()).toBe(true);
            await this.unhideInstructionPanel();
        }
        else {
            await this.unhideInstructionPanel();
            await expect(this.instructionPanelTitle.getText()).toEqual(header);
            await expect(this.instructionPanelText.getText()).toEqual(infoText);
        }
    };
}