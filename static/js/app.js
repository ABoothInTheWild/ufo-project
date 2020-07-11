//global
var tableData = data;

$(document).ready(function() {
    //init load
    populateStateFilter();
    populateCountryFilter();
    populateShapeFilter();
    buildTable();

    //Event Listeners
    $('#filter-btn').on("click", function(event) {
        event.preventDefault();
        buildTable();
    });
    $('#form').on("submit", function(event) {
        event.preventDefault();
        buildTable();
    });
    $('#stateFilter, #countryFilter, #shapeFilter').on("change", function(event) {
        event.preventDefault();
        buildTable();
    });
});

// Create dynamic Filters
function populateStateFilter() {
    var states = [...new Set(tableData.map(x => x.state))];
    states.sort();

    states.forEach(function(state) {
        let idunno = `<option>${state}</option>`
        $('#stateFilter').append(idunno);
    });
}

function populateCountryFilter() {
    var countries = [...new Set(tableData.map(x => x.country))];
    countries.sort();

    countries.forEach(function(country) {
        let idunno = `<option>${country}</option>`
        $('#countryFilter').append(idunno);
    });
}

function populateShapeFilter() {
    var shapes = [...new Set(tableData.map(x => x.shape))];
    shapes.sort();

    shapes.forEach(function(shape) {
        let idunno = `<option>${shape}</option>`
        $('#shapeFilter').append(idunno);
    });
}

// This builds the table wooo
function buildTable() {
    //get filters
    var inputValue = $('#datetime').val();
    var stateFilter = $('#stateFilter').val();
    var countryFilter = $('#countryFilter').val();
    var shapeFilter = $('#shapeFilter').val();

    // Use the form input to filter the data by blood type
    //alert(inputValue);
    var sub_data = tableData;
    if (inputValue !== "") {
        sub_data = tableData.filter(x => Date.parse(x.datetime) === Date.parse(inputValue));
    }
    if (stateFilter != "All") {
        sub_data = sub_data.filter(x => x.state === stateFilter);
    }
    if (countryFilter != "All") {
        sub_data = sub_data.filter(x => x.country === countryFilter);
    }
    if (shapeFilter != "All") {
        sub_data = sub_data.filter(x => x.shape === shapeFilter);
    }

    // YOUR CODE HERE!
    $('#ufo-table').DataTable().clear().destroy(); //clear datatable
    $('#ufo-table tbody').empty();
    sub_data.forEach(function(thing) {
        let row = "<tr>"
        Object.entries(thing).forEach(function([key, value]) {
            row += `<td>${value}</td>`;
        });
        row += "</tr>";
        $('#ufo-table tbody').append(row);
    });
    $('#ufo-table').DataTable({
            dom: 'Bfrtip',
            buttons: [
                'copyHtml5',
                'csvHtml5',
            ]
        }) //rebuild it

}