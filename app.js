const Sequelize = require("sequelize");
const express = require("express");

const app = express();
const urlencoded = express.urlencoded({extended: false});

const sequelize = new Sequelize("lr1", "root", "", {
    dialect: 'mysql',
    host: 'localhost',
    define: {
        timestamps: false
    }
});

const Posts = sequelize.define("posts", {
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

sequelize.sync().then(() => {
    app.listen(3000);
})
