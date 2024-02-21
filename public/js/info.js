infoWh = document.getElementById('info-wh');
infoKr =  document.getElementById('info-kr');

async function updateInfo(opt, data){
    const latest = moment(data[data.length-1].datum + ' ' + data[data.length-1].tid, 'YYYY-MM-DD hh:mm:ss')
    let start;

    switch (opt) {
        case 'week':
            start = latest.subtract(7, 'days');
            break;
            
        case 'month':
            start = latest.subtract(30, 'days');
            break;
    
        default:
            start = latest.subtract(1, 'days');
            break;
    }
    
    const dataPeriod = data.filter(entry =>{
        const entryDate = moment(entry.datum + ' ' + entry.tid, 'YYYY-MM-DD hh:mm:ss');
        return entryDate.isSameOrAfter(start);
    })

    const KwH = (dataPeriod[dataPeriod.length-1].wh -dataPeriod[0].wh) / 1000

    response = await fetch('https://www.elprisetjustnu.se/api/v1/prices/2024/01-11_SE3.json')
    prices = await response.json()
    avgDailyPrice = prices.reduce((acc, price) => acc + price.SEK_per_kWh, 0) / prices.length
    const cost = avgDailyPrice*KwH
    
    // Populate DOM
    infoWh.textContent = `${KwH.toFixed(2)} kWh`
    infoKr.textContent = `${cost.toFixed(2)} kr`;

}