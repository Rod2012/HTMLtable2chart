/**
 * Esta es la funci&oacute;n que debe ser llamada para comenzar el proceso de graficar
 * 
 * @param quien string, id de la tabla que se va a graficar
 * @param myFunct function, es la funci&oacute;n que indica que tipo de gr&aacute;fico se quiere graficar
 * @param donde string, es el id del canvas donde se quiere graficar
 * @param ancho string, ancho del gr&aacute;fico
 * @param alto string, alto del gr&aacute;fico
 * @param losParam jsobj, par&aacute;metros configurables del gr&aacute;fico  
 * @param traspon boolean, indica si se las series vienen dadas por las filas o por las columnas 
 */
function obtener_datos_tabla_convertir_en_array(quien,myFunct,donde,ancho,alto,losParam,traspon) {
	var myTabla = document.getElementById(quien);
	var myVector=[];
	var myRotulo=[];
	var myLegenda=[];
	var myVectorAux = [];
	var cont = 0;
	if(!myTabla){
		console.log("Tabla con el id='"+quien+"'no fue encontrada, es: "+myTabla+"");
		throw "Tabla no encontrada";
	}
		
	for (var i = 0; i < myTabla.childNodes.length; i++) {
		if (myTabla.childNodes[i].nodeName == "THEAD") {
			for (var j = 0; j < myTabla.childNodes[i].childNodes.length; j++) {
				if (myTabla.childNodes[i].childNodes[j].nodeName == "TR") {
					for (var k = 0; k < myTabla.childNodes[i].childNodes[j].childNodes.length; k++) {
						//console.log(myTabla.childNodes[i].childNodes[j].childNodes[k].innerHTML);
						if(myTabla.childNodes[i].childNodes[j].childNodes[k].innerHTML){
							myRotulo.push(myTabla.childNodes[i].childNodes[j].childNodes[k].innerHTML.trim());
						}
					}
				}
			}
		}
		//para el cuerpo
		if (myTabla.childNodes[i].nodeName == "TBODY") {
			for (var j = 0; j < myTabla.childNodes[i].childNodes.length; j++) {
				if (myTabla.childNodes[i].childNodes[j].nodeName == "TR") {
					cont = 0;
					myVectorAux = [];
					for (var k = 0; k < myTabla.childNodes[i].childNodes[j].childNodes.length; k++) {
						if(myTabla.childNodes[i].childNodes[j].childNodes[k].nodeName == "TD"){
							//el primero que encuentra, es para la leyenda
							if(cont == 0){
								myLegenda.push(myTabla.childNodes[i].childNodes[j].childNodes[k].innerHTML.trim());
							}else{
								if( myTabla.childNodes[i].childNodes[j].childNodes[k].innerHTML.trim() != "" )
									myVectorAux.push(parseFloat(myTabla.childNodes[i].childNodes[j].childNodes[k].innerHTML.trim()));
								else
									myVectorAux.push(0);
							}
							cont++;
						}
					}
					myVector.push(myVectorAux);
				}
			}
		}
	}
	console.log(myRotulo);
	console.log(myVector);
	console.log(myLegenda);	
	if(traspon){
		myResp = trasponer(myRotulo, myVector, myLegenda);
		myRotulo = myResp[0];
		myVector = myResp[1];
		myLegenda = myResp[2];
	}

	//en myFunct está guardado el nombre de la función a utilizar
	myFunct(donde,ancho,alto,myVector,myRotulo,myLegenda,losParam);
}
/**
 * Cambiando filas por columnas
 * @param rotulo
 * @param vector
 * @param legenda
 * @returns {___anonymous_myResp}
 */
function trasponer(rotulo,vector,legenda) {
	var rotuloAux = [];
	var vectorAux = [];
	var newVector = [];
	var vectorRes = [];
	rotuloAux = rotulo;
	rotulo = legenda;
	legenda = rotuloAux;
	for (var col = 0; col < vector[0].length; col++) {
		vectorAux = [];
		for (var fila = 0; fila < vector.length; fila++) {
			vectorAux.push(vector[fila][col]);
		}
		newVector.push(vectorAux);
	}
	vectorRes = [rotulo,newVector,legenda];
	return vectorRes;
}