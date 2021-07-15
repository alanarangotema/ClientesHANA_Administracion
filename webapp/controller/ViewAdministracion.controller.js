sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"clientesadministracion/Clientes_Administracion/model/models",
	"clientesadministracion/Clientes_Administracion/constants/constants"
], function (Controller, Model) {
	"use strict";

	return Controller.extend("clientesadministracion.Clientes_Administracion.controller.ViewAdministracion", {
		onInit: function () {
			window.gOriginalData = null;	
			
			//Carga los datos de los usuarios en el modelo de la tabla
			this.cargarDatos();

		},
		
		cargarDatos: function(){
			var oModelTablaUsuarios = Model.createDataUsuariosModel();
			oModelTablaUsuarios.attachRequestCompleted(function onCompleted(oEvent) {
				//Esto guarda una copia de los datos sin referencia a los mismos para que no se actualicen al actualizar la tabla
				window.gOriginalData = JSON.parse(JSON.stringify(oModelTablaUsuarios.getProperty("/d/results")));
			});
			//Obtiene los datos de los accesos de los usuarios y lo asigna al modelo de la tabla
			this.getView().setModel(oModelTablaUsuarios, "dataAccesoUsuarios");
		},
		
		guardarCambios: function () {
			var oModelTablaUsuarios = this.getView().getModel("dataAccesoUsuarios");
			var arrayModelTablaUsuarios = oModelTablaUsuarios.getProperty("/d/results");
			window.gBusy = new sap.m.BusyDialog(); //Handler de estado de cursor

			gBusy.open(); //Cursor busy ON
			this.guardarCambiosRecur(arrayModelTablaUsuarios, window.gOriginalData);
			
		},
		
		guardarCambiosRecur: function (datosActuales, datosOriginales) {
			if (datosActuales && datosActuales.length){
				var itemActual = datosActuales.shift();
				var itemOriginal = datosOriginales.shift();
	            var errorMsg = "Usuario " + itemActual.UserSCP + ": ";
				if(itemActual.AppCertificaciones != itemOriginal.AppCertificaciones){
					//Modifica entrada incorrecta 
					var request = "/AccesosSet(Land1='" + itemActual.Land1 + "',Usuario='" + itemActual.Usuario + "')";
	            	var body = {"AppCertificaciones" : itemActual.AppCertificaciones};
					this.modificarUsuario(request, body, errorMsg, datosActuales, datosOriginales);
				} else {
					this.guardarCambiosRecur(datosActuales, datosOriginales);
				}
			}
			else 
			{
				//Termino con todas las consultas y recarga la tabla
				gBusy.close(); //Cursor busy OFF
				
				//Carga de nuevo los datos de los usuarios
				this.cargarDatos();
			}
		},
		
		modificarUsuario: function(request, body, errorMsg, datosActuales, datosOriginales){
			var oData = new sap.ui.model.odata.v2.ODataModel({
            	serviceUrl: CONSTCLIENTEADMIN.URI.ODATA_PORTAL_CLIENTES_URI,
            	defaultUpdateMethod: sap.ui.model.odata.UpdateMethod.Put
            });
			var oThis = this;
			//Escribe la factura en la base de datos
			oData.update(request, body, {
            	success: function(oData, response){
            		console.log(oData);
            		console.log(response);
            		oThis.guardarCambiosRecur(datosActuales, datosOriginales);
			 	}, 
            	error: function(oError){
            		console.log(oError);
					alert(errorMsg + oError.message);
					oThis.guardarCambiosRecur(datosActuales, datosOriginales);
            	}
            });
		}
		
	});
});