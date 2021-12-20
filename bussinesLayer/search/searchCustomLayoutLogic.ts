import {searchElements, bomElements} from "../../elements/elements";


export class SearchCustomLayoutLogic {

    lockedAttributes:any;

    constructor() {
        this.lockedAttributes;
    };

   public async moveUpChecking() {
        await expect(searchElements.manageLayout.moveUpButton.isEnabled()).toBeFalsy();
        await searchElements.manageLayout.unlockedColumns.get(2).click();
        await expect(searchElements.manageLayout.moveUpButton.isEnabled()).toBeTruthy();
        await searchElements.manageLayout.moveUpButton.click();
        await expect(searchElements.manageLayout.moveUpButton.isEnabled()).toBeTruthy();
        await searchElements.manageLayout.moveUpButton.click();
        await expect(searchElements.manageLayout.moveUpButton.isEnabled()).toBeFalsy();
   }

    public async moveDownChecking() {
        await searchElements.manageLayout.unlockedColumns.get(0).click();
        let attributesAmount = await searchElements.manageLayout.unlockedColumns.count();
        for (let i = 0; i<attributesAmount-2; i++) {
            await searchElements.manageLayout.moveDownButton.click();
            await expect(searchElements.manageLayout.moveDownButton.isEnabled()).toBeTruthy();
        }
        await searchElements.manageLayout.moveDownButton.click();
        await expect(searchElements.manageLayout.moveDownButton.isEnabled()).toBeFalsy();
    };


    public async setAndRememberLockedColumn() {
        let initialLockedColumns = await searchElements.manageLayout.lockedColumns.getText();
        await bomElements.customLayout.selectedAttributes.get(2).click();
        await expect(searchElements.manageLayout.lockButton.isEnabled()).toBeTruthy();
        this.lockedAttributes = await searchElements.manageLayout.lockedColumns.getText();
    };

}