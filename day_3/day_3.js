const circle = document.querySelector(".head")
const menu_icon = document.querySelector('#menu')
const close_icon = document.querySelector('#close')
const main = document.querySelector(".main")

let deg = -70
menu_icon.addEventListener('click', () =>{

	circle.style.transform = 'rotate('+ deg+'deg)'
	if( deg == -70){
		deg = 0
	}
	else{
		deg = -70
	}
	circle.style.position = "absolute"
	rotatemain()
	document.querySelector('.menu__list').classList.add('menu__list--active')
});

close_icon.addEventListener('click', () =>{

	document.querySelector('.menu__list').classList.remove('menu__list--active')
	circle.style.transform = 'rotate('+ deg+'deg)'
	if( deg == -70){
		deg = 0
	}
	else{
		deg = -70
	}
	circle.style.position = "fixed"
	rotatemain()
});

function rotatemain(){	
	let main_deg = 0
	
	if ( deg != -70 ){
		main_deg = -30
	}
	main.style.transform = 'rotate('+ main_deg +'deg)'
}