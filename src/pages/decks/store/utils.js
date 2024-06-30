export const getModifiedCards = (item, isAdding, deck) => {
  const { cards } = deck;
  let newCards = [...cards];
  let countCards = deck.countCards;

  if (!cards.find((i) => i.id === `${item.chapter}_${item.id}`)) {
    if (isAdding) {
      const card = {
        id: `${item.chapter}_${item.id}`,
        quantity: 1,
      };
      newCards.push(card);
      countCards++;
    } else {
      return;
    }
  } else {
    newCards = newCards.map((c) => {
      if (c.id === `${item.chapter}_${item.id}`) {
        if (isAdding) {
          c.quantity++;
          countCards++;
        } else {
          c.quantity--;
          countCards--;
        }
      }
      return c;
    });
  }

  return { ...deck, countCards, cards: newCards };
};
