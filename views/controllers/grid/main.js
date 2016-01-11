function WithrawalGrid(config) {
	this.storeConfig = config.store;

	//private function property
	var storeUpdate = function(criterias) {
		this.store.requestData(criterias, this.render);
	};

	this.update = function(criterias) {
		storeUpdate.call(this, criterias);
	};

	this.render = function() {

        $.each(this.data, function(i, item) {
        	var tag = item.toTableRow(config.domElement);
        });
	}

	this.initialize();
}

WithrawalGrid.prototype.initialize = function() {

	this.store = new this.storeConfig.alias(this.storeConfig);
};