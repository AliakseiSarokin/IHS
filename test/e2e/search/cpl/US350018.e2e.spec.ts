import {browser} from "protractor";
import {headerItems, titles} from "../../../../testData/global";
import {Login} from "../../../../components/login";
import {headerElements, importElements, pageTitles, settings
} from "../../../../elements/elements";
import {Header} from "../../../../components/header";
import {SettingsLogic} from "../../../../bussinesLayer/settings/settingsLogic";
import {CheckBox} from "../../../../components/simple/checkBox";
import {QuickSearch} from "../../../../components/quickSearch";
import {ViewAlternatesLogic} from "../../../../bussinesLayer/partDetails/viewAlternatesLogic";
import {Modal} from "../../../../components/modal";

const checkBox: CheckBox = new CheckBox()
const login: Login = new Login();
const modal: Modal = new Modal();
const settingsLogic: SettingsLogic = new SettingsLogic();
const quickSearch: QuickSearch = new QuickSearch();
const viewAlternatesLogic: ViewAlternatesLogic = new ViewAlternatesLogic();

xdescribe('US350018, US354820 CPL Search -  Limit part search to cpl results - alternates search', () => {

    it('should open Search Settings', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[3],
            settings.module);
        await expect(pageTitles.moduleSettingsTitle.getText()).toEqual(titles.searchSettings);
    });

    it('should check "Limit part search results and alternates search results to just CPL manufacturer parts" checkbox', async () => {
        await checkBox.checkUnCheckSingleCheckbox(await settings.searchSettings.cplSearchResultsCheckbox.get(1), await settings.searchSettings.cplSearchResultsCheckbox.get(1), 'true')
        await settingsLogic.saveSettings();
    });

    it('should perform quick part search for part which is in CPL', async () => {
        await quickSearch.performQuickSearch('7108SPD9ZQE')
    });

    it('should open Alternates modal', async () => {
        await viewAlternatesLogic.openViewAlternatesModal(0, 'Part Number');
        await expect(await importElements.cancelModalText.get(0).getText()).toEqual('The number of alternates is greater' +
            ' than 5000. The CPL filter to limit the alternates search to just parts on your CPL can only be used when ' +
            'the number of alternates is less than 5000. Please modify your alternates search to reduce the number of ' +
            'results if you only want to find alternates that are on your CPL.');
        await modal.closeModalWithXButton('Error Notification');
        await modal.closeModalIfPresent()
    });

    it('should uncheck "Limit part search results and alternates search results to just CPL manufacturer parts" checkbox', async () => {
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[3],
            settings.module);
        await checkBox.checkUnCheckSingleCheckbox(await settings.searchSettings.cplSearchResultsCheckbox.get(1), await settings.searchSettings.cplSearchResultsCheckbox.get(1), 'false')
        await settingsLogic.saveSettings();
    });
});