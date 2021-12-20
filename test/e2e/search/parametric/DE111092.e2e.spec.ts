import {Login} from "../../../../components/login";
import {browser} from "protractor";
import {Meganav} from "../../../../components/meganav";
import {
    buttonNames,
    meganavItems,
} from "../../../../testData/global";
import {
    searchElements,
} from "../../../../elements/elements";
import {Grid} from "../../../../components/grid";
import {ParametricSearchLogic} from "../../../../bussinesLayer/search/parametricSearchLogic";
import {Transpose} from "../../../../components/grid";
import {Button} from "../../../../components/simple/button";
import {Modal} from "../../../../components/modal";

const login: Login = new Login();
const meganav: Meganav = new Meganav();
const grid: Grid = new Grid();
const parametricSearchLogic: ParametricSearchLogic = new ParametricSearchLogic();
const transpose: Transpose = new Transpose();
const button: Button = new Button();
const modal: Modal = new Modal();

describe('Parametric search, Compare Parts, DE111092', () => {
    it('should not have opportunity delete anchor parts from compare parts', async () =>{
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parametric,
            searchElements.parametric.commodities.get(0));
        await parametricSearchLogic.performParametricSearch();
        await grid.newMechanismCheckboxRangeChecking(0, 5);
        await modal.openModalWithButtonByName(buttonNames.compareSelected);
        await transpose.transposeCheckboxRangeChecking(0, 1);
        await browser.sleep(5000);
        await expect(await button.returnButtonByText(buttonNames.remove).isEnabled()).toBeFalsy();
    });
});