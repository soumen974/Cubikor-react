import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DialogBox from '../../Customer/DialogBox';
import { Link, useNavigate } from 'react-router-dom';
import { PencilSquareIcon,BeakerIcon,PlusIcon} from '@heroicons/react/24/outline';
// import { LuLogOut } from "react-icons/lu";
// import { FaUsers } from "react-icons/fa";
// import { FaBoxesPacking } from "react-icons/fa6";
// import { FaCubes } from "react-icons/fa";
// import { TbCategoryPlus } from "react-icons/tb";
// import { LuLayoutDashboard } from "react-icons/lu";

const TbCategoryPlus=({className})=>{
   return (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
 <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
 <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
   </svg>
    );
    

}

const FaBoxesPacking=({className})=>{
   return (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
   <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122" />
   </svg>
    );
 
}

const FaUsers=({className})=>{
   return (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
   <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
   </svg>
    );
 
}


const FaCubes=({className})=>{
   return (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
   <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
   </svg>
    );
 
}

const LuLayoutDashboard=({className})=>{
   return (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z" />
    </svg>
    
    );
}

const LuLogOut=({className})=>{
   return (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
   <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
   </svg>
    );

}


const SideBar = (Props) => {
  const isSidebarOpen=Props.isSidebarOpen
  const setIsSidebarOpen = Props.setIsSidebarOpen;
  const [Dialogopen, setDialogopenOpen] = useState(false);
  const [Loading, setLoader] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
   localStorage.removeItem('SellerToken');
   localStorage.removeItem('ShopId');
   localStorage.removeItem('isAdmin');
   localStorage.removeItem('note');
   // navigate('/seller/categoriesadd');
   setLoader(true);
   setTimeout(() => {
     navigate('/seller/Login')
   }, 1500);
   
   
 };

//  ----new order count ---
const shopId = localStorage.getItem('ShopId');
const [orderItems, setOrderItems] = useState([]);


useEffect(() => {
   const fetchSellerOrders = async () => {
     try {
       const response = await axios.get(`${process.env.REACT_APP_API_URL}/seller-orders/${shopId}`);       
       setOrderItems(response.data.orders);
     } catch (err) {
       console.log(err.response ? err.response.data.message : 'Error fetching seller orders');
     }
   };

   fetchSellerOrders();
 }, [shopId]);

 const NoOfNewOrder=(orderItems.filter(order => order.status === 'Order Placed').length);


//  ---node--
const [NoteAdd, setNoteAdd] = useState(true);


const [note, setNote] = useState('');

  useEffect(() => {
    const storedNote = localStorage.getItem('note');
    if (storedNote) {
      setNote(storedNote);
    }
  }, []);

  const handleInputChange = (e) => {
    setNote(e.target.value);
  };

  const saveNote = () => {
    localStorage.setItem('note', note);
  };

  const clearNote = () => {
    setNote('');
    localStorage.removeItem('note');
  };
  return (
    <>
    


<aside  id="cta-button-sidebar" className={`fixed top-0 left-0 sm:z-40 z-50 w-64 h-screen transition-transform ${!isSidebarOpen? "translate-x-0  sm:translate-x-0": " -translate-x-full  sm:translate-x-0  "} `} aria-label="Sidebar">
   <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
      <div className="flex justify-start pb-5 sm:hidden">
         <button  onClick={()=>{setIsSidebarOpen(!isSidebarOpen)}} className=" flex justify-end  p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
            </svg>
         </button>
      </div>
      <ul className="space-y-2 font-medium">
         <li>
            <Link to={"/seller"} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <LuLayoutDashboard className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
               <span className="ms-3">Dashboard</span>
            </Link>
         </li>
         <li>
            <Link to={"/seller/categoriesadd"} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <TbCategoryPlus className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
               <span className="flex-1 ms-3 whitespace-nowrap">Add Category</span>
            </Link>
         </li>
        
         <li>
            <Link to={"/seller/productadd"} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <FaCubes className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
               <span className="flex-1 ms-3 whitespace-nowrap">Add Products</span>
            </Link>
         </li>
         <li>
            <Link to={"/seller/categoriesadd"} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <TbCategoryPlus className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
               <span className="flex-1 ms-3 whitespace-nowrap">Scheduled Adding</span>
               <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span>
            </Link>
         </li>
         <li>
            <Link to={"/seller/orders"} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <FaBoxesPacking className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
               <span className="flex-1 ms-3 whitespace-nowrap">Order</span>
               {NoOfNewOrder ? <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">{NoOfNewOrder} </span> : null}
            </Link>
         </li>
         <li>
            <Link to={"/seller"} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <FaUsers className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
               <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
            </Link>
         </li>
        
         
         <li onClick={()=>{setDialogopenOpen(true);setIsSidebarOpen(!isSidebarOpen)}} >
            <Link to={"/seller"} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <LuLogOut className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />

               <span  className="flex-1 ms-3 whitespace-nowrap">Logout</span>
            </Link>
         </li>
         <li>
            <Link to={"/seller"} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z"/>
                  <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z"/>
                  <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z"/>
               </svg>
               <span className="flex-1 ms-3 whitespace-nowrap">Sign Up</span>
            </Link>
         </li>
      </ul>
      <div  id="dropdown-cta" className="relative  p-4 mt-6 rounded-lg bg-blue-50 dark:bg-blue-900" role="alert">
         <div className="flex group items-center mb-3">
            <span className="bg-orange-100 text-orange-800 text-sm font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-orange-200 dark:text-orange-900">Note</span>
            <button  type="button" className="z-50 ms-auto -mx-1.5 -my-1.5 bg-blue-50 inline-flex justify-center items-center w-8 h-8 text-blue-900 rounded-lg focus:ring-2 focus:ring-blue-400 p-1  hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-400 dark:hover:bg-blue-800" data-dismiss-target="#dropdown-cta" aria-label="Close">
               <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                  <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                </svg>
            </button>
            
            <div className={`z-50 hidden group-hover:block absolute -right-1 top-10 text-base list-none   divide-y divide-gray-100  w-14`}>
               <ul className="py-2" >
                  <li onClick={()=>{setNoteAdd(!NoteAdd)}} >
                        <h1 className="cursor-pointer block px-4 py-2 text-sm text-Orange-700  text-indigo-400       rounded-lg focus:ring-2 focus:ring-blue-400    dark:hover:bg-blue-800">
                         <abbr title="Write note">  <PencilSquareIcon className="h-6 w-6 mr-2"/></abbr>
                        </h1>
                  </li>
               
                  <li onClick={clearNote} >
                        <h1  className="cursor-pointer block px-4 py-2 text-sm text-orange-500 ">
                          <abbr title="Delete current "> <BeakerIcon className="h-6 w-6 mr-2"/></abbr>
                        </h1>
                  </li>
               </ul>
            </div>
         </div>

         
         {NoteAdd? 
         (<>
         <p className="mb-3 text-sm text-blue-800 dark:text-blue-400">
           {note?(
            note
           ):(
           <p> Preview the new Premium features ! You can pay back the new cost if you don't liked , limited time in your profile.</p>)}
         </p>
         <Link to={"/seller"}  className="text-sm text-blue-800 underline font-medium hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300" href="#">Turn our Premium</Link>
         </>):(
            <div className="mb-3 text-sm text-blue-800 dark:text-blue-400">
               <textarea
               value={note}
               onChange={handleInputChange}
               placeholder="Enter your note here..."
               className='h-24 w-fit outline-none bg-blue-900'
               />
      
             <button className=' z-50 ms-auto -mx-1.5 -my-1.5 bg-blue-50 inline-flex justify-center items-center w-8 h-8 text-blue-900 rounded-lg focus:ring-2 focus:ring-blue-400 p-1  hover:bg-blue-200 dark:hover:bg-blue-900 dark:text-blue-400 dark:bg-blue-800'
              onClick={() => { saveNote(); setNoteAdd(!NoteAdd); }}>
               <PlusIcon className="h-6 w-6 "/>
             </button>
            </div>
         )}
      </div>
   </div>
</aside>
<span onClick={() => { setIsSidebarOpen(!isSidebarOpen); }} className={`fixed w-full z-44 h-screen flex ${!isSidebarOpen ? 'display' : 'hidden'}`}></span>
      <DialogBox 
         open={Dialogopen}
         setOpen={setDialogopenOpen} 
         title={"Session Logout"}
         message={"Are you sure you want to Logout your account ,then you have to Login agin to access your account."}
         ActionButtonName={"Logout"}
         ActionButtonColorRed={true}
         IconName={false}
         handleLogic={handleLogout}
         Loading={Loading}
         />


    </>
  );
};

export default SideBar;
