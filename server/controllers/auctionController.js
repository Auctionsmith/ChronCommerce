const {Auction} = require('../db/models')

const auctionController = {};

auctionController.getAllAuctions = async (req,res,next) => {
  // Add Error of Empty Auctions Array
  try {
    const auctions = (await Auction.findAll()).map((auction)=>auction.toJSON())
    console.log(auctions)
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
      // This creates an Auction without actually saving it to DB
      const newAuction = Auction.build(req.body)


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

    res.locals.auction = updatedAuction;
    return next()
  } catch (error) {
    return next({message: error.message, origin: 'auctionController.updateAuction'});
  }
}

module.exports = auctionController