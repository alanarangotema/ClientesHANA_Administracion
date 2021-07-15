sap.ui.jsview("clientesadministracion.Clientes_Administracion.view.ViewAdministracion", {

	/** Specifies the Controller belonging to this View. 
	 * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	 * @memberOf controller.ViewAdministracion
	 */
	getControllerName: function () {
		return "clientesadministracion.Clientes_Administracion.controller.ViewAdministracion";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	 * Since the Controller is given to this method, its event handlers can be attached right away.
	 * @memberOf controller.ViewAdministracion
	 */
	createContent: function (oController) {
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//TABLA para visualización de datos
		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		var oColUsuarioSCP = new sap.ui.table.Column({
			label:new sap.m.Label({text:"{i18n>colUsuarioSCP}"}),
			template:new sap.m.Text({text:"{dataAccesoUsuarios>Usuario}"}),
			sortProperty: "Usuario",
			filterProperty: "Usuario"
		});
		var oColCodPais = new sap.ui.table.Column({
			label:new sap.m.Label({text:"{i18n>colPais}"}),
			template:new sap.m.Text({text:"{dataAccesoUsuarios>Land1}"}),
			sortProperty: "Land1",
			filterProperty: "Land1"
		});
		var oColCertificaciones = new sap.ui.table.Column({
			label: new sap.m.Label({text:"{i18n>colCertificaciones}"}),
			template:new sap.m.CheckBox({selected:"{dataAccesoUsuarios>AppCertificaciones}"}),
			/*template:new sap.m.CheckBox({
				selected : {
					path : 'dataAccesoUsuarios>CertA',
					formatter: function(value) {
						return(value === "X");
					}
				}
			}),*/
			hAlign: sap.ui.core.HorizontalAlign.Center,
			sortProperty: "AppCertificaciones",
			filterProperty: "AppCertificaciones"
		});

		var oTableAccesoUsuarios = new sap.ui.table.Table(this.createId(CONSTCLIENTEADMIN.ID.TABLE),{
			alternateRowColors: true,
			enableSelectAll: false,
			selectionMode: sap.ui.table.SelectionMode.None,
			visibleRowCount: 10,
			columns:[
				oColCodPais,
				oColUsuarioSCP,
				oColCertificaciones
			],
			rows:{
				path: "dataAccesoUsuarios>/d/results"
			}
		});
		
		var oBtnGuardar = new sap.m.Button(this.createId(CONSTCLIENTEADMIN.ID.BTN_GUARDAR),{
			text: "{i18n>btnGuardar}", 
			press: [oController.guardarCambios, oController]
		}).addStyleClass("sapMBtnFloatRight");
		
		var oTituloUsuarios = new sap.m.Label({
			text: "{i18n>tituloTabla}",
			textAlign: "End"
		}).addStyleClass("title");
		
		
		var oSeparator = new sap.m.Label({
			text: "",
			width:"100%"
		});
		
		
		var oPage = new sap.m.Page(this.createId(CONSTCLIENTEADMIN.ID.PAGE),{
			title: "{i18n>title}",
			id: "page",
			content: [
				oTituloUsuarios,
				oSeparator,
				oTableAccesoUsuarios,
				oBtnGuardar
			]
		});
		
		var app = new sap.m.App(this.createId(CONSTCLIENTEADMIN.ID.APP),{});
		app.addPage(oPage);
		app.setInitialPage(oPage);
		return app;
	}

});