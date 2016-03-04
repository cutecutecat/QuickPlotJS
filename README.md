# QuickPlot.js
A pure JavaScript library that plots math function on an HTML5 canvas. Quick, fast, no bullshit. Use as you please.

##Features

###Fast
Other popular math plotting libraries will plot a math function(300x300 canvas) in 50-150 ms.

QuickPlot.js plots in **_2-5 ms_**. 

###Lightweight
The minified version of QuickPlot.js is **_4 kb_**. If all you need is a simple plot, there's no need to bog down your web-app with a 300kb feature-rich API.

###Simple
With only a few critical functions and a detailed How-To, QuickPlot.js is simple enough for anyone to use, regardless of experience in JavaScript.

##How-To
Start with defining a canvas in HTML. This canvas must have an id, or be identifiable from JavaScript in some other way. We also need to include QuickPlot.js (save to local).
```html
  <body>
    ...
    <canvas id="canvas" width=300px height=300px class="canvas">ERROR LOADING CANVAS</canvas>
    <script type="text/javascript" src="quickplotmini.js"></script>
  </body>
```
Now in JavaScript, create a new QuickPlot object and pass it a reference to your canvas.
```JavaScript
  var quickplot = new QuickPlot(document.getElementById("canvas"));
```
    
Finally, we set our properties using provided setters. There are 3 required setters we must call. See documentation for setters in the documentation below.
```JavaScript
  quickplot.setFunction(function(x){return Math.sin(x)});
  quickplot.setGraphDomain(-2, 2);
  quickplot.setGraphRange(0, 3);
```

When you want to draw your function plot to the canvas, call `quickplot.drawGraph()`.

That's it! 

##Documentation
QuickPlot.js features several getters and setters to make using this API easier and more customizable. All of these getters and setters are documented below. This API introduces only one global variable, `QuickPlot`.

###Main Functions
**.drawGraph()**
  
Draws the function plot to the canvas. Requires function, domain and range have all been set by `.setFunctionLambda`, `.setGraphDomain`, and `.setGraphRange` respectively. Will print an error to the console if drawing fails.

**.notifyCanvasSizeUpdate(redraw)**

Updates internal canvas width and height used for calculating plot coordinates. Must be called any time the canvas width or height is modified. If redraw==true, canvas will be redrawn.

###Setters
**.setDrawAxis(enabled)**

Enables or disables drawing of the x and y axis. Enabled by default.

**.setBackgroundColor(color)**

Sets the background color for the canvas when drawing the plot. Enter color as a hex string. By default, background color is "#FFFFFF" (white).

**.setFunctionColor(color)**

Sets the color for the function when drawing the plot. Enter color as a hex string. By default, color is "#AA0000".

**.setGraphDomain(from, to)**

Sets the graph domain. 'from' is the far left of the graph, 'to' is the far right.

**.setGraphRange(from, to)**

Sets the graph range. 'from' is the far bottom of the graph, 'to' is the very top.

**.setFunctionDomain(from, to)**

Sets the domain the function should be plotted on. This domain is bounded by the canvas domain.

**.setFunctionRange(from, to)**

Sets the range the function should be plotted on. This range is bounded by the canvas range.

**.setFunction(functionLambda)**

Sets the function to be plotted. Must be inputted as a JavaScript lambda with one x parameter. e.g. `.setFunction(function(x){return Math.sin(x)});`. To use a string function, see https://github.com/silentmatt/js-expression-eval/tree/master

###Getters

**.getDrawAxis()**

Returns whether axis is set to be drawn or not (boolean).

**.getBackgroundColor()**

Returns current color set to be used as canvas background.

**.getFunctionColor()**

Returns current color set to be used as function color.

**.getGraphDomain()**

Returns object corresponding to domain the graph is set to be plotted on. Object has a "from" property and "to" property.

**.getGraphRange()**

Returns object corresponding to range the graph is set to be plotted on. 

**.getFunctionDomain()**

Returns object corresponding to domain of the function. 

**.getFunctionRange()**

Returns object corresponding to range of the function.

**.getFunctionLambda()**

Returns the current lambda set to be graphed.

##Conclusion
If you find a bug, please post an issue. Feel free to fork or make a pull request if you want to modify. :)
