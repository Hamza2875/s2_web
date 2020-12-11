var express = require("express");
var router = express.Router();
var Novel = require("../models/novel");
/* GET home page. */
router.get("/", async function (req, res, next) {
  let novels = await Novel.find();
  console.log(req.session.user);
  res.render("novels/list", { title: "Novels In DB", novels });
});
router.get("/add",  async function (req, res, next) {
  res.render("novels/add");
});
// store data in db
router.post("/add", async function (req, res, next) {
  console.log("Here")
  let novel = new Novel(req.body);
  await novel.save();
  res.redirect("/novels");
});
router.get("/delete/:id", async function (req, 
  res, next) {
  let novel = await Novel.findByIdAndDelete(req.params.id);
  res.redirect("/novels");
});
router.get("/cart/:id", async function (req, res, next) {
  let novel = await Novel.findById(req.params.id);
  console.log("Add This Novel in cart");
  let cart = [];
  if (req.cookies.cart) cart = req.cookies.cart;
  cart.push(novel);
  res.cookie("cart", cart);
  res.redirect("/novels");
});
router.get("/cart/remove/:id", async function (req, res, next) {
  let cart = [];
  if (req.cookies.cart) cart = req.cookies.cart;
  cart.splice(
    cart.findIndex((c) => c._id == req.params.id),
    1
  );
  res.cookie("cart", cart);
  res.redirect("/cart");
});
router.get("/edit/:id", async function (req, res, next) {
  let novel = await Novel.findById(req.params.id);
  res.render("novels/edit", { novel });
});
router.post("/edit/:id", async function (req, res, next) {
  let novel = await Novel.findById(req.params.id);
  novel.name = req.body.name;
  novel.price = req.body.price;
  await novel.save();
  res.redirect("/novels");
});

module.exports = router;