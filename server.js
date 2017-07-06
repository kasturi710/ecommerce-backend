/**
 * Created by kasturigs on 21/04/17.
 */

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const filePath = path.join(__dirname,"itemlist.json");



function refreshItems(done) {
    fs.readFile(filePath, function (err, data) {
        if (!err) {
            try {
                itemList = JSON.parse(data.toString());
            } catch (e) {
                itemList = [];
            }
            done();
        }
    });
}

function updateItems(items, done) {
    fs.writeFile(filePath, JSON.stringify(items), function(err) {
        done();
    });
}


app.use('/', express.static(path.join(__dirname, "public_static")));


app.get('/fetchitems', function (req, res) {

    refreshItems(function () {
        res.send(itemList)
    })
});

app.post('/addtocart', function (req,res) {
    refreshItems(function () {
        res.send(itemList)
    })
});

app.post('/removefromcart', function(req, res) {
    refreshItems(function () {
        itemlist2=[]
         for(i=0;i<itemList.length;i++)
         {
             if(itemList[i]!=req.body.item)
                 itemList2.push(itemList[i]);
         }
         updateItems(itemList2,function(){
             res.redirect('/fetchitems')
         });
    });
});

app.post('/additems',function (req, res) {

console.log(req.body.a);
console.log(req.body.b);
console.log(req.body);
    refreshItems(function () {

        itemList.push(req.body);
        updateItems(itemList, function () {
            res.redirect('/fetchitems')
        })
    })


});


app.listen(4444, function () {
    console.log("Server started on http://localhost:4444");
});
