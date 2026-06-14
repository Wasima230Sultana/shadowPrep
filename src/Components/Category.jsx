import React, { use } from 'react';
import Categories from './Categories';
const data = fetch('/categories.json')
.then(response=>response.json())
const Category = () => {
    const category = use(data);
    console.log(category)
    return (
        <div className='bg-gradient-to-b from-[#0f172a] via-[#111827] to-[#0f172a] text-white py-2 px-4 border-t border-white/10'>
            <h2 className="font-bold text-3xl text-center my-4 ">Popular Interview Categories</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-6'>
                 {
                category.map(cat=><Categories 
                    key={cat.id}
                    cat={cat}
                    ></Categories>)
            }
            </div>
           
        </div>
    );
};

export default Category;