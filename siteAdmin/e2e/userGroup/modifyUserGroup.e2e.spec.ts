import {Login} from "../../../components/adminUI/adminLogin";
import {loginItems} from "../../../testData/adminUI/login";
import {adminModalUserGroupElements, adminUsersElements} from "../../../elements/elements";
import {userGroupModalElements} from "../../../testData/adminUI/global";
import {AdminGrid} from "../../../components/adminUI/grid";
import {AdminSearchLogic} from "../../../bussinesLayer/adminUI/searchLogic";
import {AdminModal} from "../../../components/adminUI/adminModal";

const adminGrid: AdminGrid = new AdminGrid();
const login = new Login();
const adminSearchLogic: AdminSearchLogic = new AdminSearchLogic();
const adminModal: AdminModal = new AdminModal();

describe('Edit User Group Shade ', () => {

    let value: string[];

    it('should have add new User Group Button', async () => {
        await login.logInSiteAdmin(loginItems.userName, loginItems.password);
        await adminSearchLogic.openQuickSearchDropdwon();
        await adminSearchLogic.checkRadioButtonByLabelName('User Groups');
        await adminSearchLogic.performAdminSearch('Auto*');
        value = await adminUsersElements.firstRowNames.getText();
        await adminGrid.checkUsersInGridList(1);
        await adminModal.openModalByName('Modify User Group');
    });

    it('should have all input fields labels', async () => {
        await adminModal.inputFieldsChecking(userGroupModalElements.inputFieldNames);
    });

    it('should be pre-populated User Group Name', async () => {
        await adminModal.checkFieldValue(await adminModalUserGroupElements.nameInputField.get(0), value[1]);
    });

    it('should be pre-populated User Group Label', async () => {
        await adminModal.checkFieldValue(await adminModalUserGroupElements.labelInputField.get(0), value[2]);
    });

    it('should be pre-populated Commodity', async () => {
        await adminModal.checkFieldValue(await adminModalUserGroupElements.commodityField.get(0), value[6]);
    });

    it('should be pre-populated Hazmat', async () => {
        await adminModal.checkCheckboxStatus(await adminModalUserGroupElements.hazmatCheckBox, value[3]);
    });

    it('should be pre-populated ERC', async () => {
        await adminModal.checkCheckboxStatus(await adminModalUserGroupElements.ercCheckBox, value[4]);
    });

    it('should be pre-populated authorizedDistributors', async () => {
        await adminModal.checkCheckboxStatus(await adminModalUserGroupElements.authorizedDistributorsCheckBox, value[7]);
    });

    it('should be pre-populated boeingOcmsExport', async () => {
        await adminModal.checkCheckboxStatus(await adminModalUserGroupElements.boeingOcmsExportCheckBox, value[8]);
    });

    it('should be pre-populated followXferHistory', async () => {
        await adminModal.checkCheckboxStatus(await adminModalUserGroupElements.followXferHistoryCheckBox, value[9]);
    });

    it('should be validation rules for User Group Name', async () => {
        await adminModal.userGroupNameValidationChecking();
    });

    it('should be validation rules for User Group Label', async () => {
        await adminModal.userGroupLabelValidationChecking();
    });

    it('should be reset button', async () => {
        await adminModal.resetButtonChecking();
    });

    it('should be cancel button', async () => {
        await adminModal.cancelButtonChecking();
    });

});