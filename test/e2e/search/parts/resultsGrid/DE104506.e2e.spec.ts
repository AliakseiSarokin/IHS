import {Button} from "../../../../../components/simple/button";
import {browser} from "protractor";
import {buttonNames, meganavItems} from "../../../../../testData/global";
import {commonSearch} from "../../../../../testData/search";
import {Grid} from "../../../../../components/grid";
import {Login} from "../../../../../components/login";
import {Meganav} from "../../../../../components/meganav";
import {PartsSearchLogic} from "../../../../../bussinesLayer/search/partsSearchLogic";
import {searchElements} from "../../../../../elements/elements";

const button: Button = new Button();
const grid: Grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const partsSearchLogic: PartsSearchLogic = new PartsSearchLogic();

describe('DE104506', () => {

    it('should be Apply Filter and Clear Filter buttons for Risk Columns ', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await grid.newGridOpenFilterBoxByName('LC Risk');
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isDisplayed()).toBeTruthy();
        await expect(await button.returnButtonByText(buttonNames.clearFilter).isDisplayed()).toBeTruthy();
        await grid.closeOpenFilterBox();
        await grid.newGridOpenFilterBoxByName('ENV Risk');
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isDisplayed()).toBeTruthy();
        await expect(await button.returnButtonByText(buttonNames.clearFilter).isDisplayed()).toBeTruthy();
        await grid.closeOpenFilterBox();
        await grid.newGridOpenFilterBoxByName('SC Risk');
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isDisplayed()).toBeTruthy();
        await expect(await button.returnButtonByText(buttonNames.clearFilter).isDisplayed()).toBeTruthy();
    });

});