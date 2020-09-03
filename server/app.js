const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
var mongoose = require('mongoose');
var Base64 = require('js-base64').Base64;
const app = express()
const port = 3000
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/', express.static('./dist', {
  index: "index.html"
}))

app.get('/:encodedID', async (req,res) =>{
    const decoded = Base64.decode(req.params.encodedID);
    const url = await Url.findOne({id: decoded})
    const realURL = url.url;
    res.redirect('https://' + realURL)
})

var mongoDB = 'mongodb://localhost:27017/SampleURLS';


mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log("Connected to Database"))
.catch((err)=> console.error("Could not connect", err))

const urlSchema = new mongoose.Schema({
    url: String,
    id: Number,
    isPublished: Boolean
})
const Url = mongoose.model('URL', urlSchema);





app.post('/createnewURL', async function(req,res){
    const count = await Url.countDocuments({}, function(err, count){
        return( count );
    })
    const url = new Url({
        url: req.body.URLvalue,
        id: count+1,
        isPublished: true
    });
    try{ console.log(count)
        const savedURL = await url.save();
        const encoded = Base64.encode(count+1);
        res.send(encoded)
        
        
    }
    catch(err){
        console.log(err);
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))