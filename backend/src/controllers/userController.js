import {
  createUserService,
  getUsersService,
} from "../services/userService.js";

export async function createUser(req, res) {
  try {
    const user = await createUserService(req.body);

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}

export async function getUsers(req, res) {
  try {
    const users = await getUsersService();

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}