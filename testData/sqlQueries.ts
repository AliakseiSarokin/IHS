export const dbQueryData: any = {
    parametric: {
        selectPartTypesByCommodity: (commodity:string):string => {
            return `select DISTINCT CAT_PART_TYPE from css_cat_category
                where CAT_CLS_COMMODITY_NAME = '${commodity}'
                and CAT_PART_TYPE != '(null)'`
        }
    }

}