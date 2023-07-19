import { Request, Response } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/users";
import bcrypt from "bcrypt";

const repository = AppDataSource.manager.getRepository(User);

export const GetUsers = async (req: Request, res: Response) => {
  const user = await repository.find({});

  return res.status(200).json(user);
};

export const CreateUser = async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, email, password } = req.body.user;
    console.log(req.body);

    if (!(first_name && last_name && email && password)) {
      return res.status(400).json({ message: "All input is required" });
    }

    const oldUser = await repository.findOne({
      where: { email: email },
    });

    if (oldUser) {
      return res.status(409).json({ message: "User already exist" });
    }
    const encryptedPassword = await bcrypt.hash(password, Number(10));
    const createUser = await repository.save({
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: encryptedPassword,
    });
    return res
      .status(200)
      .json({ message: "User created successfully", createUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const LoginUser = async (req: Request, res: Response) => {
  try {
    if (!(req.body.email && req.body.password)) {
      return res.status(400).json({ message: "All input is required" });
    }

    const oldUser = await repository.findOne({
      where: { email: req.body.email },
    });

    if (!oldUser) {
      res
        .status(409)
        .json({ message: "User Not Exist. Please Register First" });
    }
    const getUser = await repository.findOne({
      where: { email: req.body.email },
    });
    if (getUser) {
      const password = getUser?.password;
      console.log(password);

      const verifyPassword = await bcrypt.compare(req.body.password, password);

      if (verifyPassword) {
        return res
          .status(200)
          .json({ message: "User Login Successfull", getUser });
      }
      if (!verifyPassword) {
        return res.status(400).json({ message: "Password not matched" });
      }
    } else {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const UpdateUser = async (req: Request, res: Response) => {
  try {
    const { u_id, first_name, last_name, email, password } = req.body;

    const updateUser = await repository.findOne({ where: { id: u_id } });
    if (!updateUser) {
      return res.status(400).json({ message: "User doesn't exist" });
    }
    console.log(password);

    const encryptedPassword = await bcrypt.hash(password, Number(10));
    if (updateUser) {
      let result = await repository.update(u_id, {
        id: u_id,
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: encryptedPassword,
      });
      const updateUser = await repository.findOne({ where: { id: u_id } });

      return res.status(202).json({
        message: "User Updated Successfully",
        updateUser,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const DeleteUser = async (req: Request, res: Response) => {
  try {
    const { u_id } = req.body;

    const getUser = await repository.findOne({ where: { id: parseInt(u_id) } });

    if (!getUser) {
      return res.status(400).send({ message: "User doesn't exist" });
    }
    await repository.delete(u_id);
    if (u_id) {
      return res.status(200).send({
        message: "Deleted Successfully",
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: "Something went wrong",
    });
  }
};
