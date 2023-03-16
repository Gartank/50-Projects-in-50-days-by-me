const progress = document.querySelector('.progressbar');
const circles = document.getElementsByClassName('circle');
const previous = document.getElementsByClassName('button')[0];
const next = document.getElementsByClassName('button')[1];

let actual_active = 0;
next.addEventListener('click', () => {
	
	if( actual_active != circles.length - 1 ){
		actual_active++
		circles[actual_active].classList.add('circle__active');
		progress.style.width = (actual_active / (circles.length - 1)) * 100 + '%';
		previous.classList.remove('button-disabled')
	}
	
	if(circles.length-1 == actual_active){
		container = document.querySelector(".container")
		container.style.boxShadow = "0px 0px 40px 20px var(--main), inset 0px 0px 10px 1px var(--main)"
		next.classList.add('button-disabled')
	}
});

previous.addEventListener('click', () => {
	
	if(circles.length-1 == actual_active){
		container = document.querySelector(".container")
		container.style.boxShadow = "0px 0px 40px 5px var(--back), inset 0px 0px 10px 1px var(--back)"
		next.classList.remove('button-disabled')
	}
	
	if( actual_active != 0 ){
		circles[actual_active].classList.remove("circle__active");
		actual_active--
		progress.style.width = (actual_active / (circles.length - 1)) * 100 + '%';
	}
	else{
		previous.classList.add('button-disabled')
	}
});