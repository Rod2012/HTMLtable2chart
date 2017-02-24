# HTMLtable2chart

Version: 0.1.0

HTMLtable2chart es una librería escrita en javascript para hacer un gráfico en un elemento canvas de HTML5 a partir de una tabla HTML

Fue creada para sustituir algunos gráficos que habían sido hechos con la librería de PHP JpGraph.


## Prerequisitos
Como esta librería se ejecutará en un navegador de un cliente, dependerá principalmente de si la versión del navegador implenta la etiqueta `<canvas>`

## Que trae
```
HTMLtable2chart/
├── doc/
│   └──examples/
│      ├──en/
│      └──es/
│         ├── columnas.html
│         ├── lineas.html
│         └── tortas.html    
├── img/
│   ├── bandera.png
│   ├── barras.png
│   ├── 
│   └── 
├── js/
│   └──HTMLtable2chart/
│       ├── graficarBarras.js
│       ├── graficarTortas.js
│       ├── graficarXY.js
│       └── tabla2array.js
├── readme.html
├── README_es.md
└── README.md
```

## Cómo lo uso
Si tienes una tabla HTML como esta:

  -  | Canada|USA|Mexico|Venezuela|
----   |----| ---|----|----|
Hombres|1685| 734| 278|1582|
Mujeres|1521| 509| 210|1344|

Creada con el siguiente código **html** 

```html
<table id="myTable">
	<thead>
		<tr>
			<th></th>
			<th>Canada</th>
			<th>USA</th>
			<th>Mexico</th>
			<th>Venezuela</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Hombres</td>
			<td>1685</td>
			<td>734</td>
			<td>278</td>
			<td>1582</td>
		</tr>
		<tr>
			<td>Mujeres</td>
			<td>1521</td>
			<td>509</td>
			<td>210</td>
			<td>1344</td>
		</tr>			
	</tbody>
</table>
```
Descarga este paquete y colócalo los archivos `.js` en la ruta apropiada en tu proyecto, luego agrega dentro del elemento `<head>` en tu documento las siguientes etiquetas de script, como lo has hecho anteriormente con cualquier otra librería javascript

```html
<script type="text/javascript" src="js/HTMLtable2chart/graficarTortas.js"></script>
<script type="text/javascript" src="js/HTMLtable2chart/tabla2array.js"></script>
```
Agrega un elemento canvas en el lugar donde quieres que el gráfico esté.

```html
<canvas id="grafico2" width="750" height="480" style="border: 1px solid black;">Canvas no est&aacute; soportado</canvas>
```
Y por último, agrega al final del documento el siguiente código para establecer algunos parámetros y llamar a la función que genera el gráfico

```js
<script type="text/javascript">
	var misParam ={
		miMargen : 0.80,
		separZonas : 0.05,
		tituloGraf : "Title of Chart",
		tituloEjeX : "X axis title",
		tituloEjeY : "Y Axis title",
		nLineasDiv : 10,
		mysColores :[
			            ["rgba(93,18,18,1)","rgba(196,19,24,1)"],  //red
			            ["rgba(171,115,51,1)","rgba(251,163,1,1)"], //yellow
		            ],
		anchoLinea : 2,
	};
	
	obtener_datos_tabla_convertir_en_array('myTable',graficarBarras,'grafico2','750','480',misParam,false);
</script>
```

Luego tendrás:
[![ColChart](img/barras.png)](img/barras.png)

Eso es todo.

## Qué tipo de gráficos están disponibles

En esta versión podrás encontrar:

* Columnas
* Tortas
* Lineal (XY)



## Autores
- Rodney Salcedo @Rod2012

Vea el plural, otros contribuyentes son bienvenidos...


## Licencia
Este software se libera bajo la licencia GNU Affero General Public License [AGPLv3](https://www.gnu.org/licenses/agpl-3.0.html)

## Agradecimientos
* PHP JpGraph library, ahora propiedad de Asial Corporation
