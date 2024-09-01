import db from "../config/db.js";

export const createCard = (req, res, next) => {
  try {
    const query = db.prepare("INSERT INTO cards (is_active) VALUES(1)");
    const insertCard = query.run();
    if (insertCard?.changes !== 1) {
      return res.status(422).json({ message: "Unable to create" });
    }
    console.log("insertCard", insertCard);
    return res
      .status(201)
      .json({ id: insertCard?.lastInsertRowid, message: "Success" });
  } catch (error) {
    res.status(422).json(error);
  }
};

export const getCards = (req, res, next) => {
  try {
    const query = `SELECT cards.id, card_items.title, cards.created_at  FROM cards LEFT JOIN card_items ON cards.selected_id = card_items.id WHERE cards.is_active = 1 ORDER BY cards.id DESC`;
    // const query = `SELECT * FROM cards WHERE is_active = 1`;
    const cards = db.prepare(query).all();
    const newCards = [];

    Promise.all(
      cards.map(async (card) => {
        const getItems = db.prepare(
          `SELECT * FROM card_items WHERE card_id = ? AND is_active = 1`
        );
        const items = getItems.all(card?.id);
        newCards.push({ ...card, list: items });
      })
    );

    console.log("newCards", newCards);

    return res.status(200).json(newCards);
  } catch (error) {
    res.status(422).json(error);
  }
};

// return title from selected card item
export const viewCard = async (req, res, next) => {
  const { id } = req.params;
  try {
    const raw = `SELECT cards.id, card_items.title FROM cards LEFT JOIN card_items ON cards.selected_id = card_items.id WHERE cards.id = ?`;
    const query = db.prepare(raw);
    // const query = db.prepare(`SELECT * FROM cards WHERE id = ?`);
    const card = query.get(id);

    const getItems = db.prepare(
      `SELECT * FROM card_items WHERE card_id = ? AND is_active = 1`
    );
    const items = getItems.all(id);

    const response = {
      ...card,
      items,
    };

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(422).json(error);
  }
};

export const selectItem = (req, res, next) => {
  const { id } = req.params;
  const { selected_id } = req.body;
  try {
    const query = db.prepare(`UPDATE cards SET selected_id = ? WHERE id = ?`);
    const updateSelected = query.run(selected_id, id);
    if (updateSelected?.changes !== 1) {
      return res.status(422).json({ message: "Unable to select" });
    }
    return res.status(201).json({ message: "Success" });
  } catch (error) {
    res.status(422).json(error);
  }
};

export const archiveCard = (req, res, next) => {
  const { id } = req.params;
  try {
    const query = db.prepare(`UPDATE cards SET is_active = 0 WHERE id = ?`);
    const archive = query.run(id);
    if (archive?.changes !== 1) {
      return res.status(422).json({ message: "Unable to archive" });
    }
    return res.status(201).json(archive);
  } catch (error) {
    res.status(422).json(error);
  }
};
