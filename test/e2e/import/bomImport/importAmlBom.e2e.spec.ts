import {AmlLogic} from "../../../../bussinesLayer/bomVault/amlLogic";
import {browser} from "protractor";
import {Grid} from "../../../../components/grid";
import {gridElements, importElements} from "../../../../elements/elements";
import {ImportLogic} from "../../../../bussinesLayer/import/importLogic";
import {importItems} from "../../../../testData/import";
import {Login} from "../../../../components/login";
import {leftNavItems, meganavItems} from "../../../../testData/global";
import {Meganav} from "../../../../components/meganav";

const amlLogic: AmlLogic = new AmlLogic();
const grid = new Grid();
const importLogic: ImportLogic = new ImportLogic();
const login: Login = new Login();
const meganav: Meganav = new Meganav();

describe(' Import BOM with AML On', () => {

    it('should go to import page and select a file', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganav(meganavItems.import,
            importElements.aboutImport);
        await importLogic.goToStep1();
        await importLogic.uploadAValidFileToImport();
        await importLogic.setBomName();
    });

    it('should set AML option on', async () => {
        await importLogic.setAmlOn()
    });

    it('should go to imported BOM and should be links in IPN cells', async () => {
        await importLogic.importBom();
        await importLogic.showImportedBomInVault();
        await importLogic.waitingForProcessedStatus();
        await amlLogic._checkingAmlBom(importItems.bomImportName, true);
        await grid.changeGridWithLeftNavOptionByName(leftNavItems.bomOptions.viewAllBoms, gridElements.newGridRows.get(1));
        await importLogic.deleteImportedBom();
    });
});
