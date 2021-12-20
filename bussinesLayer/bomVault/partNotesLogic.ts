import {bomElements, commonElements, dropdownElements, gridElements, modalElements} from "../../elements/elements";
import {buttonNames} from "../../testData/global";
import {Button} from "../../components/simple/button";
import {Dropdown} from "../../components/dropdown";
import {Input} from "../../components/simple/input";
import {Link} from "../../components/simple/link";
import {Modal} from "../../components/modal";
import {Random} from "../../utils/random";
import {Toolbar} from "../../components/toolbar";
import {Waiters as w} from "../../helper/waiters";
import {browser} from "protractor";
import {allureStep} from "../../helper/allure/allureSteps";

const button: Button = new Button();
const input: Input = new Input();
const modal: Modal = new Modal();
const link: Link = new Link();
const toolbar: Toolbar = new Toolbar();
const random: Random = new Random();

export class PartNotesLogic {

    async removePartNotesLinkIfIsPresent() {
        await allureStep('Remove link Part Notes', async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            let linkNotes = await bomElements.partNotes.allActiveStatuses;
            if(await linkNotes.isPresent()){
                await modal.openModalWithElement(linkNotes);
                await this.deletePartNote();
            } 
        });
    }

    async openPartNotesModal() {
        await w.waitUntilWorkingModalNotDisplayed();
        let ipn:string = await gridElements.newGridLockedColumnRowCellsWithContent(0).get(5).getText(); 
        // await grid.newGridHideColumnByName('Rel. Info');
        let mpn:string = await gridElements.newGridUnlockedColumnRowCellsWithContent(0).get(0).getText();
        // let mfr:string = await gridElements.newGridUnlockedColumnRowCellsWithContent(0).get(1).getText();
        // await toolbar.unhideCellNameWithCellValue('Rel. Info');
        await modal.openModalWithButtonByName(buttonNames.addPartNote);
        await expect(await modal.modalTitle.getText()).toContain('Part Note for IPN = ' + await ipn + ',' +
            ' MPN = ' );
        await w.waitUntilWorkingModalNotDisplayed();
    }
    
    async buttonsWithoutNotes () {
        await expect( button.returnButtonByText(buttonNames.export).isEnabled()).toBeFalsy();
        await expect( button.returnButtonByText(buttonNames.email).isEnabled()).toBeFalsy();
        await expect( button.returnButtonByText(buttonNames.copy).isEnabled()).toBeFalsy();
        await expect( button.returnButtonByText(buttonNames.save).isEnabled()).toBeFalsy();
        await expect( button.returnButtonByText(buttonNames.reset).isEnabled()).toBeFalsy();
        await expect( button.returnButtonByText(buttonNames.delete).isEnabled()).toBeFalsy();
    };

    async partNotesModalTabs () {
        await expect(await commonElements.activeNavTab('Add Comment').isPresent()).toBe(true);
        const expectedTabs = ['Add Comment', 'Status', 'Previous Comments'];
        await expect(await commonElements.modalNavTabs.getText()).toEqual(expectedTabs);
    };

    async addCommentPartNotesModal () {
        await input.fillFieldWithValue(bomElements.partNotes.commentFiled, 'test');
        await expect( button.returnButtonByText(buttonNames.save).isEnabled()).toBeTruthy();
        await expect( button.returnButtonByText(buttonNames.reset).isEnabled()).toBeTruthy();
        await browser.waitForAngular();
        await button.clickByButtonName(buttonNames.save);
        await w.waitUntilElementIsClickable(modal.modalBody);
        await w.waitUntilWorkingModalNotDisplayed()
        await browser.sleep(2000);
        await expect( button.returnButtonByText(buttonNames.export).isEnabled()).toBeTruthy();
        await expect( button.returnButtonByText(buttonNames.email).isEnabled()).toBeTruthy();
        await expect( button.returnButtonByText(buttonNames.copy).isEnabled()).toBeTruthy();
        await expect( button.returnButtonByText(buttonNames.delete).isEnabled()).toBeTruthy();
        await expect( button.returnButtonByText(buttonNames.save).isEnabled()).toBeFalsy();
        await expect( button.returnButtonByText(buttonNames.reset).isEnabled()).toBeFalsy();
    };

    async checkCommentCharactersCounter() {
        await allureStep('Check characters counter', async () => {
            await expect(await bomElements.partNotes.charactersCounter.getText()).toEqual('Remaining characters 3830 of 3830');
            await input.fillFieldWithValue(bomElements.partNotes.commentFiled, random.randomTextGenerator(3831));
            await expect(await bomElements.partNotes.charactersCounter.getText()).toEqual('Remaining characters 0 of 3830');
            const commentText = await bomElements.partNotes.commentFiled.getAttribute('value');
            await expect(commentText.length).toEqual(3830);
            await input.clearInput(bomElements.partNotes.commentFiled);
        });
    };

    async goTOTabPartNotesModal(tabName: string) {
        await link.clickOnTheLinkByNameAndWaitForElement(tabName, modal.modalBody);
        await w.waitUntilWorkingModalNotDisplayed();
        await expect(await commonElements.activeNavTab(tabName).isPresent()).toBe(true);
    };

    async proStatusOptions () {
        await Dropdown.openDropdownByClickOnElement(dropdownElements.dropdownToggle.get(0));
        let expectedProcStatusOptions = ['- Select Status -' , 'Procurable', 'Resolution in Process',
            'Resolved', 'Unknown', 'Unprocurable' ,'Unprocurable with Alternates' ];
        await expect(await dropdownElements.dropdownValues.getText()).toEqual(expectedProcStatusOptions);
    };

    async setDefaultStausPartNotes () {
        await modal.closeModalWithXButton();
        await w.waitUntilElementIsClickable(gridElements.checkboxSelector.get(1));
        await w.waitUntilWorkingModalNotDisplayed();
        await expect(await bomElements.partNotes.defaultStatus.isPresent()).toBe(true);
        await modal.openModalWithElement(bomElements.partNotes.defaultStatus);
    };

    async checkStatus (icon:any, dropdownOption:string) {
        await Dropdown.openDropdownByClickOnElement(dropdownElements.dropdownToggle.get(0));
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(dropdownOption);
        await modal.closeModalWithButton(buttonNames.saveAndClose);
        await browser.sleep(2000);
        await w.waitUntilWorkingModalNotDisplayed();
        await expect(await icon.isPresent()).toBe(true);
        await modal.openModalWithElement(icon);
    };


    async proReasonOptions () {
        await Dropdown.openDropdownByClickOnElement(dropdownElements.dropdownToggle.get(1));
        const expectedprocStatusOptions = ['- Select Reason -', 'Acceptable Procurable Alternates', 'Aftermarket Sources',
            'Inventory Available', 'Last Time Buy Completed', 'Last Time Buy Initiated', 'Other', 'Redesigned' ];
        await expect(await dropdownElements.dropdownValues.getText()).toEqual(expectedprocStatusOptions);
    };

    async deletePartNote () {
        await modal.openModalWithButtonByName(buttonNames.delete);
        await modal.closeModalWithButton(buttonNames.yes);
        await w.waitUntilElementIsDisplayed(gridElements.gridWrapper);
        await w.waitUntilElementIsClickable(gridElements.checkboxSelector.get(1));
        await w.waitUntilWorkingModalNotDisplayed();
        await browser.sleep(2000);
        await expect( bomElements.partNotes.defaultStatus.isPresent()).toBe(false);
        await expect( bomElements.partNotes.unprocurableAltStatus.isPresent()).toBe(false);
    };

    async saveChange () {
        await button.clickOnTheElement(toolbar.returnToolbarButtonByValue(buttonNames.save));
        await w.waitUntilWorkingModalNotDisplayed();
        await expect(await toolbar.returnToolbarButtonByValue(buttonNames.save).isEnabled()).toBeFalsy();
    };

    async applyTodaysDateInDataPicker(calendarIconNumber: number) {
        await allureStep('Open date-picker and click "Today" button', async () => {
            await button.clickOnTheElement(await bomElements.partNotes.calendarIcon.get(calendarIconNumber));
            await w.waitUntilElementIsDisplayed(button.returnButtonByText(buttonNames.today));
            await w.waitUntilElementIsClickable(button.returnButtonByText(buttonNames.today));
            await button.clickOnTheElement(await button.returnButtonByText(buttonNames.today));
        });
    };

}