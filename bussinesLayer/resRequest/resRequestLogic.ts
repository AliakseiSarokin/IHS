import {Input} from "../../components/simple/input";
const input: Input = new Input();
import {dropdownElements, gridElements, resReqElements} from "../../elements/elements";
import {Button} from "../../components/simple/button";
const button: Button = new Button();
import {allureStep} from "../../helper/allure/allureSteps";
import {Dropdown} from "../../components/dropdown";
import {Random} from "../../utils/random";
const random:Random = new Random();
import {linksNames, fieldStatuses, titles, modalTitles, buttonNames} from "../../testData/global";
import {Link} from "../../components/simple/link";
const link: Link = new Link;
import {ElementAttributes} from "../../utils/elementAttributes";
const elementAttributes = new ElementAttributes();
import {Modal} from "../../components/modal";
const modal = new Modal();
import {Waiters as w} from "../../helper/waiters";
import {browser} from "protractor";
import {Grid} from "../../components/grid";
const grid: Grid = new Grid();

export class ResRequestLogic {

    fileToUploadLess2MB:string;
    fileToUploadExect2MB:string;

    constructor() {
        this.fileToUploadLess2MB ='.\\..\\..\\..\\testData\\files\\researchRequests\\lessThanTwoMBFile.txt';
        this.fileToUploadExect2MB ='.\\..\\..\\..\\testData\\files\\researchRequests\\exectTwoMBFile.txt';
    };

    public async uploadAFileInResReqModal() {
        await input.uploadAFile(resReqElements.firstStepInputs.last(), this.fileToUploadLess2MB);
    };

    async clearAllChecking () {
        await link.clickOnTheLinkByName(linksNames.clearAll);
        await expect(await (await elementAttributes.getElementAttribute(resReqElements.viewResReqModalFileInput, 'value')).length)
            .toEqual(0);
    };

    public async fillRequireFields () {
        await allureStep('Fill require single Research Requests Fields', async () => {
            await Dropdown.openDropdownByClickOnElement(dropdownElements.modalDropdownToggle);
            await Dropdown.selectValueInDropDownByNumber(1);
            await input.fillFieldWithValue(resReqElements.reqInfoField, random.randomTextGenerator(10))
        });
    };

    public async resetClearAllChecking () {
        await link.clickOnTheLinkByName(linksNames.resetClearAllFields);
        await expect(await elementAttributes.getElementAttribute(resReqElements.firstStepInputs.first(), 'value'))
            .toEqual('Select value...');
        let result:number = await resReqElements.firstStepInputs.count();
        if(result>1) {
            for(let i=1; i<result;i++) {
                await expect(await elementAttributes.getElementAttribute(resReqElements.firstStepInputs.get(i), 'value'))
                    .toEqual('');
            }
        }
        await expect(await elementAttributes.getElementAttribute(resReqElements.reqInfoField, 'value'))
            .toEqual('');
    };

    public async openViewResReqModal() {
        await w.waitUntilWorkingModalNotDisplayed();
        await w.waitUntilElementIsDisplayed(gridElements.newGridCellWithoutContentByRowIndex(0).get(0));
        const ids:string[] = await grid.newGridReturnCellValuesByColumnName(0, 'Request ID');
        await modal.openModalWithLinkName(ids[0]);
        await w.waitUntilElementIsDisplayed(await gridElements.newGridModalUnlockedColumnHeaders.last());
        await expect(await modal.modalTitle.getText()).toEqual(modalTitles.viewResReqId(ids[0]))
    };

    public async goToTheNextTab (option) {
        await w.waitUntilWorkingModalNotDisplayed();
        await resReqElements.leftNavLinks.get(option).click();
        await w.waitUntilElementIsDisplayed(modal.modalBody);
        await w.waitUntilWorkingModalNotDisplayed();
        await expect(await elementAttributes.getElementAttribute(resReqElements.leftNavItems.get(option), 'class'))
            .toContain(fieldStatuses.active);
        await w.waitUntilWorkingModalNotDisplayed();
        await browser.sleep(1500);
    };

    public async largeTextAreaCounterChecking (num:number) {
        await w.waitUntilWorkingModalNotDisplayed();
        await browser.waitForAngularEnabled(false);
        const thousandAndOneChar:string = random.randomTextGenerator(1001);
        await resReqElements.textAreaComment.get(num).sendKeys(thousandAndOneChar);
        await expect(await resReqElements.textAreaCounter.get(num).getText()).toEqual('1000 of 1000 characters')
    };

    public async addComment() {
        await w.waitUntilWorkingModalNotDisplayed();
        const chars:string = random.randomTextGenerator(20);
        await resReqElements.textAreaComment.get(0).sendKeys(chars);
        await button.clickByButtonNameAndWait(buttonNames.submitComment,gridElements.gridWrapper);
        await w.waitUntilWorkingModalNotDisplayed();
        await w.waitUntilElementIsDisplayed(await gridElements.cellWithText(chars));
        await expect(await gridElements.cellWithText(chars).isPresent()).toBeTruthy();
    }

    async uploadFileChecking (fileName) {
        await w.waitUntilWorkingModalNotDisplayed();
        await input.uploadAFile(resReqElements.uploadInput,fileName);
        await expect((await elementAttributes.getElementAttribute(resReqElements.viewResReqModalFileInput,
            'value')).length).toBeGreaterThan(0)
    };
}