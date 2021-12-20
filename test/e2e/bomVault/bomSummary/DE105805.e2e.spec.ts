import { modalTitles, buttonNames,  meganavItems,
    titles,columnHeaders} from "../../../../testData/global";
import {resReqElements, pageTitles, gridElements, dropdownElements} from "../../../../elements/elements";
import {browser} from "protractor";
import {Grid} from "../../../../components/grid";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
const grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();

describe('BOM Summary - DE105805', () => {

    it ( 'checkbox behaviour' , async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomSummary, gridElements.grid);
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await grid.goToTheNextPage();
        await grid.newMechanismCheckboxRangeChecking(25,26);
        await grid.newMechanismCheckboxRangeChecking(25,26);
        await grid.goToThePreviousPage();
        await expect(gridElements.newGridCheckboxSelector.get(0).isSelected()).toBeTruthy();
    });

});