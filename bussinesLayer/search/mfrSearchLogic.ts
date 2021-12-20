import {allureStep} from "../../helper/allure/allureSteps";
import {
    commonElements, gridElements, partDetailsElements, resReqElements,
    searchElements, sliderElements
} from "../../elements/elements";
import {Button} from "../../components/simple/button";
import {ElementAttributes} from "../../utils/elementAttributes";
import {Modal} from "../../components/modal";
import {Slider} from "../../components/slider";
import {Toolbar} from "../../components/toolbar";
import {TypeAhead} from "../../components/typeAhead";
import {Waiters as w} from "../../helper/waiters";
import {buttonNames, modalTitles} from "../../testData/global";
const button: Button = new Button();
const elementAttributes: ElementAttributes = new ElementAttributes();
const modal: Modal = new Modal();
const toolbar: Toolbar = new Toolbar();
const typeAhead: TypeAhead = new TypeAhead();
export let typeAheadOption: string[] =[];
export let typeAheadValue: string = '';
export class MfrSearchLogic {

    public  static async performMfrSearch(value: string) {
        await allureStep('Perform Mfr search with' + value + ' and click close the slider', async () => {
            await typeAhead.typeAheadChecking(commonElements.commonTypeAheadInput, value);
            typeAheadValue = await elementAttributes.getElementAttribute(commonElements.commonTypeAheadInput,
                'value');
            await Slider.openSliderByClickingOnTheButtonName(buttonNames.search);
        });
    }

    public  static async performMfrSearchAndCloseSliderClearValue(value: string) {
        await allureStep('Perform Mfr search with' + value + ' and click close the slider', async () => {
            await typeAhead.typeAheadChecking(commonElements.commonTypeAheadInput, value);
            await typeAheadOption.push(await elementAttributes.getElementAttribute(commonElements.commonTypeAheadInput,
                'value'));
            await Slider.openSliderByClickingOnTheButtonName(buttonNames.search);
            await Slider.closeSlider(sliderElements.closeSliderTab, button.returnButtonByText(buttonNames.search));
            await button.clickOnTheElement(commonElements.commonTypeAheadInputsXbutton.get(0));
        });
    };

    public static async goBySearchesInTheLeftNav() {
        let itemsText = await searchElements.subMenuItems.getText();
        const textLength = itemsText.length;
        for (let i: number = 0; i < textLength; i++) {
            await Slider.openSliderByClickingOnTheElement(searchElements.subMenuItems.get(i));
            await Slider.closeSlider(sliderElements.closeSliderTab, button.returnButtonByText(buttonNames.search));
        }
        let newArr = [];
        for (let i: number = 0; i < typeAheadOption.length; i += 1) {
            newArr[i] = typeAheadOption[i] + '...'
        }
        let text = await searchElements.subMenuItems.getText();
        await expect(text).toEqual(newArr)
    };

    public static async openSpecificPrintPreviewModals() {
        await toolbar.openToolbarDropdownByButtonName(buttonNames.print);
        const printOptions: string[] =  await elementAttributes.getElementAttribute(toolbar.openSliderToolbarList,
            'value');
        await toolbar.closeToolbarDropdownByButtonName(buttonNames.print);
        for(let i: number = 1; i < printOptions.length; i++) {
            await toolbar.openToolbarDropdownByButtonName(buttonNames.print);
            await modal.openModalWithElement(toolbar.openSliderToolbarList.get(i));
            await expect(await modal.modalTitle.getText()).toEqual('BOM Intelligence Manufacturer Details');
            await w.waitUntilElementIsDisplayed(partDetailsElements.printPreviewTables.get(0));
            await expect(await partDetailsElements.printModalLabels.count()).toEqual(1);
            await expect(await partDetailsElements.printModalLabels.first().getText())
                .toEqual(printOptions[i].substr(printOptions[i].indexOf(" ") + 1));
            await modal.closeModalWithXButton();
        }
    };

    public static async researchRequestModalChecking() {
        const mfr: string = await gridElements.newGridCellWithoutContentByRowIndex(1).get(1).getText();
        await modal.openModalWithButtonByName(buttonNames.resRequest);
        await expect(await modal.severalModalTitles.get(0).getText()).toEqual(modalTitles.singleResReq);
        await expect(await elementAttributes.getElementAttribute(resReqElements.mfrNameField, 'value'))
            .toEqual(mfr);
        await modal.closeModalWithXButton();
        await w.waitUntilElementNotDisplayed(modal.returnModalTitleByName(modalTitles.singleResReq));
    };
}