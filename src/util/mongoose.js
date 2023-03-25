const mutipleMongooseToObject = (array) => {
    return array.map((item) => item.toObject());
}
const MongooseToObject = (array) => {
    return array ? array.toObject() : array;
 }
 module.exports = {mutipleMongooseToObject,MongooseToObject}