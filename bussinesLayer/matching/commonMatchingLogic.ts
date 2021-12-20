import {element, by, browser} from "protractor";
import {commonElements, gridElements, matchingElements, shadeElements, modalElements} from "../../elements/elements";
import {cplData} from "../../testData/cpl";
import {ElementAttributes} from "../../utils/elementAttributes";
import {Input} from "../../components/simple/input";
import {Link} from "../../components/simple/link";
import {Modal} from "../../components/modal";
import {Button} from "../../components/simple/button";
import {Grid, Transpose} from "../../components/grid";
import {buttonNames} from "../../testData/global";
import {TypeAhead} from "../../components/typeAhead";
import {Shade} from "../../components/shade";
import {Waiters as w} from "../../helper/waiters";
import {commonSearch} from "../../testData/search";
import {allureStep} from "../../helper/allure/allureSteps";
import {Toolbar} from "../../components/toolbar";

const button: Button = new Button();
const grid: Grid = new Grid();
const elementAttributes: ElementAttributes = new ElementAttributes();
const input: Input = new Input();
const link: Link = new Link();
const modal: Modal = new Modal();
const typeAhead: TypeAhead = new TypeAhead();
const transpose: Transpose = new Transpose();
const toolbar: Toolbar = new Toolbar();

export class CommonMatchingLogic {


    public async partsLinksChecking () {
        let result: number = await gridElements.cellLocked.count();
        for(let i: number = 2; i < result; i=i+3) {
            let value = await gridElements.cellLocked.get(i).getText();
            if(parseInt(value) > 0){
                await expect( await gridElements.cellLockedLinkInCell(i).isPresent()).toBe(true);
            }
        }
    };

    public async newGridPartsLinksChecking () {
        await allureStep(`check parts link on new grid`, async () =>{
            const result: string[] = await grid.newGridReturnCellValuesByColumnName(0, 'Number of Parts');
            for(let i: number = 0; i < result.length; i++) {
                if(parseInt(result[i]) > 0){
                    await expect( await gridElements.newGridLockedColumnRowCellsWithContent(i).get(1).isPresent()).toBe(true);
                }
            }
        });
    };

    public async newGridOpenBomPartsModal (title:string) {
        await allureStep(`open bom parts modal with first link`, async ()=> {
            const result: string[] = await grid.newGridReturnCellValuesByColumnName(0, 'Number of Parts');
            for(let i: number = 0; i < result.length; i++) {
                if(parseInt(result[i]) > 0){
                    const mfrName: string[] = await grid.newGridReturnCellValuesByColumnName(0, 'Imported Manufacturer Name');
                    await modal.openModalWithLinkName(result[i]);
                    await expect(await modal.modalTitle.getText()).toEqual(title+ mfrName[i]);
                    await w.waitUntilElementIsClickable(modal.modalGridCounter);
                    await browser.sleep(2000);
                    await expect(await modal.modalGridCounter.getText()).toContain('of ' + result[i] + ' items');
                    break
                }
            }
        });
    };

    public async newGridOpenBomPartsModalCPL (title:string) {
        await allureStep(`open bom parts modal with first link`, async ()=> {
            let result: string[] = await grid.newGridReturnCellValuesByColumnName(0, '# Parts');
            for(let i: number = 0; i < result.length; i++) {
                if(parseInt(result[i]) > 0){
                    let mfrName: string[] = await grid.newGridReturnCellValuesByColumnName(0, 'Imported Mfr Name');
                    await modal.openModalWithLinkName(result[i]);
                    await expect(await modal.modalTitle.getText()).toEqual(title+ mfrName[i]);
                    await w.waitUntilElementIsClickable(modal.modalGridCounter);
                    await browser.sleep(2000);
                    await expect(await modal.modalGridCounter.getText()).toContain('of ' + result[i] + ' items');
                    break
                }
            }
        });
    };

    private async _newGridHighlightChecking() {
        await allureStep(`check highlight in row`, async ()=>{
            await w.waitUntilElementIsClickable(await gridElements.newGridCellWithoutContentByRowIndex(0).get(1));
            // temp disabled untill defect fix;
            // let lockedCell: number = await gridElements.newGridLockedCellWithoutContentByRowIndex(0).count();
            // for( let i: number = 0; i < lockedCell; i++) {
            //     await expect(await elementAttributes.getElementAttribute(await gridElements.newGridLockedCellWithoutContentByRowIndex(0).get(i),
            //         'style')).toContain('background-color: rgb(207, 227, 194)');
            //     await console.log(await elementAttributes.getElementAttribute(await gridElements.newGridLockedCellWithoutContentByRowIndex(0).get(i),
            //         'style'))
            // }
            let unlockedCell:number = await gridElements.newGridUnlockedCellWithoutContentByRowIndex(0).count();
            for( let i: number = 0; i < unlockedCell; i++) {
                await expect(await elementAttributes.getElementAttribute(gridElements.newGridUnlockedCellWithoutContentByRowIndex(0).get(i),
                    'style')).toContain('background-color: rgb(207, 227, 194)')
            }
        });
    };

    private async _newGridHighlightCheckingBom() {
        await allureStep(`check highlight in bom in row`, async ()=>{
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsClickable(await gridElements.newGridUnlockedCellWithoutContentByRowIndex(0).get(0));
            const unlockedCell: number = await gridElements.newGridUnlockedCellWithContentByRowIndex(0).count();
            for( let i: number = 0; i < unlockedCell; i++) {
                await expect(await elementAttributes.getElementAttribute(await gridElements.newGridUnlockedCellWithoutContentByRowIndex(0).get(i),
                    'style')).toContain('background-color: rgb(207, 227, 194)')
            }
        });
    };

    private async selectHighlight(bom:boolean) {
        await browser.sleep(1000);
        await w.waitUntilWorkingModalNotDisplayed();
        if (bom) {
            await this._newGridHighlightCheckingBom();
        }
        else {
            await this._newGridHighlightChecking();
        }
    };

    private async newGridSelectHighlight(bom:boolean) {
        await allureStep(`select highlight`, async ()=>{
            await browser.sleep(1500);
            await w.waitUntilWorkingModalNotDisplayed();
            if (bom) {
                await this._newGridHighlightCheckingBom();
            }
            else {
                await this._newGridHighlightChecking();
            }
        })
    };

    public async notLinksInModalChecking () {
        let value = await modal.modalBodyCells.count();
        for (let i=0; i<value; i++) {
            await expect(await modal.modalBodyCells.get(i).element(by.css('a')).isPresent()).toBe(false)
        }
    };

    public async openViewAllSuggestMatchesShade() {
        await allureStep(`open View Suggest Match shade`, async ()=>{
        await browser.waitForAngularEnabled(false);
        await w.waitUntilElementIsClickable(gridElements.newGridRows.get(0));
        const mfrName: string[]= await gridElements.newGridLockedColumnRowCellsWithContent(0).get(0).getText();
        const linkName:string = await gridElements.newGridUnlockedCellWithContentByRowIndex(0).get(0).getText();
        await Shade.openShadeWithLinkByRow(linkName);
        await w.waitUntilElementIsClickable(shadeElements.shadeCounterNewGrid);
        let number:string[] = linkName.split(' ');
        await expect(await shadeElements.shadeCounterNewGrid.getText()).toContain('of '+number[2]+' items');
        await expect(await matchingElements.viewSuggestedMatchShadeHeader.getText())
            .toEqual('The following is a list of all suggested Matching Manufacturers for '+ mfrName+'. Select 1 from the list.')
        });
    };

    public async openViewAllSuggestMatchesModal() {
        await allureStep(`open View Suggest Match modal`, async ()=>{
            await w.waitUntilWorkingModalNotDisplayed();
            let mfrName: string[] = await grid.newGridReturnCellValuesByColumnName(0,'Imported Manufacturer Name');
            let linkName:string[] = await grid.newGridReturnCellValuesByColumnName(1, 'Matched Manufacturer Name');
            await modal.openModalWithElement(await gridElements.newGridCellLinkByRowIndexAndCellNumber(0,2));
            await expect(await modal.modalTitle.getText()).toEqual('View Suggested Matching Manufacturers');
            let number:string[] = linkName[0].split(' ');
            await expect(await modal.modalGridCounter.getText()).toContain('of '+number[2]+' items');
            await expect(await matchingElements.viewSuggestedMatchModalSubtitle.getText())
                .toEqual('The following is a list of all suggested Matching Manufacturers for '+ mfrName[0]+'. Select 1 from the list.')
        });
    };

    public async openViewAllSuggestMatchesModalParts() {
        await w.waitUntilElementIsClickable(gridElements.newGridCellWithoutContentByRowIndex(0).get(0));
        const partNumber:string= await gridElements.newGridLockedCellWithContentByRowIndex(0).get(0).getText();
        const mfrName:string = await gridElements.newGridUnlockedCellWithContentByRowIndex(0).get(0).getText();
        const linkName:string = await gridElements.newGridLockedCellWithContentByRowIndex(0).get(1).getText();
        await modal.openModalWithElementAndWait(gridElements.newGridLockedCellWithContentByRowIndex(0).get(1), modalElements.text);
        await w.waitUntilWorkingModalNotDisplayed();
        await browser.sleep(2000);
        await expect(await modal.modalTitle.getText()).toEqual('View Suggested Matches');
        if(linkName!=='View All Suggested Matches') {
            const number:string[] = linkName.split(' ');
            await expect(await modal.modalGridCounter.getText()).toContain('of '+number[1]+' items');
        }
        if(mfrName.length === 0) {
            await expect(await matchingElements.viewSuggestedMatchModalSubtitle.getText())
                .toEqual('The following is a list of suggested manufacturer parts for Imported P/N: '+ partNumber+
                    '. Please select one from this list if acceptable or you can select the button "Search for Matching Parts" to see if there are additional parts available.')
        }
        else {
            await expect(await matchingElements.viewSuggestedMatchModalSubtitle.getText())
                .toEqual('The following is a list of suggested manufacturer parts for Imported P/N: '+ partNumber+
                    ' and Imported Mfr Name: ' + mfrName + '. Please select one from this list if acceptable or you can select the button "Search for Matching Parts" to see if there are additional parts available.')
        }
    };

    public async openViewAllSuggestMatchesShadeParts() {
        await w.waitUntilElementIsClickable(gridElements.newGridCellWithoutContentByRowIndex(0).get(0));
        const importedMfrPart:string= await gridElements.newGridLockedCellWithContentByRowIndex(0).get(0).getText();
        const importedMfrName:string = await gridElements.newGridUnlockedCellWithContentByRowIndex(0).get(0).getText();
        const linkName:string = await gridElements.newGridLockedCellWithContentByRowIndex(0).get(1).getText();
        await modal.openModalWithElementAndWait(gridElements.newGridLockedCellWithContentByRowIndex(0).get(1), matchingElements.viewSuggestedMatchShadeHeader);
        await w.waitUntilElementIsClickable(gridElements.newGridCellWithoutContentByRowIndex(0).get(0));
        await w.waitUntilWorkingModalNotDisplayed();
        await browser.sleep(2000);
        const number:string[] = linkName.split(' ');
        await expect(await shadeElements.shadeCounterNewGrid.getText()).toContain('of '+number[1]+' items');
        if(importedMfrName.length<=1) {
            await expect(await matchingElements.viewSuggestedMatchShadeHeader.getText())
                .toEqual('The following is a list of suggested manufacturer parts for ' +
                    'Imported P/N: '+importedMfrPart+' . Please select' +
                    ' one from this list if acceptable or you can select the button "Search for Matching Parts" ' +
                    'to see if there are additional parts available.')
        }
        else {
            await expect(await matchingElements.viewSuggestedMatchShadeHeader.getText())
                .toEqual('The following is a list of suggested manufacturer parts for ' +
                    'Imported P/N: '+importedMfrPart+' and Imported Mfr Name: '+importedMfrName+' . Please select' +
                    ' one from this list if acceptable or you can select the button "Search for Matching Parts" ' +
                    'to see if there are additional parts available.')
        }

    };

    public async applyMatchAndHighlight(buttonName: string = buttonNames.applySelectedManufacturerMarch, bom:boolean) {
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await Shade.closeShadeWithButton(buttonName);
        await w.waitUntilWorkingModalNotDisplayed();
        await this.newGridSelectHighlight(bom);
    };

    public async verifySelectedMatchHighlight() {
        await w.waitUntilWorkingModalNotDisplayed();
        await this.newGridSelectHighlight(false);
    };

    //delete after convert cplMatchPart, CplMatchMfr and matchMfr View Suggested MFR in new Grid
    public async applyMatchAndHighlightForMatchPart(buttonName: string = buttonNames.applySelectedManufacturerMarch, bom:boolean) {
        await grid.newMechanismModalCheckboxRangeChecking(0,1);
        await Shade.closeShadeWithButton(buttonName);
        await w.waitUntilWorkingModalNotDisplayed();
        await this.selectHighlight(bom);
    };

    public async newGridApplyMatchAndHighlight(buttonName: string = buttonNames.applySelectedManufacturerMarch, bom:boolean) {
        await allureStep(`apply match modal and highlight it`, async ()=> {
            await grid.newMechanismCheckboxRangeChecking(0, 1);
            await Shade.closeShadeWithButton(buttonName);
            await w.waitUntilWorkingModalNotDisplayed();
            await this.newGridSelectHighlight(bom);
        });
    };

    public async notLeaveWithoutSaveChangesAcceptModal() {
        await modal.openModalWithLinkName('Attributes');
        await expect(await modal.modalTitle.getText()).toEqual('Leave this page?');
        const modalText = 'You have accepted matches but have not saved them yet. Are you sure you want to leave without saving your changes?';
        let result:string = await modal.modalBody.getText();
        let temp:string  = result.replace(/\n/g, " ");
        await expect(temp).toEqual(modalText);
        await modal.closeModalWithXButton();
        await modal.openModalWithLinkName('Attributes');
        await modal.closeModalWithButton(buttonNames.returnToMatching);
    };

    public async leaveWithoutSaveChanges() {
        await modal.openModalWithLinkName('Attributes');
        await modal.closeModalWithButton(buttonNames.discardChanges);
    };

    public async saveChangesForViewSuggestAcceptMatch() {
        await modal.closeModalIfPresent();
        await w.waitUntilWorkingModalNotDisplayed();
        let mfrName:string= await gridElements.newGridLockedColumnRowCellsWithContent(0).get(0).getText();
        let matchMfrName:string= await gridElements.newGridUnlockedCellWithContentByRowIndex(0).get(0).getText();
        let matchFullName:string= await gridElements.newGridUnlockedCellWithContentByRowIndex(0).get(1).getText();
        await modal.openModalWithButtonByName(buttonNames.saveChanges);
        await grid.newGridCheckingColumnHeadersInModal([ 'Imported Mfr Name', 'Matched Mfr Name', 'Matched Mfr Name (Full)']);
        await expect(await modal.modalBodyCells.getText()).toEqual([mfrName, matchMfrName, matchFullName]);
    };

    public async newGridsaveChangesForViewSuggestAcceptMatch() {
        await allureStep(`save change for View Suggested accept match`, async ()=>{
            await modal.closeModalIfPresent();
            await w.waitUntilWorkingModalNotDisplayed();
            let mfrName:string[] = await grid.newGridReturnCellValuesByColumnName(0,'Imported Manufacturer Name');
            let matchMfrName:string[]= await grid.newGridReturnCellValuesByColumnName(1,'Matched Manufacturer Name');
            let matchFullName:string[]= await grid.newGridReturnCellValuesByColumnName(1,'Manufacturer Full Name');
            await modal.openModalWithButtonByName(buttonNames.saveChanges);
            const actualHeaders: string[] = await grid.newGridGetVisibleColumnHeaders();
            await transpose.checkingArrayContainSecondArray([ 'Imported Mfr Name', 'Matched Mfr Name', 'Matched Mfr Name (Full)'],
                actualHeaders);
            await expect(await modal.modalBodyCells.getText()).toEqual([mfrName[0], matchMfrName[0], matchFullName[0]]);
        });
    };

    public async newGridSaveChangesForViewSuggestAcceptMatch() {
        await allureStep(`save change for View Suggested accept match`, async ()=>{
            await modal.closeModalIfPresent();
            await w.waitUntilWorkingModalNotDisplayed();
            const mfrName:string[] = await grid.newGridReturnCellValuesByColumnName(0,'Imported Mfr Name');
            const matchMfrName:string[]= await grid.newGridReturnCellValuesByColumnName(1,'Matched Manufacturer Name');
            const matchFullName:string[]= await grid.newGridReturnCellValuesByColumnName(1,'Manufacturer Full Name');
            await modal.openModalWithButtonByName(buttonNames.saveChanges);
            const actualHeaders: string[] = await grid.newGridGetVisibleColumnHeaders();
            await transpose.checkingArrayContainSecondArray([ 'Imported Mfr Name', 'Matched Mfr Name', 'Matched Mfr Name (Full)'],
                actualHeaders);
            await expect(await modal.modalBodyCells.getText()).toEqual([mfrName[0], matchMfrName[0], matchFullName[0]]);
        });
    };

    public async saveChangesForViewSuggestAcceptMatchParts() {
        await modal.closeModalIfPresent();
        await w.waitUntilWorkingModalNotDisplayed();
        let importedMfrPart:string= await gridElements.newGridLockedColumnRowCellsWithContent(0).get(0).getText();
        let importedMfrName:string= await gridElements.newGridUnlockedCellWithContentByRowIndex(0).get(0).getText();
        let matchFullName:string= await gridElements.newGridUnlockedCellWithContentByRowIndex(0).get(1).getText();
        let matchedPN:string= await gridElements.newGridLockedColumnRowCellsWithContent(0).get(1).getText();
        await grid.newGridHideColumnByName('Imported Manufacturer Name');
        let corpPartNumber: string = await gridElements.newGridUnlockedCellWithContentByRowIndex(0).get(6).getText();
        let corpMfrName: string = await gridElements.newGridUnlockedCellWithContentByRowIndex(0).get(5).getText();
        await toolbar.unhideCellNameWithUnhideAll('Imported Manufacturer Name');
        await modal.openModalWithButtonByName(buttonNames.saveChanges);
        await grid.newGridCheckingColumnHeadersInModal([ 'Imported Mfr P/N', 'Imported Mfr Name',
            'Corporate P/N', 'Corporate Mfr Name', 'Matched Mfr P/N', 'Matched Mfr Name' ]);
        await expect(await modal.modalBodyCells.getText()).toEqual([importedMfrPart, importedMfrName,
            corpPartNumber, corpMfrName, matchedPN, matchFullName]);
    };

    public async saveChangesForViewSuggestAcceptBomMatchParts() {
        let importedPartNumber:string= await gridElements.newGridLockedCellWithContentByRowIndex(0).get(0).getText();
        let importedMfrName:string= await gridElements.newGridUnlockedCellWithContentByRowIndex(0).get(0).getText();
        let matchMfr: string = await gridElements.newGridUnlockedCellWithContentByRowIndex(0).get(1).getText();
        let matchPartNumber: string = await gridElements.newGridLockedCellWithContentByRowIndex(0).get(1).getText();
        await w.waitUntilWorkingModalNotDisplayed();
        await modal.openModalWithButtonByName(buttonNames.saveChanges);
        const actualHeaders: string[] = await grid.newGridGetVisibleColumnHeaders();
        await transpose.checkingArrayContainSecondArray([ 'Imported Mfr P/N', 'Imported Mfr Name', 'Matched Mfr P/N', 'Matched Mfr Name'],
            actualHeaders);
        await expect(await modal.modalBodyCells.get(0).getText()).toEqual(importedPartNumber);
        await expect(await modal.modalBodyCells.get(1).getText()).toEqual(importedMfrName);
        await expect(await modal.modalBodyCells.get(2).getText()).toEqual(matchPartNumber);
        //await expect(await modal.modalBodyCells.get(3).getText()).toEqual(matchMfr);
    };

    public async newGridSaveChangesForViewSuggestIgnoreMatch() {
        await allureStep(`save change for View Suggested Ignore Match`, async ()=>{
            let mfrName:string[]= await grid.newGridReturnCellValuesByColumnName(0,
                'Imported Manufacturer Name');
            await modal.openModalWithButtonByName(buttonNames.saveChanges);
            await link.clickOnTheLinkByNameAndWaitForElement('Ignored Matches', modal.modalBodyCells.last());
            await w.waitUntilElementNotDisplayed(element(by.css('.ag-loading-text')));
            const actualHeaders: string[] = await grid.newGridGetVisibleColumnHeadersInModal();
            await transpose.checkingArrayContainSecondArray(['Imported Mfr Name'], actualHeaders);
            await expect(await modal.modalBodyCells.getText()).toEqual([mfrName[0]]);
        });
    };

    public async newGridSaveChangesForViewSuggestIgnoreMatchCpl() {
        await allureStep(`save change for View Suggested Ignore Match`, async ()=>{
            const mfrName:string[]= await grid.newGridReturnCellValuesByColumnName(0,
                'Imported Mfr Name');
            await modal.openModalWithButtonByName(buttonNames.saveChanges);
            await link.clickOnTheLinkByNameAndWaitForElement('Ignored Matches', modal.modalBody);
            const actualHeaders: string[] = await grid.newGridGetVisibleColumnHeaders();
            await transpose.checkingArrayContainSecondArray(['Imported Mfr Name'], actualHeaders);
            await expect(await modal.modalBodyCells.getText()).toEqual([mfrName[0]]);
        });
    };

    public async saveChangesForViewSuggestIgnoreMatchParts() {
        await w.waitUntilWorkingModalNotDisplayed();
        let importedMfrPart:string= await gridElements.newGridLockedColumnRowCellsWithContent(0).get(0).getText();
        let importedMfrName:string= await gridElements.newGridUnlockedCellWithContentByRowIndex(0).get(0).getText();
        await grid.newGridHideColumnByName('Imported Manufacturer Name');
        let corpPartNumber: string = await gridElements.newGridUnlockedCellWithContentByRowIndex(0).get(6).getText();
        let corpMfrName: string = await gridElements.newGridUnlockedCellWithContentByRowIndex(0).get(5).getText();
        await toolbar.unhideCellNameWithUnhideAll('Imported Manufacturer Name');
        await modal.openModalWithButtonByName(buttonNames.saveChanges);
        await link.clickOnTheLinkByNameAndWaitForElement('Ignored Matches', modal.modalBody);
        await w.waitUntilElementIsDisplayed(await modal.modalBodyCellsFirstRow.get(0));
        await grid.newGridCheckingColumnHeadersInModal([ 'Imported Mfr P/N', 'Imported Mfr Name',
            'Corporate P/N', 'Corporate Mfr Name' ]);
        await expect(await modal.modalBodyCellsFirstRow.getText()).toEqual([importedMfrPart, importedMfrName,
            corpPartNumber,corpMfrName]);
    };

    public async saveChangesForViewSuggestIgnoreBomMatchParts() {
        let importedMfrPart:string= await gridElements.newGridLockedCellWithContentByRowIndex(0).get(0).getText();
        let importedMfrName:string= await gridElements.newGridUnlockedCellWithContentByRowIndex(0).get(0).getText();
        await modal.openModalWithButtonByName(buttonNames.saveChanges);
        await w.waitUntilWorkingModalNotDisplayed();
        await link.clickOnTheLinkByNameAndWaitForElement('Ignored Matches', modal.modalBody);
        const actualHeaders: string[] = await grid.newGridGetVisibleColumnHeaders();
        await transpose.checkingArrayContainSecondArray([ 'Imported Mfr P/N', 'Imported Mfr Name'], actualHeaders);
        await expect(await modal.modalBodyCells.getText()).toEqual([importedMfrPart, importedMfrName]);
    };

    public async openSearchForMatchModal() {
        await allureStep(`Open search for Match modal`, async ()=> {
            await browser.sleep(2000);
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsClickable(gridElements.newGridLockedCellWithContentByRowIndex(0).get(0));
            const importedMfrPart: string = await gridElements.newGridLockedCellWithContentByRowIndex(0).get(0).getText();
            const importedMfrName: string = await gridElements.newGridUnlockedCellWithContentByRowIndex(0).get(0).getText();
            const importedMfrPartDesc: string = await gridElements.newGridUnlockedCellWithContentByRowIndex(0).get(4).getText();
            await w.waitUntilElementIsClickable(link.returnElementByLinkName(cplData.noMatchesTry));
            await modal.openModalWithElement(gridElements.newGridLockedCellWithContentByRowIndex(0).get(1));
            await expect(await modal.modalTitle.getText()).toEqual('Search for Matching Part');
            await expect(await matchingElements.searchForMatchModalInfoHeaders.getText()).toEqual(
                ['Imported Mfr P/N:', 'Imported Mfr Name:', 'Imported Desc:']);
            await expect(await matchingElements.searchForMatchModalInfoValues.getText())
                .toEqual([importedMfrPart, importedMfrName, importedMfrPartDesc]);
        });
    };

    public async openSearchForMatchModalFromToolbar() {
        let importedMfrPart:string= await gridElements.newGridLockedCellWithContentByRowIndex(0).get(0).getText();
        let importedMfrName:string= await gridElements.newGridUnlockedCellWithContentByRowIndex(0).get(0).getText();
        let importedMfrPartDesc:string= await gridElements.newGridUnlockedCellWithContentByRowIndex(0).get(4).getText();
        await modal.openModalWithButtonByName(buttonNames.searchForMatch);
        await expect(await modal.modalTitle.getText()).toEqual('Search for Matching Part');
        await expect(await matchingElements.searchForMatchModalInfoHeaders.getText()).toEqual([ 'Imported Mfr P/N:', 'Imported Mfr Name:', 'Imported Desc:' ]);
        await expect(await matchingElements.searchForMatchModalInfoValues.getText())
            .toEqual([importedMfrPart, importedMfrName, importedMfrPartDesc]);
    };

    public async openSearchForMatchModalFromToolbarBomMatchParts() {
        let importedMfrPart:string= await gridElements.newGridLockedCellWithContentByRowIndex(0).get(0).getText();
        let importedMfrName:string= await gridElements.newGridUnlockedCellWithContentByRowIndex(0).get(0).getText();
        let importedMfrPartDesc:string= await gridElements.newGridUnlockedCellWithContentByRowIndex(0).get(2).getText();
        await modal.openModalWithButtonByName(buttonNames.searchForMatch);
        await expect(await modal.modalTitle.getText()).toEqual('Search for Matching Part');
        await expect(await matchingElements.searchForMatchModalInfoHeaders.getText()).toEqual([ 'Imported Mfr P/N:', 'Imported Mfr Name:', 'Imported Desc:' ]);
        await expect(await matchingElements.searchForMatchModalInfoValues.getText())
            .toEqual([importedMfrPart, importedMfrName, importedMfrPartDesc]);
    };

    public async clearAllChecking() {
        await button.clickByButtonName(buttonNames.clearAll);
        await browser.sleep(2000);
        await expect(await elementAttributes.getElementAttribute(matchingElements.searchForMatchModalPartNumberInput, 'value'))
            .toEqual('');
        await expect(await elementAttributes.getElementAttribute(commonElements.commonTypeAheadInput, 'value'))
            .toEqual('');
    };

    async performNoResultsSearch() {
        await input.fillFieldWithValue(matchingElements.searchForMatchModalPartNumberInput, 'dsfsdfsdfsdf');
        await button.clickByButtonName(buttonNames.search);
        await w.waitUntilElementIsDisplayed(modal.modalBodyGrid);
        await w.waitUntilWorkingModalNotDisplayed();
        await browser.sleep(2000);
        await expect(gridElements.newGridModalCheckboxSelectorByIndex(0).isPresent()).toBeFalsy('1');
        await this.clearAllChecking();
        await input.fillFieldWithValue(matchingElements.searchForMatchModalPartNumberInput, 'dsfsdfsdfsdf');
        await this.searchForMatchTypeAhead();
        await w.waitUntilElementIsDisplayed(modal.modalBodyGrid);
        await expect(gridElements.newGridModalCheckboxSelectorByIndex(0).isPresent()).toBeFalsy('2');
    };

    async performSearch() {
        await browser.waitForAngularEnabled(false);
        await input.fillFieldWithValue(matchingElements.searchForMatchModalPartNumberInput, commonSearch.commonValue);
        await button.clickByButtonName(buttonNames.search);
        await w.waitUntilElementIsDisplayed(modal.modalBodyGrid);
        await browser.sleep(2000);
        await expect(gridElements.newGridLockedCellWithContentByRowIndex(0).count()).toBeGreaterThan(0);
    };


    public async undoAndDeselectHighlight() {
        await browser.waitForAngularEnabled(false);
        await modal.openModalWithButtonByName(buttonNames.undo);
        await expect(await modal.modalTitle.getText()).toEqual('Confirm Undo?');
        await expect(await modal.modalBodyParag.get(0).getText())
            .toEqual('All changes that have been accepted or ignored will be reset, please confirm.');
        await modal.closeModalWithButton(buttonNames.undoAllChanges);
        await w.waitUntilWorkingModalNotDisplayed();
        await browser.sleep(2000);
        await w.waitUntilWorkingModalNotDisplayed();
        await w.waitUntilElementIsClickable(gridElements.rowCellsWithoutContent(0,0).get(0));
        let unlockedCell: number = await gridElements.rowCellsWithoutContent(0,0).count();
        for( let i: number = 0; i < unlockedCell; i++) {
            await expect(await elementAttributes.getElementAttribute(gridElements.rowCellsWithoutContent(0,0).get(i), 'class'))
                .not.toContain('accepted')
        }
        let lockedCell:number = await gridElements.rowCellsWithoutContent(1,0).count();
        for( let i: number = 0; i < lockedCell-2; i++) {
            await expect(await elementAttributes.getElementAttribute(gridElements.rowCellsWithoutContent(1,0).get(i), 'class'))
                .not.toContain('accepted')
        }
    };

    public async newGridUndoAndDeselectHighlight() {
        await allureStep(`undo all change and deselect highlight`, async ()=>{
            await browser.waitForAngularEnabled(false);
            await modal.openModalWithButtonByName(buttonNames.undo);
            await expect(await modal.modalTitle.getText()).toEqual('Confirm Undo?');
            await expect(await modalElements.modalBodyP.get(0).getText())
                .toEqual('All changes that have been accepted or ignored will be reset, please confirm.');
            await modal.closeModalWithButton(buttonNames.undoAllChanges);
            await w.waitUntilWorkingModalNotDisplayed();
            await browser.sleep(2000);
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsClickable(await gridElements.newGridCellWithoutContentByRowIndex(0).get(1));
            let lockedCell: number = await gridElements.newGridLockedCellWithoutContentByRowIndex(0).count();
            for( let i: number = 0; i < lockedCell; i++) {
                await expect(await elementAttributes.getElementAttribute(await gridElements.newGridLockedCellWithoutContentByRowIndex(0).get(i),
                    'style')).not.toContain('background-color: rgb(207, 227, 194)')
            }
            let unlockedCell:number = await gridElements.newGridUnlockedCellWithoutContentByRowIndex(0).count();
            for( let i: number = 0; i < unlockedCell; i++) {
                await expect(await elementAttributes.getElementAttribute(gridElements.newGridUnlockedCellWithoutContentByRowIndex(0).get(i),
                    'style')).not.toContain('background-color: rgb(207, 227, 194)')
            }
        });
    };

    public async manufacurerInformationModalChecking() {
        await w.waitUntilElementIsClickable(gridElements.newGridUnlockedCellWithContentByRowIndex(0).get(0));
        let matchMfrName:string = await gridElements.newGridUnlockedCellWithContentByRowIndex(0).get(0).getText();
        await modal.openModalWithLinkName(matchMfrName);
        await expect(await modal.modalTitle.getText()).toEqual('Manufacturer Information');
        await browser.waitForAngularEnabled(false);
        await modal.closeModalWithXButton();
        await browser.waitForAngularEnabled(false);
    };

    public async newGridManufacurerInformationModalChecking() {
        await allureStep(`check manufacturer information modal`, async ()=> {
            await w.waitUntilElementIsClickable(await gridElements.newGridUnlockedCellWithoutContentByRowIndex(0).get(1));
            const matchMfrName:string = await gridElements.newGridUnlockedCellWithoutContentByRowIndex(0).get(0).getText();
            await modal.openModalWithLinkName(matchMfrName);
            await expect(await modal.modalTitle.getText()).toEqual('Manufacturer Information');
            await browser.waitForAngularEnabled(false);
            await modal.closeModalWithXButton();
            await browser.waitForAngularEnabled(false);
        });
    };

    public async searchForMatchTypeAhead() {
        await w.waitUntilWorkingModalNotDisplayed();
        await typeAhead.typeAheadChecking(commonElements.commonTypeAheadInput, 'test');
        await w.waitUntilElementIsClickable(gridElements.gridWrapper);
    };

    public async searchForMatchAndHighlight() {
        await Shade.closeShadeWithButton(buttonNames.save, gridElements.grid);
        const unlockedCell: number = await gridElements.newGridUnlockedCellWithoutContentByRowIndex(0).count();
        for( let i: number = 0; i < unlockedCell; i++) {
            await expect(await elementAttributes.getElementAttribute(await gridElements.newGridUnlockedCellWithoutContentByRowIndex(0).get(i), 'style'))
                .toContain('background-color: rgb(207, 227, 194)');
        }

    };

    public async searchForMatchMfrModalAndHighlight(bom:boolean) {
        await allureStep(`search for match manufacturer modal and highlight`, async()=>{
            await w.waitUntilElementIsClickable(await button.returnButtonByText(buttonNames.yesUseThisMatchingMfr));
            await modal.closeModalWithButton(buttonNames.yesUseThisMatchingMfr);
            await this.newGridSelectHighlight(bom);
            await browser.sleep(2000);
        });
    };

    public async searchForMatchModalAndHighlight(bom:boolean) {
        await w.waitUntilWorkingModalNotDisplayed();
        await w.waitUntilElementIsDisplayed(await gridElements.newGridRowsInModal.get(0));
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await modal.closeModalWithButton(buttonNames.yesUseThisMatchingPart);
        await w.waitUntilWorkingModalNotDisplayed();
        await this.selectHighlight(bom);
        await browser.sleep(2000);
    };

    public async openAcceptMatch() {
        await w.waitUntilElementIsClickable(await gridElements.newGridUnlockedCellWithoutContentByRowIndex(0).get(1));
        const matchMfrName:string = await gridElements.newGridUnlockedCellWithoutContentByRowIndex(0).get(0).getText();
        let importedMfrName:string = await gridElements.newGridLockedCellWithoutContentByRowIndex(0).get(1).getText();
        await modal.openModalWithButtonByName(buttonNames.acceptMatch);
        await expect(await modal.modalTitle.getText()).toEqual('Confirm Accepted Matching Manufacturers');
        await expect(await matchingElements.acceptMatchModalRows.getText()).toEqual([importedMfrName, matchMfrName]);
    };

    public async newGridOpenAcceptMatch() {
        await allureStep(`open accept match modal`, async ()=>{
            let importedMfrName:string[] = await grid.newGridReturnCellValuesByColumnName(0,'Imported Manufacturer Name');
            let matchMfrName:string[] = await grid.newGridReturnCellValuesByColumnName(1,'Matched Manufacturer Name');
            await modal.openModalWithButtonByName(buttonNames.acceptMatch);
            await expect(await modal.modalTitle.getText()).toEqual('Confirm Accepted Matching Manufacturers');
            await expect(await matchingElements.acceptMatchModalRows.getText()).toEqual([importedMfrName[0], matchMfrName[0]]);
        });
    };

    public async newGridOpenAcceptMatchCpl() {
        await allureStep(`open accept match modal`, async ()=>{
            const importedMfrName:string[] = await grid.newGridReturnCellValuesByColumnName(0,'Imported Mfr Name');
            const matchMfrName:string[] = await grid.newGridReturnCellValuesByColumnName(1,'Matched Manufacturer Name');
            await modal.openModalWithButtonByName(buttonNames.acceptMatch);
            await expect(await modal.modalTitle.getText()).toEqual('Confirm Accepted Matching Manufacturers');
            await expect(await matchingElements.acceptMatchModalRows.getText()).toEqual([importedMfrName[0], matchMfrName[0]]);
        });
    };

    public async openAcceptMatchParts() {
        await allureStep(`open Accept Match Parts`, async ()=> {
            let importedMfrPart: string = await gridElements.newGridLockedColumnRowCellsWithContent(0).get(0).getText();
            let importedMfrName: string = await gridElements.newGridUnlockedCellWithContentByRowIndex(0).get(0).getText();
            let matchFullName: string = await gridElements.newGridUnlockedCellWithContentByRowIndex(0).get(1).getText();
            let matchedPN: string = await gridElements.newGridLockedColumnRowCellsWithContent(0).get(1).getText();
            await grid.newGridHideColumnByName('Imported Manufacturer Name');
            let corpPartNumber: string = await gridElements.newGridUnlockedCellWithContentByRowIndex(0).get(6).getText();
            let corpMfrName: string = await gridElements.newGridUnlockedCellWithContentByRowIndex(0).get(5).getText();
            await toolbar.unhideCellNameWithUnhideAll('Imported Manufacturer Name');
            await modal.openModalWithButtonByName(buttonNames.acceptMatch);
            await expect(await modal.modalTitle.getText()).toEqual('Confirm Accepted Matching Parts');
            await expect(await matchingElements.acceptMatchModalRows.getText()).toEqual(
                [importedMfrPart, importedMfrName, corpPartNumber,
                corpMfrName, matchedPN, matchFullName]);
        });
    };


    public async openAcceptBomMatchParts() {
        let importedMfrPartNumber:string= await gridElements.newGridLockedCellWithContentByRowIndex(0).get(0).getText();
        let importedMfrName:string= await gridElements.newGridUnlockedCellWithContentByRowIndex(0).get(0).getText();
        let matchedPartNumber: string = await gridElements.newGridLockedCellWithContentByRowIndex(0).get(1).getText();
        let matchedMfrName: string = await gridElements.newGridUnlockedCellWithContentByRowIndex(0).get(1).getText();
        await modal.openModalWithButtonByName(buttonNames.acceptMatch);
        await expect(await modal.modalTitle.getText()).toEqual('Confirm Accepted Matching Parts');
        await expect(await matchingElements.acceptMatchModalRows.getText()).toEqual([importedMfrPartNumber, importedMfrName,matchedPartNumber,
            matchedMfrName]);
    };

    public async acceptMatchHighlight(buttonName: string = buttonNames.acceptTheseMfrs, bom: boolean) {
        //await browser.waitForAngularEnabled(false);
        await modal.closeModalWithButton(buttonName);
        await this.selectHighlight(bom);
        await browser.sleep(2000);
    };

    public async newGridAcceptMatchHighlight(buttonName: string = buttonNames.acceptTheseMfrs, bom: boolean) {
        await allureStep(`accept match and check hightlight`, async ()=>{
            await browser.waitForAngularEnabled(false);
            await modal.closeModalWithButton(buttonName);
            await this.newGridSelectHighlight(bom);
            await browser.sleep(2000);
        });
    };

    public async openIgnoreMatch() {
        let importedMfrName:string = await gridElements.rowCellsWithContent(0,0).get(0).getText();
        await modal.openModalWithButtonByName(buttonNames.ignoreMatch);
        await expect(await modal.modalTitle.getText()).toEqual('Confirm Ignored Matching Manufacturer(s)');
        await expect(await modal.modalLi.get(0).getText()).toEqual(importedMfrName);
    };

    public async newGridOpenIgnoreMatch() {
        await allureStep(`open Ignore Match modal`, async ()=>{
            const importedMfrName:string[] = await grid.newGridReturnCellValuesByColumnName(0, 'Imported Manufacturer Name');
            await modal.openModalWithButtonByName(buttonNames.ignoreMatch);
            await expect(await modal.modalTitle.getText()).toEqual('Confirm Ignored Matching Manufacturer(s)');
            await expect(await modal.modalLi.get(0).getText()).toEqual(importedMfrName[0]);
        });
    };

    public async newGridOpenIgnoreMatchCpl() {
        await allureStep(`open Ignore Match modal`, async ()=>{
            let importedMfrName:string[] = await grid.newGridReturnCellValuesByColumnName(0, 'Imported Mfr Name');
            await modal.openModalWithButtonByName(buttonNames.ignoreMatch);
            await expect(await modal.modalTitle.getText()).toEqual('Confirm Ignored Matching Manufacturer(s)');
            await expect(await modal.modalLi.get(0).getText()).toEqual(importedMfrName[0]);
        });
    };

    public async openIgnoreMatchParts() {
        let importedMfrName:string = await gridElements.newGridLockedCellWithContentByRowIndex(0).get(0).getText();
        let matchMfrName:string = await gridElements.newGridUnlockedCellWithContentByRowIndex(0).get(0).getText();
        await modal.openModalWithButtonByName(buttonNames.ignoreMatch);
        await expect(await modal.modalTitle.getText()).toEqual('Confirm Ignored Matching Part(s)');
        await expect(await matchingElements.acceptMatchModalRows.getText()).toEqual([importedMfrName, matchMfrName]);
    };

    public async newGridOpenIgnoreMatchParts() {
        await allureStep(`open Ignore Match Parts`, async ()=>{
            let importedMfrPart:string = await gridElements.newGridLockedCellWithContentByRowIndex(0).get(0).getText();
            await modal.openModalWithButtonByName(buttonNames.ignoreMatch);
            await expect(await modal.modalTitle.getText()).toEqual('Confirm Ignored Matching Part(s)');
            await expect(await modal.modalTd.getText()).toContain(importedMfrPart);

        });
    };

    public async ignoreMatchHighlight(bom: boolean) {
        await browser.waitForAngularEnabled(false);
        await modal.closeModalWithButton(buttonNames.yesItOkToIgnoreThem);
        await w.waitUntilElementIsClickable(gridElements.gridWrapper);
        await browser.sleep(2000);
        if(bom) {
            let unlockedCell:number = await gridElements.rowCellsWithoutContent(1,0).count();
            for( let i: number = 0; i < unlockedCell; i++) {
                await expect(await elementAttributes.getElementAttribute(gridElements.rowCellsWithoutContent(1,0).get(i), 'class'))
                    .toContain('ignore')
            }
        }
        else {
            let lockedCell: number = await gridElements.rowCellsWithoutContent(0, 0).count();
            for (let i: number = 0; i < lockedCell; i++) {
                await expect(await elementAttributes.getElementAttribute(gridElements.rowCellsWithoutContent(0, 0).get(i), 'class'))
                    .toContain('ignore')
            }
        }
    };
    public async newGridIgnoreMatchHighlight(bom: boolean) {
        await browser.waitForAngularEnabled(false);
        await modal.closeModalWithButton(buttonNames.yesItOkToIgnoreThem);
        await w.waitUntilElementIsClickable(gridElements.gridWrapper);
        await browser.sleep(2000);
        if(bom) {
            let unlockedCell:number = await gridElements.newGridUnlockedCellWithoutContentByRowIndex(0).count();
            for( let i: number = 0; i < unlockedCell; i++) {
                await expect(await elementAttributes.getElementAttribute(gridElements.newGridUnlockedCellWithoutContentByRowIndex(0).get(i), 'style'))
                    .toContain('background-color:rgb(214, 230, 246)');
            }
        }
        //temp disabled till defect fix
        // else {
        //     let lockedCell: number = await gridElements.newGridLockedCellWithoutContentByRowIndex(0).count();
        //     for (let i: number = 0; i < lockedCell; i++) {
        //         await expect(await elementAttributes.getElementAttribute(gridElements.newGridLockedCellWithoutContentByRowIndex(0).get(i), 'style'))
        //             .toContain('background-color:rgb(214, 230, 246)');
        //         await console.log(elementAttributes.getElementAttribute(gridElements.newGridLockedCellWithoutContentByRowIndex(0).get(i),'style'))
        //     }
        // }
    };



}