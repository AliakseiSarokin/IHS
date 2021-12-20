import {buttonNames,  meganavItems,titles} from "../../../../testData/global";
import {pageTitles, gridElements} from "../../../../elements/elements";
import {browser} from "protractor";
import {Button} from "../../../../components/simple/button";
import {Grid} from "../../../../components/grid";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
const button: Button = new Button;
const grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();


describe('BOM Summary - Restricted User', () => {

    it ( 'should go to BOM Summary - Restricted User' , async () => {
        await login.loginWithDirectLink(browser.params.restrictedUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomSummary, gridElements.checkboxSelector.get(1));
        await expect(await pageTitles.pageTitle.getText()).toEqual(titles.bomSummary);
    });

    it(" should be active toolbar buttons- Restricted User", async () => {
        await grid.checkCheckboxRange(0,1);
        await expect(button.returnButtonByText(buttonNames.reprocess).isEnabled()).toBeTruthy();
        await expect(button.returnButtonByText(buttonNames.delete).isEnabled()).toBeTruthy();
    });
});