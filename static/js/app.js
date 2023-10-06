let data

d3.json("samples.json").then(jsonData => {
    data = jsonData;
    const { names } = data;

    names.forEach(name => {
        d3.select('select').append('option').text(name);
    });

    optionChanged(); 
});


const optionChanged = () => {
    d3.json('samples.json').then(data => {
        let e = d3.select('select').node().value;

        console.log(data);
        let meta = data.metadata.find(obj => obj.id == e);
        let sample = data.samples.find(obj => obj.id = e);

        console.log(meta, sample);

        let { otu_ids, sample_values, otu_labels } = sample;

        console.log(otu_ids);

        var data = [
            {
                x: sample_values.slice(0,10).reverse(),
                y: otu_ids.slice(0,10).reverse().map(x=>`OTU ${x}`),
                text: otu_labels.slice(0,10).reverse(),
                type: 'bar',
                orientation: 'h'
            }
        ];

        Plotly.newPlot('bar', data);


        let trace1 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        };

        // Set up the layout
        let layout = {
            title: "Bacteria Per Sample",
            hovermode: "closest",
            xaxis: {title: "OTU ID"},
        };

        // Call Plotly to plot the bubble chart
        Plotly.newPlot("bubble", [trace1], layout)
    });

   

}
