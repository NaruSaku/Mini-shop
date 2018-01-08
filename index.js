const express = require('express');
const app = express();   // can have different apps


// route-handler
app.get('/',(req,res) => {
    res.send({bye:'there'});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);