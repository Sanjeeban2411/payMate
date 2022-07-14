const mongoose = require('mongoose')

const URI = "mongodb+srv://Sanjeeban:mernbelove@cluster0.hkluhpk.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(URI)
.then(console.log("Connected to MongoDB"))