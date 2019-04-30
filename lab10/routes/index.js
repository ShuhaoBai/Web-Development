const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const usersData = require("../data/users");

let username = "";

const checkAuth = async (req, res, next) => {
    if (req.session.AuthCookie) {
        next();
    } else {
        res.status(403).render('static/notLoggedIn');
    }
};

router.get("/", async function (req, res) {
    if (req.session.AuthCookie) {
        res.redirect("/private");
    } else {
        res.redirect("/login");
    }
});

router.get("/login", async function (req, res) {
    res.render("static/login");
});

router.post("/login", async function (req, res) {
    const inputUsername = req.body.username;
    const myPlainTextPassword = req.body.password;
    if (inputUsername === "" || myPlainTextPassword === "") {
        res.status(401).render('static/error');
    } else {
        let hash = '';
        for (let i in usersData.users) {
            if (usersData.users[i].username == inputUsername) {
                hash = usersData.users[i].hashedPassword;
                break;
            }
        };

        const bool = await bcrypt.compare(myPlainTextPassword, hash);
        if (bool) {
            req.session.AuthCookie = 1;
            username = inputUsername;
            res.redirect("/");
        } else {
            username = "";
            res.status(401).render('static/error');
        }
    }
});

router.get("/private", checkAuth, async function (req, res) {
    res.render("static/private", {
        username: username,
        id: usersData.searchForUser(username)._id,
        firstName: usersData.searchForUser(username).firstName,
        lastName: usersData.searchForUser(username).lastName,
        profession: usersData.searchForUser(username).profession,
        bio: usersData.searchForUser(username).bio
    });
});

router.get("/logout", async (req, res) => {
    req.session.destroy();
    res.redirect("/");
})

router.get("*", async (req, res) => {
    res.redirect("/");
})

module.exports = router;