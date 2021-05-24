const express = require("express");
const serverless = require("serverless-http");
const router = express.Router();
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const upload = multer();

const products = [
  {
    id: 1,
    title: "Diverse",
    description: "Diverse Men's Regular Formal Shirt",
    price: 719,
    image:
      "https://images-na.ssl-images-amazon.com/images/I/81qlnA0rJEL._UL1500_.jpg",
  },
  {
    id: 2,
    title: "Ontarious",
    description:
      "Ontarious Look Men's Cotton Digital Printed Half Sleeves Shirt",
    price: 499,
    image:
      "https://images-na.ssl-images-amazon.com/images/I/81L%2BUQEkG7S._UL1500_.jpg",
  },
];

router.get("/", (req, res) => {
  res.status(200).send("Welcome to Express REST API");
});

router.get("/items", (req, res) => {
  res.status(200).send(products);
});

router.post("/items", (req, res) => {
  if (!req.body.title || req.body.title.length == 0) {
    res.status(204).send("Title is required");
    return;
  } else {
    const product = {
      id: products.length + 1,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      image: req.body.image,
    };
    products.push(product);
    res.status(201).send({
      message: "item added successfully",
      product,
    });
  }
});

router.get("/items/:id", (req, res) => {
  var itemsData = products.filter((product) => {
    if (product.id == req.params.id) {
      return true;
    }
  });
  if (itemsData.length == 1) {
    res.json(itemsData[0]);
  } else {
    res.status(404);
    res.json({ message: "items Not Found" });
  }
});

router.delete("/items/:id", (req, res) => {
  var deleteItems = products
    .map((product) => {
      return product.id;
    })
    .indexOf(req.params.id);

  if (deleteItems === 1) {
    res.status(404).json({ message: "Not found" });
  } else {
    products.splice(deleteItems, 1);
    res.send({ message: "item id " + req.params.id + " removed." });
  }
});

router.put("/items/:id", (req, res) => {
  if (
    !req.body.title ||
    req.body.description ||
    req.body.price ||
    req.body.image ||
    req.body.title.length ||
    req.body.description ||
    req.body.price ||
    req.body.image == 0
  ) {
    res.status(204).send("Title is Required");
    return;
  } else {
    const id = parseInt(req.params.id, 10);
    const updatedItems = {
      id: id,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      image: req.body.image,
    };
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        products[i] = updatedItems;
        return res.status(201).send({
          success: "true",
          message: "item Updated successfully",
          updatedItems,
        });
      }
    }
    return res.status(404).send({
      message: "error in item update",
    });
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(upload.array());
app.use("/", router);

module.exports.handler = serverless(app);
