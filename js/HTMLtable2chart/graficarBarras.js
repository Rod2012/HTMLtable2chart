/**
 * Script para hacer gr&aacute;ficos de barras, hecho para 
 * sustituir a JPGraph
 * @author rsalcedo
 */
function graficarBarras(quien,ancho,alto,vector,rotulo,legenda,myParam) {
	///////////////Parámetros a cambiar, variables globales
	var miMargen = 0.70;//80%
	var separZonas = 0.05;//5%
	var elMaxY = 0;
	var tituloGraf = "Ejecutado Vs Esperado";
	var tituloEjeX = "Complejo";
	var tituloEjeY = "Fuerza Labor";
	var nLineasDiv = 10;
	var mysColores =[
	                 ["rgba(171,115,51,1)","rgba(251,163,1,1)"],//amarillos
	                 ["rgba(93,18,18,1)","rgba(196,19,24,1)"],//,   //rojos
	                 ["rgba(37,94,43,1)","rgba(18,152,30,1)"], //verdes
	                 ["rgba(0,10,93,1)","rgba(0,0,247,1)"], //azules
	                 ["rgba(93,93,93,1)","rgba(150,150,150,1)"], //grises
	                ];
	var myVector=[
	              //[1685,734,278,1582],[1521,509,210,1344]//,[1521,509,210,1344]
	             ];
	var myRotulo=[
	              //"AMC", "Corporativo", "Jose", "Morón"
	             ];
	var myLegenda=[
	               //"Esperado","Ejecutado"//,"Calculado"
	              ];
	
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
		}
	}
	/**
	 * Establece los par&aacute;metros a graficar
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
		if(x > ctx.measureText(tituloGraf).width)
			margenTexto = ( x - ctx.measureText(tituloGraf).width ) /2;
		else
			margenTexto = 0;
		ctx.fillText(tituloGraf, margenTexto+2, 0 + 14, x-2);
		ctx.fillStyle = "rgba(0,0,0,1)";
		ctx.fillText(tituloGraf, margenTexto+1, 0 + 15, x-2);
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
			elMaxY = calcular_max(myVector,alto);
			calcular_y_dibujar_lineas_div_vert_y_escala(quien,elMaxY,ancho,alto);
			calcular_y_dibujar_serie(quien,myVector,zonas,ancho,alto,myRotulo);
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
	function calcular_y_dibujar_serie(quien,myVector,zonas,x,y,myRotulo) {
		var separacion = separZonas*miMargen*x;
		var canvas = document.getElementById(quien);
		var anchoZona = ( miMargen*x  ) / zonas;
		var anchoBarra = (anchoZona - separacion) / myVector.length ;
		if(anchoBarra < 0) {
			alert("Cambie el margen y la separaci\u00F3n, el gr\u00E1fico no tiene espacio para mostrarse");
			throw "El ancho de la barra es negativo, cambie el margen y la separación";
		}
	 	if (canvas.getContext) 
			var ctx = canvas.getContext('2d');
	 	
		for (var i = 0; i < myVector.length; i++) {
			for (var j = 0; j < myVector[i].length; j++) {
				altoBarra = myVector[i][j] / elMaxY;
				//otra forma
	
				ctx.beginPath();
	
				xi = ((1-miMargen)/2)*x + separacion/2 + anchoZona*j + anchoBarra*i;
				yi = ((1-miMargen)/2)*y + miMargen*y;
				ctx.moveTo(xi              , yi);
				ctx.lineTo(xi + anchoBarra , yi);
				ctx.lineTo(xi + anchoBarra , yi - altoBarra*miMargen*y);
				ctx.lineTo(xi              , yi - altoBarra*miMargen*y);
				
				//escribir los textos de los valores
				ctx.font = "8pt monospace";
				ctx.fillStyle = "rgba(0,0,0,1)";
				margenTexto = (anchoBarra - ctx.measureText(myVector[i][j]).width)/2;
				ctx.fillText(myVector[i][j], xi + margenTexto, yi - altoBarra*miMargen*y - 2, anchoBarra);
				//escribiendo los rótulos de categorias
				if(i==0){//sóĺo una vez
					margenTexto = (anchoBarra*myVector.length - ctx.measureText(myRotulo[j]).width)/2;
					ctx.fillText(myRotulo[j], xi + margenTexto, yi + 14, anchoZona);	
				}
	
				//pintura
				if(i==0){
					ctx.strokeStyle = "rgba(225,165,0,1)";
				}else{
					ctx.strokeStyle = "rgba(200,20,25,1)";
				}
				
				var linGradiente = ctx.createLinearGradient(xi,yi,xi + anchoBarra,yi);
				linGradiente.addColorStop(0   ,mysColores[i][0]);
				linGradiente.addColorStop(0.45,mysColores[i][1]);
				linGradiente.addColorStop(0.55,mysColores[i][1]);
				linGradiente.addColorStop(1   ,mysColores[i][0]);
				
				ctx.closePath();
				ctx.stroke();
				
				ctx.fillStyle = linGradiente;
				ctx.fillRect(xi,yi,anchoBarra,-altoBarra*miMargen*y);
				ctx.strokeRect(xi,yi,anchoBarra,-altoBarra*miMargen*y);
				
			}
			
			// escribir la leyenda
			if(myLegenda[i]!='.'){//escribir un . evita la escritura de la leyenda
				if(i==0){
					margenTexto2 = 0;
				}else{
					margenTexto2 = margenTexto2 + ctx.measureText(myLegenda[i-1]).width + 30;
				}
				var linGradiente2 = ctx.createLinearGradient(((1-miMargen)/2)*x + margenTexto2,y-60, ((1-miMargen)/2)*x + margenTexto2 +12,y-60);
				linGradiente2.addColorStop(0   ,mysColores[i][0]);
				linGradiente2.addColorStop(0.45,mysColores[i][1]);
				linGradiente2.addColorStop(0.55,mysColores[i][1]);
				linGradiente2.addColorStop(1   ,mysColores[i][0]);
				ctx.fillStyle = linGradiente2;
				ctx.fillRect( ((1-miMargen)/2)*x + margenTexto2, y-30, 12, 12);//y-30=((1-miMargen)/2)*y + miMargen*y + 18
				
				ctx.font = "italic 8pt monospace";
				ctx.fillStyle = "rgba(0,0,0,1)";
				ctx.fillText(myLegenda[i], ((1-miMargen)/2)*x + margenTexto2 + 14 , y-20, y);
			}
		}
	}
	/**
	 * 
	 * @param myVector, array de los datos a graficar
	 * @param y, alto
	 * @returns {Number}
	 */
	function calcular_max(myVector,y) {
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
	 	if (canvas.getContext) 
			var ctx = canvas.getContext('2d');
		if(nLineasDiv != 0)
			intervaloEjeY = max / nLineasDiv;
	
		for (var n = 0; n <= nLineasDiv; n++) {
			//console.log(intervaloEjeY*n/max)
			ctx.beginPath();
			ctx.strokeStyle = "rgba(190,190,190,1)";
			ctx.moveTo( ((1-miMargen)/2)*x - 4          , ((1-miMargen)/2)*y + miMargen*y - (intervaloEjeY*n/max)*miMargen*y);
			ctx.lineTo( ((1-miMargen)/2)*x + miMargen*x , ((1-miMargen)/2)*y + miMargen*y - (intervaloEjeY*n/max)*miMargen*y);
			ctx.closePath();
			ctx.stroke();
			//escribir los textos de los valores de las lineas de división del eje Y
			ctx.font = "8pt monospace";
			ctx.fillStyle = "rgba(0,0,0,1)";
			margenTexto =  ctx.measureText(intervaloEjeY*n).width + 2 ;
			ctx.fillText(intervaloEjeY*n, ((1-miMargen)/2)*x - 5  - margenTexto, ((1-miMargen)/2)*y + miMargen*y - (intervaloEjeY*n/max)*miMargen*y + 3) ;
		}
	}

}