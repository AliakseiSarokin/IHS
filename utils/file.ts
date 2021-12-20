import {browser, element, by} from "protractor";
import {Waiters as w} from "../helper/waiters";
// import {Workbook, Row, Cell} from 'exceljs';
const fs = require('fs')

export class File {
    public async checkNameDownloadsFile(name) {
        await browser.sleep(2000);
        const downLoadedFile = element(by.xpath(`//*[contains(text(),${name})]`));
        await browser.executeScript('window.open()');
        const browserTabs = await browser.driver.getAllWindowHandles();
        await browser.driver.switchTo().window(browserTabs[1]);
        await browser.get('file:///' + __dirname + '\\output\\downloads\\');
        await w.waitUntilElementIsDisplayed(downLoadedFile);
        await expect(downLoadedFile.isPresent()).toBeTruthy('file name is not expect');
        await browser.driver.close();
        await browser.driver.switchTo().window(browserTabs[0]);
        await browser.waitForAngularEnabled(false);
    };

    public async createDownloadsFolder() {
        if(!(await fs.existsSync(__dirname + '\\output\\downloads\\'))) {
            await fs.mkdirSync( __dirname +'\\output\\downloads\\');
        }
    }

    public async createOutputFolder() {
        if(!(await fs.existsSync(__dirname + '\\output'))) {
            await fs.mkdirSync( __dirname +'\\output');
        }
    }

    // public async checkBodyDownloadsFile(name) {
    //     let wb: Workbook = new Workbook();
    //     wb.xlsx.readFile('./output/downloads/' + name + '.XLS').then(function () {
    //
    //     });
    // }
}