sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("com.excelupload.ExcelUpload.controller.View1", {
		onInit: function () {
			this.localModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(this.localModel, "localModel");
		},

		onUpload: function (e) {
			this._import(e.getParameter("files") && e.getParameter("files")[0]);
		},

		_import: function (file) {
			var that = this;
			var excelData = {};
			if (file && window.FileReader) {
				var reader = new FileReader();
				reader.onload = function (e) {
					var data = e.target.result;
					var workbook = XLSX.read(data, {
						type: 'binary'
					});
					workbook.SheetNames.forEach(function (sheetName) {
						// Here is your object for every sheet in workbook
						excelData = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);

					});
					// Setting the data to the local model 
					that.localModel.setData({
						items: excelData
					});
					that.localModel.refresh(true);
				};
				reader.onerror = function (ex) {
					console.log(ex);
				};
				reader.readAsBinaryString(file);
			}
		}
	});
});