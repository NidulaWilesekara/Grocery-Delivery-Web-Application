
import express from 'express';
import { isSellerAuth, sellerLogout, sellerLogin } from '../controllers/sellerController.js';
import authSeller from '../middlewares/authSeller.js';


const sellerRouter = express.Router();

sellerRouter.post('/login', sellerLogin);
sellerRouter.get('/is-auth', authSeller, isSellerAuth);
sellerRouter.post('/logout', authSeller, sellerLogout);

export default sellerRouter;

