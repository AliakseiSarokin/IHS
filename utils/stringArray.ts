import arrayWithExactContents = jasmine.arrayWithExactContents;
import {envs} from "../api/testData/global";
import {GetPerformanceLogs} from "./getPerformanceLogs";
import {isNumber} from "util";
import {IRequestInfoType} from "../testData/getPerformLogsInterfaces";

export class StringArray {

    public async returnStringWithoutSpacesFromArray(limit:string[]) {
        let string:string = limit.join('');
        return string
    };

    public returnArrayFromStringBySpace(value:string):string[] {
        const array: string[] = value.split(' ');
        return array;
    }

    public async returnStringFromArray(array:string[]) {
        let string:string='';
        for(let i:number = 0; i < array.length; i++) {
            string = string + array[i]
        }
        return string
    };

    public async returnStringWithoutDashes(value: string) {
        let tempArr:string[] = value.split('-');
        let resString:string = tempArr.join('');
        return resString;
    };

    public async removeSpacesFromString(limit: string) {
        let tempArr: string[] = limit.split(' ');
        let monthLimit:string = '';
        for (let i = 0; i < tempArr.length; i++) {
            monthLimit = monthLimit + tempArr[i]
        }
        return monthLimit;
    };

    public fromCapitalToFirstCapitalAndOtherLow (fullName:string):string {
        let resArr: string[] = fullName.split(' ');
        for (let i: number = 0; i < resArr.length; i++) {
            resArr[i] = resArr[i].toLowerCase();
            resArr[i] = resArr[i].charAt(0).toUpperCase() + resArr[i].slice(1)
        }
        return resArr.join(' ')
    };

    async arraysEqual(a: any[], b: any[]) {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length != b.length) return false;

        // If you don't care about the order of the elements inside
        // the array, you should sort both arrays here.

        for (let i: number = 0; i < a.length; ++i) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    };

    public static parseArrayToNumberArray(arr:string[]) {
        return arr.map(item => parseInt(item))
    };

    public static parseArrayToStringArray(arr:number[]) {
        const resArr:string[] =  arr.map(item => item.toString());
        for(let i: number = 0; i < resArr.length; i++) {
            if(resArr[i]==='NaN') {
                resArr[i] = ''
            }
        }
        return resArr
    };

    async returnUniqArray (array:any[]) {
        return array.sort().filter((item, pos, ary) => {
            return !pos || item != ary[pos - 1];
        })
    };

    public sortArrayAZ(sortArray: string[]):string[] {
        const filteredAndSortedKeywords:string[] = sortArray.filter(
            (keyword, index) => sortArray.lastIndexOf(keyword) === index)
              .sort((a, b) => a < b ? -1 : 1
            );
       return filteredAndSortedKeywords
    }

    public async arrayContain (actualArray: any, expectedArray: any) {
        let count: number = 0;
        let resArr = actualArray.filter((item)=>{
            return item.length>0
        });
        for(let i:number =0; i<await resArr.length; i++) {
            for(let j:number = 0; j<expectedArray.length;j++) {
                if(resArr[i]===expectedArray[j]) {
                    count += 1
                }
            }
        }
        await expect(await resArr.length).toEqual(count)
    }

    public  returnArrayWithoutBr(array: any) {
        const arr = array;
        for(let i: number =0; i < arr.length; i++) {
            arr[i] = arr[i].replace(/\n/g, " ")
        }
        return arr
    };

    public  returnStringWithoutBr(str: any) {
        return str.replace(/\n/g, "")
    };

    public checkIfArrayOptionsMatchWithOneValue(array: string[], value:string): boolean {
        for(let i:number =0; i< array.length; i++ ) {
            if(array[i]!==value) {
                return false
            }
            else {
                return true
            }
        }
    };

    public checkIfArrayOptionsStartsWithOneValue(array: string[], value:string): boolean {
        for(let i:number =0; i< array.length; i++ ) {
            if(array[i].substring(0,value.length)!==value) {
                return false
            }
            else {
                return true
            }
        }
    };

    public checkIfArrayOptionsContainOneValue(array: string[], value:string): boolean {
        for(let i:number =0; i< array.length; i++ ) {
            if(array[i].toUpperCase().includes(value.toUpperCase())) {
                return true
            }
            else {
                return false
            }
        }
    };


    public checkIfArrayOptionsMatchWithValuesFromArray(array: string[], value:string[]): boolean {
        let result : number = 0;
        for(let i:number =0; i< array.length; i++ ) {
            for(let j: number = 0; j < value.length; j++) {
                if(array[i]===value[j]) {
                    result +=1;
                }
            }
        }
        if(result === array.length) {
            return true;
        }
        else {return false}

    };

    public checkIfArrayOptionsStartsWithValuesFromArray(array: string[], value:string[]): boolean {
        let result : number = 0;
        for(let i:number =0; i< array.length; i++ ) {
            for(let j: number = 0; j < value.length; j++) {
                if(array[i].substring(0,value[j].length)===value[j]) {
                    result +=1;
                }
            }
        }
        if(result === array.length) {
            return true;
        }
        else {return false}
    }

    public returnStringWithFirstCapitalLetter(value:string):string {
        let resValue: string = value.toLowerCase();
        return resValue.charAt(0).toUpperCase() + resValue.slice(1);
    }


    public static getArrayByValueFromObjectList(objectList: any, field:string):any {
        try {
            return objectList.map(item => item[field]);
        }
        catch (err) {
            if(err.message === 'objectList.map is not a function'){
                throw 'No Data from API'
            }
        }
    };

    public static getRequestInfoByUrlContain(request: any, url: string, method: string = 'POST'): IRequestInfoType {
        for(let i = 0; i < request.length; i++) {
            if (request[i].params.request.url.indexOf(url)>=0 && request[i].params.request.method == method) {
                return <IRequestInfoType>{
                    authorization: request[i].params.request.headers.Authorization,
                    postData: JSON.parse(request[i].params.request.postData),
                }
            }
        }
        throw `${method} ${url} not found`
    };
}