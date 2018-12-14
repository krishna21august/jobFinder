const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Gig = require("../models/gig");

/*Get list of gigs */
router.get("/", (req, res) =>
  Gig.findAll()
    .then(gigs => {
      console.log(gigs);
      res.sendStatus(200);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    })
);

//add a new gig jsu to manually add the data this is not doen ideallly
router.get("/add", (req, res) => {
  const data = {
    title: "Project Manager",
    description: "3 year experience required",
    technologies: "JIRA,Agile",
    budget: "80000",
    contact_email: "anand.s@lucideustech.com"
  };

  let { title, description, technologies, budget, contact_email } = data;

  Gig.create({
    title,
    technologies,
    budget,
    contact_email,
    description
  })
    .then(gig => res.redirect("/gigs"))
    .catch(err => console.log(err));
});

module.exports = router;
