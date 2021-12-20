import {
    buttonNames, meganavItems, titles, exportOptions, modalTitles, columnHeaders,
    headerItems, linksNames
} from "../../../testData/global";
import {
    pageTitles, gridElements, commonElements, administrationElements,
    dropdownElements, headerElements, shadeElements
} from "../../../elements/elements";
import {browser} from "protractor";
import {Button} from "../../../components/simple/button";
import {Dropdown} from "../../../components/dropdown";
import {Grid} from "../../../components/grid";
import {InstructionPanel} from "../../../components/instructionPanel";
import {Header} from "../../../components/header";
import {Link} from "../../../components/simple/link";
import {Login} from "../../../components/login";
import {ManageUsersLogic} from "../../../bussinesLayer/adminstration/manageUsersLogic";
import {Meganav} from "../../../components/meganav";
import {Modal} from "../../../components/modal";
import {Toolbar} from "../../../components/toolbar";
import {Shade} from "../../../components/shade";
import {HelpLogic} from "../../../bussinesLayer/help/helpLogic";
import {GetPerformanceLogs} from "../../../utils/getPerformanceLogs";
import {IRequestInfoType} from "../../../testData/getPerformLogsInterfaces";
import {StringArray} from "../../../utils/stringArray";
import {endpoints} from "../../../api/testData/endpointList";
import {requestBody} from "../../../api/testData/bodyList";
import {GroupUsers} from "../../../api/logicLayer/groupUsers";
import {user} from "../../../api/testData/global";
import {RadioButton} from "../../../components/simple/radioButton";
import {BomTreeLogic} from "../../../bussinesLayer/bomVault/bomTreeLogic";
import {BeforeAfter} from "../../../helper/beforeAfter";
import {importItems} from "../../../testData/import";

const button: Button = new Button();
const grid:Grid = new Grid();
const instructionPanel:InstructionPanel = new InstructionPanel();
const link: Link = new Link();
const login: Login = new Login();
const manageUsersLogic: ManageUsersLogic = new ManageUsersLogic();
const meganav:Meganav = new Meganav();
const modal:Modal = new Modal();
const toolbar: Toolbar = new Toolbar();
const helpLogic: HelpLogic = new HelpLogic();
const radioButton: RadioButton = new RadioButton();
const bomTreeLogic: BomTreeLogic = new BomTreeLogic();
const beforeAfter: BeforeAfter = new BeforeAfter();

describe('Manage Users', () => {

    it("should go to manage users page", async () => {
        await login.loginWithDirectLink(browser.params.userAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.userIcon, headerItems.userMenuLinksAdmin[0],
            gridElements.grid);
    });

    it('should be instruction panel with option to hide/unhide', async () => {
        await instructionPanel.instrPanelHidingUnhidingChecking('Manage User Roles');
    });

    it("should open help panel and check title", async () => {
        await helpLogic.openAndCheckHelpPanelTitle('Administer users');
    });

    it('should sort for column A to Z ',  async () => {
        await grid.newGridOpenFilterBoxByName('User Name');
        await grid.switchToSortColumnMenu();
        await expect(await gridElements.newGridColumnFilterOptions.getText()).toEqual(columnHeaders.bom.sortOptions);
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[1])
    });

    it('should remove filtering with clear all',  async () => {
        await toolbar.clearFilteringWithClearAll();
    });

    it('should sort column Z to A',  async () => {
        await grid.newGridOpenFilterBoxByName('User Name');
        await grid.switchToSortColumnMenu();
        await expect(await gridElements.newGridColumnFilterOptions.getText()).toEqual(columnHeaders.bom.sortOptions);
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[1])
    });

    it('should remove filtering with clear all X',  async () => {
        await toolbar.clearFilteringWithX();
    });

    it(" should be exact column headers", async () => {
        await grid.newGridCheckingUnlockedColumnHeaders( [ 'User Name', 'Active Status', 'Email', 'Full Name', 'Group Admin',
            'User Admin', 'KB Admin', 'Restricted', 'Read Only' ])
    });

    it(" should be modify dropdown", async () => {
        await toolbar.openToolbarDropdownByButtonName(buttonNames.modify);
        await expect(button.returnButtonByText(buttonNames.modifyUser).isEnabled()).toBeFalsy();
        await toolbar.closeToolbarDropdownByButtonName(buttonNames.modify);
        await grid.checkCheckboxRange(1,3);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.modify);
        await expect(button.returnButtonByText(buttonNames.modifyUser).isEnabled()).toBeFalsy();
        await toolbar.closeToolbarDropdownByButtonName(buttonNames.modify);
        await grid.checkCheckboxRange(1,3);
        await grid.checkCheckboxRange(1,2);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.modify);
        await expect(button.returnButtonByText(buttonNames.modifyUser).isEnabled()).toBeTruthy();
        await toolbar.closeToolbarDropdownByButtonName(buttonNames.modify);

    });

    it(" should open modify user shade", async () => {
        await toolbar.openToolbarDropdownByButtonName(buttonNames.modify);
        await Shade.openShadeWithButton(buttonNames.modifyUser);
    });

    it("should open help panel and check opened subitem", async () => {
        await helpLogic.openHelpPanelAndCheckOpenedSubitem('Modify user accounts');
    });

    it(" should be roles list", async () => {
        await expect(await administrationElements.manageUsers.modifyOwnerShade.userRoleCheckboxLabels.getText())
            .toEqual([ 'Regular User', 'Group Administrator', 'User Administrator',
                'Knowledge Base Administrator', 'Restricted User', 'Read-Only User' ]);
    });

    it(" should be data grid in history section with columns", async () => {
        await expect(await shadeElements.columnHeader.getText()).toEqual([ 'Date', 'By', 'Change Description' ])
    });

    it(" should be correctly formatted Date column values, DE382754", async () => {
        await expect(await gridElements.newGridCellByRowIndex(0).get(0).getText()).toMatch(/\d{1,2}\s\w{3,4}\s\d{4}/g);
    });

    it("should be warning modal on leaving shade without saving changes, US275243", async () => {
        await radioButton.checkRadioButton(await administrationElements.manageUsers.reassignItemsShade.userRadioLabels.get(1) ,await administrationElements.manageUsers.reassignItemsShade.userRadioInputs.get(1));
        await modal.openModalWithLinkName(meganavItems.home);
        await expect(await modal.modalTitle.getText()).toEqual('Leave this page?');
        await expect(await modal.modalBody.getText()).toEqual('Changes made have not been saved. Are you sure you want to leave without saving your changes?');
        await modal.closeModalWithXButton();

    });

    it(" should close the shade", async () => {
        await Shade.closeShadeWithButton(buttonNames.cancelDoNotSaveChanges)
    });

    it(" should be reassign items inactive when several rows are selected", async () => {
        await toolbar.openToolbarDropdownByButtonName(buttonNames.modify);
        await expect(button.returnButtonByText(buttonNames.reassignItems).isEnabled()).toBeFalsy();
        await toolbar.closeToolbarDropdownByButtonName(buttonNames.modify);
        await grid.checkCheckboxRange(1,3);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.modify);
        await expect(button.returnButtonByText(buttonNames.reassignItems).isEnabled()).toBeFalsy();
        await toolbar.closeToolbarDropdownByButtonName(buttonNames.modify);
        await grid.checkCheckboxRange(1,3);
        await grid.checkCheckboxRange(1,2);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.modify);
        await expect(button.returnButtonByText(buttonNames.reassignItems).isEnabled()).toBeTruthy();
        await toolbar.closeToolbarDropdownByButtonName(buttonNames.modify);
    });

    it(" should open reassign items shade", async () => {
        await toolbar.openToolbarDropdownByButtonName(buttonNames.modify);
        await Shade.openShadeWithButton(buttonNames.reassignItems);
    });

    it("should open help panel and check opened subitem", async () => {
        await helpLogic.openHelpPanelAndCheckOpenedSubitem('Reassign items to different user accounts');
    });

    it(" should select all items in the list with select all checkbox", async () => {
        await manageUsersLogic.allCheckboxChecking()
    });

    it(" should be users list in reassign items shade", async () => {
        await expect(await administrationElements.manageUsers.reassignItemsShade.userRadioLabels.getText())
            .toEqual([ 'b4testuser', 'BOM4 Test Group Admin', 'BOM4 Test KB Admin','BOM4 Test Restricted',
                'BOM4 Test User Admin' ]);
    });

    it(" should be active and inactive reassign button ", async () => {
        await manageUsersLogic.reassignButtonChecking()
    });

    it(" should open leave confirm modal", async () => {
        await modal.openModalWithButtonByName(buttonNames.done);
        await expect(await modal.modalTitle.getText()).toEqual('Notification');
        const modalText: string = 'Your selected items have not been reassigned. ' +
            'Select the Reassign button to complete the reassignment. Do you wish to cancel reassigning items?';
        await expect(await modal.modalBody.getText()).toEqual(modalText);
        await modal.closeModalWithXButton();
        await modal.openModalWithButtonByName(buttonNames.done);
        await modal.closeModalWithButton(buttonNames.no);
    });

    it(" hould close the reassign items shade", async () => {
        await modal.openModalWithButtonByName(buttonNames.done);
        await Shade.closeShadeWithButton(buttonNames.yes);
    });

    it(" should be filter dropdown", async () => {
        const expectedFilterOptions =  [ 'Registered Users', 'Active Users',
            'Inactive Users', 'Read Only Users', 'Restricted Users',
            'Group Admins', 'User Admins', 'KB Admins' ];
        await toolbar.openToolbarDropdownByButtonName(buttonNames.filter);
        await expect(await dropdownElements.dropdownValues.getText()).toEqual(expectedFilterOptions);
        await toolbar.closeToolbarDropdownByButtonName(buttonNames.filter)
    });

    it('should have unhide button with dropdown list  -  Manage Users',  async () => {
        await toolbar.unhideDropdown();
    });

    it('should hide the column -  Manage Users',  async () => {
        await grid.newGridHideColumnByName('User Name');
    });

    it('should unhide the column with Unhide All - Manage Users',  async () => {
        await toolbar.unhideCellNameWithUnhideAllByNumber('User Name',0);
    });

    it('should be filters - Manage Users',  async () => {
        const expectedFilterOptions =  [ 'Registered Users', 'Active Users',
            'Inactive Users', 'Read Only Users', 'Restricted Users',
            'Group Admins', 'User Admins', 'KB Admins' ];
        await toolbar.openToolbarDropdownByButtonName(buttonNames.filter);
        await expect(await dropdownElements.dropdownValues.getText()).toEqual(expectedFilterOptions);
        await toolbar.closeToolbarDropdownByButtonName(buttonNames.filter)
    });

    it("should export xls file for all users", async () =>{
        await modal.openModalWithButtonByName(buttonNames.export);
        await radioButton.checkRadioButtonByLabelName(exportOptions.manageUsers.options[2]);
        await modal.closeModalWithButton(buttonNames.export);
        const reqArr: any = await GetPerformanceLogs.getRequestData();
        const requestData: IRequestInfoType =  await StringArray.getRequestInfoByUrlContain(reqArr, endpoints.users.export,
            'POST');
        await expect(requestData.postData).toEqual(requestBody.users.allUsersExportBody(exportOptions.fileFormat[0],
            exportOptions.userLayout[1]));
    });

    it("should export csv file for all users", async () =>{
        await modal.openModalWithButtonByName(buttonNames.export);
        await radioButton.checkRadioButtonByLabelName(exportOptions.manageUsers.options[3]);
        await modal.closeModalWithButton(buttonNames.export);
        const reqArr: any = await GetPerformanceLogs.getRequestData();
        const requestData: IRequestInfoType =  await StringArray.getRequestInfoByUrlContain(reqArr, endpoints.users.export,
            'POST');
        await expect(requestData.postData).toEqual(requestBody.users.allUsersExportBody(exportOptions.fileFormat[1],
            exportOptions.userLayout[1]));
    });

    it("should export txt file for all users", async () =>{
        await modal.openModalWithButtonByName(buttonNames.export);
        await radioButton.checkRadioButtonByLabelName(exportOptions.manageUsers.options[4]);
        await modal.closeModalWithButton(buttonNames.export);
        const reqArr: any = await GetPerformanceLogs.getRequestData();
        const requestData: IRequestInfoType =  await StringArray.getRequestInfoByUrlContain(reqArr, endpoints.users.export,
            'POST');
        await expect(requestData.postData).toEqual(requestBody.users.allUsersExportBody(exportOptions.fileFormat[2],
            exportOptions.userLayout[1]));
    });

    it('should inactivate selected user', async () => {
        await login.loginWithDirectLink(browser.params.userAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.userIcon, headerItems.userMenuLinksAdmin[0],
            gridElements.grid);
        await grid.mechanismCheckCheckboxByName('User Name','b4testuser');
        await toolbar.openToolbarDropdownByButtonName(buttonNames.modify);
        await manageUsersLogic.makeUserInactive('b4testuser');
    });

    it('should activate selected user', async () => {
        await grid.mechanismCheckCheckboxByName('User Name','b4testuser');
        await toolbar.openToolbarDropdownByButtonName(buttonNames.modify);
        await manageUsersLogic.makeUserActive('b4testuser');
    });

    it('should be active inactive deleted  -   Manage Users',  async () => {
        await expect(await toolbar.returnToolbarButtonByValue(buttonNames.delete).isEnabled()).toBeFalsy();
        await grid.newMechanismCheckboxRangeChecking(1,3);
        await expect(await toolbar.returnToolbarButtonByValue(buttonNames.delete).isEnabled()).toBeFalsy();
        await grid.newMechanismCheckboxRangeChecking(1,3);
        await grid.newMechanismCheckboxRangeChecking(1,2);
        await expect(await toolbar.returnToolbarButtonByValue(buttonNames.delete).isEnabled()).toBeTruthy();

    });

    it('should open close delete modal -   Manage Users',  async () => {
        await modal.openModalWithButtonByName(buttonNames.delete);
        await expect(await modal.modalTitle.getText()).toEqual('Notification');
        await modal.closeModalWithXButton();
        // await grid.checkCheckboxRange(0,1);
        // await modal.openModalWithButtonByName(buttonNames.delete);
        // await modal.closeModalWithButton(buttonNames.okayThanks);
    });

});

describe('Manage Users export selected user', async () =>{
    afterEach(async () =>{
        await BeforeAfter.clearCacheCookiesWithLogin(browser.params.userAdminUrl);
    });

    it("should export xls file for selected users", async () =>{
        await login.loginWithDirectLink(browser.params.userAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.userIcon, headerItems.userMenuLinksAdmin[0],
            gridElements.gridWrapper);
        await grid.newGridSelectRowWithMatchValue(1, columnHeaders.viewUsers.unlockedColumns[0], 'b4testadmin');
        const userNameArray: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            columnHeaders.viewUsers.unlockedColumns[0]);
        const userName: string = userNameArray[0];
        await modal.openModalWithButtonByName(buttonNames.export);
        await radioButton.checkRadioButtonByLabelName(exportOptions.manageUsers.options[2]);
        await modal.closeModalWithButton(buttonNames.export);
        const reqArr: any = await GetPerformanceLogs.getRequestData();
        const requestData: IRequestInfoType =  await StringArray.getRequestInfoByUrlContain(reqArr, endpoints.users.export,
            'POST');
        const selectedUser:any = await GroupUsers.returnUserByKeyValue(user.groupAdmin, 'S_USR_NAME', userName);
        await expect(requestData.postData).toEqual(requestBody.users.selectedUsersExportBody(exportOptions.fileFormat[0],
            selectedUser[0].id.toString(), exportOptions.userLayout[1]));
    });

    it("should export csv file for selected users", async () =>{
        await login.loginWithDirectLink(browser.params.userAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.userIcon, headerItems.userMenuLinksAdmin[0],
            gridElements.gridWrapper);
        await grid.newGridSelectRowWithMatchValue(1, columnHeaders.viewUsers.unlockedColumns[0], 'b4testadmin');
        const userNameArray: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            columnHeaders.viewUsers.unlockedColumns[0]);
        const userName: string = userNameArray[0];
        await modal.openModalWithButtonByName(buttonNames.export);
        await radioButton.checkRadioButtonByLabelName(exportOptions.manageUsers.options[3]);
        await modal.closeModalWithButton(buttonNames.export);
        const reqArr: any = await GetPerformanceLogs.getRequestData();
        const requestData: IRequestInfoType =  await StringArray.getRequestInfoByUrlContain(reqArr, endpoints.users.export,
            'POST');
        const selectedUser:any = await GroupUsers.returnUserByKeyValue(user.groupAdmin, 'S_USR_NAME', userName);
        await expect(requestData.postData).toEqual(requestBody.users.selectedUsersExportBody(exportOptions.fileFormat[1],
            selectedUser[0].id.toString(), exportOptions.userLayout[1]));
    });

    it("should export txt file for selected users", async () =>{
        await login.loginWithDirectLink(browser.params.userAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.userIcon, headerItems.userMenuLinksAdmin[0],
            gridElements.gridWrapper);
        await grid.newGridSelectRowWithMatchValue(1, columnHeaders.viewUsers.unlockedColumns[0], 'b4testadmin');
        const userNameArray: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            columnHeaders.viewUsers.unlockedColumns[0]);
        const userName: string = userNameArray[0];
        await modal.openModalWithButtonByName(buttonNames.export);
        await radioButton.checkRadioButtonByLabelName(exportOptions.manageUsers.options[4]);
        await modal.closeModalWithButton(buttonNames.export);
        const reqArr: any = await GetPerformanceLogs.getRequestData();
        const requestData: IRequestInfoType =  await StringArray.getRequestInfoByUrlContain(reqArr, endpoints.users.export,
            'POST');
        const selectedUser:any = await GroupUsers.returnUserByKeyValue(user.groupAdmin, 'S_USR_NAME', userName);
        await expect(requestData.postData).toEqual(requestBody.users.selectedUsersExportBody(exportOptions.fileFormat[2],
            selectedUser[0].id.toString(), exportOptions.userLayout[1]));
    });
});

