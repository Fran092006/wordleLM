let letras = [];
let letrasAdivinadas = 0;
let intentosRestantes = 5;
let letrasUsadas = new Set(); // Set que guarda las letras usadas para evitar que se introduzca una misma letra varias veces

function bucles() {

	document.getElementById("letra").removeAttribute("disabled");
	document.getElementById("palabra").setAttribute("disabled", "true");


	const informacion = document.getElementById("palabra").value;
	const cuadradosContainer = document.getElementById("cuadrados");
	cuadradosContainer.innerHTML = "";

	for (let i = 0; i < informacion.length; i++) {
		const cuadrado = document.createElement("div");

		cuadrado.style.width = "30px";
		cuadrado.style.height = "30px";
		cuadrado.style.backgroundColor = "grey";
		cuadrado.style.margin = "10px";
		cuadrado.style.display = "inline-block";
		cuadrado.setAttribute("id", `cuadrado-${i}`); // Asignar un id único a cada cuadrado

		cuadradosContainer.appendChild(cuadrado);
	}

	return false;
}

function comprobarLetra() {
	const letraIntroducida = document.getElementById("letra").value.toLowerCase();
	const palabra = document.getElementById("palabra").value.toLowerCase();
	const tabla = document.getElementById("tablas");
	const cuadrados = document.querySelectorAll("#cuadrados div");


	if (!isNaN(letraIntroducida)) {

		alert("No se permiten números solo letras");
		return false;
	} else {

		// Verificar si la letra ya ha sido usada
		if (letrasUsadas.has(letraIntroducida)) {
			alert("Ya has usado esta letra. Intenta con otra.");
			letraInput.value = "";
			return;
		}
		letrasUsadas.add(letraIntroducida);

		let letraEncontrada = false;

		// Comprobar si la letra está en la palabra
		palabra.split('').forEach((letra, index) => {
			if (letra === letraIntroducida) {
				const cuadrado = cuadrados[index];
				const letraDiv = document.createElement("div");

				letraDiv.style.width = "30px";
				letraDiv.style.height = "30px";
				letraDiv.style.backgroundColor = "lightgreen";
				letraDiv.style.margin = "10px";
				letraDiv.style.display = "inline-block";
				letraDiv.style.alignItems = "center";
				letraDiv.textContent = letra;

				cuadrado.replaceWith(letraDiv);

				letraEncontrada = true;
				letrasAdivinadas++;
			}
		});


		if (letraEncontrada) {
			alert("Letra encontrada");
		} else {
			alert("Letra no encontrada");
			intentosRestantes--;
		}

		// Añadir letra a la tabla
		const fila = document.createElement("tr");
		let fechaActual = new Date();
		let horaActual = fechaActual.toLocaleTimeString();
		fila.innerHTML = `
        <td>${letraIntroducida}</td>
        <td>${horaActual}</td>
    `;
		tabla.appendChild(fila);

		// Comprobar condiciones de victoria o derrota
		if (letrasAdivinadas === palabra.length) {
			alert("¡Has ganado el juego!");
			document.getElementById("letra").setAttribute("disabled", "true");
		} else if (intentosRestantes <= 0) {
			alert("¡Has perdido! Te has quedado sin intentos.");
			document.getElementById("letra").setAttribute("disabled", "true");
		}


		const textoIntentosRestantes = document.getElementById("intentos")

		textoIntentosRestantes.innerHTML = `Intentos restantes: ${intentosRestantes}`;
	}
}


