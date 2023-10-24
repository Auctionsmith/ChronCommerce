const {User, Auction} = require('../db/models')

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

// 
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
    const auction = await Auction.findByPk(auctionId)
    console.log(auction)
    return next()
  } catch (error ) {
    return next({message: error.message, origin: 'userController.followAuction'});
  }
}

module.exports = userController
