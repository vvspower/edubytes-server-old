const Advertisement = require("../models/Advertisement");
const ApprovalAdvertisement = require("../models/ApprovalAdvertisement");
var fetchuser = require("../middleware/fetchUser");
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

router.post(
  "/postAd",
  [
    body("name", "title cannot be blank").exists(),
    body("subject", "Please select appropriate Subject").exists(),
    body("contact", "Please include appropriate contact number").exists(),
  ],
  fetchuser,
  async (req, res) => {
    try {
      let success = false;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { name,subject, institution , contact, price  , image} = req.body;
      let userId = req.user.id;
      
     
 
      const newapproval = new Advertisement({
        name: name,
        subject: subject,
        institution: institution,
        contact: contact,
        user: userId,
        price: price,
        image: image,
      });

   

      const savedad = await newapproval.save();
      success = true;
      res.json({ savedad, success });
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  }
);

router.post("/approveAd/:id", async (req, res) => {
  try {
    const approve = await ApprovalAdvertisement.findById(req.params.id);
 

    if (!approve) {
      res.status(404).send("Not Found");
    }

    // if (advertisement.user.toString() !== req.user.id) {
    //   return res.status(401).send("Not Allowed");
    // }

    const newad = new Advertisement({
      name: approve.name,
      description: approve.description,
      level: approve.level,
      subject: approve.subject,
      email: approve.email,
      whatsapp: approve.whatsapp,
      user: approve.user,
      price: approve.price,
    });

    const deleteapprove = await ApprovalAdvertisement.findByIdAndDelete(
      req.params.id
    );

    const savead = await newad.save();
    res.json({ savead });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.put("/updateAd/:id", fetchuser, async (req, res) => {
  const { name, description, level, subject, email, contact, price } =
    req.body;
  try {
    const newAd = {
      name: name,
      description: description,
      level: level,
      subject: subject,
      email: email,
      contact: contact,
      price: price,
    };

    let advertisement = await Advertisement.findById(req.params.id);
    if (!advertisement) {
      res.status(404).send("Not Found");
    }

    if (advertisement.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    advertisement = await Advertisement.findByIdAndUpdate(
      req.params.id,
      {
        $set: newAd,
      },
      {
        new: true,
      }
    );

    res.json({ advertisement });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/deleteAd/:id", fetchuser, async (req, res) => {
  try {
    let advertisement = await Advertisement.findById(req.params.id);
    if (!advertisement) {
      res.status(404).send("Not Found");
    }

    if (advertisement.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    advertisement = await Advertisement.findByIdAndDelete(req.params.id);
    res.json({
      success: "Advertisement has successfully been deleted",
      advertisement: advertisement,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.get("/fetchuserads/:id", async (req, res) => {
  try {
    const advertisement = await Advertisement.find({ user: req.params.id });
    res.json(advertisement);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.get("/fetchallads", async (req, res) => {
  try {
    const advertisement = await Advertisement.find({
      globalid: "advertisement",
    });
    console.log(advertisement)
    res.json(advertisement);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.get("/fetchapprovalads", async (req, res) => {
  try {
    const advertisement = await ApprovalAdvertisement.find({
      globalid: "advertisement",
    });
    res.json(advertisement);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.get("/fetchuserapprovalads", fetchuser, async (req, res) => {
  try {
    const advertisement = await ApprovalAdvertisement.find({
      user: req.user.id,
    });
    console.log(advertisement)
    res.json(advertisement);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

//fetch user approval ads

module.exports = router;
