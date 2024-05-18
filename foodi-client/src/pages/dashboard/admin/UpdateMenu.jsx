import React from 'react'
import { useLoaderData } from 'react-router-dom'

const UpdateMenu = () => {
    const item = useLoaderData();
    console.log(item);
    return (
        <div>UpdateMenu</div>
    )
}

export default UpdateMenu