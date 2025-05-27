export function errorMessage (error:any) {
    let res = error.response.data
    let errTxt:string = ''
    for (const key in res) {
       if(key && Array.isArray(res[key])) errTxt += res[key][0]
       else errTxt += res[key]
    }
    return errTxt
}