// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');

const admin = require("firebase-admin");


admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://datacouch-279209.firebaseio.com"
});

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
  function saveName(agent){
    const nameParam = agent.parameters.Name;
    const name = nameParam;
    agent.add(name);
    return admin.database().ref('/names').push({name: name}).then((snapshot) =>{
      console.log('database write  successfull: ' + snapshot.ref.toString());
    });
  }
  function saveAge(agent){
    const ageParam = agent.parameters.Age;
    const age = ageParam;
    agent.add(age);
    return admin.database().ref('/ages').push({age: age}).then((snapshot) =>{
      console.log('database write  successfull: ' + snapshot.ref.toString());
    });
  }
  function saveIncome(agent){
    const incomeParam = agent.parameters.Income;
    const income = incomeParam;
    agent.add(income);
    return admin.database().ref('/incomes').push({income: income}).then((snapshot) =>{
      console.log('database write  successfull: ' + snapshot.ref.toString());
    });
  }

  let intentMap = new Map();
  intentMap.set('MediaMix', saveName);
  intentMap.set('MediaMix', saveAge);
  intentMap.set('MediaMix', saveIncome);
  // intentMap.set('your intent name here', yourFunctionHandler);
  // intentMap.set('your intent name here', googleAssistantHandler);
  agent.handleRequest(intentMap);
});
