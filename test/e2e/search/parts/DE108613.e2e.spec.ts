import {AddPartsToBomLogic} from "../../../../bussinesLayer/search/addPartsToBomLogic";
import {browser} from "protractor";
import {Button} from "../../../../components/simple/button";
import {buttonNames, meganavItems} from "../../../../testData/global";
import {commonSearch} from "../../../../testData/search";
import {Grid} from "../../../../components/grid";
import {gridElements, modalElements, searchElements} from "../../../../elements/elements";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {PartsSearchLogic} from "../../../../bussinesLayer/search/partsSearchLogic";
import {Toolbar} from "../../../../components/toolbar";
import {WorkspaceBoms} from "../../../../api/logicLayer/workspaceBoms";
import {user} from "../../../../api/testData/global";
import {QuickSearch} from "../../../../components/quickSearch";
import {BomTreeLogic} from "../../../../bussinesLayer/bomVault/bomTreeLogic";

const addPartsToBomLogic: AddPartsToBomLogic = new AddPartsToBomLogic();
const bomTreeLogic: BomTreeLogic = new BomTreeLogic();
const button: Button = new Button();
const grid: Grid = new Grid();
const login: Login = new Login();
const modal: Modal = new Modal();
const partsSearchLogic: PartsSearchLogic = new PartsSearchLogic();
const toolbar: Toolbar = new Toolbar();
const quickSearch: QuickSearch = new QuickSearch();

describe('Parts search, Add parts to BOM(s) modal, DE108613', () => {

    beforeAll(async ()=> {
        await WorkspaceBoms.addABomToWorkspaceIfNotAdded(user.groupAdmin)
    });

    it('should clear BOM(s) selections after Add parts modal is closed', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await quickSearch.performQuickSearch(commonSearch.commonValue);
        await grid.newMechanismCheckboxRangeChecking(1, 2);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await modal.openModalWithButtonByName(buttonNames.addToBoms);
        await grid.newMechanismCheckboxRangeChecking(0,1);
        const bomName:string = await gridElements.newGridModalLockedColumnCellsWithContent.get(0).getText();
        await addPartsToBomLogic.expandSectionByNumber(1);
        await bomTreeLogic.checkBomRows(2);
        await modal.closeSingleModalWithXButton();
        await quickSearch.performQuickSearch(commonSearch.commonValue);
        await grid.newMechanismCheckboxRangeChecking(1, 2);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await modal.openModalWithButtonByName(buttonNames.addToBoms);
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await modal.openModalWithElementAndWait(button.returnButtonByText(buttonNames.addAndReturnToResults),
            modalElements.modalTitleByName('Notification'));
        await expect(await modal.modalBody.getText()).toEqual('1 parts have been added to ' + bomName);

    })
});
