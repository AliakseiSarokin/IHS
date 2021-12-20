import {allureStep} from "../helper/allure/allureSteps";
import {browser, element, by} from "protractor";
import {Waiters as w} from "../helper/waiters";
import { searchElements,  partStandardization} from "../elements/elements";
import {takeScreenShot} from "../helper/allure/reporter";

export class DeepLinks {

    public async loginWithErcDeepLinkObjId(login: string, password: string, objId: string) {
        await allureStep('search BI using deeplink- Object ID', async () => {
            const deepLink: string = `https://loginsqa.ihserc.com/cgi-bin/ihslogin?username=${login}&password=${password}&prod=BOMDEV&base_url=http%3A%2F%2F4dsqa.ihs.com%2Fbom-intelligence%2F%23%2Flogin%3Fredirect%3Dsearch%2Fparts%3Fignore%3Dtrue%26condition%3Dand%26type%3Dstartswith%26facet%3DOBJ_ID%7E${objId}`
            await browser.waitForAngularEnabled(false);
            await browser.get(deepLink);
            await takeScreenShot();
            await w.waitUntilElementIsDisplayed(element(by.name('userEmail')));

            await element(by.name('userEmail')).sendKeys('surajkumar.behera@ihsmarkit.com');
            await element(by.name('userPassword')).sendKeys('Hello@2019');
            await element(by.name('Submit')).click();

            await w.waitUntilElementIsDisplayed(searchElements.searchField);
            await searchElements.searchField.click();
            await w.waitUntilElementIsDisplayed(partStandardization.checkboxSelectorOnAddBomsShade.last());
        });
    };


    public async loginDirectDeepLinkObjId(login: string, password: string, objId: string, appName:string) {
        await allureStep(`search ${appName} using deeplink- Object ID`, async () => {
            let deepLink: string;
            if(appName == 'BI') {
                deepLink = `https://loginsqa.ihserc.com/cgi-bin/ihslogin?username=${login}&password=${password}&prod=BOMDEV&base_url=http%3A%2F%2F4dsqa.ihs.com%2Fbom-intelligence%2F%23%2Flogin%3Fredirect%3Dsearch%2Fparts%3Fignore%3Dtrue%26condition%3Dand%26type%3Dstartswith%26facet%3DOBJ_ID%7E${objId}`
            }
            else if(appName == 'PI')
            {
                deepLink = `https://loginsqa.ihserc.com/cgi-bin/ihslogin?username=${login}&password=${password}&prod=BOMDEV&base_url=http%3A%2F%2F4dsqa.ihs.com%2Fparts-intelligence%2F%23%2Flogin%3Fredirect%3Dsearch%2Fparts%3Fignore%3Dtrue%26condition%3Dand%26type%3Dstartswith%26facet%3DOBJ_ID%7E${objId}`
            }

            await browser.waitForAngularEnabled(false);
            await browser.get(deepLink);
            await takeScreenShot();
            await w.waitUntilElementIsDisplayed(searchElements.searchField);
            await searchElements.searchField.click();
            await w.waitUntilElementIsDisplayed(partStandardization.checkboxSelectorOnAddBomsShade.last());

        });
    };

    public async loginDirectDeepLinkStartsWith(login: string, password: string, startsWith: string , appName:string) {
        await allureStep(`search ${appName} using deeplink- Starts with filter`, async () => {
            let deepLink: string;
            if(appName == 'PI') {
                deepLink = `https://loginsqa.ihserc.com/cgi-bin/ihslogin?username=${login}&password=${password}&prod=BOMDEV&base_url=http%3A%2F%2F4dsqa.ihs.com%2Fparts-intelligence%2F%23%2Flogin%3Fredirect%3Dsearch%252Fparts%253Fkeyword%253D${startsWith}%26ignore%3Dtrue%26condition%3Dand%26type%3Dstartswith%0D%0A`;
            }

            else if (appName == 'BI'){
                deepLink = `https://loginsqa.ihserc.com/cgi-bin/ihslogin?username=${login}&password=${password}&prod=BOMDEV&base_url=http%3A%2F%2F4dsqa.ihs.com%2Fbom-intelligence%2F%23%2Flogin%3Fredirect%3Dsearch%252Fparts%253Fkeyword%253D${startsWith}%26ignore%3Dtrue%26condition%3Dand%26type%3Dstartswith%0D%0A`;
            }
            await browser.waitForAngularEnabled(false);
            await browser.get(deepLink);
            await takeScreenShot();
            await w.waitUntilElementIsDisplayed(searchElements.searchField);
            await searchElements.searchField.click();
            await w.waitUntilElementIsDisplayed(partStandardization.checkboxSelectorOnAddBomsShade.last());
        });
    };

    public async loginDirectDeepLinkPartContains(login: string, password: string, partContains: string , appName:string) {
        await allureStep(`search ${appName} using deeplink- Part contains filter`, async () => {
            let deepLink: string;
            if(appName == 'PI') {
                deepLink = `https://loginsqa.ihserc.com/cgi-bin/ihslogin?username=${login}&password=${password}&prod=BOMDEV&base_url=http%3A%2F%2F4dsqa.ihs.com%2Fparts-intelligence%2F%23%2Flogin%3Fredirect%3Dsearch%252Fparts%253Fkeyword%253D${partContains}%26ignore%3Dtrue%26condition%3Dand%26type%3Dcontains%0D%0A`;
            }
            else if (appName == 'BI'){
                deepLink = `https://loginsqa.ihserc.com/cgi-bin/ihslogin?username=${login}&password=${password}&prod=BOMDEV&base_url=http%3A%2F%2F4dsqa.ihs.com%2Fbom-intelligence%2F%23%2Flogin%3Fredirect%3Dsearch%252Fparts%253Fkeyword%253D${partContains}%26ignore%3Dtrue%26condition%3Dand%26type%3Dcontains%0D%0A`;
            }
            await browser.waitForAngularEnabled(false);
            await browser.get(deepLink);
            await takeScreenShot();
            await w.waitUntilElementIsDisplayed(searchElements.searchField);
            await searchElements.searchField.click();
            await w.waitUntilElementIsDisplayed(partStandardization.checkboxSelectorOnAddBomsShade.last());
        });
    };

    public async loginDirectDeepLinkKeywordSearch(login: string, password: string, partContains: string , appName:string) {
        await allureStep(`search ${appName} using deeplink- Keyword search filter`, async () => {
            let deepLink: string;
            if(appName == 'PI') {
                deepLink = `https://loginsqa.ihserc.com/cgi-bin/ihslogin?username=${login}&password=${password}&prod=BOMDEV&base_url=http%3A%2F%2F4dsqa.ihs.com%2Fparts-intelligence%2F%23%2Flogin%3Fredirect%3Dsearch%252Fparts%253Fkeyword%3D${partContains}%26condition%3Dand%26type%3Dkeyword`;
            }
            else if (appName == 'BI'){
                deepLink = `https://loginsqa.ihserc.com/cgi-bin/ihslogin?username=${login}&password=${password}&prod=BOMDEV&base_url=http%3A%2F%2F4dsqa.ihs.com%2Fbom-intelligence%2F%23%2Flogin%3Fredirect%3Dsearch%252Fparts%253Fkeyword%3D${partContains}%26condition%3Dand%26type%3Dkeyword`;
            }
            await browser.waitForAngularEnabled(false);
            await browser.get(deepLink);
            await takeScreenShot();
            await w.waitUntilElementIsDisplayed(searchElements.searchField);
            await searchElements.searchField.click();
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsDisplayed(partStandardization.checkboxSelectorOnAddBomsShade.last());
        });
    };

    public async loginDirectDeepLinkExactSearch(login: string, password: string, partContains: string , appName:string) {
        await allureStep(`search ${appName} using deeplink- Exact search filter`, async () => {
            let deepLink: string;
            if(appName == 'PI') {
                deepLink = `https://loginsqa.ihserc.com/cgi-bin/ihslogin?username=${login}&password=${password}&prod=BOMDEV&base_url=http%3A%2F%2F4dsqa.ihs.com%2Fparts-intelligence%2F%23%2Flogin%3Fredirect%3Dsearch%252Fparts%253Fkeyword%253D${partContains}%26ignore%3Dtrue%26condition%3Dand%26type%3Dequals`;
            }
            else if (appName == 'BI'){
                deepLink = `https://loginsqa.ihserc.com/cgi-bin/ihslogin?username=${login}&password=${password}&prod=BOMDEV&base_url=http%3A%2F%2F4dsqa.ihs.com%2Fbom-intelligence%2F%23%2Flogin%3Fredirect%3Dsearch%252Fparts%253Fkeyword%253D${partContains}%26ignore%3Dtrue%26condition%3Dand%26type%3Dequals`;
            }
            await browser.waitForAngularEnabled(false);
            await browser.get(deepLink);
            await takeScreenShot();
            await w.waitUntilElementIsDisplayed(searchElements.searchField);
            await searchElements.searchField.click();
            await w.waitUntilElementIsDisplayed(partStandardization.checkboxSelectorOnAddBomsShade.last());
        });
    };
};