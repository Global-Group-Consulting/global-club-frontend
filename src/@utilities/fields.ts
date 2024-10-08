import { User, UserBasic } from '@/@types/User';

/**
 * Returns the user name formatted as "firstName lastName"
 */
export function formatUserName (user: UserBasic | User) {
  if (!user || !user.firstName || !user.lastName) {
    return "..."
  }
  
  return (user.firstName + " " + user.lastName).trim();
}

/**
 * Due to legacy code, some users has a _id field and some other has a id field.
 * This functions aims to simplify the process of reading the id regardless the name of the id key
 */
export function getUserId (user: UserBasic) {
  return user["id"] ?? user["_id"] ?? null
}
