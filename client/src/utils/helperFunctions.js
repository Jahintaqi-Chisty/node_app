export const toTitleCase = (str, splitter = " ", joiner = " ") =>
  str
    .split(splitter)
    .map((txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
    .join(joiner);
