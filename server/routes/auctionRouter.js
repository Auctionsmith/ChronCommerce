const express = require("express");
const router = express.Router();
const auctionController = require("../controllers/auctionController");

router.get("/", auctionController.getAllAuctions, (req, res) => {
  return res.status(200).json(res.locals.auctions);
});
router.get("/random", auctionController.getRandomAuction, (req,res)=>{
  return res.status(200).json(res.locals.auction)
})
router.post("/", auctionController.createAuction, (req, res) => {
  return res.status(200).json(res.locals.auction)
});

router.get("/:id", auctionController.getAuction, (req, res) => {
  return res.status(200).json(res.locals.auction)
});

router.delete("/:id", auctionController.deleteAuction, (req, res) => {
  return res.sendStatus(200)
});

router.patch("/:id", auctionController.updateAuction, (req,res)=>{
  return res.status(200).json(res.locals.auction)
})


module.exports = router;