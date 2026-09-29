export const site = {
  name: "Kura",
  description:
    "Kura is a software team that designs, builds and runs scalable systems, from the database schema to the interface.",
  // Placeholder address. Replace with the team's real inbox before launch.
  email: "hello@kura.dev",
};

// Each page is a sheet in the set of drawings.
export const navigation = [
  { href: "/philosophy", label: "Philosophy", sheet: "K-01" },
  { href: "/systems", label: "Systems", sheet: "K-02" },
  { href: "/work", label: "Work", sheet: "K-03" },
] as const;
