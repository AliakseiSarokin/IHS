import {gridElements, partStandardization} from "../../../../elements/elements";
import {browser} from "protractor";
import {meganavItems} from "../../../../testData/global";
import {Grid} from "../../../../components/grid";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {PartStandardizationLogic} from "../../../../bussinesLayer/bomVault/partStandardizationLogic";

const grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const partStandardizationLogic: PartStandardizationLogic = new PartStandardizationLogic();

describe('Part Standardization, DE112483', ()=> {
    afterAll(async() =>{
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await partStandardizationLogic.deleteViewByName('DE112483');
    });

    it('remove should button run be disable after bom from view', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await partStandardizationLogic.createNewReprocessedView('DE112483', 2);
        await grid.mechanismCheckCheckboxByName('Name', 'DE112483');
        await partStandardizationLogic.goToBomsTab();
        await partStandardizationLogic.deleteAllBomFromView();
        await expect(await partStandardization.toolbarButtonsBomsTab.get(0).isEnabled()).toBeFalsy();
    });
});