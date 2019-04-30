
const constructorMethod = app =>{
    app.get("/", (req, res) => {
        res.render('check/isPrimehdb', {title: "Prime Number Checker"});
    });

    app.use("*", (req, res) => {
        res.redirect("/");
    });
};
module.exports = constructorMethod;
