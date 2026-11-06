export const ADDRESS = {
  lines: ["Mount Moriah Mall", "Ayat, Kebre Demea", "Addis Ababa, Ethiopia"],
  query: "Mount Moriah Mall, Ayat, Addis Ababa",
};

// Placeholder numbers — replace with the gym's real lines.
export const PHONES = [
  { network: "Ethio telecom", display: "+251 911 234 567", tel: "+251911234567" },
  { network: "Safaricom", display: "+251 711 234 567", tel: "+251711234567" },
];

export const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS.query)}`;
export const MAPS_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS.query)}&output=embed`;
