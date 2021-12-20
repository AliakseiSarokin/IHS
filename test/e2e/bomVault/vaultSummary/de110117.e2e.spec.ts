import { modalTitles, buttonNames,  meganavItems,
    titles,columnHeaders} from "../../../../testData/global";
import {resReqElements, pageTitles, gridElements, bomVaultElements} from "../../../../elements/elements";
import {browser} from "protractor";
import {Button} from "../../../../components/simple/button";
import {Grid} from "../../../../components/grid"
import {InstructionPanel} from "../../../../components/instructionPanel";
import {Link} from "../../../../components/simple/link";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {StringArray} from "../../../../utils/stringArray";
import {bomVaultData} from "../../../../testData/bomVault";
const button: Button = new Button();
const grid: Grid = new Grid();
const instructionPanel: InstructionPanel = new InstructionPanel();
const link: Link = new Link();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const stringArray: StringArray = new StringArray();


describe('Vault Summary - DE110117',  () => {

    it ( 'should work clear filter on BOm Vault after moving to it from Vault Summary' , async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.vaultSummary, await  bomVaultElements.vaultSummary.tableKeyByTableNumber(2).get(0));
        const user:string = await  bomVaultElements.vaultSummary.tableKeyByTableNumber(2).get(0).getText();
        const userBomsNumber:string = await  bomVaultElements.vaultSummary.tableValueByTableNumber(2).get(0).getText();
        await link.clickOnTheLinkByNameAndWaitForElement(userBomsNumber, gridElements.newGridCellByRowIndex(0).get(1));
        await grid.newGridOpenFilterBoxByName('Owner');
        await expect(await gridElements.columnsSort.input.getAttribute('value')).toEqual(user);
        await button.clickOnTheElementAndWait(button.returnButtonByText(buttonNames.clearFilter),
            gridElements.newGridCellByRowIndex(0).get(1));
        await grid.newGridOpenFilterBoxByName('Owner');
        await expect(await gridElements.columnsSort.input.getAttribute('value')).toEqual('');
        await button.clickOnTheElementAndWait(button.returnButtonByText(buttonNames.reset),
            gridElements.newGridCellByRowIndex(0).get(1));
        await grid.newGridOpenFilterBoxByName('Owner');
        await expect(await gridElements.columnsSort.input.getAttribute('value')).toEqual(user);
    });
});