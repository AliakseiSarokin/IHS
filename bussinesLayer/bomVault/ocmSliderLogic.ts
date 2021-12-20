import {browser} from "protractor";
import {bomElements, dropdownElements, gridElements, sliderElements} from "../../elements/elements";
import {buttonNames} from "../../testData/global";
import {Actions} from "../../utils/actions";
import {Button} from "../../components/simple/button";
import {Dropdown} from "../../components/dropdown";
import {Grid} from "../../components/grid";
import {ElementAttributes} from "../../utils/elementAttributes";
import {Input} from "../../components/simple/input";
import {Modal} from "../../components/modal";
import {Random} from "../../utils/random";
import {Slider} from "../../components/slider";
import {Waiters as w} from "../../helper/waiters";
import {fieldStatuses} from "../../testData/global";
import {columnIdByColumnName} from "../../testData/columnIdByColumnName";

const actions: Actions = new Actions();
const button: Button = new Button();
const grid: Grid = new Grid();
const elementAttributes: ElementAttributes = new ElementAttributes();
const input: Input = new Input();
const modal: Modal = new Modal();
const random: Random = new Random();

export class OcmSliderLogic {

    ipnPartAlerts: string;
    matchPNPartAlerts: string;
    matchedMfrPartAlerts: string;
    ipn: string;
    matchPN: string;
    matchedMfr: string;

    constructor() {
        this.ipnPartAlerts;
        this.matchPNPartAlerts;
        this.matchedMfrPartAlerts;
        this.ipn;
        this.matchPN;
        this.matchedMfr;

    };

    public async fieldsChecking() {
        const expectedFiledLabels: string[] = ['Case Number:', 'Originator:', 'Priority:', 'Telephone:',
            'OEM Part Number:', 'OEM Name:', 'OEM Cage:', 'Quantity:', 'Part Code:', 'Part Type:',
            'Description:', 'NSN:', 'Generic:', 'Vendor Part Number:', 'Vendor Name:', 'Vendor Cage Code:',
            'EPL Date:', 'Vendor Class:', 'Vendor Package:', 'Vendor Pins:', 'Problem:', 'Ship Revision:',
            'Suggested Solution:', 'LOT Date:', 'Ship Date:'];
        await w.waitUntilElementIsDisplayed(await bomElements.ocmsSlider.fieldLabels.get(0));
        await w.waitUntilElementIsDisplayed(await bomElements.ocmsSlider.fieldLabels.get(1));
        await expect(await bomElements.ocmsSlider.fieldLabels.getText()).toEqual(expectedFiledLabels);
        let p1 = await bomElements.ocmsSlider.fieldLabels.count();
        let p2 = await bomElements.ocmsSlider.fieldInputs.count();
        let p3 = await bomElements.ocmsSlider.fieldTextArea.count();
        await expect(p1).toEqual(p2 + p3);
    };

    public async ocmsGetGridCellDataBomDetails() {
        this.ipn = await gridElements.newGridLockedColumnRowCellsWithContent(0).get(4).getText();
        this.matchPN = await gridElements.newGridUnlockedColumnRowCellsWithContent(0).get(0).getText();
        this.matchedMfr = await gridElements.newGridUnlockedColumnRowCellsWithContent(0).get(1).getText();
    };

    public async ocmsGetGridCellDataBomTreeParts() {
        // await grid.newGridHideColumnsRange(['Rel. Info', 'LC Risk']);
        const ipn:string[] = await grid.newGridReturnCellValuesByColumnNameBOMTree(0, 'Internal Part Number');
        this.ipn = ipn[0];
        const matchPN:string[] = await grid.getCellValuesByCellIdForBOMTreeParts(columnIdByColumnName.bomTreeParts['matchPN'], 1);
        this.matchPN = matchPN[0];
        const matchedMfr:string[] = await grid.getCellValuesByCellIdForBOMTreeParts(columnIdByColumnName.bomTreeParts['matchMfr']);
        this.matchedMfr = matchedMfr[0];
    };

    public async ocmsGetGridCellData() {
        this.ipnPartAlerts = await gridElements.newGridLockedColumnRowCellsWithContent(2).get(0).getText();
        this.matchPNPartAlerts = await gridElements.newGridLockedColumnRowCellsWithContent(2).get(3).getText();
        this.matchedMfrPartAlerts = await gridElements.newGridLockedColumnRowCellsWithContent(2).get(4).getText();
    };

    private async checkingDropdown(option: number, expectedFilters: string[]) {
        await Dropdown.openDropdownByClickOnElement(dropdownElements.dropdownToggle.get(option));
        await expect(await dropdownElements.dropdownValues.getText()).toEqual(expectedFilters);
        await Dropdown.closeDropdownByClickOnElement(dropdownElements.dropdownToggle.get(option))
    };

    private async checkCounter(field: any, charsAmount: number, option: number) {
        await w.waitUntilWorkingModalNotDisplayed();
        await input.fillFieldWithValue(field, random.randomNumberGenerator(charsAmount + 1));
        await expect(await bomElements.ocmsSlider.fieldCounter.get(option).getText())
            .toEqual('Characters remaining 0 of ' + charsAmount);
        await w.waitUntilWorkingModalNotDisplayed();
    };

    private async resetChecking() {
        await w.waitUntilWorkingModalNotDisplayed();
        await expect(button.returnButtonByText(buttonNames.reset).isEnabled()).toBeTruthy();
        await modal.openModalWithElement(button.returnButtonByTextInSlider(buttonNames.reset));
        await expect(await modal.modalTitle.getText()).toEqual('Confirm Reset');
        await modal.closeModalWithXButton();
        await modal.openModalWithElement(button.returnButtonByTextInSlider(buttonNames.reset));
        await modal.closeModalWithButton(buttonNames.cancel);
        await modal.openModalWithElement(button.returnButtonByTextInSlider(buttonNames.reset));
        await modal.closeModalWithButton(buttonNames.okay);
        await w.waitUntilElementIsDisplayed(button.returnDisabledButtonByText('Reset'));
    };

    async caseNumberChecking() {
        const initValue: string = await elementAttributes.getElementAttribute(bomElements.ocmsSlider.fieldInputs.get(0), 'value')
        await this.checkCounter(bomElements.ocmsSlider.fieldInputs.get(0), 8, 0);
        await this.resetChecking();
        await expect((await elementAttributes.getElementAttribute(bomElements.ocmsSlider.fieldInputs.get(0), 'value')))
            .toEqual(initValue);
    };


    async originatorChecking() {
        await expect(await elementAttributes.getElementAttribute(bomElements.ocmsSlider.fieldInputs.get(1), 'value'))
            .toContain('BOM4 Test Group Admin');
        await this.checkCounter(bomElements.ocmsSlider.fieldInputs.get(1), 120, 1);
        await this.resetChecking();
        await expect(await elementAttributes.getElementAttribute(bomElements.ocmsSlider.fieldInputs.get(1), 'value'))
            .toContain('BOM4 Test Group Admin');
    };

    async priorityChecking() {
        await browser.executeScript("document.querySelectorAll('.form-container  input')[3].scrollIntoView()");
        const expectedFilters = ['High', 'Medium', 'Low'];
        // await expect(await elementAttributes.getElementAttribute(bomElements.ocmsSlider.fieldInputs.get(2), 'value'))
        //     .toContain('Medium');
        await this.checkingDropdown(0, expectedFilters);
        await Dropdown.openDropdownByClickOnElement(dropdownElements.dropdownToggle.get(0));
        await Dropdown.selectValueInDropdownByValueNameWithoutWait('Low');
        await this.resetChecking();
        await expect(await elementAttributes.getElementAttribute(bomElements.ocmsSlider.fieldInputs.get(2), 'value'))
            .toContain('Medium');
    };


    async telephoneChecking() {
        await expect((await elementAttributes.getElementAttribute(bomElements.ocmsSlider.fieldInputs.get(3), 'value')).length)
            .toEqual(0);
        await this.checkCounter(bomElements.ocmsSlider.fieldInputs.get(3), 20, 2);
        await this.resetChecking();
        await w.waitUntilWorkingModalNotDisplayed();
        await expect((await elementAttributes.getElementAttribute(bomElements.ocmsSlider.fieldInputs.get(3), 'value')).length)
            .toEqual(0);
    };


    async oemPartNumberCheckingPartAlerts() {
        await expect(await elementAttributes.getElementAttribute(bomElements.ocmsSlider.fieldInputs.get(4), 'value'))
            .toContain(this.ipnPartAlerts);
        await expect(await elementAttributes.getElementAttribute(bomElements.ocmsSlider.fieldInputs.get(4), 'disabled'))
            .toContain('true');
    };

    async oemPartNumberChecking() {
        await expect(await elementAttributes.getElementAttribute(bomElements.ocmsSlider.fieldInputs.get(4), 'value'))
            .toContain(await this.ipn);
        await expect(await elementAttributes.getElementAttribute(bomElements.ocmsSlider.fieldInputs.get(4), 'disabled'))
            .toContain('true');
    };

    async oemNameChecking() {
        await expect(await elementAttributes.getElementAttribute(bomElements.ocmsSlider.fieldInputs.get(5), 'value'))
            .toContain('NA');
        await this.checkCounter(bomElements.ocmsSlider.fieldInputs.get(5), 100, 3);
        await this.resetChecking();
        await w.waitUntilWorkingModalNotDisplayed();
        await expect(await elementAttributes.getElementAttribute(bomElements.ocmsSlider.fieldInputs.get(5), 'value'))
            .toContain('NA');
    };

    async oemCageChecking() {
        await expect(await elementAttributes.getElementAttribute(bomElements.ocmsSlider.fieldInputs.get(6), 'value'))
            .toContain('nnnnn');
        await this.checkCounter(bomElements.ocmsSlider.fieldInputs.get(6), 100, 4);
        await this.resetChecking();
        await w.waitUntilWorkingModalNotDisplayed();
        await expect(await elementAttributes.getElementAttribute(bomElements.ocmsSlider.fieldInputs.get(6), 'value'))
            .toContain('nnnnn');
    };

    async quantityChecking() {
        await expect(await elementAttributes.getElementAttribute(bomElements.ocmsSlider.fieldInputs.get(7), 'disabled'))
            .toContain('true');
        await expect(await elementAttributes.getElementAttribute(bomElements.ocmsSlider.fieldInputs.get(7), 'value'))
            .toContain('1');
    };

    async partCodeChecking() {
        await expect((await elementAttributes.getElementAttribute(bomElements.ocmsSlider.fieldInputs.get(8), 'value')).length)
            .toEqual(0);
        await this.checkCounter(bomElements.ocmsSlider.fieldInputs.get(8), 10, 5);
        await this.resetChecking();
        await expect((await elementAttributes.getElementAttribute(bomElements.ocmsSlider.fieldInputs.get(8), 'value')).length)
            .toEqual(0);
    };


    async partTypeChecking() {
        await browser.executeScript("document.querySelectorAll('.form-container  input')[10].scrollIntoView()");
        const expectedFilters = ['Please specify', 'Electronic', 'Passive', 'Mechanical', 'Other'];
        await expect(await elementAttributes.getElementAttribute(bomElements.ocmsSlider.fieldInputs.get(9), 'value'))
            .toContain('Please specify');
        await this.checkingDropdown(1, expectedFilters);
        await Dropdown.openDropdownByClickOnElement(dropdownElements.dropdownToggle.get(1));
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(expectedFilters[2]);
        await this.resetChecking();
        await expect(await elementAttributes.getElementAttribute(bomElements.ocmsSlider.fieldInputs.get(9), 'value'))
            .toContain('Please specify');
    };

    async descriptionChecking() {
        const expectedFilters = ['Analog IC', 'Capacitor', 'Connector', 'Consumer IC', 'Crystal/Resonator',
            'Device Socket', 'Diode', 'Electromech Relay', 'Electromech Switch', 'Fiber Optic Device',
            'Filter', 'Fuse', 'Inductor', 'Interface IC', 'Logic IC', 'Memory IC', 'Microprocessor IC',
            'Optoelectronic Device', 'Oscillator', 'Programmable Logic IC', 'RC Network',
            'RF/Microwave Device', 'Sensor', 'Telecom IC', 'Terminal Block', 'Transformer',
            'Transistor', 'Trigger Device', 'Unclassified', 'Unknown'];
        await this.checkingDropdown(2, expectedFilters);
        await this.resetChecking();
    };

    async nsnChecking() {
        await expect((await elementAttributes.getElementAttribute(bomElements.ocmsSlider.fieldInputs.get(11), 'value')).length)
            .toEqual(0);
        await this.checkCounter(bomElements.ocmsSlider.fieldInputs.get(11), 50, 6);
        await this.resetChecking();
        await expect((await elementAttributes.getElementAttribute(bomElements.ocmsSlider.fieldInputs.get(11), 'value')).length)
            .toEqual(0);
    };

    async genericChecking() {
        await expect((await elementAttributes.getElementAttribute(bomElements.ocmsSlider.fieldInputs.get(12), 'value')).length)
            .toBeGreaterThanOrEqual(0);
        await this.checkCounter(bomElements.ocmsSlider.fieldInputs.get(12), 15, 7);
        await expect((await elementAttributes.getElementAttribute(bomElements.ocmsSlider.fieldInputs.get(12), 'value')).length)
            .toBeGreaterThan(0);
        await this.resetChecking();
    };

    async vendorPartNumberCheckingPartAlerts() {
        await expect(await elementAttributes.getElementAttribute(bomElements.ocmsSlider.fieldInputs.get(13), 'value'))
            .toContain(this.matchPNPartAlerts);
        await expect(await elementAttributes.getElementAttribute(bomElements.ocmsSlider.fieldInputs.get(13), 'disabled'))
            .toContain(true);

    };

    async vendorPartNumberChecking() {
        await expect(await elementAttributes.getElementAttribute(bomElements.ocmsSlider.inputByLabelName('Vendor Part Number:'), 'value'))
            .toContain(this.matchPN);
        await expect(await elementAttributes.getElementAttribute(bomElements.ocmsSlider.inputByLabelName('Vendor Part Number:'), 'disabled'))
            .toContain(true);
    };

    async vendorNameCheckingPartAlerts() {
        await expect(await elementAttributes.getElementAttribute(bomElements.ocmsSlider.fieldInputs.get(14), 'value'))
            .toContain(this.matchedMfrPartAlerts);
        await expect(await elementAttributes.getElementAttribute(bomElements.ocmsSlider.fieldInputs.get(14), 'disabled'))
            .toContain(true);
    };

    async vendorNameChecking() {
        await expect(await elementAttributes.getElementAttribute(bomElements.ocmsSlider.fieldInputs.get(14), 'value'))
            .toContain(this.matchedMfr);
        await expect(await elementAttributes.getElementAttribute(bomElements.ocmsSlider.fieldInputs.get(14), 'disabled'))
            .toContain(true);
    };


    async vendorCageCodeChecking() {
        await expect(await elementAttributes.getElementAttribute(bomElements.ocmsSlider.fieldInputs.get(15), 'class'))
            .toContain(fieldStatuses.emptyField);
        await expect(await elementAttributes.getElementAttribute(bomElements.ocmsSlider.fieldInputs.get(15), 'disabled'))
            .toContain(true);
    };


    async vendorClassChecking() {
        await expect((await elementAttributes.getElementAttribute(bomElements.ocmsSlider.fieldInputs.get(17), 'value')).length)
            .toEqual(0);
        await this.checkCounter(bomElements.ocmsSlider.fieldInputs.get(17), 10, 8);
        await this.resetChecking();
        await expect((await elementAttributes.getElementAttribute(bomElements.ocmsSlider.fieldInputs.get(17), 'value')).length)
            .toEqual(0);
    };

    async vendorpackageChecking() {
        const initValue: string = await elementAttributes.getElementAttribute(bomElements.ocmsSlider.fieldInputs.get(18),
            'value');
        await this.checkCounter(bomElements.ocmsSlider.fieldInputs.get(18), 20, 9);
        await this.resetChecking();
        await expect((await elementAttributes.getElementAttribute(bomElements.ocmsSlider.fieldInputs.get(18), 'value')))
            .toEqual(initValue);
    };

    async vendorPinsPartAlertsChecking() {
        await expect((await elementAttributes.getElementAttribute(bomElements.ocmsSlider.fieldInputs.get(21), 'value')).length)
            .toBeGreaterThan(0);
        await this.checkCounter(bomElements.ocmsSlider.fieldInputs.get(19), 10, 10);
        await this.resetChecking();
        await expect((await elementAttributes.getElementAttribute(bomElements.ocmsSlider.fieldInputs.get(21), 'value')).length)
            .toBeGreaterThan(0);
    };

    async vendorPinsChecking() {
        await expect((await elementAttributes.getElementAttribute(bomElements.ocmsSlider.fieldInputs.get(19), 'value')).length)
            .toEqual(0);
        await this.checkCounter(bomElements.ocmsSlider.fieldInputs.get(19), 10, 10);
        await this.resetChecking();
        await expect((await elementAttributes.getElementAttribute(bomElements.ocmsSlider.fieldInputs.get(19), 'value')).length)
            .toEqual(0);
    };

    async problemChecking() {
        await browser.executeScript("document.querySelectorAll('.form-container  input')[21].scrollIntoView()");
        const expectedFilters = ['Please specify', 'Red', 'Yellow'];
        await expect(await elementAttributes.getElementAttribute(bomElements.ocmsSlider.fieldInputs.get(20), 'value'))
            .toContain('Please specify');
        await this.checkingDropdown(3, expectedFilters);
        await Dropdown.openDropdownByClickOnElement(dropdownElements.dropdownToggle.get(3));
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(expectedFilters[2]);
        await this.resetChecking();
        await expect(await elementAttributes.getElementAttribute(bomElements.ocmsSlider.fieldInputs.get(20), 'value'))
            .toContain('Please specify');
    };

    async shipRevisionChecking() {
        await expect((await elementAttributes.getElementAttribute(bomElements.ocmsSlider.fieldInputs.get(21), 'value')).length)
            .toEqual(0);
        await this.checkCounter(bomElements.ocmsSlider.fieldInputs.get(21), 50, 11);
        await this.resetChecking();
        await expect((await elementAttributes.getElementAttribute(bomElements.ocmsSlider.fieldInputs.get(21), 'value')).length)
            .toEqual(0);
    };

    async suggestedSolutionChecking() {
        await expect((await elementAttributes.getElementAttribute(bomElements.ocmsSlider.fieldTextArea.get(0), 'value')).length)
            .toEqual(0);
        await this.checkCounter(bomElements.ocmsSlider.fieldTextArea.get(0), 50, 12);
        await this.resetChecking();
        await expect((await elementAttributes.getElementAttribute(bomElements.ocmsSlider.fieldTextArea.get(0), 'value')).length)
            .toEqual(0);
    };

    private async closeModalAttirbutes() {
        await expect(await modal.modalTitle.getText()).toEqual('Cancel Export?');
        await expect(await modal.modalBody.getText()).toEqual('Are you sure you want to discard changes and cancel the export?');
    };

    async checkingCloseModal() {
        await input.fillFieldWithValue(bomElements.ocmsSlider.fieldInputs.get(0), random.randomNumberGenerator(3));
        await modal.openModalWithElement(sliderElements.xButtonSlider);
        await this.closeModalAttirbutes();
        await modal.closeModalWithXButton()
        await modal.openModalWithElement(sliderElements.xButtonSlider);
        await modal.closeModalWithButton(buttonNames.no);
        await modal.openModalWithElement(sliderElements.closeSliderTab);
        await this.closeModalAttirbutes();
        await modal.closeModalWithButton(buttonNames.no);
        await modal.openModalWithElement(sliderElements.closeSliderTab);
        await modal.closeModalWithXButton();
        await modal.openModalWithButtonByName(buttonNames.close);
        await this.closeModalAttirbutes();
        await modal.closeModalWithButton(buttonNames.no);
        await modal.openModalWithButtonByName(buttonNames.close);
        await modal.closeModalWithXButton();
    };

    async closeModal() {
        await modal.openModalWithButtonByName(buttonNames.close);
        await Slider.closeSliderWithButtonName(buttonNames.yes, gridElements.gridWrapper);
        await browser.sleep(2000)
    };

    async exportOcmsButton() {
        const inputCount: number[] = [0, 8, 11];
        await w.waitUntilElementIsDisplayed(bomElements.ocmsSlider.enableFields.get(0));
        for (let i = 0; i < await inputCount.length; i++) {
            await actions.mouseMoveToElement(bomElements.ocmsSlider.enableFields.get(inputCount[i]));
            await browser.sleep(1000);
            await input.fillFieldWithValue(bomElements.ocmsSlider.enableFields.get(inputCount[i]), random.randomNumberGenerator(3));
        }
        const result: number = await dropdownElements.dropdownToggle.count();
        for (let i = 0; i < await result; i++) {
            await actions.mouseMoveToElement(dropdownElements.dropdownToggle.get(i));
            await browser.sleep(1000);
            await Dropdown.openDropdownByClickOnElement(dropdownElements.dropdownToggle.get(i));
            let values: string[] = await dropdownElements.dropdownValues.getText();
            await Dropdown.selectValueInDropdownByValueNameWithoutWait(values[1])
        }
        await this.addCommentToSystemField();
        while(await gridElements.sliderGridNewtNotDisabledButton.isPresent()) {
            await button.clickOnTheElementAndWait(gridElements.sliderGridNewtNotDisabledButton,
                await bomElements.ocmsSlider.sliderGridRequirAdd.get(0));
            await this.addCommentToSystemField();
        }
        await await bomElements.ocmsSlider.enableFields.get(0).click();
        await expect(button.returnButtonByTextInSlider(buttonNames.export).isEnabled()).toBeTruthy();
    };

    private async _openCommentSystem(row: number) {
        await w.waitUntilElementIsClickable(await bomElements.ocmsSlider.sliderGridRequirAdd.get(row));
        await button.clickOnTheElement(bomElements.ocmsSlider.sliderGridRequirAdd.get(row));
        await w.waitUntilElementIsDisplayed(await bomElements.ocmsSlider.sliderGridInputs.get(0));
        await await bomElements.ocmsSlider.sliderGridInputs.get(0).click();
    };

    public async addCommentToSystemField() {
        let rows: number = await bomElements.ocmsSlider.sliderGridRequirAdd.count();
        for(let i:number =0; i < rows; i++){
            await this._openCommentSystem(i);
            await input.fillFieldWithValue(await bomElements.ocmsSlider.sliderGridInputs.get(0),
                random.randomNumberGenerator(3));
        }
    };

    async notificationModal() {
        await modal.openModalWithElement(button.returnButtonByTextInSlider(buttonNames.export));
        await expect(await modal.modalTitle.getText()).toEqual('Notification');
        await expect(await modal.modalBodyParag.getText()).toEqual(['Please, correct next issues at the OCMS form and try again:',
            'EPL Date: Invalid Date Format. Field maxlength (10) exceeded.', 'Ship Date: Invalid Date Format. Field maxlength (10) exceeded.',
            'Case Number: Field must have exactly 8 characters.']);
        await modal.closeModalWithXButton('Notification');
        await modal.openModalWithElement(button.returnButtonByTextInSlider(buttonNames.export));
        await modal.closeModalWithButton(buttonNames.okayThanks);
    };


    async exportOcmsFile() {
        const caseNumber: string = "12345678";
        await w.waitUntilElementIsDisplayed(await bomElements.ocmsSlider.fieldInputs.get(0));
        await input.fillFieldWithValue(bomElements.ocmsSlider.fieldInputs.get(0), caseNumber);
        await browser.sleep(2000);
        await modal.checkingExportFileOcmsSlider(buttonNames.export,'nothing', sliderElements.openSliderBox, caseNumber +'.xml');
    };
}
