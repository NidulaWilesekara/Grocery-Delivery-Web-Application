import jwt from 'jsonwebtoken';

const authUser = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.json({ success: false, message: 'Not Authorized' });
    }

    try {
        const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);

        if (tokenDecoded && tokenDecoded.id) {
            req.userId = tokenDecoded.id;  // ✅ Use req.userId
            next();
        } else {
            return res.json({ success: false, message: 'Not Authorized' });
        }

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export default authUser;
