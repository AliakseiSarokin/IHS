import {commonSearch} from "../../../../../testData/search";
import {searchElements, gridElements, bomElements} from "../../../../../elements/elements";
import {buttonNames, meganavItems} from "../../../../../testData/global";
import {browser} from "protractor";
import {CustomLayoutLogic} from "../../../../../bussinesLayer/bomVault/customLayoutLogic";
import {Login} from "../../../../../components/login";
import {Meganav} from "../../../../../components/meganav";
import {PartsSearchLogic} from "../../../../../bussinesLayer/search/partsSearchLogic";
import {Shade} from "../../../../../components/shade";
import {StringArray} from "../../../../../utils/stringArray";
import {Toolbar} from "../../../../../components/toolbar";

const customLayoutLogic: CustomLayoutLogic = new CustomLayoutLogic();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const partsSearchLogic: PartsSearchLogic = new PartsSearchLogic();
const stringArray: StringArray = new StringArray();
const toolbar: Toolbar = new Toolbar();

describe('TC66384 Add Supply Chain attributes to Views - Custom Layout', () => {

    it('should be Supply Chain attribute in custom layout attributes - Parts Search', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await Shade.openShadeWithButton(buttonNames.manageLayouts);
        await customLayoutLogic.selectCreateNewCustomLayout();
        await stringArray.arrayContain(commonSearch.manageLayout.applySupplyChainAttributes,
            await bomElements.customLayout.availableAttributes.getText())
    });

    it('should be option to select Supply Chain attribute - Parts Search', async () => {
        await customLayoutLogic.addAttributeByRangeNames(commonSearch.manageLayout.applySupplyChainAttributes);
        await stringArray.arrayContain(commonSearch.manageLayout.applySupplyChainAttributes,
            await bomElements.customLayout.selectedAttributes.getText())
    });

    it('should create new custom Attributes and be Supply Chain attribute in headers  - Parts Search', async () => {
        await customLayoutLogic.saveNewCustomLayout();
        await expect(await gridElements.newGridUnlockedColumnHeaders.getText())
            .toEqual(commonSearch.manageLayout.applySupplyChainAttributes);
        await customLayoutLogic.openCreatedCustomLayout(commonSearch.manageLayout.defaultValues.length);
        await customLayoutLogic.deleteLayout();
    });

    it('should create new custom layout with  SVHC Over MCV column  - Parts Search', async() => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await Shade.openShadeWithButton(buttonNames.manageLayouts);
        await customLayoutLogic.selectCreateNewCustomLayout();
        await customLayoutLogic.addAttributeByName('SVHC Over MCV');
        await customLayoutLogic.saveNewCustomLayout();
        await expect(await gridElements.newGridUnlockedColumnHeaders.get(0).getText())
            .toEqual('SVHC Over MCV');
        await customLayoutLogic.openCreatedCustomLayout(commonSearch.manageLayout.defaultValues.length);
        await customLayoutLogic.deleteLayout();
    });
});
