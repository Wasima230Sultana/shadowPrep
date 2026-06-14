import React, { useEffect, useState } from 'react';
import { useLoaderData, useParams } from 'react-router';

const CategoryDetails = () => {
    const {id} = useParams();
    const data = useLoaderData();
    const [category,setCategory] = useState({})
    useEffect(()=>{
        const details = data.find(cat=>cat.id === id);
        setCategory(details);
    },[id,data])
    return (
        <div>
            
        </div>
    );
};

export default CategoryDetails;