require('dotenv').config(); 

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const cors = require('cors');


const startServer = async () => {
    const app = express();
    const server = new ApolloServer({ typeDefs, resolvers });
    app.use(cors());
    
    await server.start();
    server.applyMiddleware({ app });
    
    const PORT = process.env.PORT || 4000;
    
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}${server.graphqlPath}`);
        });
    })
    .catch(err => console.error("MongoDB connection error:", err));
};

startServer();
