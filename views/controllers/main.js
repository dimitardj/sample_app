

function main() {

	var gridDiv = document.getElementById("resultsTable");

	withrawalGrid = new WithrawalGrid({
		store: {
			alias: WithrawalStore,
			model: WithrawalModel,
			url: "/bank"
		},
		domElement: gridDiv
	});

	withrawalGrid.update({
		mitko:'men'
	});

	$("input[type=submit]").click( function() {
		//- console.log($("input[name=iban]").value);
		var iban = document.getElementsByName('iban')[0].value;
		$.ajax( {
			type: "POST",
			url: '/bank',
			data: {iban: iban},
			dataType : "json",
			success: function( response ) {
				var resultTable = document.getElementById('resultsTable');
				
				resultsTable.innerHTML = "<tr><th>Банка</th><th>IBAN</th><th>Изтегляне</th></tr>";

				for(var i = 0; i< response.length; i++){
	                var tableRow = "<tr><td>" +
	                 response[i].bankName +
	                  "</td><td>" +
	                   response[i].IBAN +
	                    "</td><td>" + 
	                   response[i].withrawal + "</td></tr>";
	                $('#resultsTable').append(tableRow);
	            }
	        },
	        error: function(err) {
	        	console.log("ERRor");
	       		var resultTable = document.getElementById('resultsTable');
				
				resultsTable.innerHTML = "<tr><th>Банка</th><th>IBAN</th><th>Изтегляне</th></tr>";
	        	alert("Blind SQL Injection detected!");
	        }
		});
	} );

	// $("input[type=button]").click( function() {
	// 	window.location.assign("/tool");
	// } );
	return false;
}

$(document).ready(main);