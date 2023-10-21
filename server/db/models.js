const { Pool } = require('pg');
require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs')

// store in .env
const url = 'postgres://ywbqzgag:XZi_XWfr8nzIqAx6wE9_pCSkCF-bzvFM@mahmud.db.elephantsql.com/ywbqzgag'
const sequelize = new Sequelize(url, {
  logging: false,
})

// sequelize.authenticate()
//   .then(()=> console.log('Connected to db'))
//   .catch(() => console.log('Not connected'))

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  zip: {
    type: DataTypes.INTEGER,
    allowNull: false,
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
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
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
    // console.log(newUser.id)
  }
};



const dummyAuction = [
  {
    start_time: new Date(),
    end_time: new Date(),
    status: 'open',
    current_price: 100,
    seller_id: 1, // Set to an existing seller's ID
    item_name: 'Dummy Item 1',
    img_url: 'item1.jpg',
    category: 'electronics',
    description: 'A dummy auction item 1.',
  },
  {
    start_time: new Date(),
    end_time: new Date(),
    status: 'open',
    current_price: 150,
    seller_id: 2, // Set to an existing seller's ID
    item_name: 'Dummy Item 2',
    img_url: 'item2.jpg',
    category: 'clothing & accessories',
    description: 'A dummy auction item 2.',
  },
  {
    start_time: new Date(),
    end_time: new Date(),
    status: 'open',
    current_price: 200,
    seller_id: 3, // Set to an existing seller's ID
    item_name: 'Dummy Item 3',
    img_url: 'item3.jpg',
    category: 'sporting goods',
    description: 'A dummy auction item 3.',
  },
]


const createAuction = async (dummyAuction) => {
  for (let i = 0; i < dummyAuction.length; i++) {
    const newAuction = await Auction.create(dummyAuction[i]);
    // console.log(newAuction.id)
  }
};


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

// const buildDummyDB = async() => {
//   await createDummyUsers(dummyUsers);
//   await createAuction(dummyAuction);
//   await createFollow(dummyFollow);
// }
// uncomment to add dummy data
// buildDummyDB();

module.exports = { User, Auction, followedAuctions };