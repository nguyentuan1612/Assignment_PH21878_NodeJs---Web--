const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJWt = require("passport-jwt").ExtractJwt;
require('dotenv').config();
//load up the user model
const User = require("../../models/User");
// trich xuat jwt token tu cookie
const cookieExtractor = (req) => {
    let token = null;
    if(req && req.cookies){
        token = req.cookies['jwt'];
    }
    return token;
}
//giai ma jwt token tu header authentication
module.exports = (passport) => {
    const opts = {};
    opts.jwtFromRequest = ExtractJWt.fromExtractors([
        ExtractJWt.fromAuthHeaderWithScheme("jwt"),
        cookieExtractor
    ])
    const secretKey = "asdfsdfyug34ygfhuvf";
    opts.secretOrKey =  secretKey;
    passport.use(new JwtStrategy(opts, async (jwt_payload,done) => {
        let user = await User.findById({_id:jwt_payload.id});
        if(user){
            done(null,user);
        }else{
            done(null,false);
        }
    }));
}
