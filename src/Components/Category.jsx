import React, { use } from 'react';
const data = fetch('/categories.json')
.then(response=>response.json())
const Category = () => {
    const category = use(data);
    console.log(category)
    return (
        <div>
            {
                category.map(cat=><p>{cat.title}</p>)
            }
        </div>
    );
};

export default Category;