import {
    dropdownElements,
    gridElements,
    partStandardization,
} from "../../../../elements/elements";
import {browser} from "protractor";
import {buttonNames, meganavItems} from "../../../../testData/global";
import {Grid} from "../../../../components/grid";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {PartStandardizationLogic} from "../../../../bussinesLayer/bomVault/partStandardizationLogic";
import {Button} from "../../../../components/simple/button";
import {Link} from "../../../../components/simple/link";
import {Modal} from "../../../../components/modal";
import {Random} from "../../../../utils/random";
import {Toolbar} from "../../../../components/toolbar";

const grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const partStandardizationLogic: PartStandardizationLogic = new PartStandardizationLogic();
const button: Button = new Button();
const link: Link = new Link();
const modal: Modal = new Modal();
const random: Random = new Random();
const name: string = 'DE111641' + + random.randomTextGenerator(5);
const toolbar: Toolbar = new Toolbar();

describe('Part Standardization, DE111641', ()=> {

    afterAll(async() =>{
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await partStandardizationLogic.deleteViewByName(name);
    });

    it('should layout save in summary tab after go to boms tab and return', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await partStandardizationLogic.addNewPartStandardizationView(name);
        await partStandardizationLogic.filteredOnlyOwnPartStandartization();
        await grid.mechanismCheckCheckboxByName('Name', name);
        await partStandardizationLogic.goToBomsTab();
        await partStandardizationLogic.addBomToPartStandardizationView();
        await partStandardizationLogic.filteredOnlyOwnPartStandartization();
        await grid.mechanismCheckCheckboxByName('Name', name);
        await partStandardizationLogic.goToBomsTab();
        await modal.openModalWithElement(partStandardization.toolbarButtonsBomsTab.get(0));
        await modal.closeModalWithButton(buttonNames.okay);
        await partStandardizationLogic.filteredOnlyOwnPartStandartization();
        await partStandardizationLogic.analysisStatusShouldBeCompletedByName(name, 1, 'Name');
        await grid.mechanismCheckCheckboxByName('Name', name);
        await partStandardizationLogic.goToSummaryTab();
        await button.clickOnTheElementAndWait(partStandardization.toolbarButtonsSummaryTab.get(1),
            link.returnElementByLinkName('Life Cycle'));
        await link.clickOnTheLinkByNameAndWaitForElement('Life Cycle', partStandardization.newGridRowsForSummaryTab.get(1));
        await browser.sleep(1000);
        await expect(await partStandardization.panelTitle.get(1).getText()).toEqual('Layout : Life Cycle');
        await partStandardizationLogic.goToBomsTab();
        await partStandardizationLogic.goToSummaryTab();
        await expect(await partStandardization.panelTitle.get(1).getText()).toEqual('Layout : Life Cycle');
    });

    it('should layout save in summary tab after go to view tab and return', async () => {
        await partStandardizationLogic.goToViewTab();
        await partStandardizationLogic.goToSummaryTab();
        await expect(await partStandardization.panelTitle.get(1).getText()).toEqual('Layout : Life Cycle');
    });

    it('should be Filters toolbar button in summary tab, US263480', async () => {
        const expectedFilterOptions: string[] = [
            'IPNs (desc), FFFs (desc), Avg Price (desc)',
            'IPNs (asc), FFFs (desc), Avg Price (desc)',
            'IPNs (desc), FFFs (desc), Avg LT (desc)',
            'IPNs (asc), FFFs (desc), Avg LT (desc)',
            'FFFs (desc), IPNs (desc), Avg Price (desc)',
            'FFFs (desc), Avg Price (desc), IPNs (desc)',
            'FFFs (desc), Avg LT (desc), IPNs (desc)',
            'Avg Price (desc), IPNs (desc), FFFs (desc)',
            'Avg LT (desc), IPNs (desc), FFFs (desc)',
            'Avg Price (desc), FFFs (desc), IPNs (desc)',
            'Avg LT (desc), FFFs (desc), IPNs (desc)' ];
        await button.clickOnTheElementAndWait(partStandardization.toolbarButtonsSummaryTab.get(2),
            dropdownElements.dropdownValues.last());
        await expect(await dropdownElements.dropdownValues.getText()).toEqual(expectedFilterOptions);
    });

});