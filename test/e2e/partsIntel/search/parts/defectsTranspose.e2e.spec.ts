import {Login} from "../../../../../components/login";
import {browser} from "protractor";
import {
    buttonNames, linksNames,
} from "../../../../../testData/global";
import {
    gridElements, searchElements, shadeElements,
    toolbarElements, transposeElements,
    comparePartsElements
} from "../../../../../elements/elements";
import {commonSearch} from "../../../../../testData/search";
import {Button} from "../../../../../components/simple/button";
import {QuickSearch} from "../../../../../components/quickSearch";
import {FilterShade} from "../../../../../bussinesLayer/search/partsSearchLogic";
import {Shade} from "../../../../../components/shade";
import {Grid} from "../../../../../components/grid";
import {Modal} from "../../../../../components/modal";
import {Transpose} from "../../../../../components/grid";
import {ComparePartsLogic} from "../../../../../bussinesLayer/search/comparePartsLogic";

const login: Login = new Login();
const button: Button = new Button();
const quickSearch: QuickSearch = new QuickSearch();
const filterShade: FilterShade = new FilterShade();
const grid: Grid = new Grid();
const modal: Modal = new Modal();
const transpose: Transpose = new Transpose();
const comparePartsLogic: ComparePartsLogic = new ComparePartsLogic();


describe('Parts search, Transpose defects, DE111629', () => {
    it('should be locked transpose button in filters', async () =>{
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await quickSearch.performQuickSearch(commonSearch.commonValue);
        await Shade.openShadeWithButton(buttonNames.filters);
        await filterShade.checkCheckboxes(searchElements.parts.filterShade.partStatusCheckboxInputs,
            searchElements.parts.filterShade.partStatusCheckboxLabels);
        await Shade.closeShadeWithElement(searchElements.parts.filterSearchButton);
        await Shade.openShadeWithLink(linksNames.commonFilters);
        await expect(await transposeElements.buttonTooltip.getAttribute('class')).toContain('disabled');
    });
});

describe('Parts search, Transpose defects, DE111272', () => {
    it('should be number of compare parts reduce by 1 after delete column', async () =>{
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await quickSearch.performQuickSearch(commonSearch.commonValue);
        await grid.newMechanismCheckboxRangeChecking(0, 5);
        await modal.openModalWithButtonByName(buttonNames.compareSelected);
        const compareTitle = await modal.modalTitle.getText();
        const compareSubtitle = await comparePartsElements.subtitle.getText();
        await comparePartsLogic.removePartCompareModal();
        await expect(await compareTitle).not.toEqual(modal.modalTitle.getText());
        await expect(await compareSubtitle).not.toEqual(comparePartsElements.subtitle.getText());
    });
});