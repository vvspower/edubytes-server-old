const Resource = require("../models/Resource");
const ApproveResource = require("../models/ApprovalResource");
var fetchuser = require("../middleware/fetchUser");
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

// Add link of resource to the API

router.post(
  "/resource",
  [
    body("name", "title cannot be blank").exists(),
    body("link", "link cannot be blank").exists(),
  ],
  fetchuser,
  async (req, res) => {
    try {
      let success = false;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, type, subject, link } = req.body;
      console.log(name , type , subject  , link)
      userid = req.user.id;

      console.log(userid)

      const resource = new Resource({
        name: name,
        type: type,
        subject: subject,
        user: userid,
        link: link,
      });

      const savedresource = await resource.save();
      success = true;

      res.json({ savedresource, success });
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  }
);

router.post("/approveResource/:id", async (req, res) => {
  try {
    const approve = await ApproveResource.findById(req.params.id);
    console.log(approve);

    if (!approve) {
      res.status(404).send("Not Found");
    }

    // if (advertisement.user.toString() !== req.user.id) {
    //   return res.status(401).send("Not Allowed");
    // }

    const newad = new Resource({
      name: approve.name,
      description: approve.description,
      type: approve.type,
      subject: approve.subject,
      user: approve.user,
      link: approve.link,
    });

    const deleteapprove = await ApproveResource.findByIdAndDelete(
      req.params.id
    );

    const savead = await newad.save();
    res.json({ savead });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.put("/updateresource/:id", fetchuser, async (req, res) => {
  const { name, description, type, subject, contact, price } = req.body;
  try {
    const newResource = {
      name: name,
      description: description,
      type: type,
      subject: subject,
      contact: contact,
      link: link,
    };

    let resource = await Resource.findById(req.params.id);
    if (!resource) {
      res.status(404).send("Not Found");
    }

    if (resource.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    resource = await Resource.findByIdAndUpdate(
      req.params.id,
      {
        $set: newResource,
      },
      {
        new: true,
      }
    );

    res.json({ resource });
  } catch (error) {
    console.log(error);

    res.status(500).send("Internal Server Error");
  }
});

router.delete("/deleteresource/:id", fetchuser, async (req, res) => {
  try {
    let resource = await Resource.findById(req.params.id);
    if (!resource) {
      res.status(404).send("Not Found");
    }

    if (resource.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    resource = await Resource.findByIdAndDelete(req.params.id);

    res.json({
      success: "Post has been deleted succecssfully",
      resource: resource,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.get("/fetchuserresources/:id", async (req, res) => {
  try {
    const resources = await Resource.find({ user: req.params.id });
    console.log("///")

    console.log(resources)
    res.json(resources);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.get("/fetchallresources", async (req, res) => {
  try {
    const resources = await Resource.find({ globalid: "resource" });
    res.json(resources);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.get("/fetchapprovalresource", async (req, res) => {
  try {
    const resource = await ApproveResource.find({
      globalid: "resource",
    });
    res.json(resource);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.get("/getUserId", fetchuser, async (req, res) => {
  try {
    let userId = req.user.id
    res.json(userId);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.get("/fetchuserapprovalresources", fetchuser, async (req, res) => {
  try {
    const resources = await ApproveResource.find({ user: req.user.id });
    res.json(resources);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
