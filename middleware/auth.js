const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.isLoggedIn = async function(req,res,next){
    try {
        const { token } = req.cookies;
        if(token){
            const decoder = jwt.verify(token,process.env.JW);
            req.user = await User.findById(decoder.id).select("-password");

            return next();
        }else res.status(401).json({message: "not authentified"});
    } catch (error) {
        res.status(400).json({message: "error in auth middleware", error:error });
    }
}
exports.isAdmin = async function(req,res,next){
    try {
        
        const { token } = req.cookies;
        if(token){
            const decoder = jwt.verify(token,process.env.JW);
            let admin = await User.findById(decoder.id).select("-password");
           
           if(admin.isAdmin)
            return next();
            else {
                return res.status(403).json({message: "you're not the admin"});
            }
           
        }else res.status(403).json({message: "not authentified"});
    } catch (error) {
        res.status(400).json({message: "error in auth middleware", error:error });
    }
}