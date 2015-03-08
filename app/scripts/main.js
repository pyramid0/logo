window.onload = function() {
    var width = 960,
        height = 500;

    var velocity = [.010, .005],
        t0 = Date.now();

    var projection = d3.geo.orthographic()
        .scale(height / 2 - 10);

    var svg = d3.select("body").append("svg")
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
                    [x + 0, 90]

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
};
