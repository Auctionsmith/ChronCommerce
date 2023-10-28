const { Pool } = require('pg');

// require('dotenv').config({path: '../../.env'});

const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs')
// const auctionEvent = require('../middleware/auctionEvent')

// store in .env
const url = 'postgres://ywbqzgag:XZi_XWfr8nzIqAx6wE9_pCSkCF-bzvFM@mahmud.db.elephantsql.com/ywbqzgag'
const sequelize = new Sequelize(url, {
  logging: false,
  pool: {
    max: 100,      // maximum number of connections in pool
    min: 0,      // minimum number of connections in pool
    idle: 10000  // time (in milliseconds) after which idle connections are closed
  }
});

// sequelize.authenticate()
//   .then(()=> console.log('Connected to db'))
//   .catch(() => console.log('Not connected'))

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.VIRTUAL,
    get: function () {
      return this.email;
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      this.setDataValue('password', bcrypt.hashSync(value,10))
    }
  },
})
const Auction = sequelize.define('Auction', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  start_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  end_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM(['pending', 'open', 'closed', 'cancelled', 'purchased']),
    allowNull: false,
  },
  current_price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  buyer_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: User,
      key: 'id',
    },
  },
  seller_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  item_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  img_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.ENUM(['motors', 'clothing & accessories', 'sporting goods', 'electronics', 'business & industrial', 'jewelry & watches', 'collections & art', 'home & garden', 'other']),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},
  {
    scopes: {
      open : {
      where: {
        status : 'open'
        }
      },
      closed : {
        where: {
          status: 'closed'
        }
      }
    }
  }
)
const followedAuctions = sequelize.define('Following', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  auction_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Auction,
      key: 'id',
    },
  },
})


// User to Auction Associations
User.hasMany(Auction, { foreignKey: 'buyer_id', onDelete: 'SET NULL' });
User.hasMany(Auction, { foreignKey: 'seller_id', onDelete: 'CASCADE' });
Auction.belongsTo(User, { as: 'Buyer', foreignKey: 'buyer_id' });
Auction.belongsTo(User, { as: 'Seller', foreignKey: 'seller_id' });

// User to followedAuctions Associations
User.hasMany(followedAuctions, { foreignKey: 'user_id', onDelete: 'CASCADE' });
followedAuctions.belongsTo(User, { foreignKey: 'user_id' });

// Auction to followedAuctions Associations
Auction.hasMany(followedAuctions, { foreignKey: 'auction_id', onDelete: 'CASCADE' });
followedAuctions.belongsTo(Auction, { foreignKey: 'auction_id' });



const dummyUsers = [
  {
    address: '123 Main St',
    city: 'Springfield',
    state: 'IL',
    zip: 62704,
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    phone: 1234567890,
    password: 'password123',
  },
  {
    address: '456 Elm St',
    city: 'Shelbyville',
    state: 'IL',
    zip: 62705,
    first_name: 'Jane',
    last_name: 'Doe',
    email: 'jane.doe@example.com',
    phone: 9876543210,
    password: 'password456',
  },
  {
    address: '789 Oak St',
    city: 'Capital City',
    state: 'IL',
    zip: 62706,
    first_name: 'Emily',
    last_name: 'Smith',
    email: 'emily.smith@example.com',
    phone: 1122334455,
    password: 'password789',
  },
];


const createDummyUsers = async (dummyUsers) => {
  for (let i = 0; i < dummyUsers.length; i++) {
    const newUser = await User.create(dummyUsers[i]);
    console.log(newUser.id)
  }
};



const dummyAuction = [
  // {
  //   start_time: new Date(new Date().getTime() + (5)*60*1000),
  //   end_time: new Date(new Date().getTime() + (60)*60*1000*24),
  //   status: 'open',
  //   current_price: 300,
  //   seller_id: 1, // Set to an existing seller's ID
  //   item_name: 'Rare Baseball Card',
  //   img_url: 'https://justbobbybucket.s3.us-west-2.amazonaws.com/baseballCard1.png',
  //   category: 'collections & art',
  //   description: 'A dummy auction item 1.',
  // },
  // {
  //   start_time: new Date(new Date().getTime() + (5)*60*1000),
  //   end_time: new Date(new Date().getTime() + (60)*60*1000*24*2),
  //   status: 'open',
  //   current_price: 300,
  //   seller_id: 1, // Set to an existing seller's ID
  //   item_name: 'Rare Baseball Card',
  //   img_url: 'https://justbobbybucket.s3.us-west-2.amazonaws.com/baseballCard2.png',
  //   category: 'collections & art',
  //   description: 'A dummy auction item 1.',
  // },
  // {
  //   start_time: new Date(new Date().getTime() + (5)*60*1000),
  //   end_time: new Date(new Date().getTime() + (60)*60*1000*24*3),
  //   status: 'open',
  //   current_price: 300,
  //   seller_id: 1, // Set to an existing seller's ID
  //   item_name: 'Rare Baseball Card',
  //   img_url: 'https://justbobbybucket.s3.us-west-2.amazonaws.com/baseballCard3.png',
  //   category: 'collections & art',
  //   description: 'A dummy auction item 1.',
  // },
  // {
  //   start_time: new Date(new Date().getTime() + (6)*60*1000),
  //   end_time: new Date(new Date().getTime() + (8)*60*1000),
  //   status: 'closed',
  //   current_price: 150,
  //   seller_id: 2, // Set to an existing seller's ID
  //   item_name: 'Very special stamp',
  //   img_url: 'https://justbobbybucket.s3.us-west-2.amazonaws.com/stamp1.png',
  //   category: 'collections & art',
  //   description: 'A dummy auction item 2.',
  // },
  // {
  //   start_time: new Date(new Date().getTime() + (6)*60*1000),
  //   end_time: new Date(new Date().getTime() + (8)*60*1000*24*3),
  //   status: 'closed',
  //   current_price: 150,
  //   seller_id: 2, // Set to an existing seller's ID
  //   item_name: 'Very special stamp',
  //   img_url: 'https://justbobbybucket.s3.us-west-2.amazonaws.com/stamp2.png',
  //   category: 'collections & art',
  //   description: 'A dummy auction item 2.',
  // },
  // {
  //   start_time: new Date(new Date().getTime() + (6)*60*1000),
  //   end_time: new Date(new Date().getTime() + (8)*60*1000*24*3),
  //   status: 'closed',
  //   current_price: 150,
  //   seller_id: 2, // Set to an existing seller's ID
  //   item_name: 'Very special stamp',
  //   img_url: 'https://justbobbybucket.s3.us-west-2.amazonaws.com/stamp3.png',
  //   category: 'collections & art',
  //   description: 'A dummy auction item 2.',
  // },
  // {
  //   start_time: new Date(new Date().getTime() + (7)*60*1000),
  //   end_time: new Date(new Date().getTime() + (9)*60*1000),
  //   status: 'closed',
  //   current_price: 200,
  //   seller_id: 3, // Set to an existing seller's ID
  //   item_name: 'Antique Electronics',
  //   img_url: 'https://justbobbybucket.s3.us-west-2.amazonaws.com/vintageElectronics1.png',
  //   category: 'electronics',
  //   description: 'A dummy auction item 3.',
  // },
  // {
  //   start_time: new Date(new Date().getTime() + (7)*60*1000),
  //   end_time: new Date(new Date().getTime() + (9)*60*1000*24*4),
  //   status: 'open',
  //   current_price: 200,
  //   seller_id: 3, // Set to an existing seller's ID
  //   item_name: 'Antique Electronics',
  //   img_url: 'https://justbobbybucket.s3.us-west-2.amazonaws.com/vintageElectronics2.png',
  //   category: 'electronics',
  //   description: 'A dummy auction item 3.',
  // },
  // {
  //   start_time: new Date(new Date().getTime() + (7)*60*1000),
  //   end_time: new Date(new Date().getTime() + (9)*60*1000*24*5),
  //   status: 'open',
  //   current_price: 200,
  //   seller_id: 3, // Set to an existing seller's ID
  //   item_name: 'Antique Electronics',
  //   img_url: 'https://justbobbybucket.s3.us-west-2.amazonaws.com/vintageElectronics3.png',
  //   category: 'electronics',
  //   description: 'A dummy auction item 3.',
  // },
  {
    start_time: new Date(new Date().getTime() + (7)*60*1000),
    end_time: new Date(new Date().getTime() + (9)*60*1000*24*10),
    status: 'open',
    current_price: 200,
    seller_id: 2, // Set to an existing seller's ID
    item_name: 'Antique Jewelry',
    img_url: 'https://justbobbybucket.s3.us-west-2.amazonaws.com/jewelry1.png',
    category: 'jewelry & watches',
    description: 'A dummy auction item 3.',
  },
  {
    start_time: new Date(new Date().getTime() + (7)*60*1000),
    end_time: new Date(new Date().getTime() + (9)*60*1000*24*10),
    status: 'open',
    current_price: 200,
    seller_id: 2, // Set to an existing seller's ID
    item_name: 'Antique Jewelry',
    img_url: 'https://justbobbybucket.s3.us-west-2.amazonaws.com/jewelry2.png',
    category: 'jewelry & watches',
    description: 'A dummy auction item 3.',
  },
  {
    start_time: new Date(new Date().getTime() + (7)*60*1000),
    end_time: new Date(new Date().getTime() + (9)*60*1000*24*10),
    status: 'open',
    current_price: 200,
    seller_id: 3, // Set to an existing seller's ID
    item_name: 'Antique Jewelry',
    img_url: 'https://justbobbybucket.s3.us-west-2.amazonaws.com/jewelry3.png',
    category: 'jewelry & watches',
    description: 'A dummy auction item 3.',
  },
  {
    start_time: new Date(new Date().getTime() + (7)*60*1000),
    end_time: new Date(new Date().getTime() + (9)*60*1000*24*10),
    status: 'open',
    current_price: 200,
    seller_id: 1, // Set to an existing seller's ID
    item_name: 'Antique Jewelry',
    img_url: 'https://justbobbybucket.s3.us-west-2.amazonaws.com/jewelry4.png',
    category: 'jewelry & watches',
    description: 'A dummy auction item 3.',
  },
]


const createAuction = async (dummyAuction) => {
  for (let i = 0; i < dummyAuction.length; i++) {
    const newAuction = await Auction.create(dummyAuction[i]);
    // console.log(newAuction.toJSON())
    // console.log(new Date(new Date().getTime() + (7)*60*1000))
    // await auctionEvent.createAuctionEvents(newAuction.toJSON())
  }
};

// createAuction(dummyAuction)

const dummyFollow = [
  {
    id: 1,
    user_id: 1, // Set to an existing user's ID
    auction_id: 1, // Set to an existing auction's ID
  },
  {
    id: 2,
    user_id: 2, // Set to an existing user's ID
    auction_id: 2, // Set to an existing auction's ID
  },
  {
    id: 3,
    user_id: 3, // Set to an existing user's ID
    auction_id: 3, // Set to an existing auction's ID
  },
];


const createFollow = async (dummyFollow) => {
  for (let i = 0; i < dummyFollow.length; i++) {
    const newFollow = await followedAuctions.create(dummyFollow[i]);
    // console.log(newFollow.id)
  }
};

// to drop database
// User.sync({force: true})
//   .then(() => console.log('User table synced'))
//   .catch(() => console.log('User table missing'))

// Auction.sync({force: true})
//   .then(() => console.log('Auction table synced'))
//   .catch(() => console.log('Auction table missing'))

// followedAuctions.sync({force: true})
//   .then(() => console.log('Followed Auctions table synced'))
//   .catch(() => console.log('Followed Auctions missing'))

// sequelize.sync({force: true})
//   .then(() => console.log('All models synchronized'));

const buildDummyDB = async() => {
  // await createDummyUsers(dummyUsers);
  await createAuction(dummyAuction);
  // await createFollow(dummyFollow);
}
// uncomment to add dummy data
// buildDummyDB();


module.exports = { User, Auction, followedAuctions };