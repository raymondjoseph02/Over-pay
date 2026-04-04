import type { User } from "../types/type";
import UserProfileImage from "../assets/img/user-profile.png";

export const appUsers: User[] = [
  {
    id: "1",
    name: "Alesia Karapova",
    email: "alesia.karapova@example.com",
    role: "user",
    profilePictureUrl: UserProfileImage,
    accountType: "Business",
  },

  {
    id: "3",
    name: "Admin User",
    email: "admin@overpay.com",
    role: "admin",
    profilePictureUrl: undefined,
    accountType: "Business",
  },
];
