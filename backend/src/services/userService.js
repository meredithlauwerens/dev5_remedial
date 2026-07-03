import { createUserRepository } from "../repositories/userRepository.js";

export async function createUserService(data) {
  const username = data.username?.trim();

  if (!username) {
    throw new Error("Username is required.");
  }

  return await createUserRepository(username);
}