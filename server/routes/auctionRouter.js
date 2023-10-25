const express = require("express");
const router = express.Router();
const auctionController = require("../controllers/auctionController");
const upload = require("../middleware/uploadImage")


router.get("/", auctionController.getAllAuctions, (req, res) => {
  return res.status(200).json(res.locals.auctions);
});
router.get("/random", auctionController.getRandomAuction, (req,res)=>{
  return res.status(200).json(res.locals.auction)
})
router.get("/random", auctionController.getRandomAuction, (req,res)=>{
  return res.status(200).json(res.locals.auction)
})

router.get("/:id", auctionController.getAuction, (req, res) => {
  return res.status(200).json(res.locals.auction)
});

router.post("/", upload.single('auctionImage'), auctionController.createAuction, (req, res) => {
  // Add res.locals
  return res.status(200).json(res.locals.auction)
});

router.delete("/:id", auctionController.deleteAuction, (req, res) => {
  // Add res.locals if needed
  return res.sendStatus(200)
});

router.patch("/:id", auctionController.updateAuction, (req,res)=>{
  return res.status(200).json(res.locals.auction)
})


// router.patch("/:id", listingController.updateListing, (req, res) => {
//   return res.status(200).json(res.locals.updatedListing);
// });

// router.delete("/:id", listingController.deleteListing, (req, res) => {
//   return res.status(200).json(res.locals.deletedListing);
// });

module.exports = router;