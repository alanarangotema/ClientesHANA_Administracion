/*global QUnit*/

sap.ui.define([
	"clientesadministracion/Clientes_Administracion/controller/ViewAdministracion.controller"
], function (Controller) {
	"use strict";

	QUnit.module("ViewAdministracion Controller");

	QUnit.test("I should test the ViewAdministracion controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});