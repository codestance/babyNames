export default function(dataName){
    c3.generate({
        bindto: '#'+dataName,
        data: {
            x: 'year',
            url: dataName+'.csv',
            type: 'bar',
            types: {
                sum: 'line'
            },
            // groups: [
            //     ['M', 'W']
            // ],
            order: null,
            names: {
                M: 'chłopcy',
                W: 'dziewczynki',
                sum: 'suma'
            }
        },
        axis: {
            y: {
                max: 420000,
                tick: {
                    values: [100000, 200000, 300000, 400000],
                    format: d3.format("~s")
                }
            }
        }
    })
}