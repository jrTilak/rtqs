import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
  names,
  starWars,
} from "unique-names-generator";

export const generateName = () => {
  return uniqueNamesGenerator({
    length: 2,
    separator: " ",
    style: "capital",
    dictionaries: [adjectives, colors, animals, names, starWars],
  });
};
