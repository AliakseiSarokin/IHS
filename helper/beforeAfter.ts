import {browser} from "protractor";
import {File} from "../utils/file";
import {Login} from "../components/login";

const file: File = new File();
const login: Login = new Login();
afterEach(async () => {
    await file.createOutputFolder();
    await file.createDownloadsFolder();
});


export class BeforeAfter {
    public static async clearCacheCookies (){
        await browser.executeScript('window.sessionStorage.clear();');
        await browser.executeScript('window.localStorage.clear();');
        await browser.driver.manage().deleteAllCookies();
    };

    public static async clearCacheCookiesWithLogin (user: string){
        await login.loginWithDirectLink(user);
        await browser.executeScript('window.sessionStorage.clear();');
        await browser.executeScript('window.localStorage.clear();');
        await browser.driver.manage().deleteAllCookies();
    };
};