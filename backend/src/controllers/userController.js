import { createUserService } from "../services/userService.js";

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