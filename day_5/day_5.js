let load_num = document.querySelector(".porcentaje ")
let background_blur = document.querySelector(".fondo")

load = 0;

let interval = setInterval(blurring, 3)

function blurring() {

	load_num.innertext = `${load}%`;
	background_blur.style.filter = `blur(${(100 - load)}px)`;
	load++
	if( load > 99){
		clearInterval(interval)
	}
}