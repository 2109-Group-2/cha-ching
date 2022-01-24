const {User} = require("../../db/models/User");

// o: do you plan on having more middleware files?
let auth = (req,res,next)=>{

    //Checking if the token is valid
    let token = req.cookies.ths_auth;

    User.findByToken(token,(err,user)=>{
        if(err) throw err;
        if(!user) return res.json({
            isAuth : false,
            error : true
        });
        req.token = token;
        req.user = user;
        next();
    })

}

module.exports = {auth};