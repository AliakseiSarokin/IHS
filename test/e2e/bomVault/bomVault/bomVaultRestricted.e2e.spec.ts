import {AmlLogic} from "../../../../bussinesLayer/bomVault/amlLogic";
import {BomVaultLogic} from "../../../../bussinesLayer/bomVault/bomVaultLogic";
import {Button} from "../../../../components/simple/button";
import {browser} from "protractor";
import {buttonNames, columnHeaders, leftNavItems, meganavItems, titles} from "../../../../testData/global";
import {Grid} from "../../../../components/grid";
import {gridElements, importElements, pageTitles} from "../../../../elements/elements";
import {ImportLogic} from "../../../../bussinesLayer/import/importLogic";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Toolbar} from "../../../../components/toolbar";
import { BomTreeLogic } from "../../../../bussinesLayer/bomVault/bomTreeLogic";

const amlLogic: AmlLogic = new AmlLogic();
const bomVaultLogic: BomVaultLogic = new BomVaultLogic();
const bomTreeLogic: BomTreeLogic = new BomTreeLogic();
const button: Button = new Button;
const grid = new Grid();
const importLogic: ImportLogic = new ImportLogic();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const toolbar: Toolbar = new Toolbar();

describe('BOM Vault - Restricted User', () => {

    it('should go to BOM Vault', async () => {
        await login.loginWithDirectLink(browser.params.restrictedUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.grid);
        await expect(await pageTitles.pageTitle.getText()).toEqual(titles.bomVault);
    });

    it('should have add button with dropdown list  - BOM Details', async () => {
        await grid.mechanismCheckCheckboxByName('Owner', 'b4testrestricted', 1);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await expect(button.returnButtonByText(buttonNames.addToWorksapce).isEnabled()).toBeTruthy();
    });

    it('should be active reimport, reprocess and delete part buttons', async () => {
        await expect(button.returnButtonByText(buttonNames.reimport).isEnabled()).toBeTruthy(); 
        await expect(button.returnButtonByText(buttonNames.reprocess).isEnabled()).toBeTruthy(); 
        await expect(button.returnButtonByText(buttonNames.delete).isEnabled()).toBeTruthy(); 
        await grid.mechanismCheckCheckboxByName('Owner', 'b4testrestricted', 1);
    });

    it('should not be active reimport, reprocess and delete part buttons', async () => {
        await grid.mechanismCheckCheckboxByName('Owner', 'b4testadmin', 1);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await expect(button.returnButtonByText(buttonNames.addToWorksapce).isEnabled()).toBeTruthy();
        await expect(button.returnButtonByText(buttonNames.reimport).isEnabled()).toBeFalsy();
        await expect(button.returnButtonByText(buttonNames.reprocess).isEnabled()).toBeFalsy();
        await expect(button.returnButtonByText(buttonNames.delete).isEnabled()).toBeFalsy();
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomTree, gridElements.grid);
        await expect(await pageTitles.pageTitle.getText()).toEqual(titles.bomTree);
        await bomTreeLogic.expandFolderBomTreeWithName('AUTOMATION_FOLDER_DO_NOT_DELETE_1_1_1');
        const ownerColumnValues: string[] = await grid.returnCellValuesByColumnName(1, 'Owner');
        const b4testAdminIndex: number = ownerColumnValues.findIndex(item => item==='b4testadmin');
        await grid.newMechanismCheckboxRangeChecking(b4testAdminIndex, b4testAdminIndex+1);
        await expect(button.returnButtonByText(buttonNames.reimport).isEnabled()).toBeFalsy();
        await expect(button.returnButtonByText(buttonNames.reprocess).isEnabled()).toBeFalsy();
        await expect(button.returnButtonByText(buttonNames.delete).isEnabled()).toBeFalsy();
    });


    //need to refactor to use it with API
    xit('should set best bom to preferred AML Bom', async () => {
        await login.loginWithDirectLink(browser.params.restrictedUserUrl);
        await meganav.goToFeatureWithMeganav(meganavItems.import, importElements.aboutImport);
        await importLogic.goToStep1();
        await importLogic.uploadAValidFileToImport();
        await importLogic.setExactBomName('restrictedUser_AML_IPN_ON_1');
        await importLogic.setAmlOn();
        await importLogic.importBom();
        await importLogic.importAnotherBOM();
        await importLogic.goToStep1();
        await importLogic.uploadAValidFileToImport();
        await importLogic.setExactBomName('restrictedUser_AML_IPN_ON_2');
        await importLogic.setAmlOn();
        await importLogic.importBom();
        await importLogic.showImportedBomsInVaultByNames(['restrictedUser_AML_IPN_ON_1', 'restrictedUser_AML_IPN_ON_2']);
        await importLogic.waitingForProcessedStatus();
        await expect(await grid.returnRowNumberByLinkName(0, columnHeaders.columnHeaderNames.newGrid[1],
            'restrictedUser_AML_IPN_ON_2') === 0).toBeTruthy();
        await bomVaultLogic.setBestPartToPreferred('restrictedUser_AML_IPN_ON_1');
        await expect(await grid.returnRowNumberByLinkName(0, columnHeaders.columnHeaderNames.newGrid[1],
            'restrictedUser_AML_IPN_ON_1') === 0).toBeTruthy();
    });

    //need to refactor to use it with API
    xit('should set best bom to preferred AML Bom and ignore Non-AML BOM', async () => {
        await login.loginWithDirectLink(browser.params.restrictedUserUrl);
        await meganav.goToFeatureWithMeganav(meganavItems.import, importElements.aboutImport);
        await importLogic.goToStep1();
        await importLogic.uploadAValidFileToImport();
        await importLogic.setExactBomName('restrictedUser_AML_IPN_OFF');
        await importLogic.importBom();
        await importLogic.showImportedBomInVaultByName('restrictedUser_AML_IPN_OFF');
        await importLogic.waitingForProcessedStatus();
        const nonAmlBomStartPosition: number = await grid.returnRowNumberByLinkName(0,
            columnHeaders.columnHeaderNames.newGrid[1], 'restrictedUser_AML_IPN_OFF');
        await grid.changeGridWithLeftNavOptionByName(leftNavItems.bomOptions.viewAllBoms, gridElements.newGridRows.get(0));
        await bomVaultLogic.setSeveralBestPartToPreferred(['restrictedUser_AML_IPN_ON_2', 'restrictedUser_AML_IPN_OFF']);
        await expect(await grid.returnRowNumberByLinkName(0, columnHeaders.columnHeaderNames.newGrid[1],
            'restrictedUser_AML_IPN_ON_2')=== 0).toBeTruthy();
        await expect(await grid.returnRowNumberByLinkName(0, columnHeaders.columnHeaderNames.newGrid[1],
            'restrictedUser_AML_IPN_OFF') >= nonAmlBomStartPosition).toBeTruthy();
    });


    //need to refactor to use it with API
    // here we have to add checks for positions in grid AML and Non-AML Boms after 'Set Best Part to Preferred' action process
    xit("should set best bom to preferred only AML Bom and ignore Non-AML BOM by 'Select All' items", async () => {
        await login.loginWithDirectLink(browser.params.restrictedUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.newGridRows.get(0));
        // const nonAmlBomStartPosition: number = await grid.returnRowNumberByLinkName(0, columnHeaders.columnHeaderNames.newGrid[1],
        //     'restrictedUser_IPN_OFF');
        await grid.newMechanismSelectAllCheckboxChecking();
        await amlLogic.setBestPartToPref();
        await button.clickByButtonNameAndWait(buttonNames.refresh, gridElements.newGridRows.get(0));
        await bomVaultLogic.deleteSeveralExactBoms(['restrictedUser_AML_IPN_ON_1', 'restrictedUser_AML_IPN_ON_2',
            'restrictedUser_AML_IPN_OFF']);
        // await expect(await grid.returnRowNumberByLinkName(0, columnHeaders.columnHeaderNames.newGrid[1],
        //     'restrictedUser_AML_IPN_ON_1')).toEqual(0);
        // await expect(await grid.returnRowNumberByLinkName(0, columnHeaders.columnHeaderNames.newGrid[1],
        //     'restrictedUser_AML_IPN_OFF') >= nonAmlBomStartPosition).toBeTruthy();
    });
});
