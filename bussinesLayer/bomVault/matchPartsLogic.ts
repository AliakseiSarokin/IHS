import {Waiters as w} from "../../helper/waiters";
import {Grid} from "../../components/grid";
import {allureStep} from "../../helper/allure/allureSteps";
import {gridElements, commonElements} from "../../elements/elements";
import {browser} from "protractor";

const grid: Grid = new Grid();


export class MatchPartsLogic {

    public async goToMatchParts () {
        await allureStep(`Go to Match Parts`, async () => {
             await w.waitUntilWorkingModalNotDisplayed();
             const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1,
                 'Part Exceptions');
             const allRows: number = await gridElements.newGridRows.count();
             let resArr: string[] = [];
                for (let i: number = 0; i < allRows; i = i + 1) {
                 if(parseInt(await gridElements.newGridUnlockedColumnRowCellsWithContent(i).get(colNumber).getText())> 100) {
                     await w.waitUntilWorkingModalNotDisplayed();
                     await gridElements.newGridUnlockedColumnLinksByRowAndCellNumbers(i, colNumber).click();
                     break
                 }
             }
             await w.waitUntilWorkingModalNotDisplayed();
             await w.waitUntilElementIsDisplayed(gridElements.gridWrapper);
             await w.waitUntilElementIsClickable(gridElements.checkboxSelector.get(1));
             await browser.sleep(1000);
             await w.waitUntilWorkingModalNotDisplayed();
             await w.waitUntilElementIsDisplayed(gridElements.gridWrapper);
             await w.waitUntilElementIsDisplayed(gridElements.newGridCheckboxSelector.last());
             await w.waitUntilElementIsClickable(gridElements.newGridCheckboxSelector.last());
             await w.waitUntilWorkingModalNotDisplayed();
             await expect(await commonElements.activeNavTab('Match Parts').isPresent()).toBe(true)
        });
    };
};

export class MatchManufacturersLogic {

    public static async goToMatchManufacturers () {
        await w.waitUntilWorkingModalNotDisplayed();
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1,
            'Mfr Exceptions');
        const allRows: number = await gridElements.newGridRows.count();
        let resArr: string[] = [];
        for (let i: number = 0; i < allRows; i = i + 1) {
            if(parseInt(await gridElements.newGridUnlockedColumnRowCellsWithContent(i).get(colNumber).getText())> 25) {
                await w.waitUntilWorkingModalNotDisplayed();
                await gridElements.newGridUnlockedColumnLinksByRowAndCellNumbers(i, colNumber).click();
                break
            }
        }
        await w.waitUntilElementIsDisplayed(gridElements.gridWrapper);
        await w.waitUntilElementIsClickable(gridElements.checkboxSelector.get(1));
        await expect(await commonElements.activeNavTab('Match Manufacturers').isPresent()).toBe(true)
    };
};