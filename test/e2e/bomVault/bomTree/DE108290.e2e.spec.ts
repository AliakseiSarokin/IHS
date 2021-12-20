import {BomTreeLogic} from "../../../../bussinesLayer/bomVault/bomTreeLogic";
import {Button} from "../../../../components/simple/button";
import {bomVaultData} from "../../../../testData/bomVault";
import {browser, element} from "protractor";
import {buttonNames, meganavItems, exportOptions} from "../../../../testData/global";
import {
    bomElements, gridElements, bomVaultElements, pageTitles, shadeElements, searchElements, modalElements
} from "../../../../elements/elements";
import {Grid} from "../../../../components/grid";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {PartsSearchLogic} from "../../../../bussinesLayer/search/partsSearchLogic";
import {Toolbar} from "../../../../components/toolbar";
import {commonSearch, quickSearchData} from "../../../../testData/search";
import {WorkspaceLogic} from "../../../../bussinesLayer/worksapce/workspaceLogic";

const bomTreeLogic: BomTreeLogic = new BomTreeLogic();
const button: Button = new Button();
const grid: Grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal;
const partsSearchLogic: PartsSearchLogic = new PartsSearchLogic();
const toolbar: Toolbar = new Toolbar();
const workspaceLogic: WorkspaceLogic = new WorkspaceLogic();

//disabling as the old grid methods are not working as expected, can be uncommented after all tree structures are angular converted
xdescribe('BOM Tree, DE108290', () => {

    it("DE108290 - folder should not have history icon", async () => {

        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        // await meganav.goToFeatureWithMeganav(meganavItems.myWorkspace, gridElements.gridWrapper);
        // await grid.checkCheckboxRangeNewGrid(0, 1);
        // await workspaceLogic.removeItemFromWorkspace();

        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
           meganavItems.bomsSubItems.bomTree, gridElements.checkboxSelector.get(3));

        //await bomTreeLogic.checkBomNewGridByName('IHS_DE108290_DoNotDelete');
        await bomTreeLogic.checkFolderNewGridRowByName('Vault');
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await modal.openModalWithButtonByName(buttonNames.addNewFolder);
        await bomTreeLogic.addFolder();
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await grid.checkCheckboxRange(1, 2);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await modal.openModalWithButtonByName(buttonNames.addToBoms);
        // await bomTreeLogic.checkBomRows(1);
        // await bomTreeLogic.checkFolderRowByName(bomVaultData.bomTree.newFolderName);
        await bomTreeLogic.checkBomByName('IHS_DE108290_DoNotDelete');
        await modal.openModalWithElementAndWait(button.returnButtonByText(buttonNames.addAndReturnToResults),
            modalElements.modalTitleByName('Notification'));
        await modal.closeModalIfPresent();
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomTree, gridElements.checkboxSelector.get(3));

        await expect(await bomVaultElements.bomTree.bomInfoIconByTitle(2, 'View Change History for BOM').isPresent()).toBeFalsy();
        await expect(await bomVaultElements.bomTree.bomInfoIconByTitle(10, 'View Change History for BOM').isPresent()).toBeTruthy();
        await bomTreeLogic.checkFolderRowByName(bomVaultData.bomTree.newFolderName);
        await bomTreeLogic.deleteFolder();
    });
});