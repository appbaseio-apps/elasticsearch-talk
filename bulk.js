// Function to convert string to JSON format
 function readJson (data) {
    var obj = JSON.parse(data);
    return(obj)
 };

// Contain JSON data to "tmpjson"
var tmpjson = readJson(xjson);
// Extract property of "samplealert" to "finaljson"
var finaljson = tmpjson.samplealert;

// Find number of document of "finaljson"
var xloop = _.size(finaljson);

// Declare variable to contain body of JSON data for loading to ElasticSearch
var br = [];

// Function to create body for loading to ElasticSearch
function create_bulk (bulk_request) {
    var obj
 
for (i = 0; i < xloop; i++) {
    obj = finaljson[1]
    // Insert header of record
    bulk_request.push({index: {_index: 'jsindex', _type: 'jstype', _id: i+1}});
    bulk_request.push(obj);    
                            }
    return bulk_request;
  };
  
// Call function to get body for loading
create_bulk(br); 

// Standard function of ElasticSearch to use bulk command
client.bulk(
{
    body : br
}, function (err, resp) {
  console.log(err);
});
