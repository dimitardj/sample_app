function WithrawalModel(record) {
	this.bankName = record.bankName;
	this.IBAN = record.IBAN;
	this.Amount = record.Amount;
}

WithrawalModel.prototype.update = function(record) {
	this.bankName = record.bankName;
	this.IBAN = record.IBAN;
	this.Amount = record.Amount;
}

WithrawalModel.prototype.toTableRow = function(domElement) {
    var $tr = $('<tr>').append(
        $('<td>').text(this.bankName),
        $('<td>').text(this.IBAN),
        $('<td>').text(this.Amount)
    );

    console.log($tr);
    $(domElement).append($tr);
}