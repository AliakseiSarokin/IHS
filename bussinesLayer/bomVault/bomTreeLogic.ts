import {
    bomVaultElements, gridElements, pageTitles, bomElements, importElements, commonElements,
    reportElements, shadeElements} from "../../elements/elements";
import {buttonNames, titles} from "../../testData/global";
import {Actions} from "../../utils/actions";
import {ImportLogic} from "../import/importLogic";
import {Button} from "../../components/simple/button";
import {Grid} from "../../components/grid";
import {ElementAttributes} from "../../utils/elementAttributes";
import {Input} from "../../components/simple/input";
import {Link} from "../../components/simple/link";
import {Modal} from "../../components/modal";
import {Random} from "../../utils/random";
import {Shade} from "../../components/shade";
import {browser} from "protractor";
import {Waiters as w} from "../../helper/waiters";
import {bomVaultData} from "../../testData/bomVault";
import {allureStep} from "../../helper/allure/allureSteps";
import {JsScripts} from "../../utils/jsScripts";

const actions: Actions = new Actions();
const button: Button = new Button();
const grid: Grid = new Grid();
const elementAttributes: ElementAttributes = new ElementAttributes();
const importLogic:ImportLogic = new ImportLogic();
const input: Input = new Input();
const link = new Link();
const modal: Modal = new Modal();
const random: Random = new Random();


export class BomTreeLogic {

    async expandFolderBomTree () {
        await allureStep('expand folder in Bom Tree', async () => {
            await w.waitUntilElementIsDisplayed(gridElements.gridWrapper);
            let firstFolderRowNumber: number = 0;
            const rowCount: number = await bomVaultElements.bomTree.bomTreeRows.count();
            for (let i: number = 0; i < rowCount; i++) {
                if (await bomVaultElements.bomTree.folderPlusIconSvgByRowNumber(i)) {
                    firstFolderRowNumber = i;
                    break
                }
            }
            await bomVaultElements.bomTree.expandFolderIconNewGrid.get(firstFolderRowNumber).click();
            await w.waitUntilElementIsDisplayed(gridElements.gridWrapper);
        });
    };

    async expandFolderBomTreeWithName (name:string) {
        await allureStep('expand folder in Bom Tree by Name', async () => {
            await w.waitUntilElementIsDisplayed(gridElements.gridWrapper);
            const rowCount: number = await bomVaultElements.bomTree.bomTreeRows.count();
            for (let i: number = 0; i < rowCount; i++) {
                if (await bomVaultElements.bomTree.bomTreeRowsAll.get(i).isPresent()) {
                    if (await bomVaultElements.bomTree.bomTreeRowsAll.get(i).getText() === name) {
                        if (await bomVaultElements.bomTree.folderPlusIconSvgByRowNumber(i)) {
                            await bomVaultElements.bomTree.expandFolderIconNewGrid.get(i).click();
                            break
                        }
                    }
                }
            }
            await w.waitUntilElementIsDisplayed(gridElements.gridWrapper);
        });
    };

    async expandAllIndenturedBomTreeWithName (id:number) {
        await allureStep('expand all Indentured BOM in Bom Tree', async () => {
            await w.waitUntilElementIsDisplayed(gridElements.gridWrapper);
                        if (await bomVaultElements.bomTree.BOMExpandAllSvgByRowNumber(id)) {
                            await bomVaultElements.bomTree.expandAllIconNewGrid.get(id).click();
                            await w.waitUntilElementIsDisplayed(gridElements.gridWrapper);
                        }
                    })
    };

    async openCloseFolderBomTreeWithName (name:string) {
        await allureStep('open and close  folder in Bom Tree by Name', async () => {
            await w.waitUntilElementIsDisplayed(gridElements.gridWrapper);
            const rowCount: number = await bomVaultElements.bomTree.bomTreeRows.count();
            for (let i: number = 0; i < rowCount; i++) {
                if (await bomVaultElements.bomTree.bomTreeRowsAll.get(i).isPresent()) {
                    if (await bomVaultElements.bomTree.bomTreeRowsAll.get(i).getText() === name) {
                        if (await bomVaultElements.bomTree.folderPlusIconSvgByRowNumber(i)) {
                            await bomVaultElements.bomTree.expandFolderIconNewGrid.get(i).click();
                            await bomVaultElements.bomTree.expandFolderIconNewGrid.get(i).click();
                            break
                        }
                    }
                }
            }
        });
    };

    async expandFirstIndenturedBom () {
        await allureStep(`find BOM with indentured icon and expand it`, async ()=>{
            let rowCount: number = await bomVaultElements.bomTree.bomTreeRows.count();
            for (let i:number =0; i < rowCount-1; i++) {
                if(await bomVaultElements.bomTree.indenturedBomIconByRowNumber(i).isPresent()){
                    await JsScripts.clickByCompoundCssAndNumber(bomVaultElements.bomTree.bomTreeRowCss, i, bomVaultElements.bomTree.expandFolderIconNewGridCss);
                    break
                }
            }
        });
    };


    async checkFirstOpenIndenturedBomNewGrid() {
        await allureStep(`find first BOM with indentured open folder icon and click on checkbox`, async ()=>{
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsClickable(bomVaultElements.bomTree.bomTreeRows.get(1));
            let rowCount: number = await bomVaultElements.bomTree.bomTreeRows.count();
            for (let i:number =0; i < rowCount-1; i++) {
                if(await bomVaultElements.bomTree.indenturedBomIconByRowNumber(i).isPresent()){
                    await w.waitUntilElementIsClickable(gridElements.newGridCheckboxSelector.get(i));
                    await grid.checkCheckboxRangeNewGrid(i, i+1);
                    break
                }
            }
        });
    };

    public async checkBomRows(range: number) {
        await allureStep(`check BOM rows`, async ()=>{
            let counter: number = 0;
            await w.waitUntilElementIsClickable(bomVaultElements.bomTree.bomTreeRows.get(1));
            const rowAmount: number = await bomVaultElements.bomTree.bomTreeRows.count();
            for(let i: number = 0; i < rowAmount; i++) {
                if(await  bomVaultElements.bomTree.bomTreeRowsBoms(i).isPresent() && counter<range) {
                    await w.waitUntilElementIsClickable(gridElements.checkboxSelector.get(i+1));
                    await grid.checkCheckboxRange(i+1, i+2);
                    counter = counter + 1;
                }
            }
        });
    };

    public async checkNewGridCheckBox(range: number) {
        await allureStep(`check new grid checkbox`, async ()=>{
            let counter: number = 0;
            await w.waitUntilElementIsClickable(bomVaultElements.bomTree.bomTreeRows.get(1));
            const rowAmount: number = await bomVaultElements.bomTree.bomTreeRows.count();
            for(let i: number = 0; i < rowAmount; i++) {
                if(await  bomVaultElements.bomTree.bomTreeRowsBoms(i).isPresent() && counter<range) {
                    await w.waitUntilElementIsClickable(gridElements.newGridCheckboxSelector.get(i));
                    await grid.checkCheckboxRangeNewGrid(i, i+1);
                    counter = counter + 1;
                }
            }
        });
    };

    public async checkBomRowsInShade(range: number) {
        let counter: number = 0;
        await w.waitUntilElementIsClickable(bomVaultElements.bomTree.bomTreeRows.get(1));
        const rowAmount: number = await bomVaultElements.bomTree.bomTreeRows.count();
        for(let i: number = 0; i < rowAmount; i++) {
            if(await  shadeElements.bomTreeRowsBoms(i).isPresent() && counter<range) {
                await w.waitUntilElementIsClickable(shadeElements.checkbox.get(i));
                await grid.checkCheckboxElementRange(shadeElements.checkbox, i, i+1);
                counter = counter + 1;
            }
        };
    };

    public async checkNewGridBomRowsInShade(rowNumber: number) {
        await allureStep(`check BOM checkbox inside shade with row-number: ${rowNumber} `, async ()=> {
            await w.waitUntilElementIsClickable(bomVaultElements.bomTree.bomTreeRows.get(1));
            await w.waitUntilElementIsDisplayed(await shadeElements.bomTreeShaderow(rowNumber).get(0));
            await shadeElements.bomTreeShaderow(rowNumber).click();
        });
    };


    public async checkNewGridFolderRows(range: number) {
        await allureStep(`check new grid folder rows`, async ()=> {
            let counter: number = 0;
            await w.waitUntilElementIsClickable(bomVaultElements.bomTree.bomTreeRows.get(0));
            let rowAmount: number = await bomVaultElements.bomTree.bomTreeRows.count();
            for(let i: number = 0; i < rowAmount; i++) {
                if(await  bomVaultElements.bomTree.bomTreeRowsFolder(i).isPresent() && counter<range) {
                    await gridElements.newGridCheckboxSelectorFolderByRow(i).click();
                    counter = counter + 1;
                }
            }
        });
    };

    public async checkFolderRows(range: number) {

        let counter: number = 0;
        await w.waitUntilElementIsClickable(bomVaultElements.bomTree.bomTreeRows.get(0));
        let rowAmount: number = await bomVaultElements.bomTree.bomTreeRows.count();
        for(let i: number = 1; i < rowAmount; i++) {
            if(await  bomVaultElements.bomTree.bomTreeRowsFolder(i).isPresent() && counter<range) {
                await grid.checkCheckboxRange(i, i+1);
                counter = counter + 1;
            }
        }
    };

    public async checkFolderRowByName(name: string) {
        let rowAmount: number = await bomVaultElements.bomTree.bomTreeRows.count();
        for(let i: number = 1; i < rowAmount; i++) {
            if(await  bomVaultElements.bomTree.bomTreeRowsFolder(i).isPresent()) {
                if(await  bomVaultElements.bomTree.bomTreeRowsFolder(i).getText() === name) {
                    await grid.checkCheckboxRange(i, i+1);
                    break
                }
            }
        }
        await browser.sleep(1000);
    };

    public async checkFolderNewGridRowByName(name: string) {
        await allureStep(`check folder checkbox with name: ${name} `, async ()=> {
            let rowAmount: number = await bomVaultElements.bomTree.bomTreeRows.count();
            for (let i: number = 0; i < rowAmount; i++) {
                if (await bomVaultElements.bomTree.bomTreeRowsFolder(i).isPresent()) {
                    if (await bomVaultElements.bomTree.bomTreeRowsFolder(i).getText() === name) {
                        await gridElements.newGridCheckboxSelectorFolderByRow(i).click();
                        break
                    }
                }
            }
        });
    };

    public async checkBomByName(name: string) {
        let rowAmount: number = await bomVaultElements.bomTree.bomTreeRows.count();
        for(let i: number = 1; i < rowAmount; i++) {
            if(await  bomVaultElements.bomTree.bomTreeRowsAll.get(i).isPresent()) {
                if(await  bomVaultElements.bomTree.bomTreeRowsAll.get(i).getText() === name) {
                    await grid.checkCheckboxRange(i, i+1);
                    break
                }
            }
        }
    };

    public async checkBomNewGridByName(name: string) {
        await allureStep(`check BOM checkbox with name: ${name} `, async ()=> {
            let rowAmount: number = await bomVaultElements.bomTree.bomTreeRows.count();
            for (let i: number = 0; i < rowAmount; i++) {
                if (await bomVaultElements.bomTree.bomTreeRowsAll.get(i).isPresent()) {
                    if (await bomVaultElements.bomTree.bomTreeRowsAll.get(i).getText() === name) {
                        await gridElements.newGridCheckboxSelectorFolderByRow(i).click();
                        break
                    }
                }
            }
        });
    };

    public async goToBomAttributes() {
        const bomName: string = await  bomVaultElements.bomTree.bomTreeRowsBoms(0).getText();
        await button.clickByButtonName(buttonNames.viewBomAttributes);
        await w.waitUntilElementIsClickable(bomElements.attributes.attributesWait);
        await w.waitUntilElementIsClickable(button.returnButtonByText(buttonNames.editAttributes));
        await expect(await pageTitles.singleBomPageTitle.getText()).toContain(bomName);
    };

    public async goToBomImportAndSetDestFolder() {
        const bomName: string = await  bomVaultElements.bomTree.bomTreeFolders.get(0).getText();
        await button.clickByButtonName(buttonNames.bomToSelectedFolder);
        await w.waitUntilElementIsClickable(importElements.step1EnableBox);
        await importLogic.uploadAValidFileToImport();
        await expect(await importElements.destFolderSummary.getText()).toContain(bomName);
        await importLogic.leaveImportWitLeaveModal();
    };

    public async addNewFolderModalFieldsChecking() {
        const bomName: string = await  bomVaultElements.bomTree.bomTreeFolders.get(0).getText();
        await expect(await bomVaultElements.bomTree.addNewFolderFieldLabels.getText())
            .toEqual([ 'Path:', 'Name:', 'Description:' ]);
        await expect(await elementAttributes.getElementAttribute(bomVaultElements.bomTree.addNewFolderFieldInputs.get(0), 'value'))
            .toContain(bomName);
        await expect(await elementAttributes.getElementAttribute(bomVaultElements.bomTree.addNewFolderFieldInputs.get(1), 'placeholder'))
            .toContain('Enter Folder Name (50 chars max)');
        await input.fillFieldWithValue(bomVaultElements.bomTree.descriptionInput,random.randomTextGenerator(250));
        await expect(await bomVaultElements.bomTree.addNewFolderCounter.getText()).toEqual('0 characters remaining');
    };

    public async notBeVaultAsNameOfNewFolder() {
        await input.fillFieldWithValue(bomVaultElements.bomTree.addNewFolderFieldInputs.get(1),'VaUlT');
        await browser.waitForAngular();
        await modal.openModalWithButtonByName(buttonNames.yesAddNewFolder);
        await expect(await modal.severalModalTitles.get(1).getText()).toEqual('Invalid Folder Name');
        await expect(await modal.severalModalBodies.get(1).getText())
            .toEqual('You cannot create a new folder called "Vault". Please enter a valid folder name.');
        await modal.closeModalWithElement(commonElements.okButton);
        // await modal.openModalWithButtonByName(buttonNames.yesAddThisFolder);
        // await modal.closeModalWithButton(buttonNames.okayThanks)
    };

    public async addFolder () {
        await input.fillFieldWithValue(bomVaultElements.bomTree.addNewFolderFieldInputs.get(1),bomVaultData.bomTree.newFolderName);
        await input.fillFieldWithValue(bomVaultElements.bomTree.descriptionInput,bomVaultData.bomTree.newFolderDesc);
        await modal.closeModalWithButton(buttonNames.yesAddNewFolder);
        await w.waitUntilElementIsClickable(gridElements.gridWrapper);
        await w.waitUntilElementIsClickable(gridElements.checkboxSelector.get(3));
        await expect(await bomVaultElements.bomTree.bomTreeFolderName(bomVaultData.bomTree.newFolderName).isDisplayed()).toBeTruthy();
        await browser.sleep(3000);
    };

    public async modifyFolderModalFieldsChecking() {
        const bomName: string = await  bomVaultElements.bomTree.bomTreeFolders.get(1).getText();
        await expect(await bomVaultElements.bomTree.modifyFolderFieldLabels.getText())
            .toEqual( [ 'Path:', 'Current Name:', 'New Name:', 'Current Description:', 'New Description:' ]);
        await expect(await elementAttributes.getElementAttribute(bomVaultElements.bomTree.modifyFolderFieldInputs.get(0), 'value'))
            .toContain(bomName);
        await expect(await elementAttributes.getElementAttribute(bomVaultElements.bomTree.modifyFolderFieldInputs.get(1), 'value'))
            .toEqual(bomVaultData.bomTree.newFolderName);
        await input.fillFieldWithValue(bomVaultElements.bomTree.modifyFolderFieldInputs.get(2),random.randomTextGenerator(50));
        await expect(await bomVaultElements.bomTree.modifyFolderCounter.get(0).getText()).toEqual('0 characters remaining');
        await expect(await elementAttributes.getElementAttribute(bomVaultElements.bomTree.modifyFolderCurrentDesc.get(3), 'value'))
            .toEqual(bomVaultData.bomTree.newFolderDesc);
        await input.fillFieldWithValue(bomVaultElements.bomTree.modifyFolderNewDesc,random.randomTextGenerator(250));
        await expect(await bomVaultElements.bomTree.modifyFolderCounter.get(1).getText()).toEqual('0 characters remaining');
    };

    public async notBeVaultAsNameOfModifyFolder() {
        await input.fillFieldWithValue(bomVaultElements.bomTree.addNewFolderFieldInputs.get(2),'VaUlT');
        await modal.openModalWithButtonByName(buttonNames.yesModifyThisFolder);
        await expect(await modal.severalModalTitles.get(1).getText()).toEqual('Invalid Folder Name');
        await expect(await modal.severalModalBodies.get(1).getText())
            .toEqual('You cannot create a new folder called "Vault". Please enter a valid folder name.');
        await modal.closeModalWithElement(commonElements.okButton);
        // await modal.openModalWithButtonByName(buttonNames.yesModifyThisFolder);
        // await modal.closeModalWithButton(buttonNames.okayThanks)
    };


    public async modifyFolder () {
        await input.fillFieldWithValue(bomVaultElements.bomTree.modifyFolderFieldInputs.get(2), bomVaultData.bomTree.modifiedFolderName);
        await modal.closeModalWithButton(buttonNames.yesModifyThisFolder);
        await browser.waitForAngular();
        await w.waitUntilElementIsDisplayed(gridElements.gridWrapper);
        await w.waitUntilElementIsClickable(gridElements.checkboxSelector.get(3));
        await browser.sleep(3000);
        await expect(await bomVaultElements.bomTree.bomTreeFolderName(bomVaultData.bomTree.modifiedFolderName).isDisplayed()).toBeTruthy();
    };

    public async deleteFolder() {
        await modal.openModalWithButtonByName(buttonNames.delete);
        await modal.closeModalWithButton(buttonNames.yesDeleteSelectedItems);
       // await browser.waitForAngular();
        await w.waitUntilElementIsDisplayed(gridElements.gridWrapper);
        await w.waitUntilElementIsDisplayed(gridElements.newGridCheckboxSelector.get(3));
        await w.waitUntilElementIsClickable(gridElements.newGridCheckboxSelector.get(3));
        await browser.sleep(5000);
        await this.expandFolderBomTreeWithName('AUTOMATION_FOLDER_DO_NOT_DELETE_1_1_1');
        if(await bomVaultElements.bomTree.bomTreeFolderName(bomVaultData.bomTree.modifiedFolderName).isPresent()) {
            await button.clickByButtonName(buttonNames.refresh);
            await w.waitUntilElementIsDisplayed(gridElements.gridWrapper);
            await w.waitUntilElementIsClickable(gridElements.newGridCheckboxSelector.get(0));
            await this.expandFolderBomTreeWithName('AUTOMATION_FOLDER_DO_NOT_DELETE_1_1_1');
        }
    };

    public async modifyOwnerShadeFolderTab(folderName: string) {
        await expect(await bomVaultElements.bomTree.modifyOwnerShade.tabColumnHeaders.getText())
            .toEqual(['Folder Name', 'Folder Path']);
        await expect(await bomVaultElements.bomTree.modifyOwnerShade.tabRows.get(0).getText()).toContain(folderName);
        await expect(await bomVaultElements.bomTree.modifyOwnerShade.tabRows.get(1).getText()).toContain('Vault');
    };


    public async modifyOwnerShadeBomsTab(folderName: string) {
        await expect(await bomVaultElements.bomTree.modifyOwnerShade.tabColumnHeaders.getText())
            .toEqual(['BOM Name', 'BOM Path']);
        await expect(await bomVaultElements.bomTree.modifyOwnerShade.tabRows.getText()).toContain(folderName);
        await expect(await bomVaultElements.bomTree.modifyOwnerShade.tabRows.get(1).getText()).toContain('Vault');
    };

    public async activeModifyButton() {
        await bomElements
    };

    public async moveFolderToAnotherFolder() {
        await browser.sleep(2000);
        await grid.checkCheckboxRangeNewGrid(0,1);
        await Shade.closeShadeWithButton(buttonNames.moveThisFolder);
        await w.waitUntilElementIsClickable(gridElements.checkboxSelector.get(3));
        await w.waitUntilElementIsClickable(gridElements.gridWrapper);
        await w.waitUntilWorkingModalNotDisplayed();
        await browser.sleep(1000);

    };

    public async moveBomToAnotherFolder(bomName: string) {
        await grid.checkCheckboxRange(1,2);
        await Shade.closeShadeWithButton(buttonNames.moveSelecteBoms);
        await w.waitUntilElementIsClickable(gridElements.gridWrapper);
        await expect(await bomVaultElements.bomTree.bomTreeBomName(bomName).isPresent()).toBeTruthy()
    }


    public async returnToInitialState() {
        await this.checkFolderNewGridRowByName('Vault');
        await Shade.closeShadeWithButton(buttonNames.moveThisFolder);
        await w.waitUntilElementIsClickable(gridElements.newGridCheckboxSelector.get(3));
        await w.waitUntilElementIsClickable(gridElements.gridWrapper);
    };

    public async returnBomToInitialState(bomName: string) {
        await this.checkBomNewGridByName('Vault');
        await Shade.closeShadeWithButton(buttonNames.moveSelecteBoms);
        await w.waitUntilElementIsClickable(gridElements.grid);
        await expect(await bomVaultElements.bomTree.bomTreeBomName(bomName).isPresent()).toBeTruthy()
    };


    public async goToGenerateReportPage() {
        const bomName: string = await bomVaultElements.bomTree.bomTreeBoms.get(0).getText();
        await button.clickByButtonName(buttonNames.generateReportButton);
        await w.waitUntilElementIsClickable(reportElements.reports.standardReports.get(0));
        await w.waitUntilElementIsClickable(gridElements.gridWrapper);
        await expect(await pageTitles.generereReportTitle.get(0).getText()).toEqual(titles.generateReport, );
        await expect(await pageTitles.generereReportTitle.get(1).getText()).toContain(bomName);
    };

    public async goToGenerateReportPageMultipleSelection() {
        await this.expandFolderBomTreeWithName('AUTOMATION_FOLDER_DO_NOT_DELETE_1_1_1');
        const bomName: string = await bomVaultElements.bomTree.bomTreeBoms.get(0).getText();
        const bomName1: string = await bomVaultElements.bomTree.bomTreeBoms.get(1).getText();
        await this.checkNewGridCheckBox(2);
        await button.clickByButtonName(buttonNames.generateReportButton);
        await w.waitUntilElementIsClickable(reportElements.reports.standardReports.get(0));
        await w.waitUntilElementIsClickable(gridElements.gridWrapper);
        await expect(await pageTitles.generereReportTitle.getText()).toEqual([titles.generateReport]);
        await expect(await pageTitles.multipleReports.getText()).toEqual('Multiple BOMs Selected');
        await actions.mouseMoveToElementAndWaitForTooltip( pageTitles.multipleReports, commonElements.popoverContent.get(0));
        await expect(await commonElements.popoverContentLi.get(0).getText()).toContain(bomName);
        await expect(await commonElements.popoverContentLi.get(1).getText()).toContain(bomName1);
    };

    public async goToViewSingleBom() {
        const bomName: string = await bomVaultElements.bomTree.bomTreeBoms.get(0).getText();
        await link.clickOnTheLinkByNameAndWaitForElement(bomName, gridElements.gridWrapper);
        await w.waitUntilElementIsClickable(gridElements.checkboxSelector.get(0));
        await expect(await pageTitles.singleBomPageTitle.getText()).toContain(bomName);
    }

    public async selectRawWithNotMatchValue (columnHeaderName: string, cellName: string) {
        const columnNameArray: string[] = await grid.newGridReturnCellValuesByColumnName(1, columnHeaderName);
        for (let i: number = 0; i < columnNameArray.length; i++) {
            if (await columnNameArray[i] !== cellName && bomVaultElements.bomTree.bomTreeRowsBoms(i).isPresent() && i!==0) {
                await grid.checkCheckboxRange(i, i + 1);
                break;
            }
        }
    };

    public async checkBomRowsAndReturnName(range: number): Promise<string []> {
        let bomName: string[] = [];
        await allureStep(`check ${range} bom checkbox and return it name`, async ()=>{
            let counter: number = 0;
            await w.waitUntilElementIsClickable(bomVaultElements.bomTree.bomTreeRows.get(1));
            const rowAmount: number = await bomVaultElements.bomTree.bomTreeRows.count();
            for(let i: number = 0; i < rowAmount; i++) {
                if(await bomVaultElements.bomTree.bomTreeRowsBoms(i).isPresent() && counter<range) {
                    await w.waitUntilElementIsClickable(gridElements.checkboxSelector.get(i));
                    bomName.push(await bomVaultElements.bomTree.bomTreeRowsBoms(i).getText());
                    await grid.checkCheckboxRange(i, i+1);
                    counter = counter + 1;
                }
            }
        });
        return bomName;
    };

    public async checkExpandAllOpensAllChildNodes(nodeNames: string[]){
        await allureStep(`check if clicking on expand all button opens all child nodes`, async ()=>{
           await w.waitUntilWorkingModalNotDisplayed();
            for(let i: number = 0; i < nodeNames.length; i++) {
               expect(await bomVaultElements.bomTree.bomTreeRowsAll.getText()).toContain(nodeNames[i]);
            }
        });
    };
}