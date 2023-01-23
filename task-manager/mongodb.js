//crud create read update delete

const {MongoClient, ObjectId, FindCursor} = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';


MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error){
        return console.log('Unable to  connec to database ' +error);
    }  
    const db = client.db(databaseName);   
    
    db.collection('documents').deleteOne({description: "This is first document"})
    .then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
 
})