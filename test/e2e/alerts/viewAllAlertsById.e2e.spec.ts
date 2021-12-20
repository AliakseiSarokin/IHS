import {AlertsByIdSlderLogic} from "../../../bussinesLayer/alerts/alertsByIdSlderLogic";
const alertByIdAliderLogic: AlertsByIdSlderLogic = new AlertsByIdSlderLogic();
import {Login} from "../../../components/login";
const login: Login = new Login();
import {Meganav} from "../../../components/meganav";
import {MultiSelectDropdown} from "../../../components/multiSelectDropdown";
const multiSelectDropdown: MultiSelectDropdown = new MultiSelectDropdown();
const meganav:Meganav = new Meganav();
import {buttonNames, meganavItems, exportOptions, columnHeaders, linksNames} from "../../../testData/global";
import {
    pageTitles, gridElements, partDetailsElements, alertsElements, dropdownElements,
    sliderElements, commonElements
} from "../../../elements/elements";
import {browser} from "protractor";
import {InstructionPanel} from "../../../components/instructionPanel";
const instructionPanel:InstructionPanel = new InstructionPanel();
import {Dropdown} from "../../../components/dropdown";
import {Grid} from "../../../components/grid";
import {HelpLogic} from "../../../bussinesLayer/help/helpLogic";
import {Link} from "../../../components/simple/link";
import {Modal} from "../../../components/modal";
import {RadioButton} from "../../../components/simple/radioButton";
import {Slider} from "../../../components/slider";
import {Toolbar} from "../../../components/toolbar";
import {JasmineTimeout} from "../../../helper/jasmineTimeout";
import {GetPerformanceLogs} from "../../../utils/getPerformanceLogs";
import {IRequestInfoType} from "../../../testData/getPerformLogsInterfaces";
import {StringArray} from "../../../utils/stringArray";
import {endpoints} from "../../../api/testData/endpointList";
import {requestBody} from "../../../api/testData/bodyList";
import {Alerts} from "../../../api/logicLayer/alerts";
import {user} from "../../../api/testData/global";
import {Button} from "../../../components/simple/button";
import {Waiters as w} from "../../../helper/waiters";

const button:Button = new Button();
const grid:Grid = new Grid();
const radioButton: RadioButton = new RadioButton();
const helpLogic: HelpLogic = new HelpLogic();
const link:Link = new Link();
const modal:Modal = new Modal();
const toolbar: Toolbar = new Toolbar();
import {CheckBox} from '../../../components/simple/checkBox'
const checkbox:CheckBox =new CheckBox();
import {allureStep} from '../../../helper/allure/allureSteps'
import {alertsData} from "../../../testData/alerts";

describe('View My Alerts By ID', () => {

    beforeAll(async () => {
        await JasmineTimeout.setJasmineTimeout(browser.params.maxElementWaitTime);
    });

    afterAll(async () => {
        await JasmineTimeout.setJasmineTimeout(browser.params.waitWebElementMaxTimeout);
    });

    it('should be exect column headers for View Alerts By ID',  async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.alerts,
            meganavItems.alertsSubItems.alertsById[0], gridElements.gridWrapper);
        await expect(await pageTitles.pageTitleShim2.getText()).toEqual('View My Alerts by Alert ID');
        await grid.newGridCheckingColumnHeaders(columnHeaders.alertsById.columns);
        await toolbar.unhideCellNameWithUnhideAll('Alert Number');
    });

    it('should be instruction panel with option to hide/unhide',  async () => {
        await instructionPanel.instrPanelHidingUnhidingChecking('View Alerts by ID');
    });

    it('should have unhide button with dropdown list  - Alerts By ID', async () => {
        await toolbar.unhideDropdown();
    });

    it('should hide the column - Alerts By ID',  async () => {
        await grid.newGridHideColumnByName('Alert Number');
        await toolbar.displayHiddenColumnInDropdonwToolbar('Alert Number')
    });

    it('should unhide the column with Unhode All - Alerts By ID',  async () => {
        await toolbar.unhideCellNameWithUnhideAll('Alert Number');
    });

    it('should be filters',  async () => {
        const filters: string[] =[ 'View Today\'s Alerts', 'View Alerts Last 7 Days', 'View Alerts Last 30 Days',
            'View Alerts Last 90 Days', 'View Alerts Last 180 Days' ];
        await toolbar.openToolbarDropdownByButtonName(buttonNames.filterByDate);
        await expect(dropdownElements.dropdownValues.getText()).toEqual(filters);
        await toolbar.closeToolbarDropdownByButtonName(buttonNames.filterByDate);
    });

    it('should be Filter by Type',  async () => {
        await toolbar.openToolbarDropdownByButtonName(buttonNames.filterByDate);
        await Dropdown.selectValueInDropdownByValueName('View Alerts Last 180 Days');
        await multiSelectDropdown.openMultiSelectDropdownByName(buttonNames.filterByType);
        const filterByTypeOptions = ['End of Life Notice', 'Product Change Notice', 'Part Status Change',
            'Product Failure/Counterfeit Notice' ];
        await expect(await partDetailsElements.filterCheckboxLabel.getText()).toEqual(filterByTypeOptions);
        await multiSelectDropdown.closeMultiSelectDropdownByName(buttonNames.filterByType)
    });

    it('should Filter by Type and validate',  async () => {
        await toolbar.openToolbarDropdownByButtonName(buttonNames.filterByDate);
        await Dropdown.selectValueInDropdownByValueName(alertsData.alertsByIdFilterDropdownValues[4]);
        await grid.newGridOpenFilterBoxByName('Alert Type');
        await button.clickOnTheElement(gridElements.columnsSort.closeButton);
        await w.waitUntilElementIsClickable(gridElements.columnsSort.activeFilterIcon);
        const filterByTypeOptions = ['End of Life Notice', 'Product Change Notice', 'Part Status Change',
            'Product Failure/Counterfeit Notice' ];
        for(let i:number =0;i<filterByTypeOptions.length;i++) {
            await button.clickByButtonName(buttonNames.clearFilter);
            await grid.newGridOpenFilterBoxByName('Alert Type');
            await checkbox.uncheckGridColumnSortCheckByName('(Select All)');
            await checkbox.checkGridColumnSortCheckByName(filterByTypeOptions[i]);
            await button.clickByButtonNameAndWait(buttonNames.applyFilter,gridElements.selectAllCheckboxes.last());
            if (!await gridElements.newGridNoRowsToShowText.get(0).isPresent()) {
                await expect(await gridElements.rowCellsWithContentNewGrid(0, 1).getText()).toEqual(filterByTypeOptions[i]);
            } else {
                await expect(gridElements.newGridNoRowsToShowText.get(0).getText()).toEqual('No Rows To Show');
                await allureStep('No Alerts are present for the selected filter ' + filterByTypeOptions[i], async () => {
                });
            }
            await grid.newGridOpenFilterBoxByName('Alert Type');
        }
        await link.clickOnTheLinkByName(linksNames.clearAllTags);
        });

    it('should Filter by date and validate , 294204',  async () => {
        for(let i:number=0;i<5;i++) {
            await toolbar.openToolbarDropdownByButtonName(buttonNames.filterByDate);
            await Dropdown.selectValueInDropdownByValueName(alertsData.alertsByIdFilterDropdownValues[i]);
            expect(await commonElements.accordionElements.get(0).getText()).toEqual("IHS Alert Date: " + alertsData.alertsByIdFilterDropdownValues[i]);
        }

    });

    it('should Filter by IHS Alert Date column and validate , 294204',  async () => {
        const columns:string[]=['Alert Type', 'Alert Description', 'Affected BOMs', 'User Name',
            'Implementation Date', 'LTB Date']
        const alertType:string[] = ['View Today\'s Alerts','View Alerts Last 7 Days','View Alerts Last 30 Days','View Alerts Last 90 Days','View Alerts Last 180 Days']
        await grid.newGridHideColumnsRange(columns);
        for(let i:number=0;i<5;i++) {
            await grid.newGridOpenFilterBoxByName('IHS Alert Date');
            await grid.switchToFilterColumnMenu();
            await Dropdown.openDropdownByClickOnElement(gridElements.columnsSort.newGridDropdownInput);
            await Dropdown.selectValueInDropdownByValueNameWithoutWait(alertType[i]);
            await button.clickByButtonName(buttonNames.applyFilter);
            expect(await commonElements.accordionElements.get(0).getText()).toEqual("IHS Alert Date: " + alertsData.alertsByIdFilterDropdownValues[i]);
            await w.waitUntilWorkingModalNotDisplayed();
            expect()
        }
        await toolbar.unhideCellNameWithUnhideAll('Alert Number');
    });

    it('should be active inactive Apply button in the  Filter by Type',  async () => {
        await multiSelectDropdown.openMultiSelectDropdownByName(buttonNames.filterByType);
        await multiSelectDropdown.applyButtonChecking();
    });

    it('should apply filter with one value  Filter by Type',  async () => {
        await multiSelectDropdown.singleSelection(buttonNames.filterByType, alertsElements.alertTypeColumns);
    });


    it ( 'should open export modal - Part Alerts' , async () => {
        await modal.openModalWithButtonByName(buttonNames.export);
        await expect(await modal.modalTitle.getText()).toEqual('Export Alerts');
        await modal.exportModalAttributes(exportOptions.alertsById.labels, exportOptions.alertsById.options);
        await modal.closeModalWithXButton();
        await modal.openModalWithButtonByName(buttonNames.export);
        await modal.closeModalWithButton(buttonNames.cancel);
    });


    it('should open View Alert Slider',  async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.alerts,
            meganavItems.alertsSubItems.alertsById[4], gridElements.grid);
        await alertByIdAliderLogic.openAlertsByIdSlider();
    });

    it("should open help panel and check opened subitem", async () => {
        await helpLogic.openHelpPanelAndCheckOpenedSubitem('Open Alert Details');
    });


    it('should be no column sorting for Alert Details Tab',  async () => {
        await grid.notBeSortingPartDetails(2)
    });

    it('should be alert file link in Alert Details Tab',  async () => {
        await expect(link.returnElementByLinkName(linksNames.alertFile).isPresent()).toBeTruthy();
    });

    it('should open Parts Affected tab by clicking on the Manufacturer P/N column',  async () => {
        await alertByIdAliderLogic.openPartsAffectedTabByClickingMfrPNLink();
    });

    it('should open Manufacturer tab by clicking on the Manufacturer Name column',  async () => {
        await alertByIdAliderLogic.goToTabByTabName('Alert Details');
        await alertByIdAliderLogic.openMfrTabByMfrNameLink();
    });

    it('should be no column sorting for Manufacturer Tab',  async () => {
        await alertByIdAliderLogic.goToTabByTabName('Manufacturer');
        await grid.notBeSortingPartDetails(2)
    });

    it('should be column headers for Parts Affected Tab',  async () => {
        await alertByIdAliderLogic.goToTabByTabName('Parts Affected');
        await expect(await gridElements.newGridHeaderNamesInSlider.getText()).toEqual(columnHeaders.alertsById.partsAffectedTabColumns)
    });

    it('should hide column for Parts Affected Tab',  async () => {
        await grid.newGridHideColumnByName('Part Status');
        await toolbar.displayHiddenColumnInDropdonwToolbarSlider('Part Status');
    });

    it('should unhide column for Parts Affected Tab',  async () => {
        await toolbar.unhideCellNameWithUnhideAllInSlider('Part Status')
    });

    it('should open Where Used tab by clicking on the View Affected BOMs link',  async () => {
        await alertByIdAliderLogic.openWhereUsedTabByClickingOnAffectedBomLink();
    });

    it('should be column headers for Where Used Tab',  async () => {
        await browser.sleep(2000);
        await expect(await gridElements.newGridHeaderNamesInSlider.getText())
            .toEqual(columnHeaders.alertsById.whereUsedTabColumns);
    });

    it('should hide column for Where Used  Tab',  async () => {
        await grid.newGridHideColumnByName('BOM Name');
        await toolbar.displayHiddenColumnInDropdonwToolbarSlider('BOM Name');
    });

    it('should unhide column for Where Used Tab',  async () => {
        await toolbar.unhideCellNameWithUnhideAllInSlider('BOM Name')
    });

    it('should be pagination attributes',  async () => {
        await grid.newGridPaginationCheckingInPanel();
    });

    it('should be option to go to Last and First Pages',  async () => {
        await grid.goToLastFirstPages();
    });

    it('should close View Alert Slider',  async () => {
        await Slider.closeSlider(sliderElements.xButtonSlider, pageTitles.pageTitleShim2);
    });

});

describe('Alerts By ID - export ',  () => {

    it("should export xls file", async () =>{
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.alerts,
            meganavItems.alertsSubItems.alertsById[0], gridElements.grid);
        await modal.openModalWithButtonByName(buttonNames.export);
        await radioButton.checkRadioButtonByLabelName(exportOptions.manageUsers.options[2]);
        await modal.closeModalWithButton(buttonNames.export);
        const reqArr: any = await GetPerformanceLogs.getRequestData();
        const requestData: IRequestInfoType =  await StringArray.getRequestInfoByUrlContain(reqArr, endpoints.alerts.all.export,
            'POST');
        await expect(requestData.postData).toEqual(requestBody.alerts.all.exportByFormatAndDays(exportOptions.fileFormat[0], 1));
    });

    it("should export csv file", async () =>{
        await modal.openModalWithButtonByName(buttonNames.export);
        await radioButton.checkRadioButtonByLabelName(exportOptions.manageUsers.options[3]);
        await modal.closeModalWithButton(buttonNames.export);
        const reqArr: any = await GetPerformanceLogs.getRequestData();
        const requestData: IRequestInfoType =  await StringArray.getRequestInfoByUrlContain(reqArr, endpoints.alerts.all.export,
            'POST');
        await expect(requestData.postData).toEqual(requestBody.alerts.all.exportByFormatAndDays(exportOptions.fileFormat[1], 1));
    });

    it("should export txt file", async () =>{
        await modal.openModalWithButtonByName(buttonNames.export);
        await radioButton.checkRadioButtonByLabelName(exportOptions.manageUsers.options[4]);
        await modal.closeModalWithButton(buttonNames.export);
        const reqArr: any = await GetPerformanceLogs.getRequestData();
        const requestData: IRequestInfoType =  await StringArray.getRequestInfoByUrlContain(reqArr, endpoints.alerts.all.export,
            'POST');
        await expect(requestData.postData).toEqual(requestBody.alerts.all.exportByFormatAndDays(exportOptions.fileFormat[2], 1));
    });

    it("should export xls file for selected alerts", async () =>{
        const alerts: any = await Alerts.getAllAlertsListByDays(user.userAdmin, 181);
        await login.loginWithDirectLink(browser.params.userAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.alerts,
            meganavItems.alertsSubItems.alertsById[4], gridElements.checkboxSelector.get(0));
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await modal.openModalWithButtonByName(buttonNames.export);
        await radioButton.checkRadioButtonByLabelName(exportOptions.manageUsers.options[2]);
        await modal.closeModalWithButton(buttonNames.export);
        const reqArr: any = await GetPerformanceLogs.getRequestData();
        const requestData: IRequestInfoType =  await StringArray.getRequestInfoByUrlContain(reqArr, endpoints.alerts.all.export,
            'POST');
        await expect(requestData.postData).toEqual(requestBody.alerts.all.exportByFormatDaysAndAlertsId(exportOptions.fileFormat[0], 183,
            [alerts[0].CF_ALERT_PTR]));
    });

    it("should export csv file for selected alerts", async () =>{
        const alerts: any = await Alerts.getAllAlertsListByDays(user.userAdmin, 181);
        await modal.openModalWithButtonByName(buttonNames.export);
        await radioButton.checkRadioButtonByLabelName(exportOptions.manageUsers.options[3]);
        await modal.closeModalWithButton(buttonNames.export);
        const reqArr: any = await GetPerformanceLogs.getRequestData();
        const requestData: IRequestInfoType =  await StringArray.getRequestInfoByUrlContain(reqArr, endpoints.alerts.all.export,
            'POST');
        await expect(requestData.postData).toEqual(requestBody.alerts.all.exportByFormatDaysAndAlertsId(exportOptions.fileFormat[1], 183,
            [alerts[0].CF_ALERT_PTR]));
    });

    it("should export txt file for selected alerts", async () =>{
        const alerts: any = await Alerts.getAllAlertsListByDays(user.userAdmin, 181);
        await modal.openModalWithButtonByName(buttonNames.export);
        await radioButton.checkRadioButtonByLabelName(exportOptions.manageUsers.options[4]);
        await modal.closeModalWithButton(buttonNames.export);
        const reqArr: any = await GetPerformanceLogs.getRequestData();
        const requestData: IRequestInfoType =  await StringArray.getRequestInfoByUrlContain(reqArr, endpoints.alerts.all.export,
            'POST');
        await expect(requestData.postData).toEqual(requestBody.alerts.all.exportByFormatDaysAndAlertsId(exportOptions.fileFormat[2], 183,
            [alerts[0].CF_ALERT_PTR]));
    });

});