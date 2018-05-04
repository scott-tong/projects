var tokenID="";
var per_page = "50";

$(document).ready(function() {
	displayOrderList();
});

//display orders
function displayOrderList(){
	// $.getJSON("orderListExample.json", function(data){
	$.getJSON("https://api.discogs.com/marketplace/orders?status=New Order&token="+tokenID+"&per_page="+per_page, function(data){
		var items = [];
		$.each(data["orders"], function(key,value){
			items.push("<div id='orderID'>Order Number: " + value['id'] + "</div>" );
			items.push("<a id='orderID' href=https://api.discogs.com/marketplace/orders/" + value['id'] + "?token="+tokenID+">" + "JSON Link</a>");
			items.push("<br/>")
			items.push("<a id='orderID' href=discogDisplayOrder.html?orderID=" + value['id'] + ">Page link</a>");
			items.push("<div id='numItems'>Number of Items : " + value['items'].length + "</div>" );
			items.push("<div id='lastUpdated'>Last updated : " + value['last_activity'] + "</div>" );
			items.push("<div id='status'>Status : " + value['status'] + "</div>" );
			items.push("<div id='shippingAddress'>Shipping Address: "+ value['shipping_address'] + "</div>")
			items.push("<br/>")
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