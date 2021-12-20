import {browser, ElementFinder} from "protractor";
import {allureStep} from "../helper/allure/allureSteps";
import {async} from "q";

export class JsScripts {


    public static async scrollToElementByCss(css: string) {
        await browser.executeScript(`document.querySelector("${css}").scrollIntoView()`)
    }

    public static async scrollDown() {
        await allureStep(`Scroll down`, async () => {
            await browser.executeScript('window.scrollTo(0, 10000)')
        });
    };

    public static async scrollUp() {
        await allureStep(`Scroll up`, async () => {
            await browser.executeScript('window.scrollTo(10000, 0)')
        });
    };

    public static async scrollToElement(element: ElementFinder) {
        await allureStep(`Scroll to element ${await element.locator()}`, async () => {
            await browser.executeScript('arguments[0].scrollIntoView()', await element.getWebElement())
        })
    };

    public static async returnSelectedIndexByCss(css:string):Promise<number> {
        let index: any;
        await allureStep(`Return selected index for css: '${css}'`, async () => {
            index = await browser.executeScript(`return document.querySelector('${css}').selectedIndex`)
        });
        return index
    };

    public static async scrollToElementByCssAndNumber(css: string, elementNumber: number) {
        await allureStep(`Scroll to element by css "${css}"`, async () => {
            await browser.executeScript(`document.querySelectorAll("${css}")[${elementNumber}].scrollIntoView()`);
        });

    };

    public static async clickByCssAndNumber(css: string, elementNumber: number) {
        await allureStep(`Click with js on element by css "${css}"`, async () => {
            await browser.executeScript(`document.querySelectorAll("${css}")[${elementNumber}].click()`);
        });
    };

    public static async clickByCompoundCssAndNumber(css1: string, elementNumber: number, css2: string,) {
        await allureStep(`Click with js on element by compound css: "${css1} " + "${css2}"`, async () => {
            await browser.executeScript(`document.querySelectorAll("${css1}")[${elementNumber}].querySelector("${css2}").click()`);
        });
    };

    public static async setValueByCssAndNumber(css: string, elementNumber: number, value: string) {
        await allureStep(`Set value "${value}" with js to element by css "${css}"`, async () => {
            await browser.executeScript(`document.querySelectorAll("${css}")[${elementNumber}].value="${value}"`);
        });

    };

    public static async setAttributeValueByCssAndNumber(css: string, elementNumber: number, attribute: string, value: string) {
        await allureStep(`Set attributes "${attribute}" with  value "${value}" with js
         to element by css "${css}"`, async () => {
            await browser.executeScript(`document.querySelectorAll("${css}")[${elementNumber}].setAttribute("${attribute}",
            "${value}")`);
        });
    };

    public static async returnElementWidthByCssAndNumber(css: string, elementNumber: number): Promise<any> {
        return browser.executeScript(`return document.querySelectorAll("${css}")[${elementNumber}].clientWidth`)
    }

    public static async returnElementPropertyValueByCssAndNumber(css: string, elementNumber: number, value: string): Promise<any> {
        return browser.executeScript(`return window.getComputedStyle(document.querySelectorAll('${css}')[${elementNumber}]).getPropertyValue('${value}')`)
    }
}
