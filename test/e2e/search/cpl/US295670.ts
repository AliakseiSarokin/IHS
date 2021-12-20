import {Button} from "../../../../components/simple/button";
import {browser} from "protractor";
import {buttonNames, meganavItems} from "../../../../testData/global";
import {CplSearchLogic} from "../../../../bussinesLayer/search/cplSearchLogic";
import {commonSearch, cplSearchConst} from "../../../../testData/search";
import {HelpLogic} from "../../../../bussinesLayer/help/helpLogic";
import {Input} from "../../../../components/simple/input";
import {InstructionPanel} from "../../../../components/instructionPanel";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {SearchLogic} from "../../../../bussinesLayer/search/searchLogic";
import {commonElements, gridElements, searchElements,cplElements} from "../../../../elements/elements";
import {Grid} from "../../../../components/grid";
import {Actions} from "../../../../utils/actions";
import {Waiters as w} from "../../../../helper/waiters";


const grid:Grid = new Grid();
const button: Button = new Button();
const cplSearchLogic = new CplSearchLogic();
const helpLogic: HelpLogic = new HelpLogic();
const input: Input = new Input();
const instructionPanel: InstructionPanel = new InstructionPanel();
const meganav: Meganav = new Meganav();
const login: Login = new Login();
const searchLogic: SearchLogic = new SearchLogic();


describe('US295670 Manage CPL page - Verify filter for manufacturer parts', () => {

    it('should navigate to manage CPL page and verify if filters are available for Mfr Parts for Selected Corp P/N datagrid', async () => {
        const columnName:string[] = ['Mfr P/N','Mfr Name'];
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl, meganavItems.cplSublinks.manageCpl,
            gridElements.newGridUnlockedColumnLinksByRowAndCellNumbers(1, 0).get(0));
        await w.waitUntilWorkingModalNotDisplayed();
        await grid.clickOnCellLinkAndWaitForElement(1,0,0,cplElements.cplDetails.gridTitle.get(1));

        for(let i:number=0;i<columnName.length;i++)
        {
            await grid.newGridOpenFilterBoxByName(columnName[i]);
            await expect(await button.returnButtonByText(buttonNames.clearFilter).isEnabled()).toBeTruthy();
            await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeFalsy();
            await Actions.sendKeys(gridElements.columnsSort.input, '   ');
            await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeFalsy();
            await Actions.clearInputWithDelete(gridElements.columnsSort.input);
            await Actions.sendKeys(gridElements.columnsSort.input, '3');
            await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeTruthy();
            await grid.newGridCloseFilterBoxIfPresent();
        };
    });

});