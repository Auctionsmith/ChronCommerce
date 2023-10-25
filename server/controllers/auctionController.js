
const {Auction} = require('../db/models')
const auctionEvent = require('../middleware/auctionEvent');


const auctionController = {};

auctionController.getAllAuctions = async (req,res,next) => {
  try {
    const auctions = (await Auction.findAll({where: {...req.query}})).map((auction)=>auction.toJSON())
    res.locals.auctions = auctions
    return next()
  } catch (error) {
    return next(error)
  }
}

auctionController.getAuction = async (req,res,next) => {
  
  const {id} = req.params
  try {
    const auction = (await Auction.findOne({
      where: {id}
    }))
    console.log(auction)
    if (!auction) {
      throw new Error('No auction found with that id')
    }
    res.locals.auction = auction
    return next()
  } catch (error) {
    return next({message: error.message, origin: 'auctionController.getAuction'})
    
  }
}

auctionController.createAuction = async (req,res,next) => {
  // Finish createMethod
  const {start_time,
    end_time,
    status,
    current_price,
    seller_id,
    item_name,
    img_url,
    category,
    description} = req.body

    const requiredInputs = ['start_time',
      'end_time',
      'status',
      'current_price',
      'seller_id',
      'item_name',
      'img_url',
      'category',
      'description']
    try {
      if (!requiredInputs.every((input)=>Object.keys(req.body).includes(input))) {
        throw new Error('Auction cannot be created without valid inputs')
      }
      
      const newAuction = await Auction.create(req.body)
  
      // Uncomment for AWS Automation
      // await auctionEvent.createAuctionEvents(newAuction.toJSON())

      res.locals.auction = newAuction
      return next()

    } catch (error) {
      return next({message: error.message, origin: 'auctionController.createAuction'});
    }
  
}

auctionController.deleteAuction = async (req,res,next) => {
  const {id} = req.params
  try {

    if (!id) {
      throw new Error('No auction id provided')
    }

    const auction = await Auction.findByPk(id);
    
    if (!auction) {
      throw new Error('No auction found')
    }
    // Uncomment for AWS Automation
    // await auctionEvent.deleteAuctionEvents(auction.toJSON())

    await auction.destroy();
    return next()
  } catch (error) {
    return next({message: error.message, origin: 'auctionController.deleteAuction'});
  }
}

auctionController.updateAuction = async (req,res,next) => {
  const {id} = req.params
  const validFields = ['start_time',
  'end_time',
  'status',
  'current_price',
  'seller_id',
  'item_name',
  'img_url',
  'category',
  'description']

  const updateObj = Object.entries(req.body).reduce((acc,[key,value])=>{
    if (validFields.includes(key)) acc[key] = value
    return acc
  },{})
  
  try {
    if (!id) {
      throw new Error('No auction id provided')
    }
    const [affectedCount, [updatedAuction]] = await Auction.update(updateObj, {
      where: { id: id },
      returning: true
    });

    // Uncomment for AWS Automation
    // await auctionEvent.editAuction(updatedAuction.toJSON())
    res.locals.auction = updatedAuction;
    return next()
  } catch (error) {
    return next({message: error.message, origin: 'auctionController.updateAuction'});
  }
}

auctionController.getRandomAuction = async (req,res,next) => {
  try {
    const auctions = (await Auction.findAll()).map((auction)=>auction.toJSON())
    // res.locals.auction = auctions
    const randomAuction = auctions[Math.floor(Math.random() * auctions.length)]
    res.locals.auction = randomAuction
    return next()
    
  } catch (error) {
    return next({message: error.message, origin: 'auctionController.getAuction'})
  }
}

auctionController.getOpenAuctions = async (req,res,next) => {

}

module.exports = auctionController