export default function(dataName, lastYear){
    d3.json(dataName+'.json').then(function(dat){
        let raceChart = c3.generate({
            bindto: '#'+dataName,
            data: {
                json: dat[2000],
                keys: {
                    x: 'name',
                    value: ["value"]
                },
                type: 'bar'
            },
            axis: {
                rotated: true,
                x: {
                    type: 'category'
                }
            },
            legend: {
                show: false
            }
        })
        const raceChartDiv = document.getElementById(dataName)
        const span = document.createElement('span')
        raceChartDiv.appendChild(span)
        let traceYear = 2000
        span.innerText = traceYear
        let animation
        function changeYear(){
            if(!animation){
                animation = setInterval(() => {
                    if( traceYear > lastYear){
                        traceYear = 2000
                    }
                    raceChart.load({
                        json: dat[traceYear],
                        keys: {
                            x: 'name',
                            value: ["value"]
                        },
                    })
                    span.innerText=traceYear
                    traceYear++
                },5000)
            }
        }
        function stopChangingYear(){
            clearInterval(animation)
            animation = null
        }
        const io = new IntersectionObserver((entry, observer) => {
            entry = entry[0]
            if (entry.intersectionRatio > 0) {
                changeYear()   
            } else {
                stopChangingYear()
            }
        })
        io.observe(raceChartDiv)
        document.getElementById(dataName + "start").addEventListener("click", changeYear)
        document.getElementById(dataName + "stop").addEventListener("click", stopChangingYear)
    })
}