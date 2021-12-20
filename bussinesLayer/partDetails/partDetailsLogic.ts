import {Actions} from "../../utils/actions";
import {Button} from "../../components/simple/button";
import {buttonNames, linksNames, modalTitles } from "../../testData/global";
import {browser, by, element, ElementFinder} from "protractor";
import {
    commonElements,
    gridElements,
    partDetailsElements, quickSearchElements,
    resReqElements,
    searchElements
} from "../../elements/elements";
import {ElementAttributes} from "../../utils/elementAttributes";
import {File} from "../../utils/file";
import {Grid} from "../../components/grid";
import {Link} from "../../components/simple/link";
import {Modal} from "../../components/modal";
import {partDetailsData} from "../../testData/partDetails";
import {StringArray} from "../../utils/stringArray";
import {Toolbar} from "../../components/toolbar";
import {Waiters as w} from "../../helper/waiters";
import {allureStep} from "../../helper/allure/allureSteps";

const actions = new Actions();
const button: Button = new Button();
const elementAttributes = new ElementAttributes();
const file: File = new File();
const grid: Grid = new Grid();
const link = new Link();
const modal: Modal = new Modal();
const stringArray: StringArray = new StringArray();
const toolbar: Toolbar = new Toolbar();

export class PartDetailsLogic {

    public async iconTooltip(icon: any, expectedTooltip: string) {
        await actions.mouseMoveToElement(icon.first());
        await expect(await elementAttributes.getElementAttribute(icon.first(), 'title'))
            .toEqual(expectedTooltip);
    };

    public async exportDropdown() {
        await w.waitUntilElementIsClickable(modal.modalBody);
        await w.waitUntilElementIsClickable(toolbar.returnToolbarButton(buttonNames.export));
        await w.waitUntilElementIsClickable(link.returnElementByLinkName(partDetailsData.leftNav.itemManufacturer));
        await browser.sleep(1000);
        const leftNavItemsText: any = await partDetailsElements.sectionLeftNavItems.getText();
        let resArr: any = leftNavItemsText.map((num) => {
            return num.replace(/\(\d+\)/g, "");
        });
        for (let i = 0; i < resArr.length; i++) {
            if (resArr[i] == 'Manufacturer (None)') {
                resArr[i] = resArr[i].replace('(None)', '')
                console.log('4');
            }
            else if (resArr[i] === 'Manufacturer (Approval Required)') {
                resArr[i] = resArr[i].replace('(Approval Required)', '')
                console.log('5');
            }
            resArr[i] = ('Export ' + resArr[i].trim());
        }
        await toolbar.openToolbarDropdownByButtonName(buttonNames.export);
        const exportDropdownValues = await elementAttributes.getElementAttribute(partDetailsElements.exportDropdwonOptions,
            'value');
        let dropdownValues: any = exportDropdownValues.filter((number) => {
            return number.length > 1
        });
        await toolbar.closeToolbarDropdownByButtonName(buttonNames.export);
        await expect(dropdownValues).toEqual(resArr);
    };

    public async addDropdown() {
        await w.waitUntilElementIsClickable(toolbar.modalArrowToolbar.get(0));
        await browser.sleep(1500);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await expect(button.returnButtonByText(buttonNames.addToWorksapce).isDisplayed()).toBeTruthy();
        await expect(button.returnButtonByText(buttonNames.addToBoms).isDisplayed()).toBeTruthy();
        await toolbar.closeToolbarDropdownByButtonName(buttonNames.add);
    };

    public async addToBomModal() {
        await browser.sleep(1000);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await modal.openModalWithButtonByName(buttonNames.addToBoms);
        await w.waitUntilWorkingModalNotDisplayed();
        await w.waitUntilElementIsDisplayed(modal.returnModalTitleByName(modalTitles.addSelectedPartsToBom));
        await modal.checkModalTitleName(modalTitles.addSelectedPartsToBom, 1);
        await w.waitUntilWorkingModalNotDisplayed();
        await modal.closeModalWithXButton(modalTitles.addSelectedPartsToBom);
        await w.waitUntilElementNotDisplayed(modal.returnModalTitleByName(modalTitles.addSelectedPartsToBom));
    };

    public async goToViewAlternatesFromPartDetailsBoms() {
        let result = await button.returnButtonByText(buttonNames.viewAlternates).isEnabled();
        if (result) {
            await modal.openModalWithButtonByName(buttonNames.viewAlternates);
            const ipn: string = await partDetailsElements.partDetailsIPN.getText();
            await modal.checkModalTitleName(modalTitles.alternatesForPartNumber + ipn, 1);
            browser.sleep(2000) //remove after DE106005 will be fixed
            await modal.closeModalWithXButton(modalTitles.alternatesForPartNumber);
            await w.waitUntilElementIsClickable(partDetailsElements.titleWithIpn);
            await expect(await partDetailsElements.titleWithIpn.getText()).toEqual(modalTitles.partDetails[0]
                + ' ' + ipn);
        }
    };

    public async researchRequestModalChecking() {
        let ipn = await partDetailsElements.partDetailsIPN.getText();
        let mfr = await partDetailsElements.mfr.getText();
        await w.waitUntilWorkingModalNotDisplayed();
        await modal.openModalWithButtonByName(buttonNames.resRequest);
        await expect(await modal.severalModalTitles.get(1).getText()).toEqual(modalTitles.singleResReq);
        await expect(await elementAttributes.getElementAttribute(resReqElements.mfrPartNumberField, 'value'))
            .toEqual(ipn.trim());
        await expect(await elementAttributes.getElementAttribute(resReqElements.mfrNameField,
            'value')).toEqual(mfr.trim());
        await modal.closeModalWithXButton(modalTitles.singleResReq);
        await w.waitUntilElementNotDisplayed(modal.returnModalTitleByName(modalTitles.singleResReq));
    };


    public async checkBasicSection() {
        if (!(await partDetailsElements.disableTextLink('Basic').isPresent())) {
            await link.clickOnTheLinkByName('Basic');
            await w.waitUntilElementIsClickable(modal.modalBody);
            const basic: string[] = ['Active Generic', 'Active Mfrs', 'Available Inventory', 'Avg Price',
                'Avg Lead Time','CAGE Code', 'Description', 'ENV Risk', 'Generic/Series', 'LC Risk',
                'Manufacturer Package Description', 'Manufacturer Part Description', 'Mfr Name', 'Part Number',
                'Part Status', 'SC Risk', 'Temperature Grade', 'Total Inventory', 'Country of Origin'];
            const expectedBasic: any = await partDetailsElements.attributesLabels.getText();
            await stringArray.arrayContain(expectedBasic, basic);
        }
    };

    public async checkLifeCycleSection() {
        if (!(await partDetailsElements.disableTextLink('Life Cycle').isPresent())) {
            await link.clickOnTheLinksByNameAndIndex('Life Cycle', 0);
            await w.waitUntilElementIsClickable(modal.modalBody);
            const lifeCycle: string[] = ['Alert/Prediction Date', 'Availability(YTEOL)', 'Date of Intro',
                'Estimated YTEOL', 'Life Cycle Code', 'Comments', 'Life Cycle Stage'];
            const expectedLifeCycle: any = await partDetailsElements.attributesLabels.getText();
            await stringArray.arrayContain(expectedLifeCycle, lifeCycle);
        }
    };

    public async checkComplianceSection() {
        if (!(await partDetailsElements.disableTextLink('Compliance').isPresent())) {
            await link.clickOnTheLinksByNameAndIndex('Compliance', 0);
            await w.waitUntilElementIsClickable(modal.modalBody);
            const compliance: string[] = ['China RoHS Compliant', 'DLA Qualification', 'ECCN', 'ECCN Governance',
                'EU RoHS Compliant', 'EU RoHS Version', 'HTS Code', 'REACH Compliant', 'Candidate List Date', 'SB Code'];
            const expectedCompliance: any = await partDetailsElements.attributesLabels.getText();
            await stringArray.arrayContain(expectedCompliance, compliance);
        }
    };

    public async printModal(optionName: string = buttonNames.printPreviewAll,
                            printPreviewTitle: string = modalTitles.printPreview, numberOfModals: number = 1) {
        await toolbar.openToolbarDropdownByButtonName(buttonNames.print);
        await modal.openModalWithButtonByName(optionName);
        await expect(await modal.severalModalTitles.get(numberOfModals).getText()).toEqual(printPreviewTitle);
        await modal.closeModalWithXButton(printPreviewTitle);
    };

    public async checkPrintModalNotIncludeSegment(optionName: string, notIncludeSegment: string) {
        await toolbar.openToolbarDropdownByButtonName(buttonNames.print);
        await modal.openModalWithButtonByName(optionName);
        const modalTitleSegments: string[] = await modal.modalSegmentTitles.getText();
        await expect(modalTitleSegments.indexOf(notIncludeSegment) == -1);
        await modal.closeModalWithXButton(modalTitles.printPreview);
    };

    public async checkPrintModalIncludeTypeDistributors(optionName: string, expectedCountDistributors: number) {
        await toolbar.openToolbarDropdownByButtonName(buttonNames.print);
        await modal.openModalWithButtonByName(optionName);
        await w.waitUntilElementIsDisplayed(await partDetailsElements.printPreviewBodySegmentCharacteristics('Qty in Stock').get(0));
        const actualCountDistributors: ElementFinder [] = await partDetailsElements.printPreviewBodySegmentCharacteristics('Qty in Stock');
        await expect(actualCountDistributors.length).toEqual(expectedCountDistributors);
        await modal.closeModalWithXButton(modalTitles.printPreview);
    };

    public async checkPrintModalDistributorsPreamble(optionName: string, includeSegment: string [],
                                                     averagePrice: string, averageLeadTime: string) {
        await toolbar.openToolbarDropdownByButtonName(buttonNames.print);
        await modal.openModalWithButtonByName(optionName);
        await w.waitUntilElementIsClickable(await partDetailsElements.printPreviewBodySegmentCharacteristics('Qty in Stock').get(0));
        const modalSegmentPreambles: string[] = await modal.modalSegmentPreambles.getText();
        let numberPreamble: number;
        for (let i = 0; i < modalSegmentPreambles.length; i++) {
            if (modalSegmentPreambles[i].includes(includeSegment[0])) {
                numberPreamble = i;
            }
        }
        const distributorsPreamble: string[] = modalSegmentPreambles[numberPreamble].split('|');
        if(averagePrice!=='') {
            await expect(distributorsPreamble[0].trim()).toEqual(includeSegment[0] + averagePrice + includeSegment[1]);
        }
        if(averageLeadTime!=='') {
            await expect(distributorsPreamble[1].trim()).toEqual(includeSegment[2] + Math.ceil(Number(averageLeadTime)) + includeSegment[3]);
        }
        await modal.closeModalWithXButton(modalTitles.printPreview);
    };

    public async returnCellValuesByColumnNameAuthorizedDistributors(lockUnlockNumber: number, columnHeaderName: string): Promise<any []> {
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(lockUnlockNumber, columnHeaderName);
        const cellsInARow: number = await gridElements.newGridUnlockedColumnRowCellsWithContent(0).count();
        const allCells: number = await partDetailsElements.authorizedDistributorsRow(lockUnlockNumber).count();
        let cellAttributesArray: any = [];
        for (let i: number = colNumber - 1; i < allCells; i += cellsInARow) {
            cellAttributesArray.push(await partDetailsElements.authorizedDistributorsRow(lockUnlockNumber).get(i).getText());
        }
        return cellAttributesArray;
    };

    public async calculateAverageValue(columnName: string, characters: number) {
        let averageValue: string='';
        await allureStep(`return average value by ${columnName}`, async () => {
            let allValues: any = await grid.newGridReturnCellValuesInModalByColumnName(1, columnName);
            let flag:any = false;
            for(let i=0;i<allValues.length;i++){
                if(!(allValues[i] === ""))
                        flag= true;
                }
            if(flag==true) {
                allValues = await allValues.filter((item) => {
                    return parseFloat(item) > 0
                });
                const filteredValues = allValues.map(item => parseFloat(item));
                let sumValues = await filteredValues.reduce((sum, current) => {
                    return sum + current;
                });
                averageValue = ((sumValues / allValues.length).toFixed(characters)).toString();
                while (averageValue.slice(-2, -1) === '0' || '') {
                    console.log('lastCharacter = ' + averageValue.slice(0, -1));
                    averageValue = await averageValue.slice(0, -1);
                }
            }
        });
        return averageValue;
    };

    public async checkPrintDropdownOptions(notIncludeOptionName: string) {
        await toolbar.openToolbarDropdownByButtonName(buttonNames.print);
        const modalTitleSegments: string[] = await elementAttributes.getElementAttribute(partDetailsElements.dropdownItems.getText(),
            'value');
        await expect(modalTitleSegments.indexOf(notIncludeOptionName) == -1);
        await toolbar.closeToolbarDropdownByButtonName(buttonNames.print);
    };

    private async _printPreviewItem(item: number) {
        await toolbar.openToolbarDropdownByButtonName(buttonNames.print);
        let result: any = await elementAttributes.getElementAttribute(partDetailsElements.dropdownItems.get(item),
            'value');
        let result1 = result.split(' ');
        result1.shift();
        result1 = result1.join(' ');
        if (result1 === 'Manufacturing') {
            result1 = 'MANUFACTURER'
        }
        else if (result1 === 'Corporate Part Number(s)') {
            result1 = 'CORPORATE PART'
        }
        else if (result1 === 'DRC/Prop65') {
            result1 = 'PROP 65'
        }
        else if (result1 === 'Pricing and Availability') {
            result1 = 'Distributors Information'
        }
        await modal.openModalWithElement(partDetailsElements.dropdownItems.get(item), 1);
        await w.waitUntilElementIsClickable(partDetailsElements.printPreviewSectionTitle.get(0));
        await expect(partDetailsElements.printPreviewBody.get(0).isPresent()).toBeTruthy('there is no body');
        await browser.sleep(1000);
        let value = await partDetailsElements.printPreviewSectionTitle.get(0).getText();
        await expect(value.toString().toUpperCase()).toContain(result1.toUpperCase());
        await modal.closeModalWithXButton(modalTitles.printPreview);
    };

    async checkingPrintPreviewModals() {
        await toolbar.openToolbarDropdownByButtonName(buttonNames.print);
        const result = await partDetailsElements.dropdownItems.count();
        await toolbar.closeToolbarDropdownByButtonName(buttonNames.print);
        for (let i = 1; i < result; i++) {
            await this._printPreviewItem(i)
        }
    };

    public async searchByExample() {
        await w.waitUntilDomIsReady();
        await w.waitUntilElementIsDisplayed(await button.returnButtonByText(buttonNames.searchByExample));
        await w.waitUntilElementIsClickable(await button.returnButtonByText(buttonNames.searchByExample));
        await button.clickByButtonName(buttonNames.searchByExample);
        await w.waitUntilElementIsClickable(searchElements.parametric.attribute.get(0));
        await expect(browser.getCurrentUrl()).toContain("/search/parametric");
    };

    async tooltipMessageCheckingByName(linkName: string) {
        await link.clickOnTheLinkByNameAndWaitForElement(linkName, commonElements.popoverContent.first());
    };

    async tooltipMessageCheckingByElement(linkElement: ElementFinder) {
        await actions.mouseMoveToElementAndWaitForTooltip(linkElement, commonElements.popoverContent.first());
    };

    public async linksChecking() {
        await w.waitUntilElementIsClickable(partDetailsElements.cell.get(1));
        const result = await partDetailsElements.cell.count();
        const result1 = await partDetailsElements.cell.all(by.css('a')).count();
        await expect(result1).toEqual(result / 3)
    };

    async refDesignUrlLinks() {
        await w.waitUntilElementIsClickable(partDetailsElements.cell.get(0));
        const refDesignUrlValues: string[] = await grid.newGridReturnCellValuesInModalByColumnName(1,
            'Reference Design URL');
        const result: string[] = await grid.newGridReturnCellValuesInModalByColumnName(1,
            'Part Number');
        await expect(refDesignUrlValues.length).toBeGreaterThan(0);
        await expect(refDesignUrlValues.length).toEqual(result.length);
    };

    public async sortingForColumnHeader(columnNumber, sortValue) {
        await partDetailsElements.columnHeadersElem.get(columnNumber).click();
        await w.waitUntilElementIsDisplayed(gridElements.newGridOpenSortBox);
        await w.waitUntilElementIsClickable(gridElements.newGridOpenSortBox);
        await expect(await element(by.css('.modal-body .ag-menu'))
            .isPresent()).toBe(true);
    };

    async openPartDetModalLink(locked: number, linkNumber: number) {
        let result = await gridElements.rowCellsWithContent(locked, 0).get(linkNumber).getText();
        await browser.waitForAngularEnabled(false);
        await modal.openModalWithLinkName(result);
        await w.waitUntilElementIsClickable(partDetailsElements.titleWithIpn);
        await w.waitUntilWorkingModalNotDisplayed();
        await expect(await partDetailsElements.titleWithIpn.getText()).toContain('Part Details for Part Number: '
            + result);
        await w.waitUntilWorkingModalNotDisplayed();
    };

    async openPartDetModalLinkNewGrid(locked: number, linkNumber: number) {
        let result:string;
        if(locked===0) {
            result = await gridElements.newGridLockedColumnRowCellsWithContent(0).get(linkNumber).getText();
        }
        else {
            result = await gridElements.newGridUnlockedColumnRowCellsWithContent(0).get(linkNumber).getText();
        }
        await browser.waitForAngularEnabled(false);
        await modal.openModalWithLinkName(result);
        await w.waitUntilElementIsClickable(partDetailsElements.titleWithIpn);
        await w.waitUntilWorkingModalNotDisplayed();
        await expect(await partDetailsElements.titleWithIpn.getText()).toContain('Part Details for Part Number: '
            + result);
        await w.waitUntilWorkingModalNotDisplayed();
    };

    async newGridOpenPartDetModalLink() {
        const text: string = await gridElements.newGridModalLockColumnLinks.get(0).getText();
        await modal.openModalWithLinkName(text);
        await w.waitUntilElementIsClickable(partDetailsElements.titleWithIpn);
        await expect(await partDetailsElements.titleWithIpn.getText()).toContain('Part Details for Part Number: '
            + text);
    };

    async openPartDetModalLinkAndSetPNNewGrid(locked: number, linkNumber: number, lockedPN: number, linkNumberPN: number) {
        let linkName: string;
        let result:string;
        if(locked===0) {
            linkName = await gridElements.newGridLockedColumnRowCellsWithContent(1).get(linkNumber).getText();
            result = await gridElements.newGridLockedColumnRowCellsWithContent(1).get(linkNumberPN).getText();
        }
        else {
            linkName = await gridElements.newGridUnlockedColumnRowCellsWithContent(1).get(linkNumber).getText();
            result = await gridElements.newGridLockedColumnRowCellsWithContent(0).get(linkNumberPN).getText();
        }
        await modal.openModalWithLinkName(linkName);
        await w.waitUntilElementIsDisplayed(partDetailsElements.titleWithIpn);
        await expect(await partDetailsElements.titleWithIpn.getText()).toContain('Part Details for Part Number: '
            + result);
    };

    async newGridOpenPartDetModalFromIpnLinkInSearch() {
        const cellNumber: number = await grid.newGridReturnColumnNumberByColumnName(0,
            'Part Number');
        const linkName: string = await gridElements.newGridLockedColumnRowCellsWithContent(0).get(cellNumber).getText();
        await modal.openModalWithLinkName(linkName);
        await w.waitUntilElementIsDisplayed(partDetailsElements.titleWithIpn);
        await expect(await partDetailsElements.titleWithIpn.getText()).toContain('Part Details for Part Number: '
            + linkName);
    };

    async newGridOpenPartDetModalFromMatchedPNLinkInSearch() {
        const cellNumber: number = await grid.newGridReturnColumnNumberByColumnName(1,
            'Matched P/N');
        const linkName: string = await gridElements.newGridUnlockedColumnRowCellsWithContent(0).get(cellNumber).getText();
        await modal.openModalWithLinkName(linkName);
        await w.waitUntilElementIsDisplayed(partDetailsElements.titleWithIpn);
        await expect(await partDetailsElements.titleWithIpn.getText()).toContain('Part Details for Part Number: '
            + linkName);
    };

    async newGridOpenPartDetModalFromMfrNameLinkInSearch() {
        const cellNumber: number = await grid.newGridReturnColumnNumberByColumnName(0,
            'Mfr Name');
        const cellNumberIpn: number = await grid.newGridReturnColumnNumberByColumnName(0,
            'Part Number');
        const ipn: string = await gridElements.newGridLockedColumnRowCellsWithContent(0).get(cellNumberIpn).getText();
        const linkName: string = await gridElements.newGridLockedColumnRowCellsWithContent(0).get(cellNumber).getText();
        await modal.openModalWithElement(await gridElements.newGridLockedColumnLinksByRowAndCellNumbers(0, cellNumber).get(0));
        await w.waitUntilElementIsDisplayed(partDetailsElements.titleWithIpn);
        await w.waitUntilElementIsDisplayed(partDetailsElements.activeLeftNav);
        await expect(await partDetailsElements.titleWithIpn.getText()).toContain('Part Details for Part Number: '
            + ipn);
    };

    async newGridOpenPartDetModalFromMatchedMfrLinkInSearch() {
        const cellNumber: number = await grid.newGridReturnColumnNumberByColumnName(1,
            'Matched Mfr');
        const cellNumberIpn: number = await grid.newGridReturnColumnNumberByColumnName(1,
            'Matched P/N');
        const ipn: string = await gridElements.newGridUnlockedColumnRowCellsWithContent(0).get(cellNumberIpn).getText();
        const linkName: string = await gridElements.newGridUnlockedColumnRowCellsWithContent(0).get(cellNumber).getText();
        await modal.openModalWithLinkName(linkName);
        await w.waitUntilElementIsDisplayed(partDetailsElements.titleWithIpn);
        await expect(await partDetailsElements.titleWithIpn.getText()).toContain('Part Details for Part Number: '
            + ipn);
        await w.waitUntilElementIsClickable(partDetailsElements.activeLeftNav);
    };

    async newGridOpenPartDetModalFromActiveGenericMfrLinkInSearch(columnName: string) {
        const cellNumber: number = await grid.newGridReturnColumnNumberByColumnName(1,
            columnName);
        const values: string[] = await grid.newGridReturnCellValuesByColumnName(1, columnName);
        for (let i: number = 0; i < values.length; i++) {
            if (values[i].length > 0) {
                await modal.openModalWithLinkName(values[i]);
                await w.waitUntilElementIsDisplayed(partDetailsElements.titleWithIpn);
                await expect(await partDetailsElements.titleWithIpn.getText()).toContain('Part Details for Part Number:');
                break
            }
        }
    };

    public async openTransferredLink() {
        await w.waitUntilElementIsClickable(link.returnElementByLinkName(linksNames.transferred));
        await link.clickOnTheLinkByNameAndWaitForElement(linksNames.transferred, modal.modalTitle);
        await w.waitUntilElementIsClickable(partDetailsElements.titleWithIpn);
        await expect(await partDetailsElements.titleWithIpn.getText()).toContain('Part Details for Part Number: ');
    }

    public async checkExport(optionName: string, findElement: string) {
        await link.clickOnTheLinkByName(partDetailsData.leftNav.itemPartDetails);
        let fileName: string;
        const penultimateValue = await partDetailsElements.cell.getText();
        if (!penultimateValue.includes(findElement)) {
            await grid.scrollGrid(0, findElement);
        }
        if (optionName.includes('Manufacturer')) {
            fileName = await partDetailsElements.cell.last().getText() + '-mfr.XLS';
        }
        else {
            fileName = await partDetailsElements.cell.last().getText() + '.XLS';
        }
        await toolbar.openToolbarDropdownByButtonName(buttonNames.export);
        await button.clickByButtonName(optionName);
        await file.checkNameDownloadsFile(fileName);
    }

    public async switchAuthorizedDistributorsLinkByName(initialLink: string, resultLink: string) {
        await allureStep('Click on the ' + initialLink + ' link and check that it is changing to the '
            + resultLink + ' link', async () => {
            await link.clickOnTheLinkByNameAndWaitForElement(initialLink, modal.modalBodyGrid);
            await w.waitUntilWorkingModalNotDisplayed();
            await expect(await link.returnElementByLinkName(resultLink).isDisplayed()).toBeTruthy();
        });
    }

    public async switchTransposeButton() {
        await allureStep('transpose button switch', async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            await button.clickOnTheElement(partDetailsElements.transposeButton);
            await w.waitUntilWorkingModalNotDisplayed();
        });
    }

    public async verifyESDModalToolTipDisplayed() {
        await allureStep('Verify ESD POP-Over tooltip is displayed', async () => {
            await browser.sleep(5000);
            await w.waitUntilElementIsClickable(partDetailsElements.elementsWithText('Environmental / Material'));
            await button.clickOnTheElement(partDetailsElements.elementsWithText('Environmental / Material'));
            await browser.sleep(1000);
            await w.waitUntilElementIsClickable(partDetailsElements.elementsWithText('Manufacturing'));
            await button.clickOnTheElement(partDetailsElements.elementsWithText('Manufacturing'));
            await browser.sleep(1000);
            await w.waitUntilElementIsClickable(partDetailsElements.ESDValueElement);
            await button.clickOnTheElement(partDetailsElements.ESDValueElement);
            await actions.mouseMoveToElementAndWaitForTooltip(partDetailsElements.ESDValueElement,commonElements.popoverContent.first())
            expect(await commonElements.popoverContent.first().isDisplayed()).toBeTruthy();
        });
    }
    public async verifyESDModalToolTipContent() {
        await allureStep('Verify ESD POP-Over tooltip contents are proper', async () => {
            expect(await partDetailsElements.ESDPopOver.isDisplayed()).toBeTruthy();
            let popOverRow:ElementFinder[] = await partDetailsElements.popOverRows;
            for(let i =0; i<popOverRow.length;i++){
                expect(popOverRow[i].getText()).toEqual(partDetailsData.ESDRows[i]);
            }
            expect(await partDetailsElements.popOverRowsinfo.getText()).toEqual(partDetailsData.ESDRows[popOverRow.length])
        });
    }
    public async openModalAndVerifySectionOpened(element: ElementFinder, sectionName:string) {
        await allureStep(`Click on button and verify ${sectionName} section is opened in part details modal.`, async () => {
            await modal.openModalWithElement(element);
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsDisplayed(partDetailsElements.activeLeftNav);
            expect(await partDetailsElements.activeLeftNav.getText()).toContain(sectionName);
        });
    }

    public async returnAttributeValues(attributeName: string) {
        let value:string='';
        await allureStep(`Return value for attribute name: ${attributeName} inside part details modal.`, async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsDisplayed(await partDetailsElements.allAttributesCells.first());
            for(let i:number=0; i< (await partDetailsElements.allAttributesCells.count()); i++){
                if((await partDetailsElements.cellAttributevalues(i).get(0).getText())===attributeName){
                    value =  await partDetailsElements.cellValues(i).getText();
                }
            }
        });
        return value;
    }

    public async verifyCEYTOELValueInPartDetailsPage(EYTEOL:string,CEYTEOL:string,AlertPrediction:string) {
        await allureStep(`verify the CEYTEOL available inside part details modal is calculated properly`, async() => {
            let APDate = new Date(AlertPrediction);
            let today = new Date();
            let calculatedDate:number =  Math.floor((Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) - Date.UTC(APDate.getFullYear(), APDate.getMonth(), APDate.getDate()) ) /(1000 * 60 * 60 * 24));
            let calculatedCEYTEOL:number =  parseInt(EYTEOL)-(calculatedDate/365);
            expect(parseFloat(CEYTEOL)).toEqual(parseFloat(calculatedCEYTEOL.toFixed(1)));
        });
    };
}