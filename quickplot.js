var QuickPlot = function (canvas) {
    //Canvas properties
    this.canvas;
    this.canvasContext;
    this.canvasWidth;
    this.canvasHeight;

    //Graph properties
    this.canvasBackgroundColor;
    this.graphDomain; //Domain/range from far left to far right of the canvas
    this.graphRange;
    this.drawAxis;
    this.drawArrow;
    this.partX;
    this.partY;
    this.labelX;
    this.labelY;

    //Function properties
    this.functionLambda;
    this.functionColor;
    this.functionDomain; //What domain/range to graph the function on
    this.functionRange;

    //METHODS-----------------------------------------------------------

    //void notifyCanvasSizeUpdate(redraw)
    //Refreshes canvas width and height and scales graph accordingly.
    //Redraws after internal resizing if redraw=true
    this.notifyCanvasSizeUpdate = function (redraw) {
        this.canvasWidth = this.canvas.width;
        this.canvasHeight = this.canvas.height;

        if (redraw) {
            this.drawGraph();
        }
    }

    //SETTERS

    //void setDrawAxis(enabled) enables drawing the axis if passed true.
    //NOTE: Does not update canvas.
    this.setDrawAxis = function (enabled) {
        this.drawAxis = enabled;
    }

    this.setDrawArrow = function (enabled) {
        this.drawArrow = enabled;
    }

    this.setPartX = function (parts) {
        this.partX = parts;
    }

    this.setPartY = function (parts) {
        this.partY = parts;
    }

    this.setLabelX = function (label) {
        this.labelX = label;
    }

    this.setLabelY = function (label) {
        this.labelY = label;
    }

    //void setBackgroundColor(color) sets the background color for the canvas.
    //Note: Does not update canvas
    //E.g. setBackgroundColor("#FFFFFF");
    this.setBackgroundColor = function (color) {
        this.canvasBackgroundColor = color;
    }

    //void setGraphDomain(from, to) sets the graph domain.
    //E.g. setGraphDomain(-2.5, 2.5) would make the very left of the graph x=-2.5 and
    //     the very right of the graph x=2.5
    this.setGraphDomain = function (from, to) {
        this.graphDomain = {
            "from": from,
            "to": to
        };
        if (this.functionDomain == undefined) {
            this.functionDomain = this.graphDomain;
        }
    }

    //void setGraphRange(from, to) sets the graph range.
    //E.g. setGraphRange(-3, 0) would make the very top of the graph y=0 and
    //     the very bottom of the graph y=-3
    this.setGraphRange = function (from, to) {
        this.graphRange = {
            "from": from,
            "to": to
        };
        if (this.functionRange == undefined) {
            this.functionRange = this.graphRange;
        }
    }

    //void setFunction(functionLambda) sets the function to be plotted to functionLambda
    //NOTE: setFunction does not update the canvas
    //NOTE: functionLambda must have one parameter and must output a floating point number.
    //Note: Does not update canvas.
    //E.g. color as("#e3e300");
    this.addFunction = function (functionLambda, color) {
        this.functionLambda.push(functionLambda);
        if (color != null) {
            this.functionColor.push(color);
        } else {
            this.functionColor.push("#AA0000");
        }
    }

    //void setFunctionDomain(from, to) sets the domain the function should be plotted on.
    //NOTE: This domain is bounded by the canvas domain.
    this.setFunctionDomain = function (from, to) {
        this.functionDomain = {
            "from": from,
            "to": to
        };
    }

    //void setFunctionRange(from, to) sets the range the function should be plotted on.
    //NOTE: This range is bounded by the canvss range.
    this.setFunctionRange = function (from, to) {
        this.functionRange = {
            "from": from,
            "to": to
        };
    }


    //GETTERS

    //Boolean getDrawAxis() returns whether or not axis is currently being drawn.
    this.getDrawAxis = function () {
        return this.drawAxis;
    }

    this.getDrawArrow = function () {
        return this.drawArrow;
    }

    this.getPartX = function () {
        return this.partX;
    }

    this.getPartY = function () {
        return this.partY;
    }

    this.getLabelX = function () {
        return this.labelX;
    }

    this.getLabelY = function () {
        return this.labelY;
    }

    //Object getBackgroundColor() returns the current canvas background color.
    this.getBackgroundColor = function () {
        return this.canvasBackgroundColor;
    }

    //Object getFunctionColor() returns the current function color.
    this.getFunctionColor = function () {
        return this.functionColor;
    }

    //Object getGraphDomain() returns the current graph domain object.
    this.getGraphDomain = function () {
        return this.graphDomain;
    }

    //Object getGraphRange() returns the current graph range object.
    this.getGraphRange = function () {
        return this.graphRange;
    }

    //Object getFunctionDomain() returns the current function domain object.
    this.getFunctionDomain = function () {
        return this.functionDomain;
    }

    //Object getFunctionRange() returns the current function range object.
    this.getFunctionRange = function () {
        return this.functionRange;
    }

    //Function getFunctionLambda() returns the current function lambda.
    this.getFunctionLambda = function () {
        return this.functionLambda;
    }

    //boolean drawGraph() draws the graph according to properties set using setters.
    //NOTE: Returns false and prints an error if draw fails. Otherwise returns true.
    this.drawGraph = function () {
        //Check for valid properties
        var errorFlag = false;
        if (this.canvas == undefined || this.canvasContext == undefined) {
            errorFlag = true;
            console.error("QuickPlot Error: Canvas not defined");
        }
        if (this.canvasWidth <= 0 || this.canvasHeight <= 0) {
            errorFlag = true;
            console.error("QuickPlot Error: Canvas dimension error.");
        }
        if (this.functionLambda == undefined || this.functionLambda == undefined) {
            errorFlag = true;
            console.error("QuickPlot Error: Function not defined.");
        }
        if (this.graphDomain == undefined || this.graphRange == undefined) {
            errorFlag = true;
            console.error("QuickPlot Error: Graph domain or range not set.");
        }
        if (this.graphDomain.to - this.graphDomain.from <= 0) {
            errorFlag = true;
            console.error("QuickPlot Error: Graph domain error.");
        }

        if (errorFlag) {
            return false;
        }

        //Properties are valid, we can draw the graph now.
        //First, draw the background.

        this.canvasContext.fillStyle = (this.canvasBackgroundColor == undefined) ? "#FFFFFF" : this.canvasBackgroundColor;
        this.canvasContext.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

        //Now draw the axis:
        if (this.drawAxis) {
            var xAxis = Math.floor(this.canvasWidth * 0.1);
            var yAxis = Math.floor(this.canvasHeight * 0.9);

            //Change to black color for axis
            this.canvasContext.fillStyle = "#000000";
            this.canvasContext.fillRect(xAxis, 0, 1, yAxis);
            this.canvasContext.fillRect(xAxis, yAxis, this.canvasWidth, 1);

            //We flip the y because y=0 is at the top of the canvas
        }
        //Draw the arraw
        if (this.drawArrow) {
            this.canvasContext.moveTo(xAxis, 0);
            this.canvasContext.lineTo(xAxis - 4, 12);
            this.canvasContext.lineTo(xAxis + 4, 12);
            this.canvasContext.fill();
            this.canvasContext.moveTo(this.canvasWidth, yAxis);
            this.canvasContext.lineTo(this.canvasWidth - 12, yAxis + 4);
            this.canvasContext.lineTo(this.canvasWidth - 12, yAxis - 4);
            this.canvasContext.fill();
        }
        //Draw the X anf Y parts
        if (this.partX != 0 && this.partY != 0) {

            var x_dis = Math.floor((this.canvasWidth - xAxis) * 0.9 / this.partX);
            var y_dis = Math.floor(yAxis * 0.9 / this.partY);
            var x_step = (this.graphDomain.to - this.graphDomain.from) *0.9/ this.partX;
            var y_step = (this.graphRange.to - this.graphRange.from) *0.9/ this.partY;
            for (var n = 1; n <= this.partY; n++) {
                this.canvasContext.fillRect(xAxis, yAxis - y_dis * n, 5, 1);
                this.canvasContext.textBaseline = "middle";
                this.canvasContext.textAlign = "end";
                this.canvasContext.fillText((this.graphRange.from + y_step * n).toFixed(2), xAxis - 5, yAxis - y_dis * n);
            }
            for (var n = 1; n <= this.partX; n++) {
                this.canvasContext.fillRect(xAxis + x_dis * n, yAxis - 5, 1, 5);
                this.canvasContext.textBaseline = "top";
                this.canvasContext.textAlign = "center";
                this.canvasContext.fillText((this.graphDomain.from + x_step * n).toFixed(2), xAxis + x_dis * n, yAxis);
            }
        }
        //draw the label
        if (this.labelX) {
            this.canvasContext.textBaseline = "top";
            this.canvasContext.textAlign = "end";
            this.canvasContext.fillText(this.labelX, this.canvasWidth - 20, yAxis + 20);
        }
        if (this.labelY) {
            this.canvasContext.textBaseline = "top";
            this.canvasContext.textAlign = "end";
            this.canvasContext.fillText(this.labelY, xAxis - 10, 15);
        }

        //Finally, the function

        for (var n = 0; n < this.functionLambda.length; n++) {
            lambada = this.functionLambda[n];
            this.canvasContext.fillStyle = this.functionColor[n];
            //We cache previous y2 values because they're the same as y1 on the next iteration.
            var cacheY1 = null;
            var cacheY1Pixel = null;
            for (var i = 0; i <= this.canvasWidth; i++) {
                var x = ((i) * ((this.graphDomain.to - this.graphDomain.from) / (this.canvasWidth*0.9))) + this.graphDomain.from;

                if (x < this.functionDomain.from || x > this.functionDomain.to)
                    continue;

                var y1 = (cacheY1 == null) ? lambada(x) : cacheY1;
                var y2 = lambada(x + ((this.graphDomain.to - this.graphDomain.from) / (this.canvasWidth*0.9)));

                var y1Pixel = (cacheY1Pixel == null) ? ((y1 - this.graphRange.from) * (this.canvasHeight)*0.9 / (this.graphRange.to - this.graphRange.from)) : cacheY1Pixel;
                var y2Pixel = ((y2 - this.graphRange.from) * (this.canvasHeight)*0.9 / (this.graphRange.to - this.graphRange.from));

                var point = Math.max(y1Pixel, y2Pixel);
                var height = Math.abs(y1Pixel - y2Pixel) + 1;

                this.canvasContext.fillRect(i+this.canvasWidth*0.1, this.canvasHeight*0.9 - point, 1, height);

                cacheY1 = y2;
                cacheY1Pixel = y2Pixel;
            }
        }
    }

    //Initialization function - gets called on instantiation
    this.init = function () {
        if (canvas.nodeName.toLowerCase() != "canvas") {
            console.log(canvas.nodeName.toLowerCase());
            console.error("Invalid canvas passed to QuickPlot");
            return 1;
        }

        this.canvas = canvas;
        this.canvasContext = canvas.getContext("2d");
        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;
        this.drawAxis = true;
        this.drawArrow = true;
        this.partX = 5;
        this.partY = 5;
        this.functionLambda = new Array();
        this.functionColor = new Array();
    }

    this.init(canvas);
}
