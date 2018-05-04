$(document).ready(function() {
	displayOrder();
});

function displayOrder(){
	var tokenID="pMpLSjtRlBohrZjOIMgrKhDSkZaqlpcPJnZdQMys";
	var orderID = getParameterByName("orderID", window.location.href);
	var url = "https://api.discogs.com/marketplace/orders/" + orderID + "?token=" +tokenID;
	console.log(url);

	$.getJSON(url, function(data){
		var items = [];
		items.push("<div id='shippingAddress'>Shipping Address: "+ data['shipping_address'] + "</div>")
		items.push("<div id='shippingAddress'>ID: "+ data['id'] + "</div>")
		$.each(data["items"], function(key,value){
			items.push("<div id='releaseID'>Release ID : " + value['release']['id'] + "</div>" );
			items.push("<img id='releaseID' src=" + value['release']['thumbnail'] + ">" );
			items.push("<input id='checkBox' type='checkbox'>");
			items.push("<br/>")
		});

		$("<div/>", {
			html: items.join( "" )
		}).appendTo( "#orderDisplay" );
	})
  	.fail(function() {
  		$("#orderDisplay").append("<div id='fail'> failed </div>");
  		$("#orderDisplay").append("<div id='fail'>" +window.location.href+ "</div>");
  	});
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}