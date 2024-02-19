const ctx = document.getElementById("area-chart");
let chart;

/* const data = {    
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
        data: [12, 19, 3, 5, 2, 3, 5],
        borderWidth: 1,
        fill: 'start'
      }]
} */

function updateChart(date, data){
    if(chart != undefined){
        chart.destroy()
    }
   
    // let labels = [];
    let xVals = [];

    data.map(entry => {
        if(entry.datum == date){
            console.log(entry.datum.split('-')[0], entry.datum.split('-')[1], entry.datum.split('-')[2], entry.tid.split(':')[0], entry.tid.split(':')[1])
            xVals.push({
                "x": new Date(entry.datum.split('-')[0], entry.datum.split('-')[1], entry.datum.split('-')[2], entry.tid.split(':')[0], entry.tid.split(':')[1]),
                "y": entry.volt * entry.ampere
            })
        }
    })

    
    var labels = [];

    // 2023-01-11
    dateArr = date.split('-')
    for(let i = 0; i <= 24; i++) {
        labels.push(new Date(dateArr[0], dateArr[1], dateArr[2], i))
    }

    const chartData = {
        labels: labels,
        datasets: [{
            label: 'Watt',
            data: xVals,
            borderWidth: 1,
            fill: 'start'
        }]
    }

    const config = {
        type: 'line',
        data: chartData,
        options: {
            elements: {
                point: {
                    radius: 0
                }
            },
            scales :{
                // y: {
                //     beginAtZero: true,
                // },
                xAxis: {
                    type: 'time',
                    
                    ticks: {
                        source: 'labels', // get ticks from given labels
                    },
    
                    time: {
                        minUnit: 'minute', // smallest time format
    
                        displayFormats: {
                            minute: "HH:mm",
                            hour: "dd/MM HH:mm",
                            day: "dd/MM",
                            week: "dd/MM",
                            month: "MMMM yyyy",
                            quarter: 'MMMM yyyy',
                            year: "yyyy",
                        }
                    }
                }
            }
        }
    }
    chart = new Chart(ctx, config)

}