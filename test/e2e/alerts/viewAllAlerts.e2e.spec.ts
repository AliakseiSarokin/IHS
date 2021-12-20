import {buttonNames, meganavItems, exportOptions, columnHeaders} from "../../../testData/global";
import {browser} from "protractor";
import {pageTitles, gridElements, dropdownElements, alertsElements} from "../../../elements/elements";
import {AlertsByBomLogic} from "../../../bussinesLayer/alerts/alertsByBomLogic";
import {Grid} from "../../../components/grid";
import {HelpLogic} from "../../../bussinesLayer/help/helpLogic";
import {InstructionPanel} from "../../../components/instructionPanel";
import {Login} from "../../../components/login";
import {Meganav} from "../../../components/meganav";
import {Modal} from "../../../components/modal";
import {Toolbar} from "../../../components/toolbar";
import {GetPerformanceLogs} from "../../../utils/getPerformanceLogs";
import {IRequestInfoType} from "../../../testData/getPerformLogsInterfaces";
import {StringArray} from "../../../utils/stringArray";
import {endpoints} from "../../../api/testData/endpointList";
import {requestBody} from "../../../api/testData/bodyList";
import {user} from "../../../api/testData/global";
import {RadioButton} from "../../../components/simple/radioButton"
import {Alerts} from "../../../api/logicLayer/alerts";
import {BeforeAfter} from "../../../helper/beforeAfter";
const alertsByBomLogic: AlertsByBomLogic = new AlertsByBomLogic();
const grid:Grid = new Grid();
const helpLogic: HelpLogic = new HelpLogic();
const instructionPanel:InstructionPanel = new InstructionPanel();
const login: Login = new Login();
const meganav:Meganav = new Meganav();
const modal:Modal = new Modal();
const toolbar: Toolbar = new Toolbar();
const radioButton: RadioButton = new RadioButton();

describe('View All Alerts',  () => {

    it('should navigate to View All Alerts',  async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.alerts,
            meganavItems.alertsSubItems.alertsByBom[0], gridElements.grid);
        await expect(await pageTitles.pageTitleShim2.getText()).toEqual('View All Alerts (by BOM)');
    });

    it('should be instruction panel with option to hide/unhide',  async () => {
        await instructionPanel.instrPanelHidingUnhidingChecking('View all alerts');
    });

    it("should open help panel and check title", async () => {
        await helpLogic.openAndCheckHelpPanelTitle('View Alerts by BOM');
    });

    it('should be pagination attributes',  async () => {
        await grid.newGridPaginationChecking();
    });

    it('should be option to go to Last and First Pages',  async () => {
        await grid.goToLastFirstPages();
    });

    it('should be triangle icons in alert type columns, DE127353',  async () => {
        await expect(await alertsElements.alertsByBomHeaderIcon.count()).toEqual(4);
    });

    it('should have unhide button with dropdown list  -  View All Alerts',  async () => {
        await toolbar.unhideDropdown();
    });

    it('should hide the column - View All Alerts',  async () => {
        await grid.newGridHideColumnByName('BOM Owner');
        await toolbar.displayHiddenColumnInDropdonwToolbar('BOM Owner')
    });

    it('should unhide the column with Unhode All -  View All Alerts',  async () => {
        await toolbar.unhideCellNameWithUnhideAll('BOM Owner');
    });

    it('should be filters - View All Alerts ',  async () => {
        const expectedFilterOptions:string[] = [ 'View All Alerts', 'View Alerts for Today',
            'View Alerts for the Last Week', 'View Alerts for the Last 30 Days',
            'View Alerts for the Last 6 Months', 'View Alerts for the Last Year', 'View All My BOMs Alerts' ];
        await toolbar.openToolbarDropdownByButtonName(buttonNames.filter);
        await expect(dropdownElements.dropdownValues.getText()).toEqual(expectedFilterOptions);
        await toolbar.closeToolbarDropdownByButtonName(buttonNames.filter)
    });

    it('should select option and display tag - View All Alerts ',  async () => {
        await toolbar.showFilterOptionsTag(buttonNames.filter);
    });

    it('should display one tag - View All Alerts ',  async () => {
        await toolbar.checkingTagBust(buttonNames.filter);
    });


    it('should remove tag by clicking on clear all tags link - View All Alerts ',  async () => {
        await toolbar.removeWithClearAll();
    });

    it('should remove tag by clicking on X - View All Alerts ',  async () => {
        await toolbar.removeTagWithX(buttonNames.filter);
    });

    it('should open export modal, should be export modal attributes - View All Alerts', async () => {
        await modal.openModalWithButtonByName(buttonNames.export);
        await expect(await modal.modalTitle.getText()).toEqual('Export Alerts');
        await modal.exportModalAttributes(exportOptions.alerts.labels, exportOptions.alerts.options );
        await modal.closeModalWithXButton();
        await modal.openModalWithButtonByName(buttonNames.export);
        await modal.closeModalWithButton(buttonNames.cancel);

    });

    xit('should have column headers for view all alerts',  async () => {
        await grid.newGridCheckingColumnHeaders( columnHeaders.alerts.columns);
    });

    it('should go to Part Alerts by clicking on the BOM Name link ', async () => {
        await alertsByBomLogic.goToSingleBom();
    });

    it("should open help panel and check title", async () => {
        await helpLogic.openAndCheckHelpPanelTitle('View Alerts by BOM');
    });
});

describe('All Alerts export selected alerts',  () => {

    afterEach(async () =>{
        await BeforeAfter.clearCacheCookiesWithLogin(browser.params.userAdminUrl);
    });

    it("should export xls file for all users", async () =>{
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.alerts,
            meganavItems.alertsSubItems.alertsByBom[0], gridElements.checkboxSelector.get(1));
        await modal.openModalWithButtonByName(buttonNames.export);
        await radioButton.checkRadioButtonByLabelName(exportOptions.manageUsers.options[2]);
        await modal.closeModalWithButton(buttonNames.export);
        const reqArr: any = await GetPerformanceLogs.getRequestData();
        const requestData: IRequestInfoType =  await StringArray.getRequestInfoByUrlContain(reqArr, endpoints.alerts.export,
            'POST');
        await expect(requestData.postData).toEqual(requestBody.alerts.allAlertsExportBody(exportOptions.fileFormat[0]));
    });
    it("should export csv file for all users", async () =>{
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.alerts,
            meganavItems.alertsSubItems.alertsByBom[0], gridElements.checkboxSelector.get(1));
        await modal.openModalWithButtonByName(buttonNames.export);
        await radioButton.checkRadioButtonByLabelName(exportOptions.manageUsers.options[3]);
        await modal.closeModalWithButton(buttonNames.export);
        const reqArr: any = await GetPerformanceLogs.getRequestData();
        const requestData: IRequestInfoType =  await StringArray.getRequestInfoByUrlContain(reqArr, endpoints.alerts.export,
            'POST');
        await expect(requestData.postData).toEqual(requestBody.alerts.allAlertsExportBody(exportOptions.fileFormat[1]));
    });
    it("should export txt file for all users", async () =>{
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.alerts,
            meganavItems.alertsSubItems.alertsByBom[0], gridElements.checkboxSelector.get(1));
        await modal.openModalWithButtonByName(buttonNames.export);
        await radioButton.checkRadioButtonByLabelName(exportOptions.manageUsers.options[4]);
        await modal.closeModalWithButton(buttonNames.export);
        const reqArr: any = await GetPerformanceLogs.getRequestData();
        const requestData: IRequestInfoType =  await StringArray.getRequestInfoByUrlContain(reqArr, endpoints.alerts.export,
            'POST');
        await expect(requestData.postData).toEqual(requestBody.alerts.allAlertsExportBody(exportOptions.fileFormat[2]));
    });

    it("should export xls file for selected users", async () =>{
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.alerts,
            meganavItems.alertsSubItems.alertsByBom[0], gridElements.checkboxSelector.get(1));
        await grid.newMechanismCheckboxRangeChecking(0, 1);
        const alertsNameArray: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            columnHeaders.alerts.columns[0]);
        const alertsName: string = alertsNameArray[0];
        await modal.openModalWithButtonByName(buttonNames.export);
        await radioButton.checkRadioButtonByLabelName(exportOptions.manageUsers.options[2]);
        await modal.closeModalWithButton(buttonNames.export);
        const reqArr: any = await GetPerformanceLogs.getRequestData();
        const requestData: IRequestInfoType =  await StringArray.getRequestInfoByUrlContain(reqArr, endpoints.alerts.export,
            'POST');
        const selectedUser:any = await Alerts.returnAlertByKeyValue(user.groupAdmin, 'BM_BOM_NAME', alertsName);
        await expect(requestData.postData).toEqual(requestBody.alerts.selectedAlertsExportBody(exportOptions.fileFormat[0],
            selectedUser[0].id.toString()));
    });
    it("should export csv file for selected users", async () =>{
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.alerts,
            meganavItems.alertsSubItems.alertsByBom[0], gridElements.checkboxSelector.get(1));
        await grid.newMechanismCheckboxRangeChecking(0, 1);
        const alertsNameArray: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            columnHeaders.alerts.columns[0]);
        const userName: string = alertsNameArray[0];
        await modal.openModalWithButtonByName(buttonNames.export);
        await radioButton.checkRadioButtonByLabelName(exportOptions.manageUsers.options[3]);
        await modal.closeModalWithButton(buttonNames.export);
        const reqArr: any = await GetPerformanceLogs.getRequestData();
        const requestData: IRequestInfoType =  await StringArray.getRequestInfoByUrlContain(reqArr, endpoints.alerts.export,
            'POST');
        const selectedUser:any = await Alerts.returnAlertByKeyValue(user.groupAdmin, 'BM_BOM_NAME', userName);
        await expect(requestData.postData).toEqual(requestBody.alerts.selectedAlertsExportBody(exportOptions.fileFormat[1],
            selectedUser[0].id.toString()));
    });
    it("should export txt file for selected users", async () =>{
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.alerts,
            meganavItems.alertsSubItems.alertsByBom[0], gridElements.checkboxSelector.get(1));
        await grid.newMechanismCheckboxRangeChecking(0, 1);
        const userNameArray: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            columnHeaders.alerts.columns[0]);
        const userName: string = userNameArray[0];
        await modal.openModalWithButtonByName(buttonNames.export);
        await radioButton.checkRadioButtonByLabelName(exportOptions.manageUsers.options[4]);
        await modal.closeModalWithButton(buttonNames.export);
        const reqArr: any = await GetPerformanceLogs.getRequestData();
        const requestData: IRequestInfoType =  await StringArray.getRequestInfoByUrlContain(reqArr, endpoints.alerts.export,
            'POST');
        const selectedUser:any = await Alerts.returnAlertByKeyValue(user.groupAdmin, 'BM_BOM_NAME', userName);
        await expect(requestData.postData).toEqual(requestBody.alerts.selectedAlertsExportBody(exportOptions.fileFormat[2],
            selectedUser[0].id.toString()));
    });
});