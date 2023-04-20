const search_icon = document.querySelector('.search__icon')
const search_input = document.querySelector('.search__input')
const container = document.querySelector(".search__container")
opened = false

search_icon.addEventListener('click', () =>{
	if( opened ){
		search_input.classList.remove('active')
		opened = false
		container.classList.remove('search__container--active')
		search_icon.classList.remove('search__icon--active')
	}
	else{
		search_input.classList.add('active')
		opened = true
		container.classList.add('search__container--active')
		search_icon.classList.add('search__icon--active')
	}
});
