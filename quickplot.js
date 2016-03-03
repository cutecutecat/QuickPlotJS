var QuickPlot = function(canvas){
    //Canvas properties
    this.canvas = null;
    this.canvasContext = null;
    this.canvasWidth = null;
    this.canvasHeight = null;
    
    //Graph properties
    this.canvasBackgroundColor = null;
    this.functionColor = null;
    this.graphDomain = null; //Domain/range from far left to far right of the canvas
    this.graphRange = null;
    
    //Function properties
    this.functionLambda = null;
    this.functionDomain = null; //What domain/range to graph the function on
    this.functionRange = null;
    
    //METHODS-----------------------------------------------------------
    
    //void notifyCanvasSizeUpdate(redraw)
    //Refreshes canvas width and height and scales graph accordingly.
    //Redraws after internal resizing if redraw=true
    this.notifyCanvasSizeUpdate = function(redraw){
        this.canvasWidth = this.canvas.width;
        this.canvasHeight = this.canvas.height;
        
        if(redraw){
            //ADD REDRAW CODE
        }
    }
    
    //SETTERS
    
    //void setBackgroundColor(color) sets the background color for the canvas.
    //Note: Does not update canvas
    //E.g. setBackgroundColor("#FFFFFF");
    this.setBackgroundColor = function(color){
        this.canvasBackgroundColor = color;
    }
    
    //void setFunctionColor(color) sets the function plot color.
    //Note: Does not update canvas.
    //E.g. setFunctionColor("#e3e300");
    this.setFunctionColor = function(color){
        this.functionColor = color;
    }
    
    //void setGraphDomain(from, to) sets the graph domain.
    //E.g. setGraphDomain(-2.5, 2.5) would make the very left of the graph x=-2.5 and
    //     the very right of the graph x=2.5
    this.setGraphDomain = function(from, to){
        this.graphDomain = {"from": from,
                            "to": to};
    }
    
    //void setGraphRange(from, to) sets the graph range.
    //E.g. setGraphRange(-3, 0) would make the very top of the graph y=0 and
    //     the very bottom of the graph y=-3
    this.setGraphRange = function(from, to){
        this.graphRange = {"from": from,
                          "to": to};
    }
    
    //void setFunction(functionLambda) sets the function to be plotted to functionLambda
    //NOTE: setFunction does not update the canvas
    //NOTE: functionLambda must have one parameter and must output a floating point number.
    this.setFunction = function(functionLambda){
        this.functionLambda = functionLambda;
    }
    
    //void setFunctionDomain(from, to) sets the domain the function should be plotted on.
    //NOTE: This domain is bounded by the canvas domain.
    this.setFunctionDomain = function(from, to){
        this.functionDomain = {"from": from,
                              "to": to};
    }
    
    //void setFunctionRange(from, to) sets the range the function should be plotted on.
    //NOTE: This range is bounded by the canvss range.
    this.setFunctionRange = function(from, to){
        this.functionRange = {"from": from,
                             "to": to};
    }
    
    
    
    //Initialization function - gets called on instantiation
    this.init = function(){
        if(canvas.nodeName.toLowerCase() != "canvas"){
            console.log(canvas.nodeName.toLowerCase());
            console.error("Invalid canvas passed to QuickPlot");
            return 1;
        }
        
        this.canvas = canvas;
        this.canvasContext = canvas.getContext("2d");
        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;
    }
    
    this.init(canvas);
}