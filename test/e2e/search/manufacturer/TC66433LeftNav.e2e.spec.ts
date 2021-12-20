import {browser} from "protractor";
import {commonSearch} from "../../../../testData/search";
import {meganavItems} from "../../../../testData/global";
import {commonElements, searchElements} from "../../../../elements/elements";
import {Login} from "../../../../components/login";

import {Meganav} from "../../../../components/meganav";
import {MfrSearchLogic, typeAheadOption} from "../../../../bussinesLayer/search/mfrSearchLogic";
import {SearchLogic} from "../../../../bussinesLayer/search/searchLogic";

const login: Login = new Login();
const meganav:Meganav = new Meganav();
const mfrSearchLogic: MfrSearchLogic = new MfrSearchLogic();
const searchLogic: SearchLogic = new SearchLogic();

describe('TC66433 - Manufacturer Search Menu and Left Nav Option - BOM Intel', () => {

    it('should be Mfr Search icon in the left nav', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.list[4],
            commonElements.commonTypeAheadInput);
        await expect(await searchElements.mfrSearchLeftNavIcon.isDisplayed()).toBeTruthy();
    });

    it('should be left nav subitems - CPL Search', async () => {
        await searchLogic.perform5Searches(commonSearch.mfrSearchArray, 4,
            MfrSearchLogic.performMfrSearchAndCloseSliderClearValue, typeAheadOption);
    });

    it('should be popover when hover on search', async () => {
        await searchLogic.toolTipChecking("Mfr");
    });

    it('should go and change order by searches in the left nav', async () => {
        await MfrSearchLogic.goBySearchesInTheLeftNav();
    });

});