const router = require("express").Router();
let restaurant = require("../models/restaurant.model");
//Search by text
router.route("/search").get((req, res) => {
  const search = req.query.q;  
  //console.log(search);      -subway
  restaurant.find({ $text: { $search: search } }).then((restaurant) => res.json(restaurant))
       .catch((err) => res.status(400).json("Error: " + err));
});

//favourite restaurants
router.route("/fav").get((req, res) => {
  const search = req.query.fav;  
  const favourite = search.split(',');
  restaurant.find({ '_id': { $in: favourite } }).then(restaurant => res.json(restaurant))
  .catch((err) => res.status(400).json("Error: " + err));  
});

//Search by Tags(filter)
router.route("/tag/:tag").get((req, res) => {
  const tag = req.params.tag;
  restaurant.find({tags : tag}).then((restaurant) => res.json(restaurant))
       .catch((err) => res.status(400).json("Error: " + err));
});

//photo
router.route("/photo/:id").get((req, res) => {
const id = req.params.id;
restaurant.findById(id).then((restaurant) => res.json(restaurant.photo))
       .catch((err) => res.status(400).json("Error: " + err));
});

//Sort by location, rating and ETA
router.route("/:id").get((req, res) => {
  const id = req.params.id;
  // console.log(id);   -   location
  const sortOrder = id === "location" ?  {location: 1} : id === "rating" ?
   {rating: 1} : (id === "ETA") ? {ETA: 1} : {} ;
  //console.log(sortOrder);  - {location:1}
  restaurant.find().sort(sortOrder).then((restaurant) => res.json(restaurant))
       .catch((err) => res.status(400).json("Error: " + err));
});

//Return list of all restaurants
router.route("/").get((req, res) => {
  restaurant
    .find()
    .then((restaurant) => res.json(restaurant))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
