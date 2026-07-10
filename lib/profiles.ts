export const PROFILES = {
  Ash: {
    name: "Ash",
    avatar: "/profile-pictures/Ash.png",
  },
  Cooper: {
    name: "Cooper",
    avatar: "/profile-pictures/Cooper.png",
  },
  Dani: {
    name: "Dani",
    avatar: "/profile-pictures/Dani.png",
  },
  Mira: {
    name: "Mira",
    avatar: "/profile-pictures/Mira.png",
  },
  Scott: {
    name: "Scott",
    avatar: "/profile-pictures/Scott.png",
  },
  Tessa: {
    name: "Tessa",
    avatar: "/profile-pictures/Tessa.png",
  },
} as const;

export type ProfileName = keyof typeof PROFILES;
