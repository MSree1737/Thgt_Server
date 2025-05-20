import express from "express";

import { create_userregister } from "../controller/userregister.js";
import { userdata } from "../controller/userData.js";
import { createblog } from "../blog/createblog.js";
import { publishblog } from "../blog/publishblog.js";
import { login } from "../controller/login.js";
import { deleteblog } from "../blog/deleteblog.js";
import { updateblog } from "../blog/updateblog.js";
import { updateUser } from "../controller/updateUser.js";
import { blog_likes } from "../blog/bloglikes.js";
import { readblog } from "../blog/readblog.js";
const route = express.Router();

route.post("/user", create_userregister);
route.get("/user/:email",userdata);
route.post("/blogs",createblog);
route.get("/blogs/published",publishblog);
route.post("/login",login);
route.delete("/blogs/:id",deleteblog);
route.put("/blog/:blogId",updateblog);
route.put("/user/:email",updateUser);
route.post("/blogs/:blogId/like",blog_likes);
route.get("/blog/:blogId",readblog);

export default route;