import {Waiters as w} from "../../helper/waiters";
import {Grid} from "../../components/grid";
import {commonElements, gridElements} from "../../elements/elements";

const grid: Grid = new Grid();

export class MatchMfrLogic {

    public async goToMatchMfr () {
        await w.waitUntilWorkingModalNotDisplayed();
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1,
            'Mfr Exceptions');
        const allRows: number = await gridElements.newGridRows.count();
        for (let i: number = 0; i < allRows; i = i + 1) {
            if(parseInt(await gridElements.newGridUnlockedColumnRowCellsWithContent(i).get(colNumber).getText())> 25) {
                await w.waitUntilWorkingModalNotDisplayed();
                await gridElements.newGridUnlockedColumnLinksByRowAndCellNumbers(i, colNumber).click();
                break
            }
        }
        await w.waitUntilWorkingModalNotDisplayed();
        await w.waitUntilElementIsClickable(commonElements.navTabs.last());
        await w.waitUntilElementIsClickable(gridElements.checkboxSelector.get(1));
        await expect(await commonElements.activeNavTab('Match Manufacturers').isPresent()).toBe(true)
    };
}