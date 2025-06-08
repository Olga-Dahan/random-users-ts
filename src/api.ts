import { User } from './interfaces.js';

export async function fetchUsers(count: number = 10): Promise<User[]> {
  const response = await fetch(`https://randomuser.me/api/?results=${count}`);
  const data = await response.json();
  return data.results;
}