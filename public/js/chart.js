const ctx = document.getElementById("area-chart");

const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
        data: [12, 19, 3, 5, 2, 3, 5],
        borderWidth: 1,
        fill: 'start'
      }]
}
const config = {
    type: 'line',
    data: data,
    options: {
        scales :{
            y: {
                beginAtZero: true,
            }
        }
    }
}

new Chart(ctx, config)