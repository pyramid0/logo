var horizontal_skip = 16;

function pyramid2() {
    var width = 500,
        height = 500;
    var svg = d3.select("#canvas").append("svg")
        .attr("width", width)
        .attr("height", height);
    /* var text = svg.append("svg:text")
     .attr("x", 250)
     .attr("y", 250)
     .attr("dy", ".35em")
     .attr("text-anchor", "middle")
     .style("font", "24px monospace")
     .style("kerning", "2")
     .style("fill", "black")
     .text("0");*/
    generateRow(svg);
    generateRow2(svg);
    generateRow3(svg);
}

function generateRow(svg) {
    [0, 0, 0].forEach(function (zero, index) {
        svg.append("svg:text")
            .attr("x", 250 + (index * horizontal_skip))
            .attr("y", 250)
            .attr("dy", ".35em")
            .attr("text-anchor", "middle")
            .style("font", "24px monospace")
            .style("kerning", "2")
            .style("fill", "black")
            .text("0");
    });
}

function generateRow2(svg) {
    [0, 0].forEach(function (zero, index) {
        svg.append("svg:text")
            .attr("x", 250 + ((index + .5 ) * horizontal_skip))
            .attr("y", 250 - 20)
            .attr("dy", ".35em")
            .attr("text-anchor", "middle")
            .style("font", "24px monospace")
            .style("kerning", "2")
            .style("fill", "black")
            .text("0");
    });
}
function generateRow3(svg) {
    [0].forEach(function (zero, index) {
        svg.append("svg:text")
            .attr("x", 250 + ((index + 1) * horizontal_skip))
            .attr("y", 250 - 20 - 20)
            .attr("dy", ".35em")
            .attr("text-anchor", "middle")
            .style("font", "24px monospace")
            .style("kerning", "2")
            .style("fill", "black")
            .text("0");
    });
}
function make_x_axis() {
    return d3.svg.axis()
        .scale("10")
        .orient("bottom")
        .ticks(5)
}

function make_y_axis() {
    return d3.svg.axis()
        .scale("10")
        .orient("left")
        .ticks(5)
}


function aZero() {
    var width = 400,
        height = 400,
        origin = [50, 150],
        layers = 5;

    //The SVG Container
    var svg = d3.select('#canvas').append('svg')
        .attr('width', width)
        .attr('height', height);
    var	y = d3.scale.linear().range([height, 0]);
    var	x = d3.scale.linear().range([width, 0]);
    function make_x_axis() {
        return d3.svg.axis()
            .scale(x)
            .orient("bottom")
            .ticks(16)
    }

    function make_y_axis() {
        return d3.svg.axis()
            .scale(y)
            .orient("left")
            .ticks(16)
    }
    svg.append("g")
        .attr("class", "grid")
        .attr("stroke", "black")
        .attr("stroke-width",.5)
        .attr("transform", "translate(0," + height + ")")
        .call(make_x_axis()
            .tickSize(-height, 0, 0)
            .tickFormat(16)
    );

    svg.append("g")
        .attr("class", "grid")
        .attr("stroke", "black")
        .attr("stroke-width",.5)
        .call(make_y_axis()
            .tickSize(-width, 0, 0)
            .tickFormat(16, "d")
    );
    var startingPoint = function (x, y) {
        return {x: x, y: y};
    };

    var generatePoints = function (startingPoint, height, width) {
        var pointsArray = [];
        var a = {x: startingPoint.x + (0.5 * width), y: startingPoint.y};
        var b = {x: startingPoint.x + width, y: startingPoint.y};
        var c = {x: startingPoint.x + width, y: startingPoint.y + (0.5 * height)};
        var d = {x: startingPoint.x + width, y: startingPoint.y + height};
        var e = {x: startingPoint.x + (0.5 * width), y: startingPoint.y + height};
        var f = {x: startingPoint.x, y: startingPoint.y + height};
        var g = {x: startingPoint.x, y: startingPoint.y + (0.5 * height)};
        var h = {x: startingPoint.x, y: startingPoint.y};
        pointsArray.push(a);
        pointsArray.push(b);
        pointsArray.push(c);

        pointsArray.push(c);
        pointsArray.push(d);
        pointsArray.push(e);

        pointsArray.push(e);
        pointsArray.push(f);
        pointsArray.push(g);

        pointsArray.push(g);
        pointsArray.push(h);
        pointsArray.push(a);

        return pointsArray;
    };

    //This is the accessor function we talked about above
    var lineFunction = d3.svg.line()
        .x(function (d) {
            return d.x;
        })
        .y(function (d) {
            return d.y;
        })
        .interpolate("basis")
        .tension(0.7);

    var renderRow = function (opts) {
        var rows = [];
        for (var i = 0; i < opts.rowSize; i++) {
            var start = {
                x: opts.startingPoint.x + (i * opts.offset),
                y: opts.startingPoint.y
            };
            rows.push( lineFunction(generatePoints(start, opts.charHeight, opts.charWidth)));
            //row.append("path")
            //    .attr("d", lineFunction(generatePoints(start, opts.charHeight, opts.charWidth)))
            //    .attr("stroke", "black")
            //    .attr("stroke-width", 3)
            //    .attr("fill", "none");
        }
        return rows;
    };
    var drawFace = function (opts) {
        var center = 0.5* (((1 / 3) * opts.charHeight) + opts.charHeight);
        var face = svg.append('g')
            //.attr('transform','rotate(-45,' + ((5* center) + 50) +', ' +((5*center) + 50) +')');
            .attr('transform',opts.transformString);//(-45,' + ((5* center) + 50) +', ' +((5*center) + 50) +')');
        for (var i = 0; i < opts.rows; i++) {
            var offset = ((1 / 3) * opts.charHeight) + opts.charHeight;
            var start = {
                x: opts.startingPoint.x + ((i * offset) / 2),
                y: opts.startingPoint.y - (i * offset)
            };
            var width = opts.rows - (i );
            var row = renderRow({
                startingPoint: start,
                charWidth: opts.charWidth,
                charHeight: opts.charHeight,
                rowSize: width,
                offset: offset
            });
            row.forEach(function (rowData) {
                face.append("path")
                    .attr("d", rowData)
                    .attr("stroke", "black")
                    .attr("stroke-width", 3)
                    .attr("fill", "none");
            });

        }
    };
    var frontLeftSkew = 'skewY(20) skewX(-40) rotate(-12, 100, 120) translate(105, 19)';
    //var frontLeftSkew = '';
    var frontRightSkew = 'translate(0, 110)  skewY(-20) skewX(40) rotate(13,100, 120)';
    //var frontRightSkew = '';
    drawFace({startingPoint: startingPoint(origin[0], origin[1]), rows: layers, charHeight: 18, charWidth: 9, transformString: frontLeftSkew});
    drawFace({startingPoint: startingPoint(origin[0], origin[1]), rows: layers, charHeight: 18, charWidth: 9, transformString: frontRightSkew});

}
window.onload = function () {
    //pyramid();
    //pyramid2();
    aZero();
};

function pyramid() {
    var width = 960,
        height = 500;

    var velocity = [.010, .005],
        t0 = Date.now();

    var projection = d3.geo.orthographic()
        .scale(height / 2 - 10);

    var svg = d3.select("#canvas2").append("svg")
        .attr("width", width)
        .attr("height", height);

    var text = svg.append("svg:text")
        .attr("x", 480)
        .attr("y", 250)
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .style("font", "300 128px Helvetica Neue")
        .style("kerning", "2")
        .style("fill", "green")
        .text("0");

    var face = svg.selectAll("path")
        .data(pyramidFaces)
        .enter().append("path")
        .each(function (d) {
            d.polygon = d3.geom.polygon(d.map(projection));
        });

    d3.timer(function () {
        var time = Date.now() - t0;
        projection.rotate([time * velocity[0], time * velocity[1]]);

        face.each(function (d) {
            d.forEach(function (p, i) {
                d.polygon[i] = projection(p);
            });
        })
            .style("display", function (d) {
                return d.polygon.area() > 0 ? null : "none";
            })
            .style("fill", "white")
            .style("stroke", "black")
            .attr("d", function (d) {
                return "M" + d.polygon.join("L") + "Z";
            });
    });

    function pyramidFaces() {
        var faces = [];

        for (var x = 0; x < 360; x += 90) {
            faces.push(
                [
                    [x + 45, 0],
                    [x + -45, 0],
                    [x, 90]

                ]);
        }
        faces.push(
            [
                [-45, 0],
                [45, 0],
                [135, 0],
                [225, 0]
            ]);
        return faces;
    }
}
