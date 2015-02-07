d3.csv('./sample_data.csv', function(error, data) {
    var metrics = 'sunshine_duration';

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
        .style('color', '#000')
        .append('g')
        .attr('transform', 'translate(' + leftMargin + ',' + topMargin + ')')
        
    // 最大値の取得
    var yMax = d3.max(data, function (d) { return parseInt(d[metrics], 10) + 1})
    // 最小値の取得
    var yMin = d3.min(data, function (d) { return d[metrics]})

    // xのスケールの設定
    var xScale = d3.scale.ordinal()
                    .rangeRoundBands([0, width], .1);

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
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '.71em')
        .style('text-anchor', 'end')

    // バーの描画
    drawArea
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .on('click', function (d) {
            alert(metrics + d[metrics])
        })
        .on('mouseover', function (d) {
            d3.select(this)
                .attr('fill', 'orange')
                .append('text')
                .text(d[metrics])
        })
        .on('mouseout', function (d) {
            d3.select(this)
                .attr('fill', 'red');
        })
        .attr('fill', '#f00')
        .attr('height', 0)
        .attr('width', 10)
        .attr('y', height)
        .attr('x', function (d, i) {
            return i * 15;
        })
        .transition()
        .duration(1000)
        .delay(function(d, i) {
            return  i * 20;
        })
        .ease('bounce')
        .attr('y', function (d) {
            return yScale(d[metrics])
        })
        .attr('height', function (d) {
            return height - yScale(d[metrics]);
        });
});
