export const getFileNameCard = (item) => {
  let name = `chapter_${item.chapter}_`;
  if (item.id < 10) {
    name = name.concat("0");
  }
  if (item.id < 100) {
    name = name.concat("0");
  }
  name = name.concat(item.id?.toString());
  name = name.concat(".png");
  return name;
};

export const getFileNameCardDeck = (id) => {
  const [part1, part2] = id.split("_");
  const formattedPart2 = part2.padStart(3, "0");

  return `chapter_${part1}_${formattedPart2}.png`;
};
