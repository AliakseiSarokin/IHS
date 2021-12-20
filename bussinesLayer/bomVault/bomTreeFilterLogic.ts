import {bomVaultElements} from "../../elements/elements";
import {Button} from "../../components/simple/button";
import {BomTreePartsLogic} from "./bomTreePartsLogic";
import {Grid} from "../../components/grid";
import {ElementAttributes} from "../../utils/elementAttributes";
import {Input} from "../../components/simple/input";
import {Random} from "../../utils/random";
import {Waiters as w} from "../../helper/waiters";
import {buttonNames} from "../../testData/global";
import {browser} from "protractor";

const button: Button = new Button()
const bomTreePartsLogic: BomTreePartsLogic = new BomTreePartsLogic();
const grid: Grid = new Grid();
const elementAttributes: ElementAttributes = new ElementAttributes();
const input: Input = new Input();
const random: Random = new Random();

export class BomTreeFilterLogic {

    public async openBomTreeFilter() {
        await bomVaultElements.bomTreeFilter.bomTreeFilterIcon.click();
        await w.waitUntilElementIsClickable(bomVaultElements.bomTreeFilter.filterBody);
        await w.waitUntilElementIsClickable(bomVaultElements.bomTreeFilter.bomTreeFilterTitle);
        await expect(await bomVaultElements.bomTreeFilter.bomTreeFilterTitle.getText()).toEqual('BOM Tree Filter (click and drag to move the filter window)');
        await expect(await bomVaultElements.bomTreeFilter.bomTreeFilterSubtitle.getText()).toEqual('Use the filter to find folder and/or BOM names. ' +
            'Enter search text and press Enter or click Go to find matches.');
    };

    public async closeBomTreeFilter() {
        await bomVaultElements.bomTreeFilter.bomTreeFilterXButton.click();
        await w.waitUntilElementNotDisplayed(bomVaultElements.bomTreeFilter.filterBody);
        await expect(await bomVaultElements.bomTreeFilter.bomTreeFilterActive.isPresent()).toBeFalsy();
    };

    async iconDefenitionPanelChecking() {
        await expect(await bomVaultElements.bomTreeFilter.iconDefenition.getText()).toEqual('Icon Definitions:');
        const iconsText = ['My Flat BOM File', 'Flat BOM File', 'My Folder', 'Folder', 'My Indentured Folder',
            'Indentured Folder', 'Sub-Assembly'];
        await w.waitUntilElementIsDisplayed(bomVaultElements.bomTreeFilter.iconsTypeText.get(0));
        await w.waitUntilElementIsClickable(bomVaultElements.bomTreeFilter.iconsTypeText.get(0));
        await expect(await bomVaultElements.bomTreeFilter.iconsTypeText.getText()).toEqual(iconsText);
    };

    async searchPanelChecking() {
        await expect(await elementAttributes.getElementAttribute(bomVaultElements.bomTreeFilter.bomTreeFilterSearchField, 'placeholder'))
            .toEqual('Enter search term');
        await input.fillFieldWithValue(bomVaultElements.bomTreeFilter.bomTreeFilterSearchField, random.randomTextGenerator(10));
        await w.waitUntilElementIsClickable(bomVaultElements.bomTreeFilter.bomTreeFilterSearchFieldXButton);
        await bomVaultElements.bomTreeFilter.bomTreeFilterSearchFieldXButton.click();
        await expect((await elementAttributes.getElementAttribute(bomVaultElements.bomTreeFilter.bomTreeFilterSearchField, 'value')).length)
            .toEqual(0);
        await expect(await elementAttributes.getElementAttribute(bomVaultElements.bomTreeFilter.goButton, 'title'))
            .toEqual('Click to filter the Tree');
    };

    async searchUnexisctedItem() {
        await input.fillFieldWithValue(bomVaultElements.bomTreeFilter.bomTreeFilterSearchField, random.randomTextGenerator(10));
        await bomVaultElements.bomTreeFilter.goButton.click();
        await w.waitUntilElementIsClickable(bomVaultElements.bomTreeFilter.filterBody);
        await w.waitUntilElementIsDisplayed(bomVaultElements.bomTreeFilter.noResult);
    };

    async searchExistedItem() {
        const bomName: string = await bomVaultElements.bomTreeParts.bomNameLink.get(1).getText();
        await input.fillFieldWithValue(bomVaultElements.bomTreeFilter.bomTreeFilterSearchField, bomName);
        await browser.sleep(1000);
        await bomVaultElements.bomTreeFilter.goButton.click();
        await w.waitUntilElementIsClickable(bomVaultElements.bomTreeFilter.folderOrBomName.get(0));
        await expect(await bomVaultElements.bomTreeFilter.folderOrBomName.get(0).getText()).toEqual(bomName);
        // await expect(bomVaultElements.bomTreeFilter.highlightItem(bomName).isPresent()).toBeTruthy();

    };

    async highlightItemInTheGrid() {
        const bomName: string = await bomVaultElements.bomTreeParts.bomNameLink.get(1).getText();
        await bomVaultElements.bomTreeFilter.searchItem.get(0).click();
        await expect(await elementAttributes.getElementAttribute(bomVaultElements.bomTreeFilter.folderOrBomNameRow.get(0), 'style'))
            .toContain('background-color: rgb(201, 221, 225)');
        await expect(await bomVaultElements.bomTreeFilter.bomTreeRows.get(0).getText())
            .toContain(bomName);
    };

    async highlightItemInTheBomTreePartsGrid() {
        await bomVaultElements.bomTreeFilter.searchItem.get(0).click();
        await expect(await elementAttributes.getElementAttribute(bomVaultElements.bomTreeFilter.folderOrBomNameRow.get(0), 'style'))
            .toContain('background-color: rgb(201, 221, 225)');
        await expect(await elementAttributes.getElementAttribute(bomVaultElements.bomTreeParts.bomTreePartsRowHighlighted.get(0), 'class'))
            .toContain('hightlighted');
    };

    async leaveSearchResultsAfterClosingSlider() {
        await this.closeBomTreeFilter();
        await this.openBomTreeFilter();
        let bomName = await bomVaultElements.bomTreeParts.bomNameLink.get(1).getText();
        await expect(await elementAttributes.getElementAttribute(bomVaultElements.bomTreeFilter.bomTreeFilterSearchField, 'value'))
            .toContain(bomName);

    };

    async toolbarOptionsWithOpenFilterBomTree() {
        await grid.checkCheckboxRange(1, 2);
        await expect(await button.returnButtonByText(buttonNames.generateReportButton).isEnabled()).toBeTruthy();
    };

    async toolbarOptionsWithOpenFilterBomTreeParts() {
        await bomTreePartsLogic.expandFolderBomTreeParts();
        await bomTreePartsLogic.openFirstBom();
        await expect(await button.returnButtonByText(buttonNames.generateReportButton).isEnabled()).toBeTruthy();
    };

    async toolbarOptionsWithOpenFilterManageAlertSubs() {
        await grid.checkCheckboxRange(1, 2);
        await expect(await button.returnButtonByText(buttonNames.manageEmailAddresses).isEnabled()).toBeTruthy();
        await grid.checkCheckboxRange(1, 2);
    };

    async checkOwnerInColumn() {
        const BOMOwners: string[] = await grid.newGridReturnCellValuesByColumnName(1, 'BOM Owner');
        for (let i = 0; i < BOMOwners.length; i++) {
            await expect(BOMOwners[i]).toEqual('b4testadmin');
        }
    };

}