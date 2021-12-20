import {browser} from "protractor";

export class ConsoleErrors {

    public static async  getConsoleResult(): Promise<any> {
        return JSON.parse(JSON.stringify(await browser.manage().logs().get('browser')))
    }

    public static async getConsoleErrors(): Promise<any> {
        const consoleValue: any =  await this.getConsoleResult();
        let serveArr: any [] = [];
        for(let i:number = 0; i< consoleValue.length; i++) {
            await console.log(consoleValue[i])
            if(consoleValue[i].level === 'SEVERE') {
                serveArr.push(consoleValue[i])
            }
        }
        return serveArr
    }

    public static async getConsoleClear(): Promise<any> {
        await browser.executeScript('window.console.clear();');
    }

}