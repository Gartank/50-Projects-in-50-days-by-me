import categoryData from '../data.js';

const Category = ( { categoryName } ) => {
    return (
        <div className='navbar-category' id={categoryName}>
            {/* icon */}
        </div>
    )
}

function Sidebar () {
    const categories = categoryData.map(element => 
        <Category categoryName={element}/> );
    return (
        <nav className="navbar">
            {categories}
        </nav>
    )
}

export default Sidebar;