const express = require("express");
const app = express();
const port = 5000;
const path = require("path");
const { title } = require("process");
const config = require("./config/config.json");
const { Sequelize, QueryTypes, where } = require("sequelize");
const { type } = require("os");
const { UPDATE } = require("sequelize/lib/query-types");
const upload = require("./middlewares/upload-file");

const sequelize = new Sequelize(config.development);

const blogModel = require("./models").blog;

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "assets/views"));
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use(express.urlencoded({ extended: true }));

// Routing
app.get("/", home);
app.get("/Blog", Blog);
app.get("/add-blog", addBlogView);
app.post("/add-blog", upload.single("image"), addBlog);
app.get("/delete-blog/:id", deleteBlog);
app.get("/edit-blog/:id", editBlogView);
app.post("/edit-blog/:id", editBlog);
app.get("/contact", contactMe);
app.get("/Blog-detail/:id", blogDetail);
app.get("/testimonal", testimonials);

const dataBlog = [];

function home(req, res) {
  res.render("index");
}

async function Blog(req, res) {
  const result = await blogModel.findAll();

  res.render("Blog", { dataBlog: result });
}

async function editBlogView(req, res) {
  const { id } = req.params;

  const result = await blogModel.findOne({
    where: {
      id: id,
    },
  });

  if (!result) return res.render("not-found");
  res.render("edit-blog", { dataBlog: result });
}

async function editBlog(req, res) {
  const { id } = req.params;
  const { title, content } = req.body;

  const Blog = await blogModel.findOne({
    where: {
      id: id,
    },
  });

  if (!Blog) return res.render("not-found");

  Blog.title = title;
  Blog.content = content;

  await Blog.save();
  res.redirect("/Blog");
}

function addBlogView(req, res) {
  res.render("add-blog");
}

async function addBlog(req, res) {
  const { title, content } = req.body;
  const imagePath = req.file.path;
  await blogModel.create({
    title: title,
    content: content,
    image: imagePath,
  });
  res.redirect("/Blog");
}

async function deleteBlog(req, res) {
  let { id } = req.params;

  let result = await blogModel.findOne({
    where: {
      id: id,
    },
  });

  if (!result) return res.render("not-found");

  await blogModel.destroy({
    where: {
      id: id,
    },
  });
  res.redirect("/Blog");
}

function contactMe(req, res) {
  res.render("contact");
}

async function blogDetail(req, res) {
  const { id } = req.params;
  const result = await blogModel.findOne({
    where: {
      id: id,
    },
  });

  if (!result) return res.render("not-found");
  res.render("Blog-detail", { dataBlog: result });
}

function testimonials(req, res) {
  res.render("testimonal");
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
