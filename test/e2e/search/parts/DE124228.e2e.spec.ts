import {browser, element} from "protractor";
import {Login} from "../../../../components/login";
import {QuickSearch} from "../../../../components/quickSearch";
import {Grid} from "../../../../components/grid"
import {gridElements} from "../../../../elements/elements";
import {Modal} from "../../../../components/modal";
import {modalElements} from "../../../../elements/elements";
import {Waiters as w} from '../../../../helper/waiters'
import {Actions} from "../../../../utils/actions";
import {TypeAhead} from "../../../../components/typeAhead"
import {buttonNames} from "../../../../testData/global";
import {Button} from "../../../../components/simple/button";

const button: Button = new Button;
const typeAhead:TypeAhead  = new TypeAhead();
const login:Login = new Login();
const quickSearch:QuickSearch = new QuickSearch();
const grid: Grid = new Grid();
const modal:Modal = new Modal();

describe("DE124228-Verify filter for Manufacturer name with ampersand value",()=> {

    it('should navigate to parts result page and verify MFR Name filters value with ampersand', async() =>{
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await quickSearch.performQuickSearch('C115366-2586A');
        await grid.newGridOpenFilterBoxByName('Mfr Name');
        await typeAhead.typeAheadCheckingForSort(gridElements.columnsSort.mfrTypeAhead, 'C & K Comp');
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeTruthy();
        await button.returnButtonByText(buttonNames.applyFilter).click();
        await browser.sleep(5000);
        const mfrNameValue: string[] = await grid.newGridReturnCellValuesByColumnName(0,
            'Mfr Name');
        await expect(mfrNameValue).toContain('C & K Comp')
    });
});