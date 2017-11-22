$(document).ready(function() {
	displayOrder();
});

//display orders
function displayOrder(){
	$.getJSON("orderListExample.json", function(data){
		var items = [];
		$.each(data["orders"], function(key,value){
			items.push( "<div id='orderID'>Order Number: " + value['items'].length + "</div>" );
			items.push( "<div id='numItems'>Number of Items : " + value['id'] + "</div>" );
			items.push( "<div id='lastUpdated'>Last updated : " + value['last_activity'] + "</div>" );
		});

		$("<div/>", {
			html: items.join( "" )
		}).appendTo( "#orderList" );
	})
  	.fail(function() {
  		$("#orderList").append("<div id='fail'> failed </div>");
  	});
}


//retrieve orders