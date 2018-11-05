anychart.onDocumentReady(function() {
    // create pie chart with passed data
    chart = anychart.pie([
        ['Department Stores', 6371664],
        ['Discount Stores', 7216301],
        ['Men\'s/Women\'s Stores', 1486621],
        ['Juvenile Specialty Stores', 786622],
        ['All other outlets', 900000]
    ]);

    // set chart labels position to outside
    chart.labels().position('inside');

    // set container id for the chart
    chart.container('container1');
    chart.maxHeight("300px");
    // initiate chart drawing
    chart.draw();
});