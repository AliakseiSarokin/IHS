import {
    buttonNames, meganavItems, titles, exportOptions, modalTitles, columnHeaders,
    headerItems
} from "../../../testData/global";
import {
    pageTitles, gridElements, commonElements, administrationElements,
    dropdownElements, headerElements, toolbarElements
} from "../../../elements/elements";
import {browser} from "protractor";
import {Button} from "../../../components/simple/button";
import {Dropdown} from "../../../components/dropdown";
import {Grid} from "../../../components/grid";
import {InstructionPanel} from "../../../components/instructionPanel";
import {Header} from "../../../components/header";
import {Link} from "../../../components/simple/link";
import {Login} from "../../../components/login";
import {Meganav} from "../../../components/meganav";
import {Modal} from "../../../components/modal";
import {Toolbar} from "../../../components/toolbar";
import {TypeAhead} from "../../../components/typeAhead";
import {Shade} from "../../../components/shade";
import {ViewUsersLogic} from "../../../bussinesLayer/adminstration/viewUsersLogic";
import {HelpLogic} from "../../../bussinesLayer/help/helpLogic";
import {BomTreeLogic} from "../../../bussinesLayer/bomVault/bomTreeLogic";
import {RadioButton} from "../../../components/simple/radioButton";
import {GetPerformanceLogs} from "../../../utils/getPerformanceLogs";
import {IRequestInfoType} from "../../../testData/getPerformLogsInterfaces";
import {StringArray} from "../../../utils/stringArray";
import {endpoints} from "../../../api/testData/endpointList";
import {requestBody} from "../../../api/testData/bodyList";
import {Boms} from "../../../api/logicLayer/boms";
import {user} from "../../../api/testData/global";
import {GroupUsers} from "../../../api/logicLayer/groupUsers";

const button: Button = new Button();
const grid:Grid = new Grid();
const instructionPanel:InstructionPanel = new InstructionPanel();
const link: Link = new Link();
const login: Login = new Login();
const meganav:Meganav = new Meganav();
const modal:Modal = new Modal();
const toolbar: Toolbar = new Toolbar();
const typeAhead: TypeAhead = new TypeAhead();
const viewUsersLogic: ViewUsersLogic = new ViewUsersLogic();
const helpLogic: HelpLogic = new HelpLogic();
const bomTreeLogic: BomTreeLogic = new BomTreeLogic();
const radioButton: RadioButton =new RadioButton();

describe('View Users - user admin', () => {

    it("View Users - user admin", async () => {
        await login.loginWithDirectLink(browser.params.userAdminUrl);
        await Header.hoverOnHeaderItem(headerElements.userIcon);
        await expect(await link.returnElementByLinkName(headerItems.userMenuLinksAdmin[0]).isPresent()).toBeTruthy();

    });

    it("View Users left nav checking - user admin", async () => {
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.helpIcon, headerItems.helpLinks[4],
            await commonElements.leftNav.get(0));
        await expect(await commonElements.leftNav.getText())
            .toEqual([ 'Custom Attributes', 'Distributors', 'View Users and Roles', 'Manage User Roles' ])
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

    it("should export xls file for selected users", async () =>{
        await button.clickByButtonName("Reset");
        await grid.newGridSelectRowWithMatchValue(1, columnHeaders.viewUsers.unlockedColumns[0], 'b4testadmin');
        const userName: string = 'b4testadmin';
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
        await button.clickByButtonName("Reset");
        await grid.newGridSelectRowWithMatchValue(1, columnHeaders.viewUsers.unlockedColumns[0], 'b4testadmin');
        const userName: string = 'b4testadmin';
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
        await button.clickByButtonName("Reset");
        await grid.newGridSelectRowWithMatchValue(1, columnHeaders.viewUsers.unlockedColumns[0], 'b4testadmin');
        const userName: string = 'b4testadmin';
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

    // it("View Users custom attributes checking - user admin", async () => {
    //     await viewUsers.customAttributesUsers(null);
    // });

});

describe('View Users - group admin', () => {

    it("View Users - group admin", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl1);
        await Header.hoverOnHeaderItem(headerElements.userIcon);
        await expect(await link.returnElementByLinkName(headerItems.userMenuLinksAdmin[0]).isPresent()).toBeFalsy();
    });

    it("View Users left nav checking - group admin", async () => {
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.helpIcon, headerItems.helpLinks[4],
            await commonElements.leftNav.get(0));
        await expect(await commonElements.leftNav.getText())
            .toEqual( [ 'Custom Attributes', 'Distributors', 'View Users and Roles' ])
    });
    //
    // it("View Users custom attributes checking - group admin", async () => {
    //     await viewUsers.customAttributesUsers(null);
    // });

});

describe('View Users - KB admin', () => {

    it("View Users - KB admin", async () => {
        await login.loginWithDirectLink(browser.params.kbAdminUserUrl);
        await Header.hoverOnHeaderItem(headerElements.userIcon);
        await expect(await link.returnElementByLinkName(headerItems.userMenuLinksAdmin[0]).isPresent()).toBeFalsy();
    });

    it("View Users left nav checking - KB admin", async () => {
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.helpIcon, headerItems.helpLinks[4],
            await commonElements.leftNav.get(0));
        await expect(await commonElements.leftNav.getText())
            .toEqual( [ 'Custom Attributes', 'View Users and Roles' ])
    });

    // it("View Users custom attributes checking - KB admin", async () => {
    //     await viewUsers.customAttributesUsers('true');
    // });

});

describe('View Users - regular user', () => {

    it("View Users - regular user", async () => {
        await login.loginWithDirectLink(browser.params.regularUserUrl);
        await Header.hoverOnHeaderItem(headerElements.userIcon);
        await expect(await link.returnElementByLinkName(headerItems.userMenuLinksAdmin[0]).isPresent()).toBeFalsy();
    });

    it("View Users left nav checking - regular user", async () => {
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.helpIcon, headerItems.helpLinks[4],
            await commonElements.leftNav.get(0));
        await expect(await commonElements.leftNav.getText())
            .toEqual( [ 'Custom Attributes', 'View Users and Roles' ])
    });

    // it("View Users custom attributes checking - regular user", async () => {
    //     await viewUsers.customAttributesUsers('true');
    // });

});

describe('View Users - restricted user', () => {

    it("View Users - regular user", async () => {
        await login.loginWithDirectLink(browser.params.restrictedUserUrl);
        await Header.hoverOnHeaderItem(headerElements.userIcon);
        await expect(await link.returnElementByLinkName(headerItems.userMenuLinksAdmin[0]).isPresent()).toBeFalsy();
    });

});

describe('View Users - read only user', () => {

    it("View Users - read only user", async () => {
        await login.loginWithDirectLink(browser.params.readOnlyUserUrl);
        await Header.hoverOnHeaderItem(headerElements.userIcon);
        await expect(await link.returnElementByLinkName(headerItems.userMenuLinksAdmin[0]).isPresent()).toBeFalsy();
    });

    it("View Users left nav checking - read only user", async () => {
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.helpIcon, headerItems.helpLinks[4],
            await commonElements.leftNav.get(0));
        await expect(await commonElements.leftNav.getText())
            .toEqual( [ 'Custom Attributes', 'View Users and Roles' ])
    });

    // it("View Users custom attributes checking - read only user", async () => {
    //     await viewUsers.customAttributesUsers('true');
    // });

});

describe('View Users', () => {

    it("should go to View Users page", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.helpIcon, headerItems.helpLinks[4],
            gridElements.grid);
        // await grid.checkingColumnHeaders(1,columnHeaders.viewUsers.unlockedColumns)
    });

    it('should be instruction panel with option to hide/unhide - View Users', async () => {
        await instructionPanel.instrPanelHidingUnhidingChecking('View Users and Roles');
    });

    it("should open help panel and check title", async () => {
        await helpLogic.openAndCheckHelpPanelTitle('Users and roles');
    });

    it('should be filters - View Users',  async () => {
        const expectedFilterOptions =  [ 'Registered Users', 'Active Users',
            'Inactive Users', 'Read Only Users', 'Restricted Users',
            'Group Admins', 'User Admins', 'KB Admins' ];
        await toolbar.openToolbarDropdownByButtonName(buttonNames.filter);
        await expect(await dropdownElements.dropdownValues.getText()).toEqual(expectedFilterOptions);
        await toolbar.closeToolbarDropdownByButtonName(buttonNames.filter)
    });

    it('should select option and display tag - View Users',  async () => {
        await toolbar.showFilterOptionsTag(buttonNames.filter);
    });

    it('should display one tag - View Users',  async () => {
        await toolbar.checkingTagBust(buttonNames.filter);
    });


    it('should remove tag by clicking on clear all tags link - View Users',  async () => {
        await toolbar.removeWithClearAll();
    });

    it('should remove tag by clicking on X - View Users ',  async () => {
        await toolbar.removeTagWithX(buttonNames.filter);
    });

    it('should unhide button with dropdown list  - View Users',  async () => {
        await toolbar.unhideDropdown();
    });

    it('should hide the column - View Users',  async () => {
        await grid.newGridHideColumnByName('User Name');
    });

    it('should unhide the column with Unhide All - View Users',  async () => {
        await toolbar.unhideCellNameWithUnhideAllByNumber('User Name',0);
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

    it ( 'should open export modal - View Users' , async () => {
        await modal.openModalWithButtonByName(buttonNames.export);
        await expect(await modal.modalTitle.getText()).toEqual('Export Users');
        await modal.exportModalAttributes(exportOptions.manageUsers.labels, exportOptions.manageUsers.options);
        await modal.closeModalWithXButton();
        await modal.openModalWithButtonByName(buttonNames.export);
        await modal.closeModalWithButton(buttonNames.cancel)
    });

    it("should check contact button", async () => {
        await expect(await button.returnButtonByText(buttonNames.contact).isEnabled()).toBeFalsy();
        await grid.checkCheckboxRange(0,3);
        await expect(await button.returnButtonByText(buttonNames.contact).isEnabled()).toBeTruthy();
        await grid.checkCheckboxRange(0,3);
        await grid.checkCheckboxRange(0,2);
        await expect(await button.returnButtonByText(buttonNames.contact).isEnabled()).toBeTruthy();
    });

    it("should open contact shade", async () => {
        await Shade.openShadeWithButton(buttonNames.contact);
    });

    it("should open help panel and check opened subitem", async () => {
        await helpLogic.openHelpPanelAndCheckOpenedSubitem('Contact Users');
    });

    it("should check subject field in contact shade", async () => {
        await viewUsersLogic.subjectFieldChecking();
    });

    it("should check message field in contact shade", async () => {
        await viewUsersLogic.messageFieldChecking();
    });

    it("should check reset button in  contact shade", async () => {
        await viewUsersLogic.resetButtonChecking();
    });

    it("should email typeahead in  contact shade", async () => {
        await viewUsersLogic.emailTypeAheadChecking();
    });


    it("should check send button in  contact shade and close the shade", async () => {
        await viewUsersLogic.sendButtonChecking();
    });
});
