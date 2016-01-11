function WithrawalStore(config) {
	this.data = [];
	this.Model = config.model;
	
	//private property
	var url = config.url;

	this.requestData = function(payload, callback) {

		var that = this;

		$.ajax({
		  type: "POST",
		  url: url,
		  data: payload,
			success: function(response) {

			  	$(function() {
		            $.each(response, function(i, item) {
		            	that.addDataRow(item);
		            });
		        });

			  	console.log(that);
		        callback.call(that);
			}
		});
	}
}

WithrawalStore.prototype.empty = function() {
	this.data = [];
}

WithrawalStore.prototype.addDataRow = function(record) {
	var newRow = new this.Model(record);
	this.data.push(newRow);
}

WithrawalStore.prototype.getRecords = function(record) {
	return this.data;
}