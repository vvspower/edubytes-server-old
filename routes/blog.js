const BlogPosts = require("../models/BlogPosts");
const User = require("../models/User");
const Replies = require("../models/Replies");
const Liked = require("../models/Liked");
const ApprovalBlogPosts = require("../models/ApprovalBlogPosts");
var fetchuser = require("../middleware/fetchUser");
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

//  body {
//     "title": "hello"
//     "description": "helo"
//     "tag": "gello"
// }

router.post("/post", fetchuser, async (req, res) => {
  try {
    let success = false;
    const { title, description, tag } = req.body;
    let userid = req.user.id;

    console.log(title, description, tag, userid);

    const userdetails = await User.findById(userid).select("-password");

    const newblogpost = new BlogPosts({
      title: title,
      description: description,
      tag: tag,
      user: userid,
      username: userdetails.name,
    });

    // console.log(userdetails.name);

    const savedblogpost = await newblogpost.save();
    success = true;
    res.json({ success, savedblogpost });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.post("/approveBlog/:id", async (req, res) => {
  try {
    const approve = await ApprovalBlogPosts.findById(req.params.id);
    console.log(approve);

    if (!approve) {
      res.status(404).send("Not Found");
    }

    // if (advertisement.user.toString() !== req.user.id) {
    //   return res.status(401).send("Not Allowed");
    // }

    const newblog = new BlogPosts({
      title: approve.title,
      description: approve.description,
      tag: approve.tag,
      user: approve.user,
      username: approve.username,
    });

    const deleteapprove = await ApprovalBlogPosts.findByIdAndDelete(
      req.params.id
    );

    const saveblog = await newblog.save();
    res.json({ saveblog });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.put("/updateblog/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    const newpost = {
      title: title,
      description: description,
      tag: tag,
      user: req.user.id,
    };

    let newblogpost = await BlogPosts.findById(req.params.id);
    if (!newblogpost) {
      res.status(404).send("Not Found");
    }

    if (newblogpost.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    newblogpost = await BlogPosts.findByIdAndUpdate(
      req.params.id,
      {
        $set: newpost,
      },
      {
        new: true,
      }
    );

    res.json({ newblogpost });
  } catch (error) {
    console.log(error);

    res.status(500).send("Internal Server Error");
  }
});

router.delete("/deleteBlog/:id", fetchuser, async (req, res) => {
  try {
    let blogposts = await BlogPosts.findById(req.params.id);
    if (!blogposts) {
      res.status(404).send("Not Found");
    }

    if (blogposts.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    blogposts = await BlogPosts.findByIdAndDelete(req.params.id);
    res.json({
      success: "Your Blog has successfully been deleted",
      blogposts: blogposts,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/deleteNoAuthBlog/:id", async (req, res) => {
  try {
    let blogposts = await BlogPosts.findById(req.params.id);
    if (!blogposts) {
      res.status(404).send("Not Found");
    }

    blogposts = await BlogPosts.findByIdAndDelete(req.params.id);
    res.json({
      success: "Your Blog has successfully been deleted",
      blogposts: blogposts,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.get("/fetchuserblogs/:id", async (req, res) => {
  try {
    const blogpost = await BlogPosts.find({ user: req.params.id });
    res.json(blogpost);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.get("/fetchapprovalblog", async (req, res) => {
  try {
    const blogpost = await ApprovalBlogPosts.find({
      globalid: "blogposts",
    });
    res.json(blogpost);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.get("/fetchuserapprovalblog", fetchuser, async (req, res) => {
  try {
    const blogpost = await ApprovalBlogPosts.find({
      user: req.user.id,
    });
    res.json(blogpost);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.get("/fetchallblogposts", async (req, res) => {
  try {
    const blogposts = await BlogPosts.find({ globalid: "blogposts" });
    console.log(blogposts);

    res.json(blogposts);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.get("/fetchblog/:id", async (req, res) => {
  try {
    let blogposts = await BlogPosts.findById(req.params.id);
    console.log(blogposts);
    res.json(blogposts);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// id 62010004490dfdd34e6064e6

router.post("/reply/", fetchuser, async (req, res) => {
  try {
    const { reply, postid } = req.body;
    let userId = req.user.id;

    const user = await User.findById(userId).select("-password");

    const replies = new Replies({
      postid: postid,
      reply: reply,
      user: userId,
      name: user.name,
    });

    const savedreplies = await replies.save();
    res.json({ savedreplies });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.get("/fetchreplies/:id", async (req, res) => {
  try {
    const replies = await Replies.find({ postid: req.params.id });
    console.log(replies);

    res.json(replies);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.post("/likepost/:id", fetchuser, async (req, res) => {
  try {
    const { posttype } = req.body;

    let userId = req.user.id;

    const newLiked = new Liked({
      commentid: req.params.id,
      likedby: userId,
    });

    const savedLiked = await newLiked.save();

    let likedamount = await Liked.find({commentid: req.params.id , likedby: userId})
    console.log("/////////")
    console.log(likedamount)
    console.log("/////////")


    let newblogpost = await BlogPosts.findById(req.params.id);
    let newlikes = {
      likes: likedamount.length
    };
    console.log(newblogpost);

    newblogpost = await BlogPosts.findByIdAndUpdate(
      req.params.id,
      {
        $set: newlikes,
      },
      {
        new: true,
      }
    );
    console.log(newblogpost);

    res.json({ status: "done" });
    console.log(newLiked);

  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/unlikepost/:id", fetchuser, async (req, res) => {
  try {
    let userId = req.user.id;
    let liked = await Liked.findOneAndDelete({commentid: req.params.id , likedby: userId})


    let likedamount = await Liked.find({commentid: req.params.id , likedby: userId})

    let newblogpost = await BlogPosts.findById(req.params.id);
    let newlikes = {
      likes: likedamount.length
    };
    console.log(newblogpost);

    newblogpost = await BlogPosts.findByIdAndUpdate(
      req.params.id,
      {
        $set: newlikes,
      },
      {
        new: true,
      }
    );
    res.json({status: "done"})
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.get("/fetchliked/:id", fetchuser, async (req, res) => {
  try {
    let userId = req.user.id;
    let liked = await Liked.findOne({commentid: req.params.id , likedby: userId})
    if(liked) {
      res.json({liked: true})
    } else {
      res.json({liked: false})

    }
  
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});







module.exports = router;

// router.post("/post", fetchuser, async (req, res) => {
//   try {
//     let success = false;
//     const { title, description, tag } = req.body;
//     let userid = req.user.id;

//     console.log(title, description, tag, userid);

//     const userdetails = await User.findById(userid).select("-password");

//     const newblogpost = new BlogPosts({
//       title: title,
//       description: description,
//       tag: tag,
//       user: userid,
//       username: userdetails.name,
//     });

//     // console.log(userdetails.name);

//     const savedblogpost = await newblogpost.save();
//     success = true;
//     res.json({ success, savedblogpost });
//   } catch (error) {
//     res.status(500).send("Internal Server Error");
//   }
// });
