import {Button} from "../../../../components/simple/button";
import {
    bomVaultElements,
    gridElements,
    partStandardization,
} from "../../../../elements/elements";
import {browser} from "protractor";
import {
    buttonNames,
    meganavItems,
} from "../../../../testData/global";
import {Grid} from "../../../../components/grid";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {PartStandardizationLogic} from "../../../../bussinesLayer/bomVault/partStandardizationLogic";
import {Modal} from "../../../../components/modal";
import {BomTreeLogic} from "../../../../bussinesLayer/bomVault/bomTreeLogic";
import {Shade} from "../../../../components/shade";
import {Random} from "../../../../utils/random";
const button: Button = new Button;
const grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const partStandardizationLogic: PartStandardizationLogic = new PartStandardizationLogic();
const modal: Modal = new Modal();
const bomTreeLogic: BomTreeLogic = new BomTreeLogic();
const random: Random = new Random();
const name: string = 'DE111653' + + random.randomTextGenerator(5);
describe('Part Standardization, DE111653', ()=> {

    afterAll(async() =>{
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await partStandardizationLogic.deleteViewByName(name);
    });

    it(`should bom tree filter close after add bom to view`, async() => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await partStandardizationLogic.addNewPartStandardizationView(name);
        await partStandardizationLogic.filteredOnlyOwnPartStandartization();
        await grid.mechanismCheckCheckboxByName('Name', name);
        await partStandardizationLogic.goToBomsTab();
        await button.clickOnTheElementAndWait(partStandardization.toolbarButtons.get(2), partStandardization.dropdownMenuButtons.get(3));
        await button.clickOnTheElementAndWait(partStandardization.dropdownMenuButtons.get(3), bomVaultElements.bomTree.bomTreeRows.get(1));
        await bomTreeLogic.checkNewGridBomRowsInShade(1);
        await button.clickOnTheElementAndWait(bomVaultElements.bomTreeFilter.bomTreeFilterIcon,
            bomVaultElements.bomTreeFilter.bomTreeFilterActive);
        await expect(await bomVaultElements.bomTreeFilter.bomTreeFilterActive.isPresent()).toBeTruthy();
        await modal.openModalWithElement(partStandardization.shadeAddBomsButton);
        await Shade.closeShadeWithButton(buttonNames.okay);
        await expect(await bomVaultElements.bomTreeFilter.bomTreeFilterActive.isPresent()).toBeFalsy();
    });
});