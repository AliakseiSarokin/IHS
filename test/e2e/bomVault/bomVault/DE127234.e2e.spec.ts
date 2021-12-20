import {browser} from 'protractor';
import {meganavItems} from "../../../../testData/global";
import {Grid} from "../../../../components/grid";
import {gridElements} from "../../../../elements/elements";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {ImportLogic} from "../../../../bussinesLayer/import/importLogic";

const grid: Grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const importLogic: ImportLogic = new ImportLogic();


describe('BOM Vault - DE127234', () => {

    it('shoud reimport redirects user to the "step-1 bom import" page', async () => {

        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.checkboxSelector.get(1));
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await importLogic.reimportBom();
        const dragDropText: string = 'Drag and drop a BOM (Bill of Materials) file here,' +
            ' or click Browse and select a file from your computer.';
        await importLogic.dragAndDropBoxTextChecking(dragDropText);
    });

});
