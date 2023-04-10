const jwt = require("jsonwebtoken");
const UserModel = require("../../models/User");
require("dotenv").config(); // su dung thu vien doc file env
const KEY = "asdfsdfyug34ygfhuvf"
const api_authJWT = async (req, res, next) => {
    let header_token = req.header("Authorization");

    console.log("header_token : " + header_token);

    if (typeof header_token == "undefined") {
        return res.status(403).json({ msg: "VUI LÒNG ĐĂNG NHẬP" });
    }

    const token = header_token.replace("Bearer ", "");

    try {
        const data = jwt.verify(token, "asdfsdfyug34ygfhuvf");
        console.log(data);
        const user = await UserModel.findById({ _id: data.id });
        if (!user) {
            throw new Error("Không xác định được người dùng");
        }
        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send({ error: error.message });
    }
};

const auth_session = async (req, res, next) => {
    if (req.session.token) {
        const decoded = jwt.verify(req.session.token.token,KEY );
        const now = Date.now() / 1000; // lấy thời gian hiện tại ở định dạng Unix time
        if (decoded.exp < now) {
            res.redirect("/login");
        } else {
            const idUser = await req.session.token.id;
            try {
                const element = await UserModel.findById({ _id: idUser });
                req.user = {
                    name: element.name,
                    _id: element._id,
                    admin: element.admin,
                    email: element.email,
                    image: element.image
                };
                next();
            } catch (err) {
                console.log(err);
                res.redirect("/login");
            }
        }

    } else {
        res.redirect("/login");
    }
};
module.exports = { api_authJWT, auth_session };
