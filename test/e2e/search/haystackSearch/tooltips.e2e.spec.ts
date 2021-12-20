import {buttonNames, columnHeaders, meganavItems} from "../../../../testData/global";
import {browser} from "protractor";
import {Meganav} from "../../../../components/meganav";

const meganav: Meganav = new Meganav();
import {searchElements} from "../../../../elements/elements";
import {
    HaystackSearchLogic,
    HaystackSliderLogic,
    HaystackTooltips
} from "../../../../bussinesLayer/search/haystackSearchLogic";

const haystackSearchLogic = new HaystackSearchLogic();
const haystackSliderSearchLogic = new HaystackSliderLogic();
const haystackTooltips = new HaystackTooltips();
import {Login} from "../../../../components/login";

const login: Login = new Login();
import {Toolbar} from "../../../../components/toolbar";

const toolbar: Toolbar = new Toolbar();
import {Slider} from "../../../../components/slider";

import {Modal} from "../../../../components/modal";

const modal: Modal = new Modal();
import {commonSearch, haystackSearchConst} from "../../../../testData/search";
import {SearchLogic} from "../../../../bussinesLayer/search/searchLogic";

const searchLogic: SearchLogic = new SearchLogic();
import {Grid} from "../../../../components/grid";

import {Button} from "../../../../components/simple/button";
const button: Button = new Button();

const grid: Grid = new Grid();
const iscColumnt = ['Code', '0', '1', '2', '3', '5', '6', '7', '8', 'B', 'C', 'E'];
const iscDefinition = ['Definition', 'Items under the specification control of Defense Threat Reduction Agency (DTRA) or National Security Agency (NSA).', 'An item authorized for procurement as a result of a formal item reduction study and accepted as a replacement for one or more items not authorized for procurement. In addition, in generic relationships, a code 1 item is related to a code 2 item.', 'An item authorized for procurement which has been included in an item reduction study and which initially does not replace an item not authorized for procurement. In addition, in generic relationships, a code 2 item is related to a code 1 item.', 'An item which, as a result of a formal item reduction study, is accepted as not authorized for procurement.', 'An item authorized for procurement that has not yet been subject to item standardization.', 'An item authorized for procurement that is in a specific Federal Supply Class (FSC) or item name grouping consisting primarily of items which are one-of-a-kind; therefore, little or no potential exists for elimination of items through formal item reduction studies.', 'NATO use only (see NOTE 3).', 'NATO use only (see NOTE 3).', 'A new item authorized for procurement, contained in a new or revised superseding specification or standard, that replaces prior items.', 'An item authorized for procurement that has been included in an item reduction study but an intelligent decision could not be made due to lack of sufficient technical data.', 'An item no longer authorized for procurement which has been replaced by an item contained in a new or revised superseding specification or standard.']
//need to rafactor - new grid
xdescribe('Haystack Search - Tooltips ', () => {

    it('should check column header', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.haystack,
            searchElements.haystack.partNumberOrNsnX);
        await haystackSearchLogic.performHaystackSearch(haystackSearchConst.searchValue);
        let columnIndexesWithDefinition: number[] = await haystackTooltips.returnColumnNumbersWithColumnDefinition();
        for (let i = 0; i < 1; i++) {
            await haystackTooltips.openColumnDefinition(columnIndexesWithDefinition[i]);
            let title: string[] = await haystackTooltips.returnTitle();
            let code: string[] = await haystackTooltips.returnCode();
            let definition: string[] = await haystackTooltips.returnDefinition();
            await modal.closeModalWithXButton();
            await grid.newGridCloseFilterBoxIfPresent();
            await haystackTooltips.hoverAndCheckTooltip(columnIndexesWithDefinition[i], title, code, definition);
            await login.loginWithDirectLink(browser.params.groupAdminUrl);
            await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.haystack,
                searchElements.haystack.partNumberOrNsnX);
            await haystackSearchLogic.performHaystackSearch(haystackSearchConst.searchValue);
        }
    });

    //need to fix and investigate
    xit('should check segment A in slider', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.haystack,
            searchElements.haystack.partNumberOrNsnX);
        await haystackSearchLogic.performHaystackSearch(haystackSearchConst.searchValue);
        await haystackSliderSearchLogic.openSlider();
        for (let i = 0; i < await haystackTooltips.returnSliderAttributeLinks(); i++) {
            await haystackTooltips.openAttributeDefinition(i);
            let title: string[] = await haystackTooltips.returnTitle();
            let code: string[] = await haystackTooltips.returnCode();
            let definition: string[] = await haystackTooltips.returnDefinition();
            await modal.closeModalWithXButton();
            await  haystackTooltips.hoverAndCheckTooltipAttributeValue(i, title, code, definition);
            await Slider.switchOnTheLeftNavSectionByClickingOnTheSectionName(haystackSearchConst.mclr);
            await Slider.switchOnTheLeftNavSectionByClickingOnTheSectionName(haystackSearchConst.segmentA);
        }
        await Slider.closeSlider(searchElements.haystack.xButton, button.returnButtonByText(buttonNames.print));
    });

    xit('should check MLCR in slider', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.haystack,
            searchElements.haystack.partNumberOrNsnX);
        await haystackSearchLogic.performHaystackSearch(haystackSearchConst.searchValue);
        await haystackSliderSearchLogic.openSlider();
        await Slider.switchOnTheLeftNavSectionByClickingOnTheSectionName(haystackSearchConst.mclr);
        let columnIndexesWithDefinition: any = await haystackTooltips.returnHeaderLinkColumnDefinition();
        for (let i = 0; i < columnIndexesWithDefinition.length; i++) {
            await haystackTooltips.openColumnDefinitionForHeaderLinks(columnIndexesWithDefinition[i]);
            let title: string[] = await haystackTooltips.returnTitle();
            let code: string[] = await haystackTooltips.returnCode();
            let definition: string[] = await haystackTooltips.returnDefinition();
            await modal.closeModalWithXButton();
            await haystackTooltips.hoverAndCheckTooltipHeaderLinks(columnIndexesWithDefinition[i], title, code, definition);
            await login.loginWithDirectLink(browser.params.groupAdminUrl);
            await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.haystack,
                searchElements.haystack.partNumberOrNsnX);
            await haystackSearchLogic.performHaystackSearch(haystackSearchConst.searchValue);
            await haystackSliderSearchLogic.openSlider();
            await Slider.switchOnTheLeftNavSectionByClickingOnTheSectionName(haystackSearchConst.mclr);
        }
    });

    xit('should check MLC in slider', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.haystack,
            searchElements.haystack.partNumberOrNsnX);
        await haystackSearchLogic.performHaystackSearch(commonSearch.commonValue);
        await haystackSliderSearchLogic.openSlider();
        await Slider.switchOnTheLeftNavSectionByClickingOnTheSectionName(haystackSearchConst.mlc);
        let columnIndexesWithDefinition: any = await haystackTooltips.returnHeaderLinkColumnDefinition();
        for (let i = 0; i < columnIndexesWithDefinition.length - 3; i++) {
            await haystackTooltips.openColumnDefinitionForHeaderLinks(columnIndexesWithDefinition[i]);
            let title: string[] = await haystackTooltips.returnTitle();
            let code: string[] = await haystackTooltips.returnCode();
            let definition: string[] = await haystackTooltips.returnDefinition();
            await modal.closeModalWithXButton();
            await haystackTooltips.hoverAndCheckTooltipHeaderLinks(columnIndexesWithDefinition[i], title, code, definition);
        }
    });

    xit('should check Procurament in slider', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.haystack,
            searchElements.haystack.partNumberOrNsnX);
        await haystackSearchLogic.performHaystackSearch(commonSearch.commonValue);
        await haystackSliderSearchLogic.openSlider();
        await Slider.switchOnTheLeftNavSectionByClickingOnTheSectionName(haystackSearchConst.procurement);
        let columnIndexesWithDefinition: any = await haystackTooltips.returnHeaderLinkColumnDefinition();
        for (let i = 0; i < 1; i++) {
            await haystackTooltips.openColumnDefinitionForHeaderLinks(columnIndexesWithDefinition[i]);
            let title: string[] = await haystackTooltips.returnTitle();
            let code: string[] = await haystackTooltips.returnCode();
            let definition: string[] = await haystackTooltips.returnDefinition();
            await modal.closeModalWithXButton();
            await haystackTooltips.openModalByClickingOnTheLinkAndCompareWithData(columnIndexesWithDefinition[i], title, code, definition);
        }
    });
});
