// require('dotenv').config({path: '../../.env'})

const cronify = require('../utils/cronify')
const { EventBridgeClient, PutRuleCommand, PutTargetsCommand, DescribeRuleCommand, RemoveTargetsCommand, DeleteRuleCommand} = require("@aws-sdk/client-eventbridge");
const { LambdaClient, AddPermissionCommand, RemovePermissionCommand } = require("@aws-sdk/client-lambda");

const auctionEvent = {}

const client = new EventBridgeClient({
  region: "us-west-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

const lambdaClient = new LambdaClient(
  {
    region: "us-west-2",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
  }
);

const createRule = async (auction, type) => {
  const ruleParams = {
    Name: `${auction.id}-${type}`,
    EventBusName: "default",
    ScheduleExpression: type === 'open' 
      ? cronify(auction.start_time) 
      : cronify(auction.end_time),
    State: "ENABLED",
    Description: `${type.toUpperCase} @ ${auction.start_time}`,
  };
  const ruleData = await client.send(new PutRuleCommand(ruleParams));
  console.log('Rules Added:', true)
  return {...ruleData, name: ruleParams.Name}
}

const addRulePermission = async (rule,type) => {
  const permissionParams = {
    Action: "lambda:InvokeFunction",
    FunctionName: type === 'open' 
      ? process.env.AWS_LAMBDA_OPEN_NAME
      : process.env.AWS_LAMBDA_CLOSE_NAME,
    Principal: "events.amazonaws.com",
    StatementId: "EventBridgePermission" + rule.name, // unique ID for the statement
    SourceArn: rule.RuleArn, // The ARN of the EventBridge rule you created
  };

  const result = await lambdaClient.send(new AddPermissionCommand(permissionParams))
  console.log('Permissions Added:', true)
} 

const addRuleTarget = async (rule, type, auction) => {
  
  const targetParams = {
    Rule: rule.name,
    EventBusName: "default",
    Targets: [
      {
        Arn: type === 'open' 
          ? process.env.AWS_LAMBDA_OPEN_ARN
          : process.env.AWS_LAMBDA_CLOSE_ARN,
        Id: type === 'open' 
        ? process.env.AWS_LAMBDA_OPEN_NAME
        : process.env.AWS_LAMBDA_CLOSE_NAME,
        Input: JSON.stringify({
          key1: auction.id,
        }),
      },
    ],
  };

  const targetData = await client.send(new PutTargetsCommand(targetParams));
  console.log("Targets added:", targetData.FailedEntryCount === 0);

}

const deleteRuleTarget = async (auction, type) => {
  const removeTargetParams = {
    Rule: `${auction.id}-${type}`,
    EventBusName: "default",
    Ids: [type === 'open'
    ? process.env.AWS_LAMBDA_OPEN_NAME
    : process.env.AWS_LAMBDA_CLOSE_NAME
    ]
  };
  const targetData = await client.send(new RemoveTargetsCommand(removeTargetParams));
    console.log("Targets removed:", targetData.FailedEntryCount === 0);
}

const deleteRule = async (auction,type) => {
    // Now, delete the rule itself
    const deleteRuleParams = {
      Name: `${auction.id}-${type}`,
      EventBusName: "default"
    };

    const ruleData = await client.send(new DeleteRuleCommand(deleteRuleParams));
    // console.log("Rule deleted:", ruleData);
    console.log('Rules removed: ', true)
    
};

const deleteRulePermission = async (rule, type) => {
  const functionName = type === 'open' 
    ? process.env.AWS_LAMBDA_OPEN_NAME
    : process.env.AWS_LAMBDA_CLOSE_NAME;

  const statementId = "EventBridgePermission" + `${rule.id}-${type}`;

  const removePermissionParams = {
    FunctionName: functionName,
    StatementId: statementId
  };

  try {
    const result = await lambdaClient.send(new RemovePermissionCommand(removePermissionParams));
    console.log('Permission removed:', true);
  } catch (error) {
    console.error('Error removing permission:', error);
  }
};

// const auction = {
//   id: 1,
//   name: `Bobby-Auction-REFACTOR`,
//   start_time: new Date(new Date().getTime() + (1)*60*1000), // 5 minutes from now
//   ent_time: new Date(new Date().getTime() + (2)*60*1000) // 6 minutes from now
// }
// const type = 'open'
// console.log(createRule(auction, 'close'))

auctionEvent.createAuctionEvents = async (newAuction) => {
  try {
    const openRule = await createRule(newAuction, 'open')
    const closeRule = await createRule(newAuction, 'close')
    await addRulePermission(openRule,'open')
    await addRulePermission(closeRule,'close')
    await addRuleTarget(openRule, 'open', newAuction)
    await addRuleTarget(closeRule, 'close', newAuction)
  } catch(error) {
    console.log(error)
  }
}

auctionEvent.editAuctionOpenEvent = (updatedAuction) => {}

auctionEvent.editAuctionCloseEvent = (updatedAuction) => {}

auctionEvent.deleteAuctionEvents = async (auction) => {
  try {
    await deleteRuleTarget(auction, 'open')
    await deleteRulePermission(auction,'open')
    await deleteRule(auction, 'open')
    await deleteRuleTarget(auction, 'close')
    await deleteRulePermission(auction,'close')
    await deleteRule(auction, 'close')
  } catch (error) {
    console.log(error)
  }
}
auctionEvent.editAuction = async (updatedAuction) => {
  try {
    await auctionEvent.deleteAuctionEvents(updatedAuction)
    await auctionEvent.createAuctionEvents(updatedAuction)
  } catch (error) {
    console.log(error)
  }
}

// const auction = {
//   id: 1,
//   name: `Bobby-Auction-REFACTOR`,
//   start_time: new Date(new Date().getTime() + (2)*60*1000), // 1 minutes from now
//   ent_time: new Date(new Date().getTime() + (3)*60*1000) // 2 minutes from now
// }

// auctionEvent.createAuctionEvents(auction)
// auctionEvent.editAuction(auction)
// auctionEvent.deleteAuctionEvents(auction)

module.exports = auctionEvent