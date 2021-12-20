import {Login} from "../../../../components/login";
import {browser} from "protractor";
import {
    gridElements,
    searchElements,
    toolbarElements, transposeElements,
} from "../../../../elements/elements";
import {commonSearch} from "../../../../testData/search";
import {Transpose} from "../../../../components/grid";
import {Button} from "../../../../components/simple/button";
import {QuickSearch} from "../../../../components/quickSearch";

const login: Login = new Login();
const transpose: Transpose = new Transpose();
const button: Button = new Button();
const quickSearch: QuickSearch = new QuickSearch();

describe('Parts search, Transpose, DE110667', () => {
    it('should be checked first checkbox on the last page', async () =>{
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await quickSearch.performQuickSearch(commonSearch.commonValue);
        await transpose.switchToTransposeGrid();
        await button.clickOnTheElementAndWait(gridElements.lastPage, transposeElements.headerCheckbox.get(0));
        await transpose.transposeCheckboxRangeChecking(0, 1);
        await expect(await transposeElements.allheaderCheckbox.get(0).isSelected()).toBeTruthy();
    });
});