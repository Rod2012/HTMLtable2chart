/**
 * Script para hacer gr&aacute;ficos de dispersi&oacute;n, de
 * lineas con datos en el eje X e Y, hecho para sustituir a JPGraph
 * @author rsalcedo
 */
function graficarTortas(quien,ancho,alto,vector,rotulo,legenda,myParam) {
	///////////////Parámetros a cambiar, variables globales
	var miMargen = 0.80;//80%
	var separZonas = 0.05;//5%
	var tituloGraf = "Ejecutado Vs Esperado";
	var tituloEjeX = "Complejo";
	var tituloEjeY = "Fuerza Labor";
	var nLineasDiv = 10;
	var mysColores =[
	                 ["rgba(93,18,18,1)","rgba(196,19,24,1)"],  //rojos
	                 ["rgba(171,115,51,1)","rgba(251,163,1,1)"], //amarillos
	                 ["rgba(93,255,18,1)","rgba(196,255,24,1)"], //verdes
	                 ["rgba(93,93,93,1)","rgba(150,150,150,1)"], //grises
	                 ["rgba(0,10,93,1)","rgba(0,15,150,1)"] //azules
	                ];
	var myVector=[
	              [ 10, 20, 30]
	
	             ];
	var myLegenda=[
	               "Esperado","Ejecutado","Calculado","otra cosa", "azules"
	              ];
	var anchoLinea = 2;
	var radioTorta = 0.4;//radio máximo es 0.5, la mitad de todo el rectángulo
	//Modificados por el programa, no importa que valor se coloca aquí
	var elTotal = 0;
	///////////////
	
	establecer_valores(vector,rotulo,legenda);
	establecer_parametros(myParam);
	arrancaGraficar(quien,ancho,alto);

	/**
	 * Modifica las variables globales de la funci&oacute;n madre
	 */
	function establecer_parametros(param) {
		if(param){
			if(param.miMargen)
				miMargen=param.miMargen;
			if(param.separZonas)
				separZonas=param.separZonas;
			if(param.tituloGraf)
				tituloGraf=param.tituloGraf;
			if(param.tituloEjeX)
				tituloEjeX=param.tituloEjeX;
			if(param.tituloEjeY)
				tituloEjeY=param.tituloEjeY;
			if(param.mysColores)
				mysColores=param.mysColores;
			if(param.anchoLinea)
				anchoLinea=param.anchoLinea;
		}
	}
	
	/**
	 * Establece los par&aacute;metros obligatorios para graficar
	 */
	function establecer_valores(vector,rotulo,legenda) {
		myVector = vector;
		myRotulo = rotulo;
		myLegenda = rotulo;
	}
	
	/**
	 * Dibuja el rect&aacute;ngulo interno donde se va a graficar,
	 * escribe el t&iacute;tulo del gr&aacute;fico, de los ejes y 
	 * coloca la imagen de fondo
	 * @param quien, id del canvas donde se va a dibujar
	 * @param x, ancho
	 * @param y, alto
	 */
	function rectangulo(quien,x,y) {
		var canvas = document.getElementById(quien);
	
		if (canvas.getContext) {
			var ctx = canvas.getContext('2d');
			if(!document.getElementById("myFondo"))
				console.log("No se encuentra imagen de fondo.");
			else//imagen de fondo
				ctx.drawImage(document.getElementById("myFondo"), ((1-miMargen)/2)*x, ((1-miMargen)/2)*y,miMargen*x,miMargen*y);
			ctx.strokeStyle = "rgba(190,190,190,1)";
			ctx.lineWidth = 0.5;
			ctx.strokeRect(((1-miMargen)/2)*x,((1-miMargen)/2)*y,miMargen*x,miMargen*y);
		}
		// escribir título del gráfico
		ctx.font = "10pt monospace";
		ctx.fillStyle = "rgba(150,150,150,1)";//sombrita
		//console.log("x es ",x," y el ancho es ",ctx.measureText(tituloGraf).width);
		if(x > ctx.measureText(tituloGraf).width)
			margenTexto = ( x - ctx.measureText(tituloGraf).width ) /2;
		else
			margenTexto = 0;
		ctx.fillText(tituloGraf, margenTexto+2, 0 + 14, x-2);
		ctx.fillStyle = "rgba(0,0,0,1)";
		ctx.fillText(tituloGraf, margenTexto+1, 0 + 15, x-2);
		
	
	
	}
	/**
	 * Arranca el porceso de graficar, es como un main
	 * @param quien, id del canvas donde se va a dibujar
	 * @param ancho
	 * @param alto
	 */
	function arrancaGraficar(quien,ancho,alto) {
		rectangulo(quien,ancho,alto); 
		elTotal = calcular_Total(myVector);
		calcular_y_dibujar_serie(quien,myVector,ancho,alto);
	
	}
	/**
	 * Dibuja las columnas, con sus correspondientes valores
	 * @param quien, id del canvas donde se va a dibujar
	 * @param myVector, array de los datos a graficar
	 * @param x, ancho
	 */
	function calcular_y_dibujar_serie(quien,myVector,x,y) {
		var canvas = document.getElementById(quien);
		var anguloInici = 0;
		var margenTexto2 = 0;
		var ajusteTextX = 0;
		var ajusteTextY = 0;
		var x0 = 0;
		var y0 = 0;
		var xi = 0;
		var yi = 0;
		var myValor = 0;
	 	if (canvas.getContext) 
			var ctx = canvas.getContext('2d');
	 	
		x0 = ((1-miMargen)/2)*x + miMargen*x * 0.5;
		y0 = ((1-miMargen)/2)*y + miMargen*y * 0.5;
	 	
		for (var i = 0; i < myVector.length; i++) {//i siempre es cero, lo dejo por costumbre
			for (var j = 0; j < myVector[i].length; j++) {
	
				ctx.beginPath();
			
				anguloFinal = anguloInici + myVector[i][j]/elTotal * 360 * Math.PI/180;
	
				var radGradiente = ctx.createRadialGradient(x0,y0, miMargen*y * 3*radioTorta/4,x0,y0,radioTorta);
				radGradiente.addColorStop(0   ,mysColores[j][0]);
				radGradiente.addColorStop(0.45,mysColores[j][1]);
				radGradiente.addColorStop(0.55,mysColores[j][1]);
				radGradiente.addColorStop(1   ,mysColores[j][0]);
	
				ctx.moveTo(x0, y0);
				ctx.strokeStyle = "rgba(190,190,190,1)";
				ctx.arc(x0,y0, miMargen*y * radioTorta, -anguloInici,  -anguloFinal ,1);
				
				ctx.fillStyle = radGradiente;
				ctx.fill();
				
				
				ctx.moveTo(x0, y0);
				//escribir los textos de los valores
				ctx.font = "8pt monospace";
				xi = Math.cos((-anguloFinal+anguloInici)/2 - anguloInici) * miMargen*y * radioTorta;
				yi = Math.sin((-anguloFinal+anguloInici)/2 - anguloInici) * miMargen*y * radioTorta;
				//console.log(xi+","+yi);
				myValor = Math.round(1000*myVector[i][j]/elTotal)/10;
				ajusteTextX = 10 *  Math.cos((-anguloFinal+anguloInici)/2 - anguloInici);
				ajusteTextY = 10 *  Math.sin((-anguloFinal+anguloInici)/2 - anguloInici);
				if(xi<0){
					ajusteTextX = ajusteTextX - ctx.measureText(myValor+"%").width;
				}
				if(yi>0){
					ajusteTextY = ajusteTextY + 10;//10 pixeles es el alto de la fuente
				}
				//console.log(ajusteTextX+","+ajusteTextY);
				ctx.fillStyle = "rgba(0,0,0,1)";
				ctx.fillText(myValor+"%", x0 + xi + ajusteTextX, y0 + yi + ajusteTextY);
				ctx.lineWidth = anchoLinea;
				//ctx.strokeStyle = mysColores[i][0];
	
				//ctx.fillRect( ((1-miMargen)/2)*x + margenTexto2, y-30, 12, 12);
				anguloInici = anguloFinal;
				
				//ctx.closePath();
				ctx.stroke();
				
	
				// escribir la leyenda
				if(j==0){
					margenTexto2 = 0;
				}else{
					margenTexto2 = margenTexto2 + ctx.measureText(myLegenda[j-1]).width + 30;
				}
				
				var linGradiente2 = ctx.createLinearGradient(((1-miMargen)/2)*x + margenTexto2,y-60, ((1-miMargen)/2)*x + margenTexto2 +12,y-60);
				linGradiente2.addColorStop(0   ,mysColores[j][0]);
				linGradiente2.addColorStop(0.45,mysColores[j][1]);
				linGradiente2.addColorStop(0.55,mysColores[j][1]);
				linGradiente2.addColorStop(1   ,mysColores[j][0]);
				ctx.fillStyle = linGradiente2;
				ctx.fillRect( ((1-miMargen)/2)*x + margenTexto2, y-30, 12, 12);
				
				ctx.font = "italic 8pt monospace";
				ctx.fillStyle = "rgba(0,0,0,1)";
				ctx.fillText(myLegenda[j], ((1-miMargen)/2)*x + margenTexto2 + 14 , y-20, y);
				
			}
		}
	}
	/**
	 * Suma todos los valores del vector
	 * @param myVector, array de los datos a graficar
	 * @param y, alto
	 * @returns {Number}
	 */
	function calcular_Total(myVector) {
		var total = 0;
		var agregar = 0;
		var max = 0;
		//en teoria i debería ser siempre cero
		for (var i = 0; i < myVector.length; i++) {
			for (var j = 0; j < myVector[i].length; j++) {
					total = total + myVector[i][j];
			}
		}
		return total;
	}

}