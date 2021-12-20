import {Login} from "../../../components/adminUI/adminLogin";
import {loginItems} from "../../../testData/adminUI/login";
import {adminUsersElements} from "../../../elements/elements";
import {adminManageUserGroup} from "../../../testData/adminUI/global";
import {AdminGrid} from "../../../components/adminUI/grid";
import {AdminSearchLogic} from "../../../bussinesLayer/adminUI/searchLogic";
import {AdminModal} from "../../../components/adminUI/adminModal";

const adminGrid: AdminGrid = new AdminGrid();
const login = new Login();
const adminSearchLogic: AdminSearchLogic = new AdminSearchLogic();
const adminModal: AdminModal = new AdminModal();

describe('Add new User Group ', () => {

    it('should have add new User Group Button', async () => {
        await login.logInSiteAdmin(loginItems.userName, loginItems.password);
        await adminSearchLogic.openQuickSearchDropdwon();
        await adminSearchLogic.checkRadioButtonByLabelName('User Groups');
        await adminSearchLogic.performAdminSearch('Auto*');
    });

    it('should create a new User Group', async () => {
        await adminModal.openModalByName('Add New User Group');
        await adminModal.createNewUserGroup(adminManageUserGroup.newCustomUserGroupName);
        await adminSearchLogic.performAdminSearch(adminManageUserGroup.newCustomUserGroupName);
        expect(await adminUsersElements.allHyperlinksOnPage.get(0).getText()).toEqual(adminManageUserGroup.newCustomUserGroupName);
    });

    it('should delete a User Group', async () => {
        await adminGrid.checkUsersInGridList(1);
        await adminModal.deleteUser(adminManageUserGroup.newCustomUserGroupName);
        await adminSearchLogic.performAdminSearch(adminManageUserGroup.newCustomUserGroupName + "*");
        expect(await adminUsersElements.allHyperlinksOnPage.get(0).getText())
            .toEqual(adminManageUserGroup.newCustomUserGroupName + "_DELETE");
    });

});