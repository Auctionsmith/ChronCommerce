const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");


// User Basic Routes
router.get('/', userController.getUser, (req,res)=> {
  return res.status(200).json(res.locals.user)
})
router.patch('/', userController.updateUser, (req,res)=>{
  return res.status(200).json(res.locals.user)
})
router.delete('/', userController.deleteUser, (req,res)=>{
  return res.sendStatus(200)
})

// User Following Routes
router.post('/followedAuctions/:auctionId', userController.followAuction, (req,res) => {
  return res.status(200).json(res.locals.following)
})
router.delete('/followedAuctions/:id', userController.unFollowAuction, (req,res) => {
  return res.sendStatus(200)
})
router.get('/followedAuctions', userController.getFollowedAuctions, (req,res)=> {
  return res.status(200).json(res.locals.auctions)
})

// User Bid Routes
router.post('/bid/:auctionId', userController.placeBid, (req,res)=>{
  return res.status(200).json(res.locals.auction)
})

router.get('/openBids', userController.getOpenBids, (req,res)=> {
  return res.status(200).json(res.locals.auctions)
})

// User Auction Routes
router.get('/hostedAuctions', userController.getHostedAuctions, (req,res)=> {
  return res.status(200).json(res.locals.auctions)
})
router.get('/wonAuctions', userController.getWonAuctions, (req,res)=> {
  return res.status(200).json(res.locals.auctions)
})



module.exports = router;
