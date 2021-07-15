(function (window) {
    "use strict";
    
    window.CONSTCLIENTEADMIN = {
    	ID : {
        	APP : "idApp",
        	PAGE: "idPage",
        	TABLE: "idTablaAccesosUsuarios",
        	BTN_GUARDAR: "idBtnGuardar"
    	},
    	URI: {
    		//ALIAS: "TDH",
    		//ALIAS: "TDHCLNT700",
    		ALIAS: "HANA",
    		CURRENT_USER : "/services/userapi/currentUser",
    		ODATA_PORTAL_CLIENTES_URI : "/sap/opu/odata/sap/ZSCP_PORTAL_CLIENTES_HANA_SRV",
    		LISTA_ACCESOS_USUARIOS : "/sap/opu/odata/sap/ZSCP_PORTAL_CLIENTES_HANA_SRV/AccesosSet"
    	}
    };
}(window)); 