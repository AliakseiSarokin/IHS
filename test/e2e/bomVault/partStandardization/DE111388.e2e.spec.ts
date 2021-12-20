import {
    gridElements,
    partStandardization,
} from "../../../../elements/elements";
import {browser, by, element} from "protractor";
import {buttonNames, meganavItems} from "../../../../testData/global";
import {Grid} from "../../../../components/grid";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {PartStandardizationLogic} from "../../../../bussinesLayer/bomVault/partStandardizationLogic";
import{Button} from "../../../../components/simple/button";
import {Random} from "../../../../utils/random";
const grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const partStandardizationLogic: PartStandardizationLogic = new PartStandardizationLogic();
const random: Random = new Random();
const button: Button= new Button();
const name: string = 'DE111388' + + random.randomTextGenerator(5);
describe('Part Standardization, DE111388', ()=> {

    afterAll(async() =>{
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await partStandardizationLogic.deleteViewByName(name);
    });

    it('Summary tab should be disabled for empty view', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await partStandardizationLogic.addNewPartStandardizationView(name);
        await partStandardizationLogic.filteredOnlyOwnPartStandartization();
        await grid.mechanismCheckCheckboxByName('Name', name);
        await partStandardizationLogic.goToBomsTab();
        await partStandardizationLogic.addBomToPartStandardizationView();
        await grid.mechanismCheckCheckboxByName('Name', name);
        await partStandardizationLogic.goToBomsTab();
        await partStandardizationLogic.deleteSingleBomFromView();
        await partStandardizationLogic.goToViewTab();
        await partStandardizationLogic.filteredOnlyOwnPartStandartization();
        await grid.mechanismCheckCheckboxByName('Name', name);
        await expect (await partStandardization.tabButton.get(2).getAttribute("class")).toContain('disabled');
        await expect (await button.returnButtonByText(buttonNames.run).isEnabled()).toBeFalsy();
        const cellNames: string[] = await grid.newGridReturnCellValuesByColumnName(1 ,'Name');
        for(let i: number = 0; i < cellNames.length; i++) {
            if (cellNames[i] == name) {
                await expect(await partStandardization.reprocessIconByRow(i).getAttribute('class')).toContain("unclickable-icon");
            }
        }
    });
});