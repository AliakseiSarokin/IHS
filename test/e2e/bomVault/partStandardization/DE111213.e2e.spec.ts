import {
       gridElements,
    partStandardization,
} from "../../../../elements/elements";
import {browser} from "protractor";
import {meganavItems} from "../../../../testData/global";
import {Grid} from "../../../../components/grid";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {PartStandardizationLogic} from "../../../../bussinesLayer/bomVault/partStandardizationLogic";
import {Actions} from "../../../../utils/actions";
import {Random} from "../../../../utils/random";
const grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const partStandardizationLogic: PartStandardizationLogic = new PartStandardizationLogic();
const actions: Actions=new Actions();
const random: Random = new Random();
const name: string = 'DE111213' + + random.randomTextGenerator(5);
describe('Part Standardization, DE111213', ()=> {

    afterAll(async() =>{
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await partStandardizationLogic.deleteViewByName(name);
    });

    it('summary tab should be disabled for new created view', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await partStandardizationLogic.addNewPartStandardizationView(name);
        await partStandardizationLogic.filteredOnlyOwnPartStandartization();
        await grid.mechanismCheckCheckboxByName('Name', name);
        await partStandardizationLogic.goToBomsTab();
        await partStandardizationLogic.addAmountOfBomsToView(3);
        await grid.mechanismCheckCheckboxByName('Name', name);
        await expect (await partStandardization.tabButton.get(2).getAttribute("class")).toContain('disabled');
        await actions.mouseMoveToElementAndWaitForTooltip(partStandardization.tabButton.get(2), partStandardization.tabTooltips.get(0));
        await expect(await partStandardization.tabTooltips.get(0).getText()).toEqual('Add BOMs to the View and Run the analysis for this View to enable this tab');
    });
});