// Connect to MongoDB
const { MongoClient } = require('mongodb');
const fs = require('fs');
const csv = require('csv-parser');
const uri = "mongodb://localhost:27017"; //MongoDB URI 
const client = new MongoClient(uri);

async function insertCSVData() {
    try {
        await client.connect();
        const database = client.db("influential_leader_database"); //database name
        const collection = database.collection("collection-1"); // collection name

        const filePath = "cleaned_tweets.csv"; // CSV file path
        const dataArray = [];

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                dataArray.push(row);
            })
            .on('end', async () => {
                const result = await collection.insertMany(dataArray);
                console.log(`${result.insertedCount} records inserted.`);
                await client.close();
            });
    } catch (error) {
        console.error("Error inserting data:", error);
    }
}

insertCSVData();
