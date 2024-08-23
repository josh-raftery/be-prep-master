export function getDates(diff){
    diff *= 7
    let dates = []
    for(let i = 0 ; i < 7 ; i++){
        let date = new Date()
        console.log(diff, '<---')
        date.setDate(date.getDate() + (i - ((date.getDay() - diff) - 1)))
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        if(day < 10){
            day = '0' + day
        }

        if(month < 10){
            month = '0' + month
        }
        dates[i] = `${day}/${month}/${year}`
    }
    return dates
}