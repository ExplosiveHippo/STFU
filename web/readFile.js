document.getElementById('files').addEventListener('change', handleFileSelect, false);

var margin = {top: 50, right: 50, bottom: 50, left: 50},
width = Math.min(800, window.innerWidth - 10) - margin.left - margin.right,
height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);
					
var sets;
var setLow = 0;
var setHigh = 3599;
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
	 //  ],
	 //   [
		// {value:0.0},
		// {value:100.0},
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
	.range(["#00aeef"]);

var radarChartOptions = {
	w: 800,
	h: 800,
	margin: margin,
	maxValue: 327,
	levels: 6,
	roundStrokes: true,
	color: color
};
//Call function to draw the Radar chart


function handleFileSelect(evt) {
	var files = evt.target.files; // FileList object

	for (var i = 0, f; f = files[i]; i++) {

	  var reader = new FileReader();

	  // Closure to capture the file information.
	  reader.onload = (function(theFile) {
	    return function(e) {
	      populateData(e.target.result);
	    };
	  })(f);

	  // Read in the file as text
	  reader.readAsText(f);
	}
}

function populateData(data){
	dataArray = data.split(",");

	sets = dataArray.length / (setHigh + 1);
	for(var i = 0; i < sets; i++){

		var dayArray = [];

		console.log("current setLow: " + setLow);
		console.log("current setHigh: " + setHigh);
		for(var j = setLow; j < setHigh; j++){
			dataArray[j] = $.trim(dataArray[j]);
			dayArray.push({
				value: parseInt(dataArray[j])
			});
		}

		fullData.push(dayArray);

		console.log(fullData);

		
		setLow = setHigh + 1;
		console.log(setLow * 2);
		console.log(dataArray.length);
		if(setLow * 2 >= dataArray.length){
		 	setHigh = dataArray.length;
		 	console.log("should be 7200:" + setHigh);
		}else{
			setHigh = setLow * 2;
			console.log("should be 7198:" + setHigh);
		}
		
	}


	RadarChart(".radarChart", fullData, radarChartOptions);

}