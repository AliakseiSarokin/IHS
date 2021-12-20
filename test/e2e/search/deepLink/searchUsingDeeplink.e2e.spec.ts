import {AddPartsToBomLogic} from "../../../../bussinesLayer/search/addPartsToBomLogic";
import {BomTreeFilterLogic} from "../../../../bussinesLayer/bomVault/bomTreeFilterLogic";
import {browser} from "protractor";
import {Button} from "../../../../components/simple/button";
import {buttonNames, headerItems, meganavItems, titles} from "../../../../testData/global";
import {commonSearch} from "../../../../testData/search";
import {Grid} from "../../../../components/grid";
import {
    gridElements,
    searchElements,
    partDetailsElements,
    quickSearchElements,
    settings, headerElements, pageTitles, commonElements,
} from "../../../../elements/elements";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {PartsSearchLogic} from "../../../../bussinesLayer/search/partsSearchLogic";
import {Toolbar} from "../../../../components/toolbar";
import {WorkspaceBoms} from "../../../../api/logicLayer/workspaceBoms";
import {user} from "../../../../api/testData/global";
import {DeepLinks} from "../../../../components/deepLinks";

const deeplink:DeepLinks= new DeepLinks();
const addPartsToBomLogic: AddPartsToBomLogic = new AddPartsToBomLogic();
const bomTreeFilterLogic: BomTreeFilterLogic = new BomTreeFilterLogic();
const button: Button = new Button();
const grid: Grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const partsSearchLogic: PartsSearchLogic = new PartsSearchLogic();
const toolbar: Toolbar = new Toolbar();
import {QuickSearch} from "../../../../components/quickSearch";
const quickSearch:QuickSearch = new QuickSearch();

import {Header} from "../../../../components/header";
import {Waiters as w} from "../../../../helper/waiters";


import {CheckBox} from "../../../../components/simple/checkBox";
const checkBox = new CheckBox();

import {SettingsLogic} from "../../../../bussinesLayer/settings/settingsLogic";
const setting:SettingsLogic  = new SettingsLogic();

import {SearchLogic} from "../../../../bussinesLayer/search/searchLogic"
const searchLogic:SearchLogic = new SearchLogic();

describe('Parts search- Deeplink ERC login - Object Id', () => {

    it('should open result page with searched parts- using Object Id in BOM Intelligence', async () => {
        await deeplink.loginWithErcDeepLinkObjId('ihsbiadmin','ihsbiadmin','1542424196');
        await grid.clickOnCellLinkAndWaitForElement(0,0,4,await partDetailsElements.cell.last());
        expect(await partDetailsElements.cell.last().getText()).toEqual('1542424196');
        await modal.closeModalWithXButton();
    });

    it('should open result page with searched parts- using multiple Object Id in BOM Intelligence', async () => {
        const objectId:string= '1542424196|1425954240|2124881804|1942126720';
        await deeplink.loginDirectDeepLinkObjId('ihsbiadmin','ihsbiadmin',objectId,'BI');

        for(let i:number = 0;i<4;i++) {
            await grid.clickOnCellLinkAndWaitForElement(0, i, 4, await partDetailsElements.cell.last());
            await console.log(objectId.split('|')[i]);
            expect(objectId).toContain(await partDetailsElements.cell.last().getText());
            await modal.closeModalWithXButton();
        }

    });

    it('DE127375: Should open result page with searched parts- using  Object Id, when the object id filter is disabled in BOM Intelligence', async () => {
        const objectId:string= '1542424196';
        await deeplink.loginDirectDeepLinkObjId('ihsbiadmin','ihsbiadmin',objectId, 'BI');

        await quickSearch.openQuickSearchDropdwon();
        await browser.sleep(3000);
        const labelNames:any = await quickSearchElements.simpleSearchRadioButtonLabels.getText();
        for (let i:number = 0; i < labelNames.length; i++) {
            if (labelNames[i] === 'ObjectID Search') {
                await quickSearch.closeQuickSearchDropdwon();
                await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[3],
                    settings.module);
                await expect(pageTitles.moduleSettingsTitle.getText()).toEqual(titles.searchSettings);
                await checkBox.checkUnCheckSingleCheckbox(settings.searchSettings.searchByObjectID,
                    settings.searchSettings.searchByObjectID, 'false');
                await setting.saveSettings();
                await w.waitUntilElementIsClickable(settings.searchSettings.ignoreCheckboxLabel.get(0));

                await deeplink.loginDirectDeepLinkObjId('ihsbiadmin','ihsbiadmin',objectId, 'BI');

            }
            else
                await quickSearch.closeQuickSearchDropdwon();
                break;
        }

        await grid.clickOnCellLinkAndWaitForElement(0,0,4,await partDetailsElements.cell.last());
        expect(await partDetailsElements.cell.last().getText()).toEqual('1542424196');
        await modal.closeModalWithXButton();

    });

    it('should open result page with searched parts(25 Parts)- using Object Id in BOM Intelligence', async () => {
        const objId :string = '1542424196|1425954240|1439189327|100038657|100038658|1439189324|1439189312|100038516|100038664|102100459|1420053453|1482540681|1531627180|1428945868|1468620170|100038659|100038432|1439189333|8143695888|1156932268|1428945865|1420053445|1512752404|2065293240|1942126720|2011781405|2065293243|2124881804';
        await deeplink.loginDirectDeepLinkObjId('ihsbiadmin','ihsbiadmin',objId, 'BI');
        await w.waitUntilElementIsDisplayed(partDetailsElements.docIcon.get(1));
        await w.waitUntilElementIsDisplayed(gridElements.gridCounter);
        expect(await gridElements.gridCounter.getText()).toEqual('1 - 25 of 28 items');
    });

    it('should open result page with searched parts- using Object Id in Parts Intelligence', async () => {
        const objId :string = '1542424196';
        await deeplink.loginDirectDeepLinkObjId('ihsbiadmin','ihsbiadmin',objId,'PI');
        await grid.clickOnCellLinkAndWaitForElement(0,0,4,await partDetailsElements.cell.last());
        expect(await partDetailsElements.cell.last().getText()).toEqual(objId);
        await modal.closeModalWithXButton();
    });

});
describe('Parts search- Deeplink ERC login - Starts with keyword', () => {

    it('should open result page with searched parts- using Starts with keyword in BOM Intelligence', async () => {
        const startsWith :string = 'lm101ah';
        await deeplink.loginDirectDeepLinkStartsWith('ihsbiadmin','ihsbiadmin',startsWith , 'BI');
        await grid.clickOnCellLinkAndWaitForElement(0,0,4,await partDetailsElements.cell.last());
        await expect(await partDetailsElements.titleWithIpn.getText()).toEqual('Part Details for Part Number: ' + startsWith.toUpperCase());
        await modal.closeModalWithXButton();
    });
    it('should open result page with searched parts- using Starts with keyword in Parts Intelligence', async () => {
        const startsWith :string = 'lm101ah';
        await deeplink.loginDirectDeepLinkStartsWith('ihsbiadmin','ihsbiadmin',startsWith , 'PI');
        await grid.clickOnCellLinkAndWaitForElement(0,0,4,await partDetailsElements.cell.last());
        await expect(await partDetailsElements.titleWithIpn.getText()).toEqual('Part Details for Part Number: ' + startsWith.toUpperCase());
        await modal.closeModalWithXButton();
    });

});

describe('Parts search- Deeplink ERC login - Part contains keyword', () => {

    it('should open result page with searched parts- using Part contains keyword in BOM Intelligence', async () => {
        const partContains :string = 'lm311';
        await deeplink.loginDirectDeepLinkPartContains('ihsbiadmin','ihsbiadmin',partContains , 'BI');
        await grid.clickOnCellLinkAndWaitForElement(0,0,4,await partDetailsElements.cell.last());
        await expect(await partDetailsElements.titleWithIpn.getText()).toContain('Part Details for Part Number: ' + partContains.toUpperCase());
        await modal.closeModalWithXButton();
    });
    it('should open result page with searched parts- using Part contains keyword in Parts Intelligence', async () => {
        const partContains :string = 'lm311';
        await deeplink.loginDirectDeepLinkPartContains('ihsbiadmin','ihsbiadmin',partContains , 'PI');
        await grid.clickOnCellLinkAndWaitForElement(0,0,4,await partDetailsElements.cell.last());
        await expect(await partDetailsElements.titleWithIpn.getText()).toContain('Part Details for Part Number: ' + partContains.toUpperCase());
        await modal.closeModalWithXButton();
    });

});

describe('Parts search- Deeplink ERC login - keyword search', () => {

    it('should open result page with searched parts- using Keyword search filter in BOM Intelligence', async () => {
        const keyWord :string = 'test';
        await deeplink.loginDirectDeepLinkKeywordSearch('ihsbiadmin','ihsbiadmin',keyWord , 'BI');
        await searchLogic.viewSearchCriteriaChecking();
        expect(await commonElements.queryViewSearchCriteria.getText()).toEqual(keyWord);
    });
    it('should open result page with searched parts- using Keyword search filter in Parts Intelligence', async () => {
        const keyWord :string = 'test';
        await deeplink.loginDirectDeepLinkKeywordSearch('ihsbiadmin','ihsbiadmin',keyWord , 'PI');
        await searchLogic.viewSearchCriteriaChecking();
        expect(await commonElements.queryViewSearchCriteria.getText()).toEqual(keyWord);
    });

});

describe('Parts search- Deeplink ERC login - Exact keyword', () => {

    it('should open result page with searched parts- using Exact in BOM Intelligence', async () => {
        const Exact :string = 'lm101ah';
        await deeplink.loginDirectDeepLinkExactSearch('ihsbiadmin','ihsbiadmin',Exact , 'BI');
        await grid.clickOnCellLinkAndWaitForElement(0,0,4,await partDetailsElements.cell.last());
        await expect(await partDetailsElements.titleWithIpn.getText()).toEqual('Part Details for Part Number: ' + Exact.toUpperCase());
        await modal.closeModalWithXButton();
    });
    it('should open result page with searched parts- using Exact in Parts Intelligence', async () => {
        const Exact :string = 'lm101ah';
        await deeplink.loginDirectDeepLinkExactSearch('ihsbiadmin','ihsbiadmin',Exact , 'PI');
        await grid.clickOnCellLinkAndWaitForElement(0,0,4,await partDetailsElements.cell.last());
        await expect(await partDetailsElements.titleWithIpn.getText()).toEqual('Part Details for Part Number: ' + Exact.toUpperCase());
        await modal.closeModalWithXButton();
    });

});