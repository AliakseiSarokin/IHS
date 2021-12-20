import {Login} from "../../../../components/login";
import {browser} from "protractor";
import {
    buttonNames,
} from "../../../../testData/global";
import {
    gridElements,
    toolbarElements, transposeElements,
} from "../../../../elements/elements";
import {commonSearch} from "../../../../testData/search";
import {Button} from "../../../../components/simple/button";
import {QuickSearch} from "../../../../components/quickSearch";

const login: Login = new Login();
const button: Button = new Button();
const quickSearch: QuickSearch = new QuickSearch();

describe('Parts search, Transpose, DE110943', () => {
    it('should be locked transpose button in filters', async () =>{
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await quickSearch.performQuickSearch(commonSearch.commonValue);
        await button.clickByButtonNameAndWait(buttonNames.filters, toolbarElements.transposeButton);
        await expect(await transposeElements.buttonTooltip.getAttribute('class')).toContain('disabled');
    });
});