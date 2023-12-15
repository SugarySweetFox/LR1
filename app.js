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
 

sequelize.sync().then(() => {
    app.listen(3000);
})
