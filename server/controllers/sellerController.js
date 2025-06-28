import jwt from 'jsonwebtoken';

// Login Seller : /api/seller/login

export const sellerLogin = async (req, res) => {
   try {
     const { email, password } = req.body;
    if(password === process.env.SELLER_PASSWORD && email === process.env.SELLER_EMAIL) {
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('sellerToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return res.json({ success: true, message: 'Logged in successfully' });
    } else {
        return res.json({ success: false, message: 'Invalid email or password' });
    }
    
   } catch (error) {
       console.log(error.message);
       return res.json({ success: false, message: error.message });
   }
};

// Seller is Authenticated : /api/seller/is-auth

export const isSellerAuth = (req, res) => {
    try {
        return res.json({ success: true, message: 'Seller is authenticated' });
    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });

    }

}
// Seller Logout : /api/seller/logout

export const sellerLogout = (req, res) => {
    try {
        res.clearCookie('sellerToken',{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });
        return res.json({ success: true, message: 'Seller logged out successfully' });
    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
};
