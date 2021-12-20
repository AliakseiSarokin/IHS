import {buttonNames,  meganavItems} from "../../../../testData/global";
import {gridElements} from "../../../../elements/elements";
import {browser} from "protractor";
import {Button} from "../../../../components/simple/button";
import {Grid} from "../../../../components/grid";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";

const button: Button = new Button;
const grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();

describe(' BOM Vault - TC67707', () => {

    it(" should not go to first page after refresh", async () => {
        await login.loginWithDirectLink(browser.params.readOnlyUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.checkboxSelector.get(1));
        await grid.goToTheNextPage();
        await button.clickOnTheElementAndWait(button.returnButtonByText(buttonNames.refresh), gridElements.checkboxSelector.get(1));
        await expect(await gridElements.currentPage.getAttribute('value')).toEqual('2')
    });

});