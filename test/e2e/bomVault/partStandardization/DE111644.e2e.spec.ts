import { gridElements, sliderElements, partStandardization} from "../../../../elements/elements";
import {browser} from "protractor";
import {columnHeaders, meganavItems} from "../../../../testData/global";
import {Grid} from "../../../../components/grid";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {PartStandardizationLogic} from "../../../../bussinesLayer/bomVault/partStandardizationLogic";
import {partStandardData} from "../../../../testData/partStandard";
import {JsScripts} from "../../../../utils/jsScripts";
import {Random} from "../../../../utils/random";
import {JasmineTimeout} from "../../../../helper/jasmineTimeout";
import {Slider} from "../../../../components/slider";

const grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const partStandardizationLogic: PartStandardizationLogic = new PartStandardizationLogic();
const random: Random = new Random();
const name: string = 'DE111644' + random.randomTextGenerator(5);


describe('Part Standardization, DE111644', ()=> {

    beforeAll (async() =>{
        await JasmineTimeout.setJasmineTimeout(200000);
    });

    afterAll(async() =>{
        await JasmineTimeout.setJasmineTimeout(browser.params.defaultElementWaitTime);
        if(await sliderElements.closeSliderTab.isPresent()){
            await sliderElements.closeSliderTab.click();
        }
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await partStandardizationLogic.deleteViewByName(name);
    });

    it('should Modify column has wrapped headers', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await partStandardizationLogic.createNewReprocessedView(name, 5);
        await grid.mechanismCheckCheckboxByName('Name', name);
        await partStandardizationLogic.goToSummaryTab();
        await partStandardizationLogic.openSliderByFirstLinkByIdAndNotClose(partStandardData.summaryTabColumnNamesContent.sameMfrPart['# of BOMs'],
            'Part Standardization Details Used in BOMs');
        const colNumber: number = await grid.newGridReturnColumnNumberInSliderByColumnName(1, 'Last Modified');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridUnlockHeaderCssSlider, colNumber))
            .toEqual(115);
    });

    it('should Modify column return column width after reset', async () => {
        await grid.newGridOpenFilterBoxByName('Last Modified');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[3], gridElements.newGridRows.last());
        const colNumber: number = await grid.newGridReturnColumnNumberInSliderByColumnName(1, 'Last Modified');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridUnlockHeaderCssSlider, colNumber))
            .toEqual(138);
        await grid.newGridOpenFilterBoxByName('Last Modified');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[5], gridElements.newGridRows.last());
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridUnlockHeaderCssSlider, colNumber))
            .toEqual(115);
    });

    it('should BOM File Name has wrapped headers', async () => {
        const colNumber: number = await grid.newGridReturnColumnNumberInSliderByColumnName(1, 'BOM File Name');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridUnlockHeaderCssSlider, colNumber))
            .toEqual(124);
    });

    it('should BOM File Name return column width after reset', async () => {
        await grid.newGridOpenFilterBoxByName('BOM File Name');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[3], gridElements.newGridRows.last());
        const colNumber: number = await grid.newGridReturnColumnNumberInSliderByColumnName(1, 'BOM File Name');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridUnlockHeaderCssSlider, colNumber))
            .toEqual(149);
        await grid.newGridOpenFilterBoxByName('BOM File Name');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[5], gridElements.newGridRows.last());
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridUnlockHeaderCssSlider, colNumber))
            .toEqual(124);
        await Slider.closeSlider(sliderElements.closeSliderTab, partStandardization.tabButton.get(0));
    });
});