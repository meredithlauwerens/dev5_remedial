import {
  createUserRepository, getUsersRepository,
  getUserByUsernameRepository,
} from "../repositories/userRepository.js";

export async function createUserService(data) {
  const username = data.username?.trim();

  if (!username) {
    throw new Error("Username is required");
  }

  const existingUser = await getUserByUsernameRepository(username);

  if (existingUser) {
    throw new Error("Username already exists");
  }

  return await createUserRepository(username);
}

export async function getUsersService() {
  return await getUsersRepository();
}