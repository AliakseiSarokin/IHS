import {browser, ElementArrayFinder} from "protractor";
import {Button} from "../../components/simple/button";
import {Actions} from "../../utils/actions";
import {gridElements} from "../../elements/elements";
import {Waiters as w} from "../../helper/waiters";

const actions: Actions = new Actions();
const button: Button = new Button();
const statusBool: any = {
    'ng-empty': false,
    'ng-not-empty': true
};

export class CheckBox{

    public async checkUnCheckCheckboxes(labels: any, inputs: any, status:string) {
        let count: number = await inputs.count();
        for (let i:number = 0; i < count; i++) {
            if(!((await inputs.get(i).isSelected())==statusBool[status])){
                await w.waitUntilWorkingModalNotDisplayed();
                await actions.mouseMoveToElement(labels.get(i));
                await button.clickOnTheElement(labels.get(i))
            }
        }
    };

    public async checkUnCheckCheckboxesBool(labels: any, inputs: any, status:boolean) {
        let count: number = await inputs.count();
        for (let i:number = 0; i < count; i++) {
            if(!((await inputs.get(i).isSelected())==status)){
                await w.waitUntilWorkingModalNotDisplayed();
                await actions.mouseMoveToElement(labels.get(i));
                await button.clickOnTheElement(labels.get(i))
            }
        }
    };

    public async checkUnCheckSingleCheckbox(label: any, input: any, status:string) {
        if(!((await input.isSelected())==statusBool[status])){
            await w.waitUntilWorkingModalNotDisplayed();
            await actions.mouseMoveToElement(label);
            await button.clickOnTheElement(label)
        }
    };

    public async checkUnCheckCheckboxRange(labels: any, inputs: any, status:string, startValue: number, endValue:number) {
        await w.waitUntilElementIsDisplayed(labels.get(startValue));
        for (let i:number = startValue; i < endValue; i++) {
            if(!((await inputs.get(i).isSelected())==statusBool[status])){
                await w.waitUntilWorkingModalNotDisplayed();
                await actions.mouseMoveToElement(labels.get(i));
                await button.clickOnTheElement(labels.get(i))
            }
        }
    };

    public async checkUnCheckCheckboxesWithJs(cssForLabel: string, inputs: any, status:string) {
        let count: number = await inputs.count();
        for (let i:number = 0; i < count; i++) {
            if(!((await inputs.get(i).isSelected())==statusBool[status])){
                await w.waitUntilWorkingModalNotDisplayed();
                await browser.executeScript("document.querySelectorAll('"+cssForLabel+"')["+i+"].click()")
            }
        }
    };

    public async checkCheckboxesStatus(inputs: ElementArrayFinder, status:string) {
        const count: number = await inputs.count();
        for (let i:number = 0; i < count; i++) {
            await expect(await inputs.get(i).isSelected()).toEqual(statusBool[status])
        }
    };

    public async checkGridColumnSortCheckByName(name:string) {
        await w.waitUntilElementIsClickable(gridElements.columnsSort.checkboxLabels.get(0));
        const checkboxNames:string[] = await gridElements.columnsSort.checkboxLabels.getText();
        for(let i: number = 0; i < checkboxNames.length; i++) {
            if(!(checkboxNames[i] === name &&
                ((await gridElements.columnsSort.checkboxInputs.get(i).getAttribute('class')).includes('ag-checked'))))
            {
                await w.waitUntilWorkingModalNotDisplayed();
                await gridElements.columnsSort.checkboxLabels.get(i).click();
            }
        }
    };

    public async uncheckGridColumnSortCheckByName(name:string) {
        await w.waitUntilElementIsClickable(gridElements.columnsSort.checkboxLabels.get(0));
        const checkboxNames:string[] = await gridElements.columnsSort.checkboxLabels.getText();
        for(let i: number = 0; i < checkboxNames.length; i++) {
            if(checkboxNames[i] === name &&
                ((await gridElements.columnsSort.checkboxInputs.get(i).getAttribute('class')).includes('ag-checked')))
            {
                await w.waitUntilWorkingModalNotDisplayed();
                await gridElements.columnsSort.checkboxLabels.get(i).click();
            }
        }
    }

}