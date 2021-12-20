import {browser} from "protractor";
import {commonSearch} from "../../../../../testData/search";
import {Login} from "../../../../../components/login";
import {GetPerformanceLogs} from "../../../../../utils/getPerformanceLogs";
import {QuickSearch} from "../../../../../components/quickSearch";

const login: Login = new Login();
const quickSearch: QuickSearch = new QuickSearch();

describe('DE111632', () => {

    it("should be one 'parts/meta' and two 'parts' requests on part search action", async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await quickSearch.performQuickSearch(commonSearch.commonValue);
        await expect(await GetPerformanceLogs.getUrlAmountInRequest('parts', 'parts/meta')).toEqual(3);
    });

});

