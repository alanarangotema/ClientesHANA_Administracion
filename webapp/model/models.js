sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function (JSONModel, Device) {
	"use strict";

	return {

		createDataUsuariosModel: function () {
			var oBusy = new sap.m.BusyDialog();
			/*var jsonTestData = {"d":{
			    "results": [
			    	{
				    	"UserSCP":"P000001",
				    	"Kunnr":"0000231446",
				    	"Name1":"Cliente 1",
				    	"CertA":true
			    	},
			    	{
				    	"UserSCP":"P000002",
				    	"Kunnr":"0000987763",
				    	"Name1":"Cliente 2",
				    	"CertA":false
			    	}
				]}
			};
			*/
			var oModel = new sap.ui.model.json.JSONModel();
			oBusy.open();
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.loadData(CONSTCLIENTEADMIN.URI.LISTA_ACCESOS_USUARIOS);
			oModel.attachRequestCompleted(function onCompleted(oEvent) {
					oBusy.close();
					console.log(oModel);
			});
			return oModel;
		},
		
		createActualizaUsuariosModel: function () {
			var oBusy = new sap.m.BusyDialog();
			var oModel = new sap.ui.model.json.JSONModel(jsonTestData);
			/*DESCOMENTAR CUANDO FUNCIONE EL SERVICIO
			oBusy.open();
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.loadData(CONSTCLIENTEADMIN.URI.LISTA_ACCESOS_USUARIOS);
			oModel.attachRequestCompleted(function onCompleted(oEvent) {
					oBusy.close();
					console.log(oModel);
			});*/
			return oModel;
		},

	};
});