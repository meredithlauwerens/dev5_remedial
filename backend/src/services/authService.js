import {
  getUserByUsernameRepository,
  createUserRepository,
} from "../repositories/userRepository.js";

export async function loginService(username) {
  let user = await getUserByUsernameRepository(username);

  // Creates a new user when the username does not already exist
  if (!user) {
    user = await createUserRepository(username);
  }

  return user;
}