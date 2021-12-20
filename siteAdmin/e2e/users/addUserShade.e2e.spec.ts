import {Login} from "../../../components/adminUI/adminLogin";
import {loginItems} from "../../../testData/adminUI/login";
import {AdminGrid} from "../../../components/adminUI/grid";
import {AdminSearchLogic} from "../../../bussinesLayer/adminUI/searchLogic";
import {AdminModal} from "../../../components/adminUI/adminModal";
import {adminAddUsersElements, adminUsersElements} from "../../../elements/elements";
import {browser} from "protractor";
import {Waiters as w} from "../../../helper/waiters";
import {DateTime} from "../../../utils/dateTime"
import {adminManageUser} from "../../../testData/adminUI/global";

const adminGrid: AdminGrid = new AdminGrid();
const login = new Login();
const adminSearchLogic: AdminSearchLogic = new AdminSearchLogic();
const adminModal: AdminModal = new AdminModal();



describe('Add new User', () => {

    it('should have add new User Button', async () => {
        await login.logInSiteAdmin(loginItems.userName, loginItems.password);
        await adminSearchLogic.openQuickSearchDropdwon();
        await adminSearchLogic.checkRadioButtonByLabelName('Users');
        await adminSearchLogic.performAdminSearch('auto*');
        await adminModal.openModalByName('Add New User');
        await w.waitUntilWorkingModalNotDisplayed();
        await w.waitUntilElementIsDisplayed(adminAddUsersElements.addUserShade);
        expect(await adminAddUsersElements.addUserShade.isPresent()).toBeTruthy();
        await w.waitUntilWorkingModalNotDisplayed();
    });

    it('should have all input fields labels', async () => {
        const labelNames:string[] = ["User Name:",'Password:',"User Group Name:","Email:","Full Name:","Expiration Date:"];
        await w.waitUntilWorkingModalNotDisplayed();
        expect(await adminAddUsersElements.labelsNames.getText()).toEqual(labelNames);
    });

    it('should have all input fields ghost texts', async () => {
        const labelNames:string[] = ["Enter user name",'Enter user password',"- Select user group -","Enter user email","Enter user full name",""];
        expect(await adminAddUsersElements.ghostText.getAttribute('placeholder')).toEqual(labelNames);
    });

    it('should active status selected as active by deafult', async () => {
        await expect(await adminAddUsersElements.radioButtonSelection('active-status-active').isSelected()).toBeTruthy();
    });

    it('should KB Admin selected as yes by deafult', async () => {
        await w.waitUntilWorkingModalNotDisplayed();
        expect(await adminAddUsersElements.radioButtonSelection('kb-admin-yes').isSelected()).toBeTruthy();
    });

    it('Expiration date should be set to today date by default', async () => {
        expect(await adminAddUsersElements.expirationDate.getAttribute('value')).toEqual(await DateTime.getCurrentDateByFormat('YYYY-MM-DD'));
    });

    it('should disable readonly and restricted users radio button when selecting user as group admin', async () => {
        await w.waitUntilWorkingModalNotDisplayed();
        await adminAddUsersElements.radioButtonSelection('group-admin-yes').click();
        expect(await adminAddUsersElements.radioButtonSelection('read-only-user-yes').isEnabled()).toBeFalsy();
        expect(await adminAddUsersElements.radioButtonSelection('restricted-user-yes').isEnabled()).toBeFalsy();
    });

    it('should disable user admin radio button when selecting no for group admin', async () => {
        await adminAddUsersElements.radioButtonSelection('group-admin-no').click();
        expect(await adminAddUsersElements.radioButtonSelection('user-admin-yes').isEnabled()).toBeFalsy();
    });

    it('should disable user admin radio button when selecting no for group admin', async () => {
        await adminUsersElements.userGroupNameInputField.get(0).click();
        await adminUsersElements.userGroupNameInputField.get(0).sendKeys('BMTESTSQA');
        await adminAddUsersElements.userGroupName.click();
        expect(await adminUsersElements.userGroupNameInputField.get(0).getAttribute('value')).toContain('BMTESTSQA')
    });

    it('should be validation rules for User Name', async () => {
        await adminModal.userNameValidationChecking();
    });

    it('should be validation rules for Password', async () => {
        await adminModal.passwordValidationChecking();
    });

    it('should be validation rules for Email', async () => {
        await adminModal.emailValidationChecking();
    });

    it('should be validation rules for Full Name', async () => {
        await adminModal.fullNameValidationChecking();
    });

    it('should be reset button', async () => {
        await adminModal.resetButtonChecking();
    });

    it('should be cancel button', async () => {
        await adminModal.cancelButtonChecking();
    });

    it('should create a new User', async () => {
        await adminModal.openModalByName('Add New User');
        await adminModal.createNewUser(adminManageUser.newCustomUserName);
        await adminSearchLogic.performAdminSearch(adminManageUser.newCustomUserName);
        expect(await adminUsersElements.allHyperlinksOnPage.get(0).getText()).toEqual(adminManageUser.newCustomUserName);
    });

    it('should delete a User', async () => {
        await adminGrid.checkUsersInGridList(1);
        await browser.sleep(1000); // delete button activated after 1 sec
        await adminModal.deleteUser(adminManageUser.newCustomUserName)
    });



});