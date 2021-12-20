import {allureStep} from "../../helper/allure/allureSteps";
import {Waiters as w} from "../../helper/waiters";
import {
    adminExportModalElements,
    adminAddUsersElements,
    adminGridElements,
    adminModalElements, adminUsersElements, adminModalUserGroupElements
} from "../../elements/elements";
import {StringArray} from "../../utils/stringArray";
import {ElementAttributes} from "../../utils/elementAttributes";
import {browser} from "protractor";
import {Input} from "../simple/input";
import {Random} from "../../utils/random";
import {Button} from "../simple/button";
import {modalElements} from "../../testData/adminUI/global";
import {File} from "../../utils/file";
import {buttonNames} from "../../testData/global";

const stringArray: StringArray = new StringArray();
const elementAttributes: ElementAttributes = new ElementAttributes();
const input: Input = new Input();
const random: Random = new Random();
const button: Button = new Button();
const file: File = new File();

export class AdminModal {

    public async openModalByName(name: string) {
        await allureStep('Open modal by click on the link', async () => {
            await w.waitUntilElementIsDisplayed(await adminGridElements.gridButtonByName('Modify User'));
            await adminGridElements.gridButtonByName(name).click();
            if (name == 'Export' || name == 'Delete'){
                await w.waitUntilElementIsDisplayed(await adminModalElements.modalHeader);
            }
            else {
                await w.waitUntilElementIsDisplayed(await adminModalElements.panelBody);

            }
            await browser.sleep(2000)
            await w.waitUntilWorkingModalNotDisplayed();
        });
    };

    public async closeModalByName(name: string) {
        await allureStep('Close modal by button name', async () => {
            await w.waitUntilElementIsDisplayed(await adminModalElements.closeButtonByName('Cancel Changes'));
            await adminModalElements.closeButtonByName(name).click();
            await w.waitUntilElementNotDisplayed(await adminModalElements.panelBody);
        });
    };

    public async checkModifyUserFieldNames() {
        await allureStep('check Modify User field names', async () => {
            const modifyUserFieldNames: string[] = ['User Name:', 'Password:', 'User Group Name:', 'Active Status:',
                'Email:', 'Full Name:', 'Group Admin:', 'User Admin:', 'KB Admin:', 'Read Only User:', 'Restricted User:',
            'Expiration Date:', 'License:', 'ObjectId:'];
            const expectedBasic: any = await adminModalElements.fieldNames.getText();
            await stringArray.arrayContain(expectedBasic, modifyUserFieldNames);
        });
    };

    public async checkFieldValue(elem: any, value: string, attribute: string = 'value') {
        await allureStep('check field value', async () => {
            if(value == 'Active'){
                await expect(await elementAttributes.getElementAttribute(elem, attribute)).toEqual('true');
            }
            else {
                await expect(await elementAttributes.getElementAttribute(elem, attribute)).toEqual(value);
            }
        });
    };

    public async checkCheckboxStatus(elem: any, value: string,) {
        await allureStep('check checkbox status', async () => {
            if(value == 'false'){
                await expect(await elementAttributes.getElementAttribute(elem, 'checked')).toEqual(null);
            }
            else await expect(await elementAttributes.getElementAttribute(elem, 'checked')).toEqual('true')
        });
    };

    public async emailValidationChecking(){
        await allureStep('Email validation checking', async () => {
            await input.fillFieldWithValue(adminUsersElements.currentEmail, "test@@Test.test");
            await expect(await adminUsersElements.warningText.isDisplayed()).toBeTruthy();
            await input.fillFieldWithValue(adminUsersElements.currentEmail, random.randomTextGenerator(256));
            await expect(await adminUsersElements.warningText.isDisplayed()).toBeTruthy();
            await expect((await adminUsersElements.currentEmail.getAttribute('value')).length).toEqual(255);
        });
    };

    public async userNameValidationChecking(){
        await allureStep('User Name validation checking', async () => {
            await input.fillFieldWithValue(adminUsersElements.userNameInputField, "!@#$%^&*()-{}[]");
            await expect((await adminUsersElements.userNameInputField.getAttribute('value'))[0].length).toEqual(0);
            await input.fillFieldWithValue(adminUsersElements.userNameInputField, random.randomTextGenerator(51));
            await expect((await adminUsersElements.userNameInputField.getAttribute('value'))[0].length).toEqual(50);
            await input.fillFieldWithValue(adminUsersElements.userNameInputField, 'user.name');
            await expect((await adminUsersElements.userNameInputField.getAttribute('value'))[0].length).toEqual(9);
            // await button.clickByButtonName(buttonNames.cancelChanges);
        });
    };

    public async passwordValidationChecking(){
        await allureStep('Password validation checking', async () => {
            await input.fillFieldWithValue(adminUsersElements.userNamePasswordInputField, "!@#$%^&*()-{}[]");
            await expect((await adminUsersElements.userNamePasswordInputField.getAttribute('value'))[0].length).toEqual(7);
            await input.fillFieldWithValue(adminUsersElements.userNamePasswordInputField, random.randomTextGenerator(25));
            await expect((await adminUsersElements.userNamePasswordInputField.getAttribute('value'))[0].length).toEqual(24);
        });
    };

    public async userGroupValidationChecking(){
        await allureStep('User Group validation checking', async () => {
            await w.waitUntilElementIsClickable(await adminUsersElements.userGroupNameInputField.get(0));
            await adminUsersElements.userGroupNameInputField.get(0).click();
        });
    };

    public async fullNameValidationChecking(){
        await allureStep('Full Name validation checking', async () => {
            await input.fillFieldWithValue( adminUsersElements.userFullName, "!@#$%^&*()-{}[]");
            await expect((await adminUsersElements.userFullName.getAttribute('value')).length).toEqual(0);
            await input.fillFieldWithValue(adminUsersElements.userFullName, random.randomTextGenerator(129));
            await expect((await adminUsersElements.userFullName.getAttribute('value')).length).toEqual(128);
            await input.fillFieldWithValue(adminUsersElements.userFullName, 'user  full   name');
            await expect((await adminUsersElements.userFullName.getAttribute('value')).length).toEqual(17);
        });
    };

    public async resetButtonChecking(){
        await allureStep('Reset button checking', async () => {
            await w.waitUntilElementIsClickable(await adminUsersElements.resetButton.get(0));
            await adminUsersElements.resetButton.get(0).click();
            await expect(await adminUsersElements.resetButton.get(0).isPresent()).toBeTruthy();
        });
    };

    public async cancelButtonChecking(){
        await allureStep('Cancel button checking', async () => {
            await w.waitUntilElementIsClickable(await button.returnButtonByText(modalElements.cancelChanges));
            await button.returnButtonByText(modalElements.cancelChanges).click();
            await w.waitUntilElementNotDisplayed(await button.returnButtonByText(modalElements.cancelChanges));
        });
    };

    public async checkingExportModal(listOfRows: any) {
        await allureStep('Checking the export modal', async () => {
            await w.waitUntilElementIsDisplayed(adminExportModalElements.panelBody);
            await expect(await adminExportModalElements.modalTitleDiv.getText()).toEqual('Export Data');
            await expect(await adminExportModalElements.modalBodeRows.getText()).toEqual(listOfRows);
            await button.clickByButtonName('Cancel');
        });
    };

    public async checkingReGenKey() {
        await allureStep('Checking the ReGenKey modal', async () => {
            await w.waitUntilElementIsDisplayed(adminModalElements.mainHeaderText);
            await expect(await adminModalElements.mainHeaderText.getText()).toEqual('Group hash key:');
            await button.clickByButtonName('Cancel');
        });
    };

    public async checkingDeleteModal(type: string, name: string) {
        await allureStep('Checking the delete modal', async () => {
            await w.waitUntilElementIsDisplayed(adminExportModalElements.modalTitle);
            await expect(await adminExportModalElements.modalTitle.getText()).toEqual(type);
            await expect(await adminModalElements.textSingleRow.getText()).toEqual(name);
            await button.clickByButtonName('Cancel');
        });
    };
    
     public async createNewUser(name:string){
        await allureStep(`create a new User - ${name}`, async () => {
            await input.fillFieldWithValue(adminUsersElements.userNameInputField, name);
            await input.fillFieldWithValue(adminUsersElements.userNamePasswordInputField, 'password');
            await adminUsersElements.userGroupNameInputField.get(0).click();
            await adminUsersElements.userGroupNameInputField.get(0).sendKeys('BMTESTSQA');
            await adminAddUsersElements.userGroupName.click();
            await input.fillFieldWithValue(adminUsersElements.currentEmail, name+'@test.com');
            await input.fillFieldWithValue(adminUsersElements.userFullName, name);
            await adminAddUsersElements.radioButtonSelection('active-status-active').click();
            await adminAddUsersElements.radioButtonSelection('kb-admin-no').click();
            await button.clickByButtonName('Save Changes');
        });
    };

    public async inputFieldsChecking(arr: string[]){
        await allureStep('Check input fields', async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsDisplayed(await adminAddUsersElements.labelsNames.get(0));
            expect(await adminAddUsersElements.labelsNames.getText()).toEqual(arr);
        });
    };

    public async userGroupNameValidationChecking(){
        await allureStep('User Group Name validation checking', async () => {
            await input.fillFieldWithValue(adminModalUserGroupElements.nameInputField, "!@#$%^&*(){}[]");
            await expect((await adminModalUserGroupElements.nameInputField.getAttribute('value'))[0].length).toEqual(0);
            await input.fillFieldWithValue(adminModalUserGroupElements.nameInputField, random.randomTextGenerator(24));
            await expect((await adminModalUserGroupElements.nameInputField.getAttribute('value'))[0].length).toEqual(23);
            await input.fillFieldWithValue(adminModalUserGroupElements.nameInputField, 'user-group_');
            await expect((await adminModalUserGroupElements.nameInputField.getAttribute('value'))[0].length).toEqual(11);
        });
    };

    public async userGroupLabelValidationChecking(){
        await allureStep('User Group Label validation checking', async () => {
            await input.fillFieldWithValue(adminModalUserGroupElements.labelInputField, "!@#$%^&*(){}[]");
            await expect((await adminModalUserGroupElements.labelInputField.getAttribute('value'))[0].length).toEqual(0);
            await input.fillFieldWithValue(adminModalUserGroupElements.labelInputField, random.randomTextGenerator(129));
            await expect((await adminModalUserGroupElements.labelInputField.getAttribute('value'))[0].length).toEqual(128);
            await input.fillFieldWithValue(adminModalUserGroupElements.labelInputField, 'user-group_');
            await expect((await adminModalUserGroupElements.labelInputField.getAttribute('value'))[0].length).toEqual(11);
        });
    };

    public async deleteUser(name: string){
        await allureStep(`delete User ${name}`, async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            await this.openModalByName(buttonNames.delete);
            await button.clickByButtonName('Cancel');
            await this.openModalByName(buttonNames.delete);
            await button.clickByButtonName('Ok');
            await w.waitUntilElementNotDisplayed(adminModalElements.modalHeader);
            await w.waitUntilWorkingModalNotDisplayed();
            expect((await adminUsersElements.gridCheckBox.get(0)).isPresent()).toBeFalsy();
        });
    };

    public async createNewUserGroup(name:string){
        await allureStep(`create a new User Group- ${name}`, async () => {
            const label:string = name+random.randomTextGenerator(4);
            await w.waitUntilWorkingModalNotDisplayed();
            await input.fillFieldWithValue(adminModalUserGroupElements.nameInputField, name);
            await input.fillFieldWithValue(adminModalUserGroupElements.labelInputField, label);
            await adminUsersElements.userGroupNameInputField.get(0).click();
            await adminAddUsersElements.userGroupName.click();
            await button.clickByButtonName('Save Changes');
        });
    };

}
