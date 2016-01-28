document.getElementById('files').addEventListener('change', handleFileSelect, false);

var margin = {top: 100, right: 100, bottom: 100, left: 100},
width = Math.min(700, window.innerWidth - 10) - margin.left - margin.right,
height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);
					
var dayArray = [];
var sets;
var dayEnteries = 3600;
var fullData = [
	 //  [
		// {value:0.0},
		// {value:93.0},
		// {value:108.0},
		// {value:180.0},
		// {value:78.0},
		// {value:147.0},
		// {value:78.0},
		// {value:135.0},			
		// {value:138.0},			
		// {value:75.0},			
		// {value:105.0},			
		// {value:222.0},			
		// {value:87.0},			
		// {value:84.0},			
		// {value:222.0},			
		// {value:120.0},			
		// {value:105.0},			
		// {value:222.0},			
		// {value:87.0},			
		// {value:84.0},		
		// {value:222.0},		
		// {value:105.0},		
		// {value:72.0},		
		// {value:84.0},		
	 //  ]
	];
////////////////////////////////////////////////////////////// 
//////////////////// Draw the Chart ////////////////////////// 
////////////////////////////////////////////////////////////// 

var color = d3.scale.ordinal()
	.range(["#7cb5ec","#7cb5ec","#7cb5ec"]);

var radarChartOptions = {
	w: width,
	h: height,
	margin: margin,
	maxValue: 327,
	levels: 6,
	roundStrokes: true,
	color: color
};
//Call function to draw the Radar chart


function handleFileSelect(evt) {
	var files = evt.target.files; // FileList object

	// Loop through the FileList and render image files as thumbnails.
	for (var i = 0, f; f = files[i]; i++) {

	  var reader = new FileReader();

	  // Closure to capture the file information.
	  reader.onload = (function(theFile) {
	    return function(e) {
	      populateData(e.target.result);
	    };
	  })(f);

	  // Read in the image file as a data URL.
	  reader.readAsText(f);
	}
}

function populateData(data){
	dataArray = data.split(",");
	sets = dataArray.length / dayEnteries;
	sets = Math.ceil(sets);
	console.log(sets);

	for(var i = 0; i < sets; i++){
		for(var j = 0; i < dayEnteries; i++){
			dayArray.push({
				value: parseInt(dataArray[i])
			});
		}
		fullData.push(dayArray);
	}

	console.log(fullData);


	RadarChart(".radarChart", fullData, radarChartOptions);

}