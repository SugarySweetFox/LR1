const Sequelize = require("sequelize");
const express = require("express");
const app = express();
const urlencoded = express.urlencoded({extended: false});
const bodyParser = require('body-parser') 
app.use(express.static('public')) 


const sequelize = new Sequelize("lr1", "root", "", {
    dialect: 'mysql',
    host: 'localhost',
    define: {
        timestamps: false
    }
});

const Post = sequelize.define("posts", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNulll: false
    },
    name: {
        type: Sequelize.STRING,
        allowNulll: false
    },
    date: {
        type: Sequelize.DATE,
        allowNulll: false
    },
    teg: {
        type: Sequelize.STRING,
        allowNulll: false
    },
    text: {
        type: Sequelize.STRING,
        allowNulll: false
    }
});

 
app.get('/blogs',  function(req, res) { 
    Post.findAll({raw: true,  
    }).then((date)=>{ 
        console.log(date) 
        res.render('blogs.hbs', {posts: date}) 
    }) 
}); 
 
 
app.get('/works', function(req, res) { 
    res.render('works.hbs'); 
}); 
 
app.get('/work-detailed', function(req, res) { 
    res.render('work-detailed.hbs'); 
}); 
 
app.get('/', function (req, res){ 
    res.render("index.hbs") 
}); 
 
app.post('/blogs', urlencoded, function(req, res) {
    const name = req.body.name;
    const date = req.body.date;
    const teg = req.body.teg;
    const text = req.body.text;

  
    Post.create({name: name, date: date, teg: teg, text: text}).then(() => {
        res.redirect('/blogs');  
    })
});

app.get('/delete/:id', function(req, res){
    const postsId = req.params.id;
    Post.destroy({
        where: {
            id: postsId
        }
    }).then(() => {
        res.redirect('/blogs');
    })
});


app.post('/update', urlencoded, function(req, res) {
    let id = req.body.id;
    let name = req.body.name;
    let date = req.body.date;
    let teg = req.body.teg;
    let text = req.body.text;

    Post.update({name: name, date: date, teg: teg, text: text}, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/blogs');
    })
});

app.get('/update/:id', function(req, res) {
    Post.findOne({
        where: {
            id: req.params.id
        }
    }).then((date) => {
        res.render('update.hbs', {posts: date})
    })
});





sequelize.sync().then(() => {
    app.listen(3000);
})
