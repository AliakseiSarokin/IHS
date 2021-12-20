import {FuzzySearchLogic} from "../../../../../bussinesLayer/search/partsSearchLogic";
const fuzzySearchLogic: FuzzySearchLogic = new FuzzySearchLogic();
import {Login} from "../../../../../components/login";
const login: Login = new Login();
import {Meganav} from "../../../../../components/meganav";
const meganav:Meganav = new Meganav();
import {headerElements, searchElements, settings} from "../../../../../elements/elements";
import {headerItems, meganavItems} from "../../../../../testData/global";
import {browser} from "protractor";
import {Header} from "../../../../../components/header";
import {SettingsLogic} from "../../../../../bussinesLayer/settings/settingsLogic";
const settingsLogic = new SettingsLogic();
describe('Fuzzy Search - Part Number Starts With', () => {

    beforeAll(async ()=> {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[3],
            settings.module);
        await settingsLogic.checkUnCheckSingleCheckbox(settings.bomVaultSettings.ExpectedDefaultText.get(2),settings.bomVaultSettings.ExpectedDefaultinput.get(2),false);
    });
    it('should be fuzzy search modal for Part Number Starts With', async () => {
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await fuzzySearchLogic.fuzzyExactStartsWith('Part Number Starts With');
    });

    it('should be fuzzy search modal attributes', async () => {
        await fuzzySearchLogic.fuzzySearchModal('starts with');
    });

    it("should close fuzzy modal by clicking on 'No' or 'X' buttons", async () => {
        await fuzzySearchLogic.closeFuzzyModal();
    });

    it('should be modal when fuzzy search did not find results', async () => {
        await fuzzySearchLogic.fuzzyNoResults();
    });

    it('should perform fuzzy search', async () => {
        await fuzzySearchLogic.performFuzzySearch('lm*&^311');
        await login.logout();
    });
});

describe('Fuzzy Search - Exact Part Number',  () => {

    beforeAll(async ()=> {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[3],
            settings.module);
        await settingsLogic.checkUnCheckSingleCheckbox(settings.bomVaultSettings.ExpectedDefaultText.get(2),settings.bomVaultSettings.ExpectedDefaultinput.get(2),false);
    });
    it('should be fuzzy search', async () => {
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await fuzzySearchLogic.fuzzyExactStartsWith('Exact Part Number');
    });

    it('should be fuzzy search modal attributes', async () => {
        await fuzzySearchLogic.fuzzySearchModal('exact');
    });

    it("should close fuzzy modal by clicking on 'No' or 'X' buttons", async () => {
        await fuzzySearchLogic.closeFuzzyModal()
    });

    it('should be modal when fuzzy search did not find results', async () => {
        await fuzzySearchLogic.fuzzyNoResults();
    });

    it('should perform fuzzy search', async () => {
        await fuzzySearchLogic.performFuzzySearch('lm*&^311');
        await login.logout();
    });
});

describe('Fuzzy Search - Part Number Contains/Keyword Search', () => {

    it('should not be fuzzy search modal', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await fuzzySearchLogic.fuzzyKeywordContain( 'Part Number Contains');
    });

    it('should not be fuzzy search modal attributes', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await fuzzySearchLogic.fuzzyKeyword();
    });
});


describe('Fuzzy Search - Quick Search',  () => {

    it('should be fuzzy search for Exact Part Number', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await fuzzySearchLogic.fuzzyQuickSearch('Exact Part #');
    });

    it('should be fuzzy search for Part Starts With', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await fuzzySearchLogic.fuzzyQuickSearch('Part # Starts With');
    });
});


describe('Fuzzy Search By default- Exact Part Number,US276877',  () => {

    beforeAll(async ()=> {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[3],
            settings.module);
        await settingsLogic.checkUnCheckSingleCheckbox(settings.bomVaultSettings.ExpectedDefaultText.get(2),settings.bomVaultSettings.ExpectedDefaultinput.get(2),true);
    });

    it('should be fuzzy search', async () => {

        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await fuzzySearchLogic.fuzzyExactStartsWith('Exact Part Number');
    });

    it('should be modal when fuzzy search did not find results', async () => {
        await fuzzySearchLogic.fuzzyNoResultsByDefault();
    });

});

describe('Fuzzy Search By default- Part Number Starts With ,US276877',  () => {

    beforeAll(async ()=> {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[3],
            settings.module);
        await settingsLogic.checkUnCheckSingleCheckbox(settings.bomVaultSettings.ExpectedDefaultText.get(2),settings.bomVaultSettings.ExpectedDefaultinput.get(2),true);
    });

    it('should be fuzzy search modal for Part Number Starts With', async () => {
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await fuzzySearchLogic.fuzzyExactStartsWith('Part Number Starts With');
    });

    it('should be modal when fuzzy search did not find results', async () => {
        await fuzzySearchLogic.fuzzyNoResultsByDefault();
    });

});
