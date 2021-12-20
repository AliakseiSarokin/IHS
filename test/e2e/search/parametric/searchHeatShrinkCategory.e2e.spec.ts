import {browser} from "protractor";
import {buttonNames, meganavItems} from "../../../../testData/global";
import {
    searchElements,
    partDetailsElements,
    commonElements
} from "../../../../elements/elements";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {QuickSearch} from "../../../../components/quickSearch";
import {SearchLogic} from "../../../../bussinesLayer/search/searchLogic";
import {ParametricSearchLogic} from "../../../../bussinesLayer/search/parametricSearchLogic";
const parametricSearchLogic = new ParametricSearchLogic();
const searchLogic = new SearchLogic();
const quickSearch = new QuickSearch();
import {PartDetailsLogic} from "../../../../bussinesLayer/partDetails/partDetailsLogic";
const partDetailsLogic = new PartDetailsLogic();
const modal:Modal = new Modal();
const meganav:Meganav = new Meganav();
const login: Login = new Login();

describe('Add Parts to BOM - Parts search - BOM Intel', () => {

    beforeAll(async () => {
        browser.params.waitWebElementMaxTimeout = 120000;
    });

    afterAll(async () => {
        browser.params.waitWebElementMaxTimeout = browser.params.defaultElementWaitTime;
    });

    it('should search for Heat Shrinks category part', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parametric,
            searchElements.parametric.commodities.get(0));
        await parametricSearchLogic.performParametricSearchForHeatShrinks();
        await partDetailsLogic.newGridOpenPartDetModalFromIpnLinkInSearch();
        await expect(await partDetailsElements.headerElement.last().getText()).toEqual('Heat Shrinks');
        await modal.closeModalWithXButton();
    });

    it('should search for Heat Shrinks category part from quick search', async () => {
        await quickSearch.performQuickSearch('BSTS-011-X25FR/NM');
        await partDetailsLogic.newGridOpenPartDetModalFromIpnLinkInSearch();
        await expect(await partDetailsElements.headerElement.last().getText()).toEqual('Heat Shrinks');
        await modal.closeModalWithXButton();
    });


    it('should search for Heat Shrinks category part by search by example', async () => {
        await quickSearch.performQuickSearch('BSTS-011-X25FR/NM');
        await partDetailsLogic.newGridOpenPartDetModalFromIpnLinkInSearch();
        await expect(await partDetailsElements.headerElement.last().getText()).toEqual('Heat Shrinks');
        await modal.closeModalWithButton(buttonNames.searchByExample);
        await searchLogic.heatShrinkViewSearchCriteriaChecking();
        await expect(await commonElements.popoverStrong.get(0).getText()).toEqual('Interconnects > Connector Support > Heat Shrinks')
    })
});