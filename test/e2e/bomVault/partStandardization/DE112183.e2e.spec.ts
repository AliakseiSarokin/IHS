import { gridElements, helpPanelElements, partDetailsElements,
    partStandardization, sliderElements, videoSliderElements,
} from "../../../../elements/elements";
import {browser} from "protractor";
import {columnHeaders, meganavItems} from "../../../../testData/global";
import {Grid} from "../../../../components/grid";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {PartStandardizationLogic} from "../../../../bussinesLayer/bomVault/partStandardizationLogic";
import {Modal} from "../../../../components/modal";
import {partStandardData} from "../../../../testData/partStandard";
import {Slider} from "../../../../components/slider";
import {Random} from "../../../../utils/random";

const grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const partStandardizationLogic: PartStandardizationLogic = new PartStandardizationLogic();
const modal: Modal = new Modal();
const random: Random = new Random();
const name: string = 'DE111653' + + random.randomTextGenerator(5);

describe('Part Standardization, DE112183', ()=> {

    afterAll(async() =>{
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await partStandardizationLogic.deleteViewByName(name);
    });

    it('should be only Help in # of IPNs slider part standardisation', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await partStandardizationLogic.createNewReprocessedView(name, 2);
        await grid.mechanismCheckCheckboxByName('Name', name);
        await partStandardizationLogic.goToSummaryTab();
        await grid.newGridOpenFilterBoxByName('# of IPNs');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.descSort, gridElements.newGridRows.last());
        await partStandardizationLogic.openSliderByFirstLinkByIdAndNotClose(partStandardData.summaryTabColumnNamesContent.sameMfrPart['# of IPNs'],
            'Part Standardization Details IPNs Slider');
        await expect(await helpPanelElements.rightSideBigHelpButton.isDisplayed()).toBeTruthy();
        await expect(await videoSliderElements.videoTab.isPresent()).toBeFalsy();
        // await Slider.closeSlider(sliderElements.closeSliderTab, gridElements.newGridRows.get(0));

    });

    it(`should be only Help in alternates modal in part standardization `, async () => {
        // if(partDetailsElements.viewAltIcon.isPresent()) {
            await modal.openModalWithElement(partDetailsElements.viewAltIcon.first());
            await expect(await helpPanelElements.rightSideBigHelpButton.isDisplayed()).toBeTruthy();
            await expect(await videoSliderElements.videoTab.isPresent()).toBeFalsy();  
            await modal.closeSingleModalWithXButton();
            await Slider.closeSlider(sliderElements.closeSliderTab, partStandardization.tabButton.get(0));
        // }
    });
    
});