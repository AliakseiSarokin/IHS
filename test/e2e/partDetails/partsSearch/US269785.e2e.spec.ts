import {browser, by, element} from "protractor";
import {commonSearch, quickSearchData} from "../../../../testData/search";
import {Grid} from "../../../../components/grid";
import {Link} from "../../../../components/simple/link";
import {Login} from "../../../../components/login";
import {Modal} from "../../../../components/modal";
import {QuickSearch} from "../../../../components/quickSearch";
import {
    commonElements, detailsForMfrSlider, gridElements, modalElements,
    partDetailsElements
} from "../../../../elements/elements";
import {PartDetailsLogic} from "../../../../bussinesLayer/partDetails/partDetailsLogic";
import {Toolbar} from "../../../../components/toolbar";
import {linksNames, meganavItems} from "../../../../testData/global";
import {SpecificToolbarButtons} from "../../../../bussinesLayer/specificToolbarButtons";
import {ElementAttributes} from "../../../../utils/elementAttributes";
import {MatchMfrLogic} from "../../../../bussinesLayer/bomVault/matchMfrLogic";
import {Meganav} from "../../../../components/meganav";
import {KnowledgeBaseLogic} from "../../../../bussinesLayer/knowledgeBase/knowledgeBaseLogic";
import {MfrSearchLogic} from "../../../../bussinesLayer/search/mfrSearchLogic";
import {Button} from "../../../../components/simple/button";
import {Waiters} from "../../../../helper/waiters";

const button: Button = new Button();
const grid: Grid = new Grid();
const elementAttributes: ElementAttributes = new ElementAttributes();
const knowledgeBaseLogic: KnowledgeBaseLogic = new KnowledgeBaseLogic();
const link: Link = new Link();
const login: Login = new Login();
const modal: Modal = new Modal();
const partDetailsLogic: PartDetailsLogic = new PartDetailsLogic();
const toolbar: Toolbar = new Toolbar();
const quickSearch: QuickSearch = new QuickSearch();
const matchMfrLogic: MatchMfrLogic = new MatchMfrLogic();
const meganav: Meganav = new Meganav();

describe('Parts search, US269785', () => {

    const expectedHeaderNames: string[] = ['Parts', 'Category', 'Part Type', 'Commodity'];
    const expectedTooltipNames: string[] = ['Count', 'Part category',
        'Part type', 'Commodity type'];

    it('should be displayed Commodity column,Part details, Part Categories, US269785', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await quickSearch.performQuickSearchWithWait(commonSearch.commonValue,
            gridElements.newGridCellByRowIndex(0).get(0));
        await partDetailsLogic.newGridOpenPartDetModalFromMfrNameLinkInSearch();
        await browser.sleep(2000);
        let linkText: string = await link.returnElementByPartialLinkNameAndIndex('Part Categories', 0).getText();
        await link.clickOnTheLinkByNameAndWaitForElement(linkText, partDetailsElements.cell.get(0));
        let headers = await gridElements.newGridHeaderNamesInModal.getText();
        let tooltips = await elementAttributes.getAttributeFromArrayOfElements(gridElements.headerNewGridInModal, 'title');
        await expect(headers).toEqual(expectedHeaderNames);
        await expect(tooltips).toEqual(expectedTooltipNames);
    });

    it('should be displayed Commodity column, Manufacturer Information modal, US269785', async () => {
        await modal.closeModalIfPresent();
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.knowledgeBase,
            meganavItems.knowledgeBaseSubItems.mfrKnowledgeBase, await gridElements.newGridCellWithoutContentByRowIndex(0).get(0));
        await knowledgeBaseLogic.openAcceptedMfrNameColumnLinkByName('true');
        await Waiters.waitUntilElementIsDisplayed(gridElements.newGridMfrCategories.get(0));
        await expect(await grid.checkIfOnlyAllowedDataIsInValues(expectedHeaderNames,
            await gridElements.newGridMfrCategories.getText())).toBeTruthy();
    });

    it('should be displayed Commodity column, Details for Manufacturer slider, US269785', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.list[4],
            commonElements.commonTypeAheadInput);
        await MfrSearchLogic.performMfrSearch(commonSearch.mfrSearchArray[0]);
        await button.clickOnTheElementAndWait(await detailsForMfrSlider.leftMenuLinks.get(1), await gridElements.newGridHeaderNamesInSlider.get(0));
        await browser.sleep(3000);
        await expect(await await gridElements.newGridHeaderNamesInSlider.getText()).toEqual(expectedHeaderNames);
        await expect(await elementAttributes.getAttributeFromArrayOfElements(gridElements.newGridHeadersInSlider,
            'title')).toEqual(expectedTooltipNames);
    });
});

