const experss = require("express");
const app = experss();
const { searchProduct } = require("./pupetter");
const cors = require("cors");

const port = process.env.PORT || 8080;

app.use(cors());
app.use(experss.json());

const websiteUrl = "https://www.zap.co.il";

app.post("/product/:name", async (req, res, next) => {
  const name = req.params.name;
  const bestRated = req.body && req.body.bestRated;
  console.log(bestRated, name);
  try {
    const productUrl = await searchProduct(name, bestRated);
    return res.send(`${websiteUrl}${productUrl}`);
  } catch (err) {
    console.log(err);
    res.status(404).send("could not find product");
  }
});

app.use((req, res) => {
  res.status(404).send("unkown endpoint");
});

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
