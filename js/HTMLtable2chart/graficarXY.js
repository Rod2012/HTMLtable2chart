/**
 * Script para hacer gr&aacute;ficos de dispersi&oacute;n, de
 * lineas con datos en el eje X e Y, hecho para sustituir a JPGraph
 * @author rsalcedo
 */
function graficarXY(quien,ancho,alto,vector,rotulo,legenda,myParam) {
	///////////////Parámetros a cambiar, variables globales
	var miMargen = 0.80;//80%
	var separZonas = 0.05;//5%
	var tituloGraf = "Ejecutado Vs Esperado";
	var tituloEjeX = "Complejo";
	var tituloEjeY = "Fuerza Labor";
	var nLineasDiv = 10;
	var mysColores =[
	                 ["rgba(255,255,255,0)","rgba(255,255,255,0)"],//blancos //eje X
	                 ["rgba(93,18,18,1)","rgba(196,19,24,1)"],  //rojos
	                 ["rgba(171,115,51,1)","rgba(251,163,1,1)"], //amarillos
	                 ["rgba(0,10,93,1)","rgba(0,15,150,1)"], //azules

	                 ["rgba(93,200,80,1)","rgba(196,255,24,1)"], //verdes
	                 ["rgba(93,93,93,1)","rgba(150,150,150,1)"] //grises
	                ];
	var myVector=[
	              [ 0, 1, 2, 3, 4, 5],//eje X
	              [ 1, 2, 3, 4, 5, 6],
	              [ 2, 3, 6,11,18,27],
	              [15,12,10, 9, 8, 3]
	             ];
	var myLegenda=[
	               "","Esperado","Ejecutado","Calculado"
	              ];
	var anchoLinea = 3;
	var impEtiqDatX=false;
	//Modificados por el programa, no importa que valor se coloca aquí
	var elMaxY = 0;
	var elMaxX = 0;
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
			if(param.nLineasDiv)
				nLineasDiv=param.nLineasDiv;
			if(param.impEtiqDatX)
				impEtiqDatX=param.impEtiqDatX;
		}
	}
	/**
	 * Establece los par&aacute;metros obligatorios para graficar
	 */
	function establecer_valores(vector,rotulo,legenda) {
		myVector = vector;
		myRotulo = rotulo;
		myLegenda = legenda;
		
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
		margenTexto = ( x - ctx.measureText(tituloGraf).width ) /2;
		ctx.fillText(tituloGraf, margenTexto+1, 0 + 14, y);
		ctx.fillStyle = "rgba(0,0,0,1)";
		ctx.fillText(tituloGraf, margenTexto, 0 + 15, y);
		// escribir título del eje x
		ctx.font = "bold 10pt monospace";
		ctx.fillStyle = "rgba(0,0,0,1)";
		margenTexto = x - ctx.measureText(tituloEjeX).width - 2;
		ctx.fillText(tituloEjeX, margenTexto, ((1-miMargen)/2)*y + miMargen*y + 30, y);
		// escribir título del eje Y
		ctx.save();
		ctx.translate(10, y/2);
		ctx.rotate(3*(Math.PI/180)*90);
		ctx.font = "bold 10pt monospace";
		ctx.fillStyle = "rgba(0,0,0,1)";
		margenTexto = y - ctx.measureText(tituloEjeY).width - 2;
		ctx.fillText(tituloEjeY, 0, 10 );
		ctx.restore();
	}
	/**
	 * Arranca el porceso de graficar, es como un main
	 * @param quien, id del canvas donde se va a dibujar
	 * @param ancho
	 * @param alto
	 */
	function arrancaGraficar(quien,ancho,alto) {
		try {
			rectangulo(quien,ancho,alto); 
			zonas = calcular_zonas(myVector);
			if(zonas==0) {
				alert("Inconsistencia en los datos de entrada!\nLos Vectores no son del mismo tama\u00F1o");
				throw "Los Vectores no son del mismo tamaño";
			}
			elMaxY = calcular_maxY(myVector,alto);
			elMaxX = calcular_maxX(myVector,ancho);
			calcular_y_dibujar_lineas_div_vert_y_escala(quien,elMaxY,ancho,alto);
			calcular_y_dibujar_serie(quien,myVector,zonas,ancho,alto);
			calcular_y_dibujar_lineas_div_hori_y_escala(quien,elMaxX,ancho,alto);
		} catch (e) {
			console.log("Algo salió mal: "+e.message);
		}

	
	}
	/**
	 * Calcula las zonas para graficar, deben ser consistentes con
	 * los datos a graficar
	 * @param myVector, array de los datos a graficar
	 * @returns {Number}
	 */
	function calcular_zonas(myVector) {
		var long=0;
		for (var i = 0; i < myVector.length; i++) {
			long=myVector[i].length;
			if (i>0 && myVector[i].length!=myVector[i-1].length) {
				long=0;
				break;
			}
		}
		return long;
	}
	/**
	 * Dibuja las columnas, con sus correspondientes valores
	 * @param quien, id del canvas donde se va a dibujar
	 * @param myVector, array de los datos a graficar
	 * @param zonas
	 * @param x, ancho
	 * @param y, alto
	 * @param myRotulo, array con el nombre de las categorías 
	 */
	function calcular_y_dibujar_serie(quien,myVector,zonas,x,y) {
		var separacion = separZonas*miMargen*x;
		var canvas = document.getElementById(quien);
		var anchoZona = ( miMargen*x  ) / zonas;
		var anchoBarra = (anchoZona - separacion) / myVector.length ;
		var margenTexto2 = 0;
	 	if (canvas.getContext) 
			var ctx = canvas.getContext('2d');
	 	
		for (var i = 1; i < myVector.length; i++) {
			for (var j = 0; j < myVector[i].length; j++) {
	
				ctx.beginPath();
	
				xi = ((1-miMargen)/2)*x + miMargen*x * myVector[0][j]/elMaxX;
				yi = ((1-miMargen)/2)*y + miMargen*y - miMargen*y * myVector[i][j]/elMaxY;
				
				if(j!=0){
					xi_1 = ((1-miMargen)/2)*x + miMargen*x * myVector[0][j-1]/elMaxX;
					yi_1 = ((1-miMargen)/2)*y + miMargen*y - miMargen*y * myVector[i][j-1]/elMaxY;
					
					ctx.moveTo(xi_1 , yi_1);
					ctx.lineTo(xi   , yi);
				}
				//el punto
				ctx.fillStyle = mysColores[i][1];
				ctx.fillRect( xi-anchoLinea-1, yi-anchoLinea-1, 2*anchoLinea+2, 2*anchoLinea+2);
				
				//escribir los textos de los valores
				ctx.font = "8pt monospace";
				ctx.fillStyle = "rgba(0,0,0,1)";
				margenTexto = (anchoBarra - ctx.measureText(myVector[i][j]).width)/2;
				//ctx.fillText(myVector[i][j], xi + margenTexto, yi - altoBarra*miMargen*y - 2, anchoBarra);
	
				ctx.lineWidth = anchoLinea;
				//pintura
				ctx.strokeStyle = mysColores[i][0];
	
				ctx.closePath();
				ctx.stroke();
				
	
				
			}
			
			// escribir la leyenda
			if(i==0){
				margenTexto2 = 0;
			}else{
				margenTexto2 = margenTexto2 + ctx.measureText(myLegenda[i-1]).width + 30;
			}
			//console.log(margenTexto2);
			
			/**/
			var linGradiente2 = ctx.createLinearGradient(((1-miMargen)/2)*x + margenTexto2,y-60, ((1-miMargen)/2)*x + margenTexto2 +12,y-60);
			linGradiente2.addColorStop(0   ,mysColores[i][0]);
			linGradiente2.addColorStop(0.45,mysColores[i][1]);
			linGradiente2.addColorStop(0.55,mysColores[i][1]);
			linGradiente2.addColorStop(1   ,mysColores[i][0]);
			ctx.fillStyle = linGradiente2;
			ctx.fillRect( ((1-miMargen)/2)*x + margenTexto2, y-24, 12, 12);//y-30=((1-miMargen)/2)*y + miMargen*y + 18
			
			ctx.font = "italic 8pt monospace";
			ctx.fillStyle = "rgba(0,0,0,1)";
			ctx.fillText(myLegenda[i], ((1-miMargen)/2)*x + margenTexto2 + 14 , y-14, y);
			
		}
	}
	/**
	 * 
	 * @param myVector, array de los datos a graficar
	 * @param y, alto
	 * @returns {Number}
	 */
	function calcular_maxY(myVector,y) {
		var mayor = 0;
		var agregar = 0;
		var max = 0;
		for (var i = 0; i < myVector.length; i++) {
			for (var j = 0; j < myVector[i].length; j++) {
				if (myVector[i][j] > mayor) {
					mayor = myVector[i][j];
				}
			}
		}
	
		max = mayor*(1+15/(miMargen*y));//1.0385;
		agregar = 10 - ( max - Math.floor(max/10)*10 );
		max = max + agregar;// 15 es el alto de la fuente
		//console.log(max)
		return max;
	}
	/**
	 * 
	 * @param myVector, array de los datos a graficar
	 * @param y, alto
	 * @returns {Number}
	 */
	function calcular_maxX(myVector,x) {
		var mayor = 0;
		var agregar = 0;
		var max = 0;
	
		for (var j = 0; j < myVector[0].length; j++) {
			if (myVector[0][j] > mayor) {
				mayor = myVector[0][j];
			}
		}
		max = Math.floor(mayor);
		agregar = 1;
		max = max + agregar;// 15 es el alto de la fuente
		//console.log(max)
		return max;
	}
	/**
	 * Dibuja las lineas de divisi&oacute;n verticales, que realmente 
	 * son lineas horizontales, y los valores de la escala
	 * @param quien, id del canvas donde se va a dibujar
	 * @param max, el máximo valor a graficar
	 * @param x, ancho
	 * @param y, alto
	 */
	function calcular_y_dibujar_lineas_div_vert_y_escala(quien,max,x,y) {
		var intervaloEjeY = 0;
		var canvas = document.getElementById(quien);
		var nLineasDivX = 0;
		var miTextY = 0;
	 	if (canvas.getContext) 
			var ctx = canvas.getContext('2d');
		if(nLineasDiv != 0)
			intervaloEjeY = max / nLineasDiv;
	
		for (var n = 0; n <= nLineasDiv; n++) {
			//console.log(miTextY/max)
			miTextY = Math.round(intervaloEjeY*n*10)/10;
			ctx.beginPath();
			ctx.strokeStyle = "rgba(190,190,190,1)";
			ctx.moveTo( ((1-miMargen)/2)*x - 4          , ((1-miMargen)/2)*y + miMargen*y - (miTextY/max)*miMargen*y);
			ctx.lineTo( ((1-miMargen)/2)*x + miMargen*x , ((1-miMargen)/2)*y + miMargen*y - (miTextY/max)*miMargen*y);
			ctx.closePath();
			ctx.stroke();
			//escribir los textos de los valores de las lineas de división del eje Y
			ctx.font = "8pt monospace";
			ctx.fillStyle = "rgba(0,0,0,1)";
			margenTexto =  ctx.measureText(miTextY).width + 2 ;
			ctx.fillText(miTextY, ((1-miMargen)/2)*x - 5  - margenTexto, ((1-miMargen)/2)*y + miMargen*y - (miTextY/max)*miMargen*y + 3) ;
			
		}
	}
	
	/**
	 * Dibuja las lineas de divisi&oacute;n horizontales, que realmente 
	 * son lineas verticales, y los valores de la escala
	 * @param quien, id del canvas donde se va a dibujar
	 * @param max, el máximo valor a graficar
	 * @param x, ancho
	 * @param y, alto
	 */
	function calcular_y_dibujar_lineas_div_hori_y_escala(quien,max,x,y) {
		var intervaloEjeX = 0;
		var canvas = document.getElementById(quien);
		var x0=0;
		var y0=0;
		var xMax=0;
		var yMax=0;
		var miTextX = 0;
		var miTextXX="";
	 	if (canvas.getContext)
			var ctx = canvas.getContext('2d');
		if(nLineasDiv != 0)
			intervaloEjeX = max / nLineasDiv;
	
		//el origen
		//ctx.strokeRect(((1-miMargen)/2)*x,((1-miMargen)/2)*y,miMargen*x,miMargen*y);
		xAncho = miMargen*x;
		yAncho = miMargen*y;
		x0 = ((1-miMargen)/2)*x;
		y0 = ((1-miMargen)/2)*y + yAncho;

		for (var n = 0; n <= nLineasDiv; n++) {
			//console.log(intervaloEjeX*n/max)
			miTextX = Math.round(intervaloEjeX*n*10)/10;
			ctx.beginPath();
			ctx.strokeStyle = "rgba(190,190,190,1)";
			ctx.moveTo( x0  + (miTextX/max)*xAncho, y0 + 4 );
			ctx.lineTo( x0  + (miTextX/max)*xAncho, y0 - yAncho);
			ctx.closePath();
			ctx.stroke();
			//escribir los textos de los valores de las lineas de división del eje X
			ctx.font = "8pt monospace";
			ctx.fillStyle = "rgba(0,0,0,1)";
			if(n>0)
				miTextXX=myRotulo[n-1];
			else
				miTextXX="";
			if(miTextXX==undefined)
				miTextXX="";
			if(impEtiqDatX){
				margenTexto = ctx.measureText(miTextXX).width + 2;
				ctx.fillText(miTextXX, x0  + (miTextX/max)*xAncho - margenTexto/2, y0 + 14) ;
			}else{
				margenTexto = ctx.measureText(miTextX).width + 2;
				ctx.fillText(miTextX, x0  + (miTextX/max)*xAncho - margenTexto/2, y0 + 14) ;
			}
			console.log("texto: "+miTextXX);
			//si quiere saber donde está el origen, descomente la linea siguiente
			//ctx.fillText(":", x0  , y0 ) ;
		}
	}
}