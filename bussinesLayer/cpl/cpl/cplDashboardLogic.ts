import {browser} from "protractor";
import {commonElements, cplElements, gridElements} from "../../../elements/elements";
import {Button} from "../../../components/simple/button";
import {CommonCplLogic} from "./commonCplLogic";
import {Dropdown} from "../../../components/dropdown";
import {Modal} from "../../../components/modal";
import {Toolbar} from "../../../components/toolbar";
import {Waiters as w} from "../../../helper/waiters";
import {buttonNames} from "../../../testData/global";

const button: Button = new Button();
const commonCplLogic: CommonCplLogic = new CommonCplLogic();
const modal: Modal = new Modal();
const toolbar: Toolbar = new Toolbar();

export class CplDashboardLogic {

    public async cplSummaryPartCountChecking(){
        let result:string = await cplElements.dashboard.partsSummaryRowCounts.get(0).getText();
        await commonCplLogic.goToTab('CPL Details', gridElements.gridWrapper);
        let value:any = await gridElements.gridCounter.getText();
        let newArr:any =[];
        newArr = value.split(" ");
        await expect(parseInt(newArr[4])).toBeLessThan(parseInt(result));
    };

    private async _goToTabAndSelectValueInToolbarDropdown(tabName: string, toolbarButtonName: string,
                                                         filterOptionName:string) {
        await browser.waitForAngularEnabled(false);
        await commonCplLogic.goToTab(tabName, gridElements.gridWrapper);
        await browser.sleep(1000);
        await toolbar.openToolbarDropdownByButtonName(toolbarButtonName);
        await Dropdown.selectValueInDropdownByValueName(filterOptionName);
    };

    private async _goToTabByNumberAndSelectValueInToolbarDropdown(tabNumber: number, toolbarButtonName: string,
                                                          filterOptionName:string) {
        await browser.waitForAngularEnabled(false);
        await commonCplLogic.goToTabByNumber(tabNumber, gridElements.gridWrapper);
        await browser.sleep(1000);
        await toolbar.openToolbarDropdownByButtonName(toolbarButtonName);
        await Dropdown.selectValueInDropdownByValueName(filterOptionName);
    };

    public async cplSummaryMatchUnmatchPartCountChecking(dashBoardOption:number, tabName: number, toolbarButtonName: string,
                                                  filterOptionName:string ){
        await w.waitUntilElementIsDisplayed(await cplElements.dashboard.partsSummaryRowCounts.get(0));
        let result:string = await cplElements.dashboard.partsSummaryRowCounts.get(dashBoardOption).getText();
        await this._goToTabByNumberAndSelectValueInToolbarDropdown(tabName, toolbarButtonName, filterOptionName);
        let value:string = await gridElements.gridCounter.getText();
        let newArr:any=[];
        newArr =value.split(" ");
        await expect(await gridElements.gridCounter.getText()).toContain('of ' + result + ' items');
    };

    public async cplSummaryMatchUnmatchPartCountCheckingLessThan(dashBoardOption:number, tabName: string, toolbarButtonName: string,
                                                          filterOptionName:string){
        await w.waitUntilElementIsDisplayed(await cplElements.dashboard.partsSummaryRowCounts.get(1));
        let result:string = await cplElements.dashboard.partsSummaryRowCounts.get(dashBoardOption).getText();
        await this._goToTabAndSelectValueInToolbarDropdown(tabName, toolbarButtonName, filterOptionName);
        let value:string = await gridElements.gridCounter.getText();
        let newArr:any=[];
        newArr =value.split(" ");
        await expect(parseInt(newArr[4])).toBeLessThan(parseInt(result));

    };

    public async cplSummaryMatchUnmatchMfrCountChecking(dashBoardOption:number, tabNumber:number, toolbarOption:string, filterOption:string ){
        let result:string = await cplElements.dashboard.mfrSummaryRowCounts.get(dashBoardOption).getText();
        await this._goToTabByNumberAndSelectValueInToolbarDropdown(tabNumber, toolbarOption,filterOption);
        await browser.sleep(1000);
        await expect(await gridElements.gridCounter.getText()).toContain('of ' + result + ' items');

    };


    public async cplSummaryMatchUnmatchMfrCountCheckingLessThan(dashBoardOption:number, tabNumber:number, toolbarOption:string,
                                                         filterOption:string ){
        let result:string = await cplElements.dashboard.mfrSummaryRowCounts.get(dashBoardOption).getText();
        await this._goToTabByNumberAndSelectValueInToolbarDropdown(tabNumber, toolbarOption, filterOption);
        let value = await gridElements.gridCounter.getText();
        let newArr:any[] =[];
        newArr =value.split(" ");
        await expect(parseInt(newArr[4])).toBeLessThan(parseInt(result));
    };

    public async cplSummaryPartExceptionsCountChecking(element:any){
        await w.waitUntilElementIsDisplayed(await cplElements.dashboard.partsSummaryRowCounts.get(2));
        if (element.get(2).getText() == '0'){
                await expect(await commonElements.badgePartExceptions.isDisplayed()).toBe(false);
            }
        else {
            await expect(await commonElements.badgePartExceptions.getText())
                .toEqual(element.get(2).getText());
        }
    };

    public async cplSummaryManufacturersExceptionsCountChecking(element:any){
        await w.waitUntilElementIsDisplayed(await cplElements.dashboard.partsSummaryRowCounts.get(2));
        if (element.get(2).getText() == '0'){
            await expect(await commonElements.badgeManufacturerExceptions.isDisplayed()).toBe(false);
        }
        else {
            await expect(await commonElements.badgeManufacturerExceptions.getText())
                .toEqual(element.get(2).getText());
        }
    };

    public async checkingPartAlertsLInks (linkNumber) {
        await w.waitUntilElementIsDisplayed(await cplElements.dashboard.partsSummaryRowCounts.get(1));
        let result = await cplElements.dashboard.partAlertsLinks.get(linkNumber).getText();
        await cplElements.dashboard.partAlertsLinks.get(linkNumber).click();
        await w.waitUntilElementIsDisplayed(gridElements.gridWrapper);
        await w.waitUntilWorkingModalNotDisplayed();
        //await w.waitUntilElementIsDisplayed(gridElements.gridLinks.first());
        await browser.sleep(1500);
        let totalItemsText = await gridElements.gridCounter.getText();
        let totalItemsTextToArray = totalItemsText.split(' ');

        if (result === '0') {
            await expect(await gridElements.noResultsFound.isDisplayed()).toBe(true);
        }
        if (result === '1') {
            await expect(await gridElements.gridCounter.getText()).toContain('of ' + result + ' items');
        }else {
            let percentageDifference: number = Number(result)*100/Number(totalItemsTextToArray[4])-100;
            await expect(percentageDifference).toBeLessThan(1);
        }
        // else {
        //     await expect(await gridElements.gridCounter.getText()).toContain('of ' + result + ' items');

        await browser.navigate().back();
        await w.waitUntilElementIsDisplayed(cplElements.dashboard.waitElementDashboard);
    };

    public async goToSection(buttonText:string, section:any, title:string) {
        await browser.waitForAngularEnabled(false);
        await w.waitUntilElementIsClickable(await button.returnButtonByText(buttonText));
        await button.clickByButtonName(buttonText);
        await w.waitUntilElementNotDisplayed(modal.modalTitle);
        await w.waitUntilElementIsDisplayed(section);
        await w.waitUntilElementIsDisplayed(await cplElements.dashboard.summarySectionTitle.get(0));
        await expect(await cplElements.dashboard.sectionTitle.getText()).toEqual(title);
    };

    public async diagramDisplaying(count:number){
        await w.waitUntilElementIsDisplayed(await cplElements.dashboard.diagram.get(0));
        let result:number = await cplElements.dashboard.diagram.count();
        await expect(result).toEqual(count);
        for (let i:number=0; i<result;i++){
            await expect(cplElements.dashboard.diagram.get(i).isDisplayed()).toBeTruthy();
        }
    };

    async viewAsSinglePage(){
        await button.clickByButtonName(buttonNames.viewAsASinglePage);
        await w.waitUntilWorkingModalNotDisplayed();
        await browser.sleep(1000);
        await w.waitUntilElementIsDisplayed(cplElements.dashboard.waitElementDashboard,true);
        await w.waitUntilElementIsDisplayed(await cplElements.dashboard.summarySectionTitle.get(12));
        const expectedSection = [ 'CPL Dashboard: Summary', 'CPL Dashboard: Manufacturer Preferences Summary',
            'CPL Dashboard: Matching', 'CPL Dashboard: Life Cycle', 'CPL Dashboard: Environmental' ];
        await expect(await cplElements.dashboard.viewSInglePageSections.getText()).toEqual(expectedSection);
        const sectionTitles =[ 'CPL Parts Summary', 'CPL Manufacturers Summary', 'CPL Life Cycle Summary', '' +
        'CPL Life Cycle Risk Score', 'CPL Alerts', 'CPL Manufacturer Preferences Summary',
            'CPL Manufacturer Matching', 'CPL Part Matching', 'CPL Life Cycle Health Chart', 'CPL Available Parts',
            'CPL Discontinued Parts', 'EU RoHS Compliance', 'China RoHS Compliance', 'REACH Compliance'];
        await expect(await cplElements.dashboard.summarySectionTitle.getText()).toEqual(sectionTitles);
    };

    async mfrPrefLabelsChecking() {
        const expectedLabels = [ 'Total Parts with Preferred Manufacturers', 'Parts with Manufacturer Approved Status',
            'Parts with Manufacturer Approval Required Status', 'Parts with Manufacturer Not Approved Status',
            'Parts with Manufacturer Do Not Use Status', 'Parts with Manufacturer Other Status',
            'Parts with No Manufacturer Preference Status' ];
        await expect(await cplElements.dashboard.partsSummaryRowLabels.getText()).toEqual(expectedLabels);
    };
}