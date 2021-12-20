import {AmlLogic} from "../../../../bussinesLayer/bomVault/amlLogic";
import {BomVaultLogic} from "../../../../bussinesLayer/bomVault/bomVaultLogic";
import {Button} from "../../../../components/simple/button";
import {bomVaultData} from "../../../../testData/bomVault";
import {browser} from "protractor";
import {buttonNames, meganavItems, titles, columnHeaders, leftNavItems} from "../../../../testData/global";
import {Dropdown} from "../../../../components/dropdown";
import {Grid} from "../../../../components/grid";
import {gridElements, importElements, pageTitles} from "../../../../elements/elements";
import {ImportLogic} from "../../../../bussinesLayer/import/importLogic";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {Toolbar} from "../../../../components/toolbar";

const amlLogic: AmlLogic = new AmlLogic();
const bomVaultLogic: BomVaultLogic = new BomVaultLogic();
const button: Button = new Button;
const grid = new Grid();
const importLogic: ImportLogic = new ImportLogic();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const toolbar: Toolbar = new Toolbar();

describe(' BOM Vault - Regular User', () => {

    it('should go to BOM Vault and be disabled belete button', async () => {
        await login.loginWithDirectLink(browser.params.regularUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.checkboxSelector.get(1));
        await expect(await pageTitles.pageTitle.getText()).toEqual(titles.bomVault);
        await expect(await button.returnButtonByText(buttonNames.delete).isEnabled()).toBeFalsy();
    });

    it('should be not option to delete bom that reg user is not owned', async () => {
        await grid.newGridSelectRowWithMatchValue(0, '113',
            columnHeaders.columnHeaderNames.newGrid[1]);
        await grid.newGridSelectRowWithMatchValue(0, 'AML_IPN_ON',
            columnHeaders.columnHeaderNames.newGrid[1]);
        await expect(await button.returnButtonByText(buttonNames.delete).isEnabled()).toBeFalsy();
    });

    it('should be not option to delete bom that reg user is not owned and owned', async () => {
        await grid.newGridSelectRowWithMatchValue(0, 'RegUserBom',
            columnHeaders.columnHeaderNames.newGrid[1]);
        await expect(await button.returnButtonByText(buttonNames.delete).isEnabled()).toBeFalsy();
    });

    it('should be option to delete bom that reg user is owned', async () => {
        await grid.newGridSelectRowWithMatchValue(0, '113',
            columnHeaders.columnHeaderNames.newGrid[1]);
        await grid.newGridSelectRowWithMatchValue(0, 'AML_IPN_ON',
            columnHeaders.columnHeaderNames.newGrid[1]);
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await Dropdown.selectValueInDropdownByValueName(bomVaultData.bomVault.filters[1], gridElements.newGridCheckboxSelector.get(1));
        await grid.newMechanismCheckboxRangeChecking(0, 1);
        await expect(await button.returnButtonByText(buttonNames.delete).isEnabled()).toBeTruthy();
        await modal.openModalWithButtonByName(buttonNames.delete);
        await modal.closeModalWithXButton()
    });

    //need to refactor to use it with API
    xit('should set best bom to preferred AML Bom', async () => {
        await login.loginWithDirectLink(browser.params.regularUserUrl);
        await meganav.goToFeatureWithMeganav(meganavItems.import, importElements.aboutImport);
        await importLogic.goToStep1();
        await importLogic.uploadAValidFileToImport();
        await importLogic.setExactBomName('regularUser_AML_IPN_ON_1');
        await importLogic.setAmlOn();
        await importLogic.importBom();
        await importLogic.importAnotherBOM();
        await importLogic.goToStep1();
        await importLogic.uploadAValidFileToImport();
        await importLogic.setExactBomName('regularUser_AML_IPN_ON_2');
        await importLogic.setAmlOn();
        await importLogic.importBom();
        await importLogic.showImportedBomsInVaultByNames(['regularUser_AML_IPN_ON_1', 'regularUser_AML_IPN_ON_2']);
        await importLogic.waitingForProcessedStatus();
        await expect(await grid.returnRowNumberByLinkName(0, columnHeaders.columnHeaderNames.newGrid[1],
            'regularUser_AML_IPN_ON_2') === 0).toBeTruthy();
        await bomVaultLogic.setBestPartToPreferred('regularUser_AML_IPN_ON_1');
        await expect(await grid.returnRowNumberByLinkName(0, columnHeaders.columnHeaderNames.newGrid[1],
            'regularUser_AML_IPN_ON_1') === 0).toBeTruthy();
    });

    //need to refactor to use it with API
    xit('should set best bom to preferred AML Bom and ignore Non-AML BOM', async () => {
        await login.loginWithDirectLink(browser.params.regularUserUrl);
        await meganav.goToFeatureWithMeganav(meganavItems.import, importElements.aboutImport);
        await importLogic.goToStep1();
        await importLogic.uploadAValidFileToImport();
        await importLogic.setExactBomName('regularUser_AML_IPN_OFF');
        await importLogic.importBom();
        await importLogic.showImportedBomInVaultByName('regularUser_AML_IPN_OFF');
        await importLogic.waitingForProcessedStatus();
        const nonAmlBomStartPosition: number = await grid.returnRowNumberByLinkName(0,
            columnHeaders.columnHeaderNames.newGrid[1], 'regularUser_AML_IPN_OFF');
        await grid.changeGridWithLeftNavOptionByName(leftNavItems.bomOptions.viewAllBoms, gridElements.newGridRows.get(0));
        await bomVaultLogic.setSeveralBestPartToPreferred(['regularUser_AML_IPN_ON_2', 'regularUser_AML_IPN_OFF']);
        await expect(await grid.returnRowNumberByLinkName(0, columnHeaders.columnHeaderNames.newGrid[1],
            'regularUser_AML_IPN_ON_2')=== 0).toBeTruthy();
        await expect(await grid.returnRowNumberByLinkName(0, columnHeaders.columnHeaderNames.newGrid[1],
            'regularUser_AML_IPN_OFF') >= nonAmlBomStartPosition).toBeTruthy();
    });

    //need to refactor to use it with API
    // here we have to add checks for positions in grid AML and Non-AML Boms after 'Set Best Part to Preferred' action process
    xit("should set best bom to preferred only AML Bom and ignore Non-AML BOM by 'Select All' items", async () => {
        await login.loginWithDirectLink(browser.params.regularUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.newGridRows.get(0));
        // const nonAmlBomStartPosition: number = await grid.returnRowNumberByLinkName(0,
        // columnHeaders.columnHeaderNames.newGrid[1], 'regularUser_AML_IPN_OFF');
        await grid.newMechanismSelectAllCheckboxChecking();
        await amlLogic.setBestPartToPref();
        await button.clickByButtonNameAndWait(buttonNames.refresh, gridElements.newGridRows.get(0));
        await bomVaultLogic.deleteSeveralExactBoms(['regularUser_AML_IPN_ON_1', 'regularUser_AML_IPN_ON_2',
            'regularUser_AML_IPN_OFF']);
        // await expect(await grid.returnRowNumberByLinkName(0, columnHeaders.columnHeaderNames.newGrid[1],
        //     'regularUser_AML_IPN_ON_1')).toEqual(0);
        // await expect(await grid.returnRowNumberByLinkName(0, columnHeaders.columnHeaderNames.newGrid[1],
        //     'regularUser_AML_IPN_OFF') >= nonAmlBomStartPosition).toBeTruthy();
    });
});
