import {browser} from "protractor";
import {Button} from "../../../../components/simple/button";
import {
    buttonNames, meganavItems, exportOptions,
    modalTitles, fieldStatuses
} from "../../../../testData/global";
import {CheckBox} from "../../../../components/simple/checkBox";
import {
    comparePartsElements, gridElements,
    modalElements, partDetailsElements, searchElements
} from "../../../../elements/elements";
import {Grid} from "../../../../components/grid";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {QuickSearch} from "../../../../components/quickSearch";
import {Toolbar} from "../../../../components/toolbar";
import {ViewAlternatesLogic} from "../../../../bussinesLayer/partDetails/viewAlternatesLogic";
import {Waiters as w} from "../../../../helper/waiters";
import {ComparePartsLogic} from "../../../../bussinesLayer/search/comparePartsLogic";

const button: Button = new Button();
const checkbox: CheckBox = new CheckBox();
const comparePartsLogic: ComparePartsLogic = new ComparePartsLogic();
const grid: Grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const quickSearch: QuickSearch = new QuickSearch();
const toolbar: Toolbar = new Toolbar();
const viewAlternatesLogic: ViewAlternatesLogic = new ViewAlternatesLogic();

describe('Compare Parts - View Alternates - Parts Search', () => {

    it('should open Compare Parts modal and check modal title', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search,
            meganavItems.searchSubItem.parts, searchElements.searchField);
        await quickSearch.performQuickSearch('LM5001MA');
        await viewAlternatesLogic.waitForIcon(partDetailsElements.viewAltIcon.first());
        await viewAlternatesLogic.openViewAlternatesModal(0, 'Part Number');
        await grid.newMechanismModalCheckboxRangeChecking(1, 5);
        await expect(button.returnButtonByText(buttonNames.compareSelected).isEnabled()).toBeTruthy();
        await modal.openModalWithElement(modalElements.modalButtonByName(buttonNames.compareSelected));
        await expect(await modal.severalModalTitles.get(1).getText()).toEqual(modalTitles.compareParts('4'));
    });

    it("should be disable 'Set as Anchor' button - Compare Parts modal", async () => {
        await checkbox.checkUnCheckCheckboxRange(comparePartsElements.columnLabel, comparePartsElements.columnCheckboxInput,
            fieldStatuses.fillField, 0, 1);
        await expect(button.returnButtonByText(buttonNames.setAsAnchor).isEnabled()).toBeFalsy();
        await checkbox.checkUnCheckCheckboxRange(comparePartsElements.columnLabel, comparePartsElements.columnCheckboxInput,
            fieldStatuses.emptyField, 0, 1);
    });

    it("chosen column should moved to the 1st position and become anchor through clicking on 'Set as Anchor' button - Compare Parts modal", async () => {
        await comparePartsLogic.setAsAnchorCompareModal();
    });

    it("should export the summary file by 'Export' button - Compare Parts modal", async () => {
        await viewAlternatesLogic.checkingExportFileFromComparePartsModal(buttonNames.export, exportOptions.search.compareParts.fileName);
    });

    it("should be disable 'Remove' button - Compare Parts modal", async () => {
        await expect(await toolbar.returnToolbarButtonByValue(buttonNames.remove).getAttribute('disabled'))
            .toEqual('true');
    });

    it("should be disable 'Remove' button when 1st column is selected - Compare Parts modal", async () => {
        await checkbox.checkUnCheckCheckboxRange(comparePartsElements.columnLabel, comparePartsElements.columnCheckboxInput,
            fieldStatuses.fillField, 0, 1);
        await expect(await toolbar.returnToolbarButtonByValue(buttonNames.remove).getAttribute('disabled'))
            .toEqual('true');
    });

    it("should be enable 'Remove' button when 2nd column is selected - Compare Parts modal", async () => {
        await checkbox.checkUnCheckCheckboxRange(comparePartsElements.columnLabel, comparePartsElements.columnCheckboxInput,
            fieldStatuses.emptyField, 0, 1);
        await checkbox.checkUnCheckCheckboxRange(comparePartsElements.columnLabel, comparePartsElements.columnCheckboxInput,
            fieldStatuses.fillField, 1, 2);
        await expect(await toolbar.returnToolbarButtonByValue(buttonNames.remove).getAttribute('disabled'))
            .toEqual(null);
    });

    it("chosen column should removed and modal title should change through clicking on 'Remove' button - Compare Parts modal", async () => {
        await button.clickOnTheElementAndWait(button.returnButtonByText(buttonNames.remove), gridElements.severalGrid.get(2));
        await expect(await modal.severalModalTitles.get(1).getText()).toEqual(modalTitles.compareParts('3'));
    });
});
