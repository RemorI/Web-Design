(function(){
	"use strict";

	var regalo = document.getElementById('regalo');

	document.addEventListener('DOMContentLoaded', function(){

		var map = L.map('map').setView([51.505, -0.09], 13);
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(map);
		L.marker([51.5, -0.09]).addTo(map)
    	.bindPopup('You can find us here.<br> :)')
    	.openPopup();
    

		//campos datos usuario
		var name = document.getElementById('name');
		var lastname = document.getElementById('lastname');
		var email = document.getElementById('email');

		//campos pases
		var pase_dia = document.getElementById('pase_dia');
		var pase_2dia = document.getElementById('pase_2dia');
		var pase_completo = document.getElementById('pase_completo');

		//Botones y div

		var calcular = document.getElementById('calcular');
		var errorDiv = document.getElementById('error');
		var botonRegistro = document.getElementById('btnRegistro');
		var lista_productos = document.getElementById('list-product');
		var suma = document.getElementById('suma-total');

		//Extras

		var etiquetas = document.getElementById('etiqueta_evento');
		var camisas = document.getElementById('camisa_evento');

		//AddEventListener

		if(document.getElementById('calcular')){

			calcular.addEventListener('click', calcularMontos);

			pase_dia.addEventListener('blur', mostrarDias);
			pase_2dia.addEventListener('blur', mostrarDias);
			pase_completo.addEventListener('blur', mostrarDias);

			name.addEventListener('blur', validarCampos);
			lastname.addEventListener('blur', validarCampos);
			email.addEventListener('blur', validarCampos);
			email.addEventListener('blur', validarMail);

			//funciones

			function validarMail(){
				if(this.value.indexOf('@') > -1){
					errorDiv.style.display = 'none';
					this.style.border = '1px solid #ccc';
				}
				else{
					errorDiv.style.display = 'block';
					errorDiv.innerHTML = "Ingresa un e-mail válido";
					this.style.border = '2px solid red';
					errorDiv.style.border = '1px solid red';
				}
			}
			
			function validarCampos(){
				if (this.value == '') {
					errorDiv.style.display = 'block';
					errorDiv.innerHTML = "Este campo es obligatorio";
					this.style.border = '2px solid red';
					errorDiv.style.border = '1px solid red';
				}
				else {
					errorDiv.style.display = 'none';
					this.style.border = '1px solid #ccc';
				}
			}



			function calcularMontos(event){
				event.preventDefault();
				if(regalo.value === ''){
					alert('Debes elegir un regalo');
					regalo.focus();
				}
				else{
					var boletoDia = parseInt(pase_dia.value, 10) || 0,
							boleto2Dias = parseInt(pase_2dia.value, 10) || 0,
							boletoCompleto = parseInt(pase_completo.value, 10) || 0,
							cantEtiquetas = parseInt(etiquetas.value, 10) || 0,
							cantCamisas = parseInt(camisas.value, 10) || 0;

					var totalPagar = (boletoDia * 30) + (boleto2Dias * 45) + (boletoCompleto * 50) + ((cantCamisas * 10) * 0.93) + (cantEtiquetas * 2);

					var listadoProductos = [];

					if(boletoDia >= 1){
						listadoProductos.push(boletoDia + ' Pases por día');
					}
					if(boleto2Dias >= 1){
						listadoProductos.push(boleto2Dias + ' Pases por dos días');
					}
					if(boletoCompleto >= 1){
						listadoProductos.push(boletoCompleto + ' Pases completo');
					}
					if(cantCamisas >= 1){
						listadoProductos.push(cantCamisas + ' Camisas');
					}
					if(cantEtiquetas >= 1){
						listadoProductos.push(cantEtiquetas + ' Etiquetas');
					}

					lista_productos.style.display = "block";
					lista_productos.innerHTML = '';
					for(var i = 0; i < listadoProductos.length; i++){
						lista_productos.innerHTML += listadoProductos[i] + '<br/>';
					}

					suma.innerHTML= '$ ' + totalPagar.toFixed(2);
				}
			}

			function mostrarDias(){
				var boletoDia = parseInt(pase_dia.value, 10) || 0,
							boleto2Dias = parseInt(pase_2dia.value, 10) || 0,
							boletoCompleto = parseInt(pase_completo.value, 10) || 0;
			
				var diasElegidos = [];

				if(boletoDia > 0){
					diasElegidos.push('viernes');
					console.log(diasElegidos);
				}
				if(boleto2Dias > 0){
					diasElegidos.push('viernes', 'sabado');
					console.log(diasElegidos);
				}
				if(boletoCompleto > 0){
					diasElegidos.push('viernes', 'sabado', 'domingo');
					console.log(diasElegidos);
				}
				for(var i = 0; i < diasElegidos.length; i++){
					document.getElementById(diasElegidos[i]).style.display = "block";
				}
			}
		}
	});// DOM CONTENT Loaded
})();

$(function(){

	//Lettering

	$('.site-name').lettering();

	//menu fijo

	var windowHeight = $(window).height();
	var barHeight = $('.bar').innerHeight();

	$(window).scroll(function(){
		var scroll = $(window).scrollTop();

		if(scroll > windowHeight){
			$('.bar').addClass('fixed');
			$('body').css({'margin-top': barHeight+'px'});
		}
		else{
			$('.bar').removeClass('fixed');
			$('body').css({'margin-top': '0px'});
		}
	});


	//Menu mobile responsive

	$('.menu-movil').on('click', function(){
		$('.main-nav').slideToggle();
	});

	//Programa de conferencias
	$('.program-event .info-curso:first').show();
	$('.menu-program a:first').addClass('activo');

	$('.menu-program a').on('click', function(){
		$('.menu-program a').removeClass('activo');
		$(this).addClass('activo');
		$('.ocultar').hide();
		var enlace = $(this).attr('href');
		$(enlace).fadeIn(650);
		console.log(enlace);

		return false;
	})

	//Animaciones de los numero
	//nth-child seleciona el elemento en abse a su número
	$('.resumen-event li:nth-child(1) p').animateNumber({number:6}, 1200);
	$('.resumen-event li:nth-child(2) p').animateNumber({number:15}, 1200);
	$('.resumen-event li:nth-child(3) p').animateNumber({number:3}, 1500);
	$('.resumen-event li:nth-child(4) p').animateNumber({number:9}, 1200);

	//Cuenta regresiva
	$('.regresive-count').countdown('2019/05/24 09:00:00', function(event){
		$('#days').html(event.strftime('%D'));
		$('#hours').html(event.strftime('%H'));
		$('#minutes').html(event.strftime('%M'));
		$('#seconds').html(event.strftime('%S'));
	});
});