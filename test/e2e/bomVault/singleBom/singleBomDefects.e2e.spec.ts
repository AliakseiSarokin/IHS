import {browser} from "protractor";
import {buttonNames, columnHeaders, meganavItems} from "../../../../testData/global";
import {gridElements} from "../../../../elements/elements";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {SingleBomLogic} from "../../../../bussinesLayer/bomVault/singleBomLogic";
import {Dropdown} from "../../../../components/dropdown";
import {Actions} from "../../../../utils/actions";
import {Grid} from "../../../../components/grid";
import {Button} from "../../../../components/simple/button";
import {Toolbar} from "../../../../components/toolbar";

const login: Login = new Login();
const meganav: Meganav = new Meganav();
const singleBomLogic: SingleBomLogic = new SingleBomLogic();
const grid: Grid = new Grid();
const button: Button = new Button();
const toolbar: Toolbar = new Toolbar();


describe(`Single BOM, DE115806`, () => {
   it(`View Single BOM: Grid displays applied column sorting for bom with more than 10k parts`, async() =>{
       await login.loginWithDirectLink(browser.params.groupAdminUrl);
       await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
           meganavItems.bomsSubItems.viewAllBoms, gridElements.checkboxSelector.get(1));
       await singleBomLogic.openSingleBomByName('10K_boms');
       let value = (await grid.newGridReturnCellValuesByColumnName(0, 'Internal Part Number'))[0];
       await grid.newGridOpenFilterBoxByName('Internal Part Number');
       await grid.switchToSortColumnMenu();
       await expect(await gridElements.columnsSort.returnMenuOptionsByName('Sort Ascending').getAttribute('class'))
           .toContain('disabled');
       await expect(await gridElements.columnsSort.returnMenuOptionsByName('Sort Descending').getAttribute('class'))
           .toContain('disabled');
       await grid.switchToFilterColumnMenu();
       await Dropdown.openDropdownByClickOnElementInSortBox(gridElements.columnsSort.dropdown);
       await Dropdown.selectValueInDropdownByValueNameWithoutWait(columnHeaders.bom.filterOptions[1]);
       await Actions.sendKeys(gridElements.columnsSort.input, value);
       await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
       await grid.newGridOpenFilterBoxByName('Internal Part Number');
       await grid.switchToSortColumnMenu();
       await expect(await gridElements.columnsSort.returnMenuOptionsByName('Sort Ascending').getAttribute('class'))
           .not.toContain('disabled');
       await expect(await gridElements.columnsSort.returnMenuOptionsByName('Sort Descending').getAttribute('class'))
           .not.toContain('disabled');
       await grid.switchToFilterColumnMenu();
       await button.clickOnTheElementAndWait(await button.returnButtonByText(buttonNames.clearFilter), gridElements.newGridRows.get(0));
       await grid.newGridOpenFilterBoxByName('Internal Part Number');
       await grid.switchToSortColumnMenu();
       await expect(await gridElements.columnsSort.returnMenuOptionsByName('Sort Ascending').getAttribute('class'))
           .toContain('disabled');
       await expect(await gridElements.columnsSort.returnMenuOptionsByName('Sort Descending').getAttribute('class'))
           .toContain('disabled');
   })
});

describe(`Add to workspace button should be disabled when the user selects an unmatched part inside BOM details tab, Def-301370`, () => {
    it(`Verify Add to workspace button should be disabled for Unmatched parts`, async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.checkboxSelector.get(1));
        await singleBomLogic.openSingleBomByName('Automation_BOM_With_Icons');
        await toolbar.openToolbarDropdownByButtonNameAndClicklink(buttonNames.filter,0,'UnMatched Parts');
        await singleBomLogic.verifyAddtoWorkspaceButtonEnabled(false);
        await toolbar.openToolbarDropdownByButtonNameAndClicklink(buttonNames.filter,0,'Matched Parts');
        await singleBomLogic.verifyAddtoWorkspaceButtonEnabled(true);
    })
});
