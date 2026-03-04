package database

import (
	"log"
	"os"

	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

func Connect() *mongo.Client {
	MongoDb := os.Getenv("MONGODB_URI")

	if MongoDb == "" {
		log.Fatal("MONGODB_URI not set!")
	}

	log.Println("Connecting to MongoDB...")

	clientOptions := options.Client().ApplyURI(MongoDb)

	client, err := mongo.Connect(clientOptions)

	if err != nil {
		log.Fatalf("Failed to connect to MongoDB: %v", err)
		return nil
	}

	log.Println("MongoDB connected successfully")
	return client
}

func OpenCollection(collectionName string, client *mongo.Client) *mongo.Collection {
	databaseName := os.Getenv("DATABASE_NAME")

	collection := client.Database(databaseName).Collection(collectionName)

	if collection == nil {
		return nil
	}
	return collection
}
