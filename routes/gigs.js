const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Gig = require("../models/gig");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

/*Get list of gigs.If key and value of object same, we can just go with keys */
router.get("/", (req, res) =>
  Gig.findAll()
    .then(gigs => {
      console.log(gigs);
      res.render("gigs", { gigs });
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    })
);

//view form page to add gigs
router.get("/add", (req, res) => {
  res.render("add");
});

//add a new gig jsu to manually add the data this is not doen ideallly
router.post("/add", (req, res) => {
  let { title, description, technologies, budget, contact_email } = req.body;
  let errors = [];

  if (!title) {
    errors.push({ text: "title is required" });
  }

  if (!description) {
    errors.push({ text: "description is required" });
  }

  if (!technologies) {
    errors.push({ text: "technology is required" });
  }

  if (!contact_email) {
    errors.push({ text: "contact email is required" });
  }

  if (errors.length > 0) {
    res.render("add", {
      errors,
      title,
      technologies,
      budget,
      contact_email,
      description
    });
  } else {
    if (!budget) {
      budget = "unknown";
    } else {
      budget = `$${budget}`;
    }
    technologies = technologies.toLowerCase().replace(/, /g, ",");

    Gig.create({
      title,
      technologies,
      budget,
      contact_email,
      description
    })
      .then(gig => res.redirect("/gigs"))
      .catch(err => console.log(err));
  }
});

router.get("/search", (req, res) => {
  const { term } = req.query;
  Gig.findAll({ where: { technologies: { [Op.like]: "%" + term + "%" } } })
    .then(gigs => res.render("gigs", { gigs }))
    .catch(err => console.log(err));
});

module.exports = router;
