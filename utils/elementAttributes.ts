
import {ElementArrayFinder, ElementFinder} from "protractor";

export class ElementAttributes {

    public async getElementAttribute(element:any, attribute:string) {
        return element.getAttribute(attribute);
    }

    public async getAttributeFromArrayOfElements(elementsArray:ElementArrayFinder, attribute:string) {
        let resultArray:string[] =[];
        for (let i:number = 0; i < await elementsArray.count(); i++) {
            resultArray.push(await elementsArray.get(i).getAttribute(attribute))
        }
        return resultArray;
    }

    public async getElementHeight(element:any) {
        return element.getSize().height;
    }

    public async getElementWidth(element:any) {
        return element.getSize().width;
    }
}