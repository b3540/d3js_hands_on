d3.csv('./sample_data.csv', function(error, data) {
    var xMetrics = 'sunshine_duration';
    var yMetrics = 'wind_speed';

    //日付をパース yyy/mm/dd
    var parseDate = d3.time.format('%Y/%m/%d').parse;
    var formatDate = d3.time.format('%m/%d');

    // サイズの定義
    var maxHeight = 400;
    var maxWidth = 600;
    var leftMargin = 50;
    var topMargin = 50;
    var bottomMargin = 50;
    
    // 描画領域のサイズを設定
    var height = maxHeight - topMargin - bottomMargin
    var width = maxWidth - leftMargin
    
    // svgを追加
    drawArea = d3.select('body').append('svg')
        .attr('width', maxWidth)
        .attr('height', maxHeight)
        .append('g')
        .attr('transform', 'translate(' + leftMargin + ',' + topMargin + ')')
        
    // 最大値の取得
    var xMax = d3.max(data, function (d) { return parseInt(d[xMetrics], 10) + 1})
    // 最小値の取得
    var xMin = d3.min(data, function (d) { return d[xMetrics]})

    // 最大値の取得
    var yMax = d3.max(data, function (d) { return parseInt(d[yMetrics], 10) + 1})
    // 最小値の取得
    var yMin = d3.min(data, function (d) { return d[yMetrics]})

    // xのスケールの設定
    var xScale = d3.scale.linear()
                    .domain([xMin, xMax])
                    .range([0, width]);

    // yのスケールの設定
    var yScale = d3.scale.linear()
                    .domain([yMin, yMax])
                    .range([height, 0]);

    // xの軸の設定
    var xAxis = d3.svg.axis()
                    .scale(xScale)
                    .orient("bottom");

    // yの軸の設定
    var yAxis = d3.svg.axis()
                    .scale(yScale)
                    .orient('left');

    
    // x軸をsvgに表示
    drawArea
        .append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height - 1)+ ")")
        .call(xAxis);

    // y軸をsvgに表示
    drawArea
        .append('g')
        .attr('class', 'y axis')
        .call(yAxis)
        
    // 散布図の描画
    drawArea
        .selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .on('click', function (d) {
            alert(yMetrics + d[yMetrics])
        })
        .on('mouseover', function (d) {
            d3.select(this)
                .attr('fill', 'orange')
        })
        .on('mouseout', function (d) {
            d3.select(this)
                .attr('fill', 'red');
        })
        .attr('fill', '#f00')
        .attr('r', 0)
        .attr('cx', function (d) {
            return xScale(d[xMetrics]);
        })        
        .attr('cy', function (d) {
            return yScale(d[yMetrics])
        })
        .transition()
        .duration(1000)
        .delay(function(d, i) {
            return  i * 20;
        })
        .ease('bounce')
        .attr('r', 10);
});


// var sample = [
// ['date','temperature','sunshine_duration','wind_speed'],
// ['2014/12/1','12.7', '0', '0.5'],
// ['2014/12/2','8.8', '8.5', '1.8'],
// ['2014/12/3','5.6', '8.6', '1.4'],
// ['2014/12/4','5.5', '0', '0.7'],
// ['2014/12/5','4.4', '8.5', '0.9'],
// ['2014/12/6','1.3', '8.7', '0.8'],
// ['2014/12/7','2.1', '7.7', '0.7'],
// ['2014/12/8','2.9', '8.2', '0.7'],
// ['2014/12/9','4.5', '7.5', '1.3'],
// ['2014/12/10','2.5', '6', '0.7'],
// ['2014/12/11','6.1', '0.9', '0.7'],
// ['2014/12/12','5.2', '0.4', '0.5'],
// ['2014/12/13','3', '7.9', '1.2'],
// ['2014/12/14','0.2', '8.5', '0.9'],
// ['2014/12/15','0.6', '8', '1.2'],
// ['2014/12/16','2.4', '0', '0.9'],
// ['2014/12/17','4.2', '7.6', '2.4'],
// ['2014/12/18','2.3', '8.5', '2'],
// ['2014/12/19','1', '8.5', '1.1'],
// ['2014/12/20','4.7', '0', '0.5'],
// ['2014/12/21','5.4', '4', '0.8'],
// ['2014/12/22','4.3', '8.5', '1.4'],
// ['2014/12/23','2.4', '8.5', '1'],
// ['2014/12/24','1', '3.3', '0.6'],
// ['2014/12/25','3.5', '7.7', '1.5'],
// ['2014/12/26','1.6', '8.3', '1.3'],
// ['2014/12/27','-0.3', '8.2', '0.9'],
// ['2014/12/28','0.4', '7.6', '0.6'],
// ['2014/12/29','3.5', '0', '0.6'],
// ['2014/12/30','2.9', '8.2', '0.8'],
// ['2014/12/31','4', '8.5', '0.9']
// ]