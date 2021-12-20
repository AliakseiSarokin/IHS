import {CheckBox} from "../../components/simple/checkBox";
const checkbox = new CheckBox();
import {settings, importElements} from "../../elements/elements";
import {SettingsLogic} from "./settingsLogic";
const settingsLogic = new SettingsLogic();
import {ImportLogic} from "../import/importLogic";
const importLogic = new ImportLogic();
import {importItems} from "../../testData/import";
import {ElementAttributes} from "../../utils/elementAttributes";
const elementAttributes = new ElementAttributes();

export class AlertSettingsLogic {

    async verifyCheckedUncheckedAlertsTypeSettings (status:string) {
        await checkbox.checkUnCheckCheckboxesWithJs('.indent .checkbox label',
            settings.alertSettings.alertTypesCheckboxInputs, status)
        await settingsLogic.saveSettings();
        await settingsLogic.goToBomImportAndUploadAValidFile();
        await importLogic.openOptionModalByTitle(importItems.optionTitles.bomImport.alertNotifications);
        let inputNumber: number = await importElements.alertNotifications.checkboxInputs.count();
        for (let i:number = 0; i < inputNumber; i++) {
            await expect(await elementAttributes.getElementAttribute(importElements.alertNotifications.checkboxInputs.get(i),
                'class')).toContain(status)
        }
        await importLogic.closeOptionModalWithX();
        await importLogic.leaveImportWitLeaveModal();
    };
}