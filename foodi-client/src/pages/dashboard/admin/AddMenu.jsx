import React from 'react'
import { GiForkKnifeSpoon } from "react-icons/gi";
import { useForm } from "react-hook-form"
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2'

const AddMenu = () => {
    const {
        register,
        handleSubmit,
        reset
    } = useForm()
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    // image hosting key 
    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KRY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
    const onSubmit = async (data) => {
        // console.log(data)
        const imageFile = { image: data.image[0] };
        const hostingImg = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        // console.log(hostingImg);
        if (hostingImg.data.success) {
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: hostingImg.data.data.display_url
            }
            // console.log(menuItem);
            const postMenuItem = axiosSecure.post('/menu', menuItem);
            // console.log("postmenu: ", (await postMenuItem).status);
            if ((await postMenuItem).status === 200) {
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your Item has is Inserted",
                    showConfirmButton: false,
                    timer: 1500
                });
            }


        }
    }

    return (
        <div className='w-full md:w-[870px] px-4 mx-auto'>
            <h2 className='text-2xl font-semibold my-4 text-white'>Upload A New <span className='text-green'>Menu Item</span></h2>

            {/* form here  */}
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Recipe Name*</span>
                        </div>
                        <input type="text"
                            {...register("name", { required: true })}
                            placeholder="Recipie Name" className="input input-bordered w-full" />
                    </div>

                    {/* 2nd row  */}
                    <div className='flex items-center gap-4'>
                        {/* categories  */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Choose Category*</span>
                            </label>
                            <select
                                {...register("category", { required: true })}
                                className="select select-bordered" defaultValue='default'>
                                <option disabled value='default'>Select a Category</option>
                                <option value='salad'>Salad</option>
                                <option value='pizza'>Pizza</option>
                                <option value="soup">Soup</option>
                                <option value='dessert'>Dessert</option>
                                <option value='drinks'>Drinks</option>
                                <option value='popular'>Popular</option>
                            </select>
                        </div>

                        {/* price field  */}
                        <div className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Price*</span>
                            </div>
                            <input type="number"
                                {...register("price", { required: true })}
                                placeholder="Price" className="input input-bordered w-full" />
                        </div>
                    </div>

                    {/* 3rd row  */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Recipe Details*</span>
                        </label>
                        <textarea
                            {...register("recipe", { required: true })}
                            className="textarea textarea-bordered h-24" placeholder="Tell something about your recipe...."></textarea>
                    </div>

                    {/* 4th row  */}
                    <div className="form-control w-ful my-6">
                        <input
                            {...register("image", { required: true })}
                            type="file" className="file-input file-input-bordered file-input-success w-full max-w-xs" />
                    </div>

                    <button type='submit' className='bg-green btn text-white'>
                        <GiForkKnifeSpoon /> Add Item
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddMenu;