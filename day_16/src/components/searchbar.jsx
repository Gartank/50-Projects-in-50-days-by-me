
const InputSearchbar = ( ) => {
    function handleClick (e) {
        e.target.className = ("searchBar--active");
    }
    return (
        <input className="searchBar" type="text" onFocus={handleClick} onBlur={handleClick}/>
    )
}

const ButtonSearchbar = () => {
    return (
        <button className="searchbar-button">search</button>
    )
}

function Searchbar({ api }){
    // states
        

    return (
        <div className="searchbar--container">
            <InputSearchbar />
            <ButtonSearchbar/>
        </div>
    )
}

export default Searchbar;