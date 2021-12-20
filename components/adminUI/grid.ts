import {
    adminGridElements, adminHeaderContent, adminLeftSideBar, adminModalElements,
    adminUsersElements
} from "../../elements/elements";
import {Actions} from "../../utils/actions";
import {allureStep} from "../../helper/allure/allureSteps";
import {Waiters as w} from "../../helper/waiters";
import {Button} from "../simple/button";
import {browser, ElementFinder} from "protractor";
import {JsScripts} from "../../utils/jsScripts";
const button:Button = new Button();
const actions: Actions=new Actions();

export class AdminGrid {

    public async openFilterBoxByName(cellName: string) {
        await allureStep('Open header ' + cellName + ' filter box', async () => {
            await w.waitUntilElementIsClickable(await adminUsersElements.columnHeadersNames.get(1));
            const headerNames: string[] = await adminUsersElements.columnHeadersNames.getText();
            for (let i: number = 0; i < headerNames.length; i++) {
                if (headerNames[i] === cellName) {
                    await Actions.mouseMoveToElementStatic(adminUsersElements.openFilterButton.get(i));
                    await w.waitUntilElementIsClickable(adminUsersElements.openFilterButton.get(i));
                    await button.clickOnTheElement(adminUsersElements.openFilterButton.get(i));
                    await w.waitUntilElementIsDisplayed(await adminGridElements.menuOptionBox.first());
                    break
                }
            }
        });
    };

    public async selectOptionInColumnFilter(optionName: string) {
        await allureStep(`Select column option name ${optionName}`, async () => {
            await w.waitUntilElementIsDisplayed(adminGridElements.columnFilterOptionByName(optionName));
            await w.waitUntilElementIsClickable(adminGridElements.columnFilterOptionByName(optionName));
            await button.clickOnTheElementAndWaitNotDisplayed(adminGridElements.columnFilterOptionByName(optionName),
                adminGridElements.menuOptionBox.last());
        })
    };

    public async checkOptionInColumnFilter(textArr: string[], optionName: string) {
        await allureStep("check column option in column filter", async () => {
                for (let i:number = 0; i < textArr.length-1; i++) {
                    await this.openFilterBoxByName(textArr[i]);
                    await this.selectOptionInColumnFilter(optionName);
                }
        })
    };

    public async openModalByLink(link: ElementFinder) {
        await allureStep('Open modal by click on the link', async () => {
            await w.waitUntilElementIsDisplayed(link);
            await w.waitUntilElementIsClickable(link);
            await link.click();
            await w.waitUntilElementIsDisplayed(adminModalElements.panelBody);
        });
    };

    public async returnColumnNumberByColumnName(columnHeaderName: string): Promise<number> {
        let headerText: string[];
        await w.waitUntilElementIsDisplayed(await adminUsersElements.columnHeadersNames.first());
        headerText = await adminUsersElements.columnHeadersNames.getText();
        for (let i: number = 0; i < headerText.length; i++) {
            if (headerText[i] === columnHeaderName) {
                return i
            }
        }
    };

    public async hideColumnByColumnNumber(columnNumber: number) {
        await allureStep(`Hide column by number ${columnNumber}`, async () => {
            await w.waitUntilElementIsDisplayed(await adminGridElements.columnHeaderByNumber(columnNumber));
            await actions.mouseMoveToElement(await adminGridElements.columnHeaderByNumber(columnNumber));
            await actions.mouseDownToElement(await adminGridElements.columnHeaderByNumber(columnNumber));
            await actions.mouseMoveToElement(adminHeaderContent.logo);
            await actions.mouseMoveUp();
            await actions.mouseUp();
        });
    };

    public async checkUsersInListWithCtrl(el) {
        await allureStep(`check Users in list`, async () => {
            await w.waitUntilElementIsDisplayed(await adminUsersElements.allHyperlinksOnPage.get(0));
            await Actions.clickOnElementWithControl(el);
        });
    };

    public async checkActiveButtonInGrid(names: string[]) {
        await allureStep('Check active buttons in grid menu', async () => {
            await w.waitUntilElementIsDisplayed(await adminGridElements.activeToolbarButtons.get(0));
            await expect(await adminGridElements.activeToolbarButtons.getText()).toEqual(names)
        });
    };

    public async checkDisabledButtonInGrid(names: string[]) {
        await allureStep('Check disabled buttons in grid menu', async () => {
            await w.waitUntilElementIsDisplayed(await adminGridElements.disabledToolbarButtons.get(0));
            await expect(await adminGridElements.disabledToolbarButtons.getText()).toEqual(names)
        });
    };
 	public async checkUsersInGridList(range:number) {
        await allureStep(`check Users in list`, async () => {
            await w.waitUntilElementIsDisplayed(await adminUsersElements.allHyperlinksOnPage.get(0));
            await w.waitUntilWorkingModalNotDisplayed();
            for(let i:number=0;i<range;i++){
                await adminUsersElements.gridCheckBox.get(i).click();
            }
        });
    };

    public async changeColumnSize() {
        await allureStep('change column size', async () => {
            await actions.mouseMoveToElement(await adminUsersElements.columnHeaderBorder.get(0));
            await actions.mouseDownToElement(await adminUsersElements.columnHeaderBorder.get(0));
            await actions.mouseMoveRight();
            await actions.mouseUp();
        });
    };

    public async checkResetButton() {
        await allureStep('check Reset button', async () => {
            await adminGridElements.gridButtonByName('Reset').click();
            const columnWidth: any = await JsScripts.returnElementWidthByCssAndNumber(adminUsersElements.columnHeaderDiv,
                0)
            await this.changeColumnSize();
            await adminGridElements.gridButtonByName('Reset').click();
            expect(await JsScripts.returnElementWidthByCssAndNumber(adminUsersElements.columnHeaderDiv,
                0)).toEqual(columnWidth)
        });
    };

    public async checkAllCheckbox() {
        await allureStep('check all checkbox', async () => {
            await w.waitUntilElementIsDisplayed(await adminGridElements.allheaderCheckbox);
            await adminGridElements.allheaderCheckbox.click();
            expect((await adminGridElements.checkedCells.get(0)).isDisplayed()).toBeTruthy();
            await adminGridElements.allheaderCheckbox.click();
            expect((await adminGridElements.checkedCells.get(0)).isPresent()).toBeFalsy();

        });
    };

}