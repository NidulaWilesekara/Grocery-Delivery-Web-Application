import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";


axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true; 

export const Appcontext = createContext();

export const AppcontextProvaider = ({children})=>{

    const currency = import.meta.env.VITE_CURRENCY;

    const navigate  = useNavigate();
    const [user,setUser] = useState(null)
    const [isSeller,setIsSeller] = useState(false)
    const [ShowUserLogin,setShowUserLogin] = useState(false)
    const [products,setProducts] = useState([])
    const[cartItems,setCartItems] = useState({})
    const[searchQuery,setsearchQuery] = useState({})



    //fetch seller status

    const fetchSeller = async ()=>{
        try {
            const {data} = await axios.get("/api/seller/is-auth");
            if(data.success){
                setIsSeller(true);
            }else{
                setIsSeller(false);
            }
        } catch (error) {
            console.log(error.message);
        }

    }

    //Fetch User Details ,user data and cart items

    const fetchUser = async ()=>{
        try {
            const {data} = await axios.get('/api/user/is-auth');
            if(data.success){
                setUser(data.user);
                setCartItems(data.user.cartItems);
            }
        }
        catch (error) {
            setUser(null);

        }
    }

    //Fetch All Products
    const fetchProducts = async ()=>{
        try {
            const {data} = await axios.get('/api/product/list');
            if(data.success){
                setProducts(data.products);
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    //Add all products to cart 
    const addToCart = (itemId)=>{
        let cartData = structuredClone(cartItems);

        if(cartData[itemId]){
            cartData[itemId] += 1;
        }else{
            cartData[itemId] = 1;

        }
        setCartItems(cartData);
        toast.success("Add to Cart")
    }

    //update cart item quantity

    const updateCartItem = (itemId,quantity)=>{
        let cartData = structuredClone(cartItems);
        cartData[itemId]=quantity;
        setCartItems(cartData)
        toast.success("Cart Updated")
    }


    //remove product from cart
    
    const removeFromCart = (itemId) => {
        let cartData = structuredClone(cartItems); // Clone cartItems first
    
        if (cartData[itemId]) {
            cartData[itemId] -= 1;
            if (cartData[itemId] === 0) {
                delete cartData[itemId];
            }
        }
    
        setCartItems(cartData); // Update state after changes
        toast.success("Removed from Cart");
    };


    //Get cart item count

    const getCartCount = ()=>{
        let totalCount = 0;
        for(const item in cartItems){
            totalCount += cartItems[item];
        } 
        return totalCount;
    }


    //get cart total amount 


    const getCartAmount = () =>{
        let totalAmount = 0;
        for( const items in cartItems){
            let itemInfo = products.find((product)=>product._id === items);
            if(cartItems[items]>0){
                totalAmount += itemInfo.offerPrice * cartItems[items]
            }
        }
        return Math.floor(totalAmount * 100)/100;
    }
    
    useEffect(()=>{
        fetchUser();
        fetchSeller();
        fetchProducts();
    },[])

    useEffect(()=>{
        const updateCart   = async () => {
        try {
            const {data} = await axios.post('/api/cart/update',{cartItems} )
            if(!data.success){
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);
        }

        }
        if(user){
            updateCart();
        }

    },[cartItems])





    const value ={navigate,user,setUser,isSeller,setIsSeller,ShowUserLogin,setShowUserLogin,
                    products,currency,addToCart,updateCartItem ,removeFromCart,cartItems,searchQuery,setsearchQuery,
                    getCartAmount,getCartCount,axios,fetchProducts
                }


    return <Appcontext.Provider value={value}>
        {children}
    </Appcontext.Provider>
}

export const useAppcontext = ()=>{
    return useContext(Appcontext)
}