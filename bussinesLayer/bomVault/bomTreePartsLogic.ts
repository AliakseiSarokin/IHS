import {bomVaultElements, gridElements, pageTitles, shadeElements, toolbarElements} from "../../elements/elements";
import {buttonNames, titles} from "../../testData/global";
import {Button} from "../../components/simple/button";
import {Link} from "../../components/simple/link";
import {browser, By, element} from "protractor";
import {Waiters as w} from "../../helper/waiters";
import {JsScripts} from "../../utils/jsScripts";
import {allureStep} from "../../helper/allure/allureSteps";

const button: Button = new Button();
const link = new Link();


export class BomTreePartsLogic {

    async expandFolderBomTreeParts () {
        let result  = await bomVaultElements.bomTreeParts.bomTreeRows.count();
        await browser.sleep(1000); //temporary solution
        //await browser.executeScript("document.getElementsByClassName('icon-container expand-trigger-icon')[0].click()");
        await element.all(By.xpath('//*[name()=\'use\'][contains(@*,\'#ihs-icon-folder\')]//..//..//../div[@class=\'icon-container expand-trigger-icon\']')).get(0).click();
        await browser.waitForAngular();
        await browser.sleep(1000);
    };

    async expandFolderBomTreePartsByName (name:string) {
        await allureStep(`expand Folder Bom Tree Parts By Name`, async ()=>{
            await browser.sleep(1000)
            await w.waitUntilWorkingModalNotDisplayed();
            await bomVaultElements.bomTreeParts.expandFolderByName(name).click();
            await w.waitUntilElementIsDisplayed(await bomVaultElements.bomTreeParts.bomTreeRows.get(4));
        });
    };

    async expandFirstIndenturedBom () {
        await allureStep(`find BOM with indentured icon and expand it`, async ()=>{
            await w.waitUntilElementIsDisplayed(await bomVaultElements.bomTreeParts.bomTreeRows.get(1))
            let rowCount: number = await bomVaultElements.bomTreeParts.bomTreeRows.count();
            for (let i:number =0; i < rowCount-1; i++) {
                if(await bomVaultElements.bomTreeParts.indenturedBomIconByRowNumber(i).isPresent()){
                    await JsScripts.clickByCompoundCssAndNumber(bomVaultElements.bomTreeParts.bomTreePartsRowCss, i, bomVaultElements.bomTreeParts.expandFolderIconCss);
                    break
                }
            }
        });
    };

    public async openFirstBom(bomIndex: number = 0) {
        await allureStep(`Open first BOM in BOM Tree Parts`, async () => {
            await w.waitUntilElementIsClickable(bomVaultElements.bomTreeParts.bomNames.get(bomIndex));
            let result:string  = await bomVaultElements.bomTreeParts.bomNames.get(bomIndex).getText();
            await link.clickOnTheLinkByNameAndWaitForElement(result, gridElements.gridWrapper);
            await w.waitUntilElementIsClickable(gridElements.newGridCheckboxSelector.get(bomIndex));
            await expect(await pageTitles.pageTitle.getText()).toContain(result)
        })
    };

    public async openFirstSubAssambly() {
        await allureStep(`Open first indentured BOM in BOM Tree Parts`, async () => {
            await w.waitUntilElementIsClickable(bomVaultElements.bomTreeParts.bomNames.get(0));
            await w.waitUntilElementIsClickable(bomVaultElements.bomTreeParts.subAssembly.get(0));
            let result:string  = await bomVaultElements.bomTreeParts.subAssembly.get(0).getText();
            await link.clickOnTheLinkByNameAndWaitForElement(result, gridElements.gridWrapper);
            await w.waitUntilElementIsClickable(gridElements.newGridCheckboxSelector.get(0));
            await expect(await pageTitles.pageTitle.getText()).toContain(result)
        })
    }

    public async openBomByName(bomName: string) {
        await allureStep(`Open "${bomName}" BOM in BOM Tree Parts`, async () => {
            await browser.sleep(1000);
            if(!await link.returnElementByLinkName(bomName).isPresent()) {
                const numberOfItems:number =  await bomVaultElements.bomTreeParts.rowItems.count();
                await JsScripts.scrollToElementByCssAndNumber('.node-title',
                    Math.round(numberOfItems/2)-1);
                await browser.sleep(1000);
                if(!await link.returnElementByLinkName(bomName).isPresent()) {
                    await JsScripts.scrollToElementByCssAndNumber('.node-title', numberOfItems-1)
                }
            }
            await link.clickOnTheLinkByNameAndWaitForElement(bomName, gridElements.newGridCheckboxSelector.last());
            await w.waitUntilElementIsClickable(gridElements.newGridCheckboxSelector.last());
            await expect(await pageTitles.homePageTitle.getText()).toContain(bomName);
        })
    };

    public  async goToGenerateReportPageBomTreeParts () {
        await w.waitUntilElementIsDisplayed(pageTitles.pageTitle);
        let result = await pageTitles.pageTitle.getText();
        result = result.substring(result.search(':')+2,result.length);
        if(result.search(':')>0 || result.search(':')==0){
            result = await result.substring(result.search(':')+2,result.length);
        }
        await button.clickByButtonName(buttonNames.generateReportButton);
        await w.waitUntilElementIsClickable(gridElements.grid);
        await w.waitUntilElementIsDisplayed(pageTitles.generereReportTitle.get(0));
        await expect(await pageTitles.generereReportTitle.get(0).getText()).toEqual(titles.generateReport);
        await expect(await pageTitles.generereReportTitle.get(1).getText()).toContain(result);
    };
}