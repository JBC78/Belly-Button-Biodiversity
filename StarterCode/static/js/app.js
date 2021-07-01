// Use the D3 library to read in samples.json.
d3.json("samples.json").then(function(data) {
    console.log(data.names);

    var dataNames = data.names
    dataNames.forEach((name)=>{
        var dropDown = d3.select("#selDataset");
        var appendOption = dropDown.append("option");
        appendOption.attr("value", name)
        appendOption.text(name)
        var idSelection = dropDown.node().value
    })});

var defaultId = "940"
optionChanged(defaultId);
function optionChanged(idSelection) {
    barChart(idSelection)
    metaData(idSelection)
};
// Create a function to populate the Demographics Table based on selected ID
function metaData(idSelection) {

    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        var selectId = metadata.filter(person => person.id == idSelection);
        var valuesArray = selectId[0];
        var panel = d3.select("#sample-metadata");
        panel.html("");
        var demographics = Object.entries(valuesArray)
        demographics.forEach((item) => {
        panel.append("h6").text(item[0]+': '+item[1]);
    });
  });
};

function barChart(idSelection) {
    d3.json("samples.json").then(function(bellyData) {
    // console.log(bellyData.idSelection[0]);
    var dropDown = d3.select("#selDataset")
    var idSelection = dropDown.node().value;
    var samples = bellyData.samples;
    var selectId = samples.filter(person => person.id == idSelection);
    var valuesArray = selectId[0];

    var Ids = valuesArray.otu_ids.map(otu=>"otu " + otu);
    var Labels = valuesArray.otu_labels.slice(0,10);
    var Values = valuesArray.sample_values.slice(0,10);
    
    console.log(Ids)
    console.log(Labels)
    console.log(Values)
    // ## Create a horizontal bar chart with a dropdown menu to display the top
    //  10 OTUs found in that individual.
    // Use sample_values as the values for the bar chart.
    // Use otu_ids as the labels for the bar chart.
    // Use otu_labels as the hovertext for the chart.
    // Horizontal Bar Chart
    var trace = {
        type: 'bar',
        x: Values,
        y: Ids,
        orientation: 'h',
        text: Labels
    };
  
    var data = [trace];

    var layout = {
        title: 'Belly Button Bacteria',
    }
    Plotly.newPlot('bar', data, layout);
    //  10 OTUs found in that individual.
    // Use sample_values as the values for the bar chart.
    // Use otu_ids as the labels for the bar chart.
    // Use otu_labels as the hovertext for the chart.
    var values = bellyData.samples[0].sample_values;
    var labels = bellyData.samples[0].otu_ids;
    var hovertext = bellyData.samples[0].otu_labels;

    console.log(values)
    console.log(labels)
    console.log(hovertext)
    // Create a bubble chart that displays each sample.
    // Use otu_ids for the x values.
    // Use sample_values for the y values.
    // Use sample_values for the marker size.
    // Use otu_ids for the marker colors.
    // Use otu_labels for the text values

    // Bubble Chart
    var trace1 = {
        x: Ids,
        y: Values,
        text: Labels,
        mode: 'markers',
        marker: {
            size: Values,
            color: Ids
        },
    
    };

    var bubbleData = [trace1];

    var bubbleLayout = {
        title: 'Belly Button Bacteria',
    }
    Plotly.newPlot('bubble', bubbleData, bubbleLayout);

})};
