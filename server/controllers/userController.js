const {User, Auction, followedAuctions} = require('../db/models')

const userController = {};

userController.getUser = (req,res,next) => {
  try {
    const {user} = req
    if (!user) {
      throw new Error('No user found')
    }
    res.locals.user = user
    return next()
  } catch (error) {
    return next({message: error.message, origin: 'userController.getUserAuction'});
  }
}

userController.createUser = (req,res,next) => {
}

userController.updateUser = async (req, res, next) => {
  
  const validFields = [
    "address",
    "city",
    "state",
    "zip",
    "first_name",
    "last_name",
    "email",
    "phone",
    "password",
  ]

  const updateObj = Object.entries(req.body).reduce((acc,[key,value])=>{
    if (validFields.includes(key)) acc[key] = value
    return acc
  },{})

  try {
    if (!req.user) {
      throw new Error('No user found')
    }
    const {id} = req.user
    const [affectedCount, [updatedUser]] = await User.update(updateObj, {
      where: { id: id },
      returning: true
    });
    res.locals.user = updatedUser
    return next()
  } catch (error) {
    return next({message: error.message, origin: 'userController.updateUser'});
  }
}

userController.deleteUser = async (req, res, next) => {
  try {
    if (!req.user) {
      throw new Error('No user found')
    }
    const {id} = req.user
    const user = await User.findByPk(id)

    // May be redundant
    if (!user) {
      throw new Error('No user found')
    }
    await user.destroy()
    return next() 
  } catch (error) {
    return next({message: error.message, origin: 'userController.deleteUser'});
  }
}

userController.followAuction = async (req,res,next) => {
  const {auctionId} = req.params
  try {

    if (!req.user) {
      throw new Error('No user found')
    }
    const {id: userId} = req.user
    const auction = await Auction.findByPk(auctionId)
    
    if (!auction) {
      throw new Error('No auction found')
    }

    // Check for duplicates
    const dupAuctions = await followedAuctions.findAll({
      where : {
        user_id: userId,
        auction_id: Number(auctionId)
      }
    })

    if (dupAuctions.length > 0) {
      throw new Error('User is already following auction')
    }

    const followedAuction = await followedAuctions.create({
      user_id: userId,
      auction_id: Number(auctionId)
    })
    res.locals.following = followedAuction 
    return next()
  } catch (error ) {
    return next({message: error.message, origin: 'userController.followAuction'});
  }
}

userController.unFollowAuction = async (req,res,next) => {
  const {id} = req.params
  try {

    if (!req.user) {
      throw new Error('No user found')
    }
    const {id: userId} = req.user
    const following = await followedAuctions.findByPk(id)
    
    if (!following) {
      throw new Error('No auction being followed')
    }

    if (following.user_id !== userId) {
      throw new Error('User not authorized')
    }

    await following.destroy()

    // Alternative
    // const followedAuction = await followedAuctions.findOne({
    //   where : {
    //     user_id: userId,
    //     auction_id: Number(auctionId)
    //   }
    // })
    return next()
  } catch (error ) {
    return next({message: error.message, origin: 'userController.unfollowAuction'});
  }
}

userController.getFollowedAuctions = async (req,res,next) => {
  // const userID = 1
  try {
    if (!req.user) {
      throw new Error('No user found')
    }
    const {id} = req.user
    const userFollowedAuctions = (await followedAuctions.findAll({
      where: {user_id: id}, 
      include: [{ model: Auction}]
  })).map(follow=>follow.Auction)
    
    res.locals.auctions = userFollowedAuctions
    return next()

  } catch (error) {
    return next({message: error.message, origin: 'userController.getFollowedAuctions'});
  }
}

userController.placeBid = async (req,res,next) => {
  try {
    if (!req.user) {
      throw new Error('No user found')
    }

    const {bidAmount} = req.body

    if (!bidAmount) {
      throw new Error('No bid amount included')
    }

    const {auctionId} = req.params
    const auction = await Auction.findByPk(auctionId)

    if (!auction) {
      throw new Error('No auction found')
    }

    if (req.user.id === auction.seller_id) {
      throw new Error('Seller cannot bid on auction')
    }

    if (auction.status !== 'open') {
      throw new Error('Auction not open')
    }

    if (auction.current_price >= bidAmount) {
      throw new Error('Bid amount invalid')
    }

    auction.current_price = bidAmount;
    auction.buyer_id = req.user.id
    await auction.save();
    res.locals.auction = auction
    return next()
    
    
  } catch (error) {
    return next({message: error.message, origin: 'userController.getWonAuctions'});
  }
}

userController.getWonAuctions = async (req,res,next) => {
  try {
    if (!req.user) {
      throw new Error('No user found')
    }
    const {id} = req.user
    const wonAuctions = await Auction.findAll({
      where: {
        buyer_id : id,
        status: 'closed'
      }
    }) 
    res.locals.auctions = wonAuctions
    return next()
  } catch (error) {
    return next({message: error.message, origin: 'userController.getWonAuctions'});
  }
}

userController.getHostedAuctions = async (req,res,next) => {
  try {
    if (!req.user) {
      throw new Error('No user found')
    }
    const {id} = req.user
    const hostedAuctions = await Auction.findAll({
      where: {
        seller_id : id,
      }
    }) 
    res.locals.auctions = hostedAuctions
    return next()
  } catch (error) {
    return next({message: error.message, origin: 'userController.getWonAuctions'});
  }
}

userController.getOpenBids = async (req,res,next) => {
  try {
    if (!req.user) {
      throw new Error('No user found')
    }
    // const {id} = req.user
    // hardcoded value for testing
    const id = 1
    const openAuctions = await Auction.findAll({
      where: {
        buyer_id : id,
        status: 'open'
      }
    }) 
    res.locals.auctions = openAuctions
    return next()
  } catch (error) {
    return next({message: error.message, origin: 'userController.getWonAuctions'});
  }
}


module.exports = userController
