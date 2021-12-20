import {allureStep} from "../helper/allure/allureSteps";
import {browser, ElementFinder} from "protractor";
import {Input} from "./simple/input";
import {commonElements, gridElements} from "../elements/elements";
import {Waiters as w} from "../helper/waiters";
import {Actions} from "../utils/actions";

const input: Input = new Input();

export class TypeAhead {

    public async typeAheadChecking(field:any, value:string){
        await allureStep('Enter ' +value +'in search field, wait for type ahead and check first value', async () => {
            await Actions.sendKeys(field, value);
            await w.waitUntilElementIsDisplayed(commonElements.lookAhead.get(0));
            await w.waitUntilElementIsClickable(commonElements.lookAhead.get(0));
            await browser.sleep(3000);
            await commonElements.lookAhead.get(0).click();
            await w.waitUntilElementNotDisplayed(commonElements.lookAhead.get(0))
        });
    }

    public async typeAheadCheckingForSort(field:any, value:string){
        await allureStep('Enter ' +value +' in search field, wait for type ahead and check first value', async () => {
            await Actions.sendKeys(field, value);
            await browser.sleep(3000);
            await w.waitUntilWorkingModalNotDisplayed();
            // await w.waitUntilElementIsDisplayed(gridElements.columnsSort.mfrTypeAheadOptions.get(0));
            // await w.waitUntilElementIsClickable(gridElements.columnsSort.mfrTypeAheadOptions.get(0));
            await Actions.mouseMoveToElementAndWaitForTooltipStatic(gridElements.columnsSort.mfrTypeAheadOptions.get(0),gridElements.columnsSort.mfrTypeAheadOptionsActive.get(0));
            await Actions.click(gridElements.columnsSort.mfrTypeAheadOptionsActive.get(0));
            await w.waitUntilElementIsDisplayed(gridElements.columnsSort.selectedTags.get(0));
        });
    };

    public async typeAheadNoMatchesFound(field:any, value:string){
        await allureStep("Enter " +value +"in search field, wait for type ahead display value 'No Matches Found'", async () => {
            await input.fillFieldWithValue(field, value);
            await field.click();
            await w.waitUntilElementIsDisplayed(commonElements.lookAhead.get(0));
            await w.waitUntilElementIsClickable(commonElements.lookAhead.get(0));
            await browser.sleep(300);
            await expect(await commonElements.lookAhead.get(0).getText()).toEqual('No matches found');
        });
    };

    public async notBeTypeAhead(field:ElementFinder, value:string){
        await allureStep(`Not be type ahead for ${await field.locator()} with value`, async () => {
            await input.fillFieldWithValue(field, value);
            await browser.sleep(2000);
            await expect(await commonElements.lookAhead.get(0).isPresent()).toBeFalsy();
        });
    };

}