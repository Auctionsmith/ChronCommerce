const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get('/', userController.getUser, (req,res)=> {
  return res.status(200).json(res.locals.user)
})
router.get('/followedAuctions', (req,res)=> {
  return res.status(200).json(res.locals.auctions)
})
router.patch('/', userController.updateUser, (req,res)=>{
  return res.status(200).json(res.locals.user)
})
router.delete('/', userController.deleteUser, (req,res)=>{
  return res.sendStatus(200)
})

router.post('/followAuction/:auctionId', userController.followAuction, (req,res) => {
  return res.sendStatus(200)
})

router.get('/hostedAuctions', (req,res)=> {
  return res.status(200).json(res.locals.auctions)
})
router.get('/wonAuctions', (req,res)=> {
  return res.status(200).json(res.locals.auctions)
})



module.exports = router;
