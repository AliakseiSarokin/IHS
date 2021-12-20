import {StringArray} from "../../utils/stringArray";

export class CreateModel {

    public static parseListOfBomsToListOfAttributeArrays(data: object, object: object) {
        for (const key of Object.keys(object)) {
            object[key] = StringArray.getArrayByValueFromObjectList(data, key);
        }
    }


}