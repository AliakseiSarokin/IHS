import {adminUsersElements} from "../../../elements/elements";
import {loginItems} from "../../../testData/adminUI/login";
import {Login} from "../../../components/adminUI/adminLogin";
import {AdminSearchLogic} from "../../../bussinesLayer/adminUI/searchLogic";
import {AdminGrid} from "../../../components/adminUI/grid";
import {AdminModal} from "../../../components/adminUI/adminModal";

const adminSearchLogic: AdminSearchLogic = new AdminSearchLogic();
const adminGrid: AdminGrid = new AdminGrid();
const adminModal: AdminModal = new AdminModal();
const login = new Login();

describe('Edit User shade ', () => {

    let names: string[];

    it('should be modal window after click Modify User', async () => {
        await login.logInSiteAdmin(loginItems.userName, loginItems.password);
        await adminSearchLogic.performAdminSearch('aim');
        names = await adminUsersElements.firstRowNames.getText();
        await adminGrid.checkUsersInListWithCtrl(await adminUsersElements.cellsByColumnName.get(0));
        await adminModal.openModalByName('Modify User');
        await adminModal.checkModifyUserFieldNames();
    });

    it('should be pre-populated User Name', async () => {
        await adminModal.checkFieldValue(await adminUsersElements.userNameInputField.get(0), names[1]);
    });

    it('should be pre-populated User Group Name', async () => {
        await adminModal.checkFieldValue(await adminUsersElements.userGroupNameInputField.get(0), names[2]);
    });

    it('should be pre-populated Active Status', async () => {
        await adminModal.checkFieldValue(await adminUsersElements.activeStatus, names[3], 'checked');
    });

    it('should be pre-populated Email', async () => {
        await adminModal.checkFieldValue(await adminUsersElements.currentEmail, names[4]);
    });

    it('should be pre-populated Full Name', async () => {
        await adminModal.checkFieldValue(await adminUsersElements.userFullName, names[5]);
    });

    it('should be pre-populated Group Admin status', async () => {
        await adminModal.checkCheckboxStatus(await adminUsersElements.groupAdminRadioButtonTrue, names[6]);
    });

    it('should be pre-populated User Admin status', async () => {
        await adminModal.checkCheckboxStatus(await adminUsersElements.userAdminRadioButtonTrue, names[8]);
    });

    it('should be pre-populated KB Admin status', async () => {
        await adminModal.checkCheckboxStatus(await adminUsersElements.kbAdminRadioButtonTrue, names[7]);
    });

    it('should be pre-populated Read Only Use status', async () => {
        await adminModal.checkCheckboxStatus(await adminUsersElements.readOnlyUserRadioButtonFalse, names[9]);
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
// not working
    xit('should be validation rules for User Gruop ', async () => {
        await adminModal.userGroupValidationChecking();
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

});