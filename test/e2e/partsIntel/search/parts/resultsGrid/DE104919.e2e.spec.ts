import {Actions} from "../../../../../../utils/actions";
import {buttonNames, meganavItems} from "../../../../../../testData/global";
import {browser} from "protractor";
import {CustomLayoutLogic} from "../../../../../../bussinesLayer/bomVault/customLayoutLogic";
import {commonSearch, partsSearchConst} from "../../../../../../testData/search";
import {ElementAttributes} from "../../../../../../utils/elementAttributes";
import {Grid} from "../../../../../../components/grid";
import {gridElements, searchElements} from "../../../../../../elements/elements";
import {Login} from "../../../../../../components/login";
import {Meganav} from "../../../../../../components/meganav";
import {PartsSearchLogic} from "../../../../../../bussinesLayer/search/partsSearchLogic";
import {Shade} from "../../../../../../components/shade";
import {Toolbar} from "../../../../../../components/toolbar";

const customLayoutLogic: CustomLayoutLogic = new CustomLayoutLogic();
const elementAttributes: ElementAttributes = new ElementAttributes();
const grid: Grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const partsSearchLogic: PartsSearchLogic = new PartsSearchLogic();
const toolbar: Toolbar = new Toolbar();

describe('DE104919', () => {

    const columns: string[] = ['Estimated YTEOL', 'Avg Lead Time', 'IHS Objectid'];

    afterAll(async () => {
        await customLayoutLogic.openCreatedCustomLayout(commonSearch.manageLayout.defaultValues.length);
        await customLayoutLogic.deleteLayout();
    });

    it("should be allowed to enter only numeric values in numeric Column Filter like 'Estimated YTEOL'", async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await Shade.openShadeWithButton(buttonNames.manageLayouts);
        await customLayoutLogic.selectCreateNewCustomLayout();
        await customLayoutLogic.addAttributeByRangeNames(columns);
        await customLayoutLogic.saveNewCustomLayout();
        await grid.newGridOpenFilterBoxByName(columns[0]);
        await Actions.sendKeys(gridElements.columnsSort.input, partsSearchConst.searchCriteria);
        await expect(await elementAttributes.getElementAttribute(gridElements.columnsSort.input, 'value'))
            .toEqual(partsSearchConst.searchCriteria.replace(/\D+/g, ''));
        await grid.closeOpenFilterBox();
    });

    it("should be allowed to enter only numeric values in numeric Column Filter like 'Avg Lead Time'", async () => {
        await grid.newGridOpenFilterBoxByName(columns[1]);
        await Actions.sendKeys(gridElements.columnsSort.input, partsSearchConst.searchCriteria);
        await expect(await elementAttributes.getElementAttribute(gridElements.columnsSort.input, 'value'))
            .toEqual(partsSearchConst.searchCriteria.replace(/\D+/g, ''));
        await grid.closeOpenFilterBox();
    });

    it("should be allowed to enter only numeric values in numeric Column Filter like 'IHS Objectid'", async () => {
        await grid.newGridOpenFilterBoxByName(columns[2]);
        await Actions.sendKeys(gridElements.columnsSort.input, partsSearchConst.searchCriteria);
        await expect(await elementAttributes.getElementAttribute(gridElements.columnsSort.input, 'value'))
            .toEqual(partsSearchConst.searchCriteria.replace(/\D+/g, ''));
        await grid.closeOpenFilterBox();
    });
});
