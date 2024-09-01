import db from "../config/db.js";

// return id
export const createCardItem = (req, res, next) => {
  try {
    const { card_id, title } = req.body;

    const query = db.prepare(
      "INSERT INTO card_items (card_id, title) VALUES(?, ?)"
    );
    const insertCardItem = query.run(card_id, title);
    if (insertCardItem?.changes !== 1) {
      return res.status(422).json({ message: "Unable to create" });
    }
    console.log("insertCardItem", insertCardItem);
    return res
      .status(200)
      .json({ id: insertCardItem?.lastInsertRowid, message: "Success" });
  } catch (error) {
    res.status(422).json(error);
  }
};

export const getCardItems = (req, res, next) => {
  const { cardid } = req.params;
  try {
    const query = db.prepare(
      `SELECT * FROM card_items WHERE card_id = ? AND is_active = 1`
    );
    const card = query.all(cardid);
    return res.status(200).json(card);
  } catch (error) {
    res.status(422).json(error);
  }
};

export const updateCardItem = (req, res, next) => {
  const { id } = req.params;
  const { title } = req.body;
  try {
    const query = db.prepare(`UPDATE card_items SET title = ? WHERE id = ?`);
    const updateCardItem = query.run(title, id);
    if (updateCardItem?.changes !== 1) {
      return res.status(422).json({ message: "Unable to update" });
    }
    return res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(422).json(error);
  }
};

export const archiveCardItem = (req, res, next) => {
  const { id } = req.params;
  try {
    const query = db.prepare(
      `UPDATE card_items SET is_active = 0 WHERE id = ?`
    );
    const archive = query.run(id);
    if (archive?.changes !== 1) {
      return res.status(422).json({ message: "Unable to archive" });
    }
    return res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(422).json(error);
  }
};
