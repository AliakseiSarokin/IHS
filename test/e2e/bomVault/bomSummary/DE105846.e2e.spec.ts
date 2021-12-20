import { modalTitles, buttonNames,  meganavItems,
    titles,columnHeaders} from "../../../../testData/global";
import {
    resReqElements, pageTitles, gridElements, dropdownElements,
    toolbarElements
} from "../../../../elements/elements";
import {browser} from "protractor";
import {Grid} from "../../../../components/grid";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
const grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();

describe('BOM Summary - DE105846', () => {

    it ( 'should be filter labels on BOM Details when go to it through BOM Summary' , async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomSummary, gridElements.newGridCheckboxSelector.get(1));
        const rowNumberWithLink:number = await grid.returnRowNumberByFirstLinkInCell(1, 4);
        await grid.clickOnCellLinkAndWaitForElement(1,rowNumberWithLink,4,
            gridElements.checkboxSelector.get(1));
        await expect(await toolbarElements.tagByName('Total Discontinued').isDisplayed()).toBeTruthy();
    });

});