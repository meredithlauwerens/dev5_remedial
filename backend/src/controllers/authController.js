import { loginService } from "../services/authService.js";

export async function login(req, res) {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({
        message: "Username is required",
      });
    }

    const user = await loginService(username);

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}