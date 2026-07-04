import {
  getUserByUsernameRepository,
  createUserRepository,
} from "../repositories/userRepository.js";

export async function loginService(username) {
  let user = await getUserByUsernameRepository(username);

  if (!user) {
    user = await createUserRepository(username);
  }

  return user;
}