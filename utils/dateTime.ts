import * as moment from "moment-timezone"

export class DateTime {

    static getCurrentDateByFormat(format: string) {
        return moment().tz("America/Denver").format(format);
    };

    static substractDaysFromCurrentDateByFormat(daysNumber: number, format: string) {
        return moment().tz("America/Denver").subtract(daysNumber, 'days').format(format);
    };

    static getCurrentDate(dateValues: any): string {
        return moment(dateValues).date();
    };

    static getCurrentMonth(dateValues: any, format: string): string {
        return moment(dateValues).format(format);
    };

    static getCurrentMonthNum(dateValues: any): string {
        let monthNum:any = ("JanFebMarAprMayJunJulAugSepOctNovDec"
            .indexOf(this.getCurrentMonth(dateValues,'MMM')) / 3 + 1);
        return monthNum
    };

    static getCurrentYear(dateValues: any): string {
        return moment(dateValues).year();
    };
}