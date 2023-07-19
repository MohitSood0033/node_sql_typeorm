import { GetUsers, CreateUser, LoginUser, UpdateUser, DeleteUser } from "../controllers/user";
import express, { Router } from "express";

const app = express();

export const routes = (router: Router) => {
  router.get("/get-user", GetUsers);
  router.post("/signup", CreateUser);
  router.post("/login", LoginUser);
  router.put("/update-user", UpdateUser);
  router.delete("/delete-user", DeleteUser);
};
