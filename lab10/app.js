const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const exphandlebars = require("express-handlebars");
const session = require("express-session");
const index = require("./routes/index");

app.use("/public", express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    name: 'AuthCookie',
    secret: 'some secret string!',
    resave: false,
    saveUninitialized: true
}));
app.engine('handlebars', exphandlebars({ defaultLayout: "main" }));
app.set('view engine', 'handlebars');

var Logging = (req, res, next) => {
    const CurrentTimestamp = new Date().toUTCString();
    const RequestMethod = req.method;
    const RequestRoute = req.originalUrl;
    let authStating = "";
    if (req.session.AuthCookie) {
        authStating = "(Authenticated User)";
    } else {
        authStating = "(Non-Authenticated User)";
    }
    console.log("[" + CurrentTimestamp + "]:" + RequestMethod + " /" + RequestRoute + " " + authStating);
    next();
}
app.use(Logging);
app.use("/", index);
app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});