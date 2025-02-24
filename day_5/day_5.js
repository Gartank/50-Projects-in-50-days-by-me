let load_num = document.querySelector(".porcentaje ")
let background_blur = document.querySelector(".fondo")

load = 0;

let interval = setInterval(blurring, 30)

function blurring() {
	load++

	load_num.innerText = `${load}%`;
	load_num.style.opacity = `${(100 - load)}%`
	background_blur.style.filter = `blur(${(100 - load)}px)`;
	if( load > 99){
		clearInterval(interval)
	}
}