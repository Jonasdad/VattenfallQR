const ctx = document.getElementById("area-chart");
let chart;

// import { Chart } from 'chart.js';
// import 'chartjs-adapter-moment';

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
            xVals.push({
                "x": new Date(entry.datum.split('-')[0], entry.datum.split('-')[1] - 1, entry.datum.split('-')[2], entry.tid.split(':')[0], entry.tid.split(':')[1]),
                "y": entry.volt * entry.ampere
            })
        }
    })

    
    var labels = [];

    // 2023-01-11
    dateArr = date.split('-')
    for(let i = 0; i <= 24; i++) {
        labels.push(new Date(dateArr[0], dateArr[1] - 1, dateArr[2], i))
    }

    // console.log(labels)
    // console.log(xVals)

    const chartData = {
        labels: labels,
        datasets: [{
            label: 'Watt',
            data: xVals,
            borderWidth: 1,
            fill: 'start',
            borderColor: 'rgba(26, 114, 182, 0.8)',
        }]
    }

    const config = {
        type: 'line',
        data: chartData,
        options: {
            interaction: {
                intersect: false,
            },
            plugins: {
                legend: {
                    display: false,
                }
            },
            elements: {
                point: {
                    radius: 0
                }
            },
            scales :{
                xAxis: {
                    grid:{
                        display: false,
                    },
                    type: 'time',
                    title: {
                        color: '#4E4B48',
                        display: true,
                        text: "Time (h)",
                        font: {
                            size: 11,
                            weight: 'bold',
                            lineHeight: 1,
                        }
                    },
                    ticks: {
                        color: '#4E4B48',
                        source: 'labels', // get ticks from given labels
                    },
    
                    time: {
                        minUnit: 'minute', // smallest time format
    
                        displayFormats: {
                            millisecond: 'HH:mm:ss.SSS',
                            second: 'HH:mm:ss',
                            minute: 'HH:mm',
                            hour: 'HH'
                        }
                    }
                },
                yAxis: {
                    beginAtZero: true,
                    ticks: {
                        color: '#4E4B48'
                    }
                }
            }
        }
    }
    chart = new Chart(ctx, config)

}