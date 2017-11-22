var listIndex = 0;
var orderJson;
var oauth_consumer_key = "BwMnLoVlnyQMZHNbCEUc";
var oauth_token = "qVsUidCcOBTNxYOsgeRzrwNHBepCpCHCeRtbYdKv";
var token = "JWFLkaHOvPVGJzKKgXCpdxaTprBxmNqFdkJWHfWJ";

$(document).ready(function() {
	$.getJSON( "orderExample.json", function( data ) {
		/*$.each(data['items'], function(key,value){
			getAndDisplayRelease(value["release"]["id"]);
		});*/
		orderJson = data;
		getAndDisplayRelease(getReleaseIdFromOrder(data, listIndex));
	});
	
	// Activates knockout.js
	ko.applyBindings(new discogReleaseViewModel());
});
var listIndex = 0;
var orderJson;
var oauth_consumer_key = "BwMnLoVlnyQMZHNbCEUc";
var oauth_token = "qVsUidCcOBTNxYOsgeRzrwNHBepCpCHCeRtbYdKv";
var token = "JWFLkaHOvPVGJzKKgXCpdxaTprBxmNqFdkJWHfWJ";

$(document).ready(function() {	
	// Activates knockout.js
	ko.applyBindings(new discogReleaseViewModel());
});

function nextRelease(){
	listIndex += 1;
	if(listIndex > orderJson["items"].length-1){
		listIndex = 0;
	}
	$("#releaseInfo").html('');
	getAndDisplayRelease(getReleaseIdFromOrder(orderJson, listIndex));
}

function previousRelease(){
	listIndex -= 1;
	if(listIndex <  0){
		listIndex = orderJson["items"].length-1;
	}
	$("#releaseInfo").html('');
	getAndDisplayRelease(getReleaseIdFromOrder(orderJson, listIndex));
}

function getReleaseIdFromOrder(data, index){
	return data["items"][index]["release"]["id"];
}

function getAndDisplayRelease(releaseId){
	//TODO: implement throttling of requests by reading response headers X-discog-RateLimit-Remaining. If it is 0, throttle request and notify user

   //$.getJSON( "test2.json", function( data ) {
   $.getJSON( "https://api.discogs.com/releases/"+releaseId+"?token="+token, function( data ) {
   //$.getJSON( "https://api.discogs.com/releases/564564564", function( data ) {
	var items = [];
	console.log(JSON.stringify(data));
	console.log('Sucessful json return');
	$.each(data['artists'], function(key, value){
		items.push( "<div id='artist'>" + value['name'] + "</div>" );
	});
	items.push( "<div id='title'>" + data['title'] + "</div>" );
	items.push( "<div id='year'>" + data['year'] + "</div>" );

	if(data['thumb'] == ''){
		items.push( "<img id='thumb' src='vinyl-detailed-illustration-black-record-blank-cover-case-46399114.jpg'>" );
	}
	else{
		items.push( "<img id='thumb' src='" + data['thumb'] + "'>" );
	}
		
	$("<div/>", {
		html: items.join( "" )
		}).appendTo( "#releaseInfo" );
	})
  .fail(function() {
  	$("#releaseInfo").append("<div id='fail'> failed </div>");
  });
}

function discogReleaseViewModel(){
	this.releaseIdToLookup = ko.observable("");

	this.lookUpRelease = function(){
	$("#releaseInfo").html('');
		getAndDisplayRelease(this.releaseIdToLookup());
	};

}


function discogReleaseViewModel(){
	this.releaseIdToLookup = ko.observable("");

	this.lookUpRelease = function(){
	$("#releaseInfo").html('');
		getAndDisplayRelease(this.releaseIdToLookup());
	};

}
