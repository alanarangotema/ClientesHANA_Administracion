/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"clientesadministracion/Clientes_Administracion/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});