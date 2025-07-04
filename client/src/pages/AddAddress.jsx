import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

// Input Field Component
const InputField = ({ type, placeholder, name, handleChange, address })=>(
    <input className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-[#3f1f0a]  transition'
    type={type}
    placeholder={placeholder}
    onChange={handleChange}
    name={name}
    value={address[name]}
    required
     />
)

const AddAddress = () => {

    const {axios, user, navigate} = useAppContext();

    const [address, setAddress] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: '',
    })

    const handleChange = (e)=>{
        const { name, value } = e.target;

        setAddress((prevAddress)=>({
            ...prevAddress,
            [name]: value,
        }))
        console.log(address);
        
    }



    const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!user) {
        // 👤 Guest User: store address in localStorage or context
        localStorage.setItem('guestAddress', JSON.stringify(address));
        toast.success("Guest address saved.");
        navigate('/cart'); // or wherever the guest should go next
        return;
    }

    // 🔐 Logged-in User: save to backend
    try {
        const { data } = await axios.post('/api/address/add', { address });

        if (data.success) {
            toast.success(data.message);
            navigate('/cart');
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        toast.error(error.response?.data?.message || error.message);
    }
};


  
  return (
     <div class="mx-auto max-w-7xl">
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 py-15'>
    <div className='mt-16 pb-16'>
      <p className='text-2xl md:text-3xl text-gray-500'>Add Shipping <span className='font-semibold text-[#3f1f0a] '>Address</span></p>
      <div className='flex flex-col-reverse md:flex-row justify-between mt-10'>
            <div className='flex-1 max-w-md'>
             <form onSubmit={onSubmitHandler} className='space-y-3 mt-6 text-sm'>

                <div className='grid grid-cols-2 gap-4'>
                    <InputField handleChange={handleChange} address={address} name='firstName' type="text" placeholder="First Name"/>
                    <InputField handleChange={handleChange} address={address} name='lastName' type="text" placeholder="Last Name"/>
                </div>

                <InputField handleChange={handleChange} address={address} name='email' type="email" placeholder="Email address" />
                <InputField handleChange={handleChange} address={address} name='street' type="text" placeholder="Street" />

                <div className='grid grid-cols-2 gap-4'>
                    <InputField handleChange={handleChange} address={address} name='city' type="text" placeholder="City" />
                    <InputField handleChange={handleChange} address={address} name='state' type="text" placeholder="State" />
                </div>

                <div className='grid grid-cols-2 gap-4'>
                    <InputField handleChange={handleChange} address={address} name='zipcode' type="number" placeholder="Zip code" />
                    <InputField handleChange={handleChange} address={address} name='country' type="text" placeholder="Country" />
                </div>

                <InputField handleChange={handleChange} address={address} name='phone' type="text" placeholder="Phone" />

                <button className='w-full mt-6 bg-[#3f1f0a]  text-white py-3 hover:bg-[#3f1f0a] -dull transition cursor-pointer uppercase'>
                    Save address
                </button>


             </form>
            </div>
            <img className='md:mr-16 mb-16 md:mt-0' src={assets.add_address_iamge} alt="Add Address" />
      </div>
    </div>
    </div>
    </div>
  )
}

export default AddAddress
