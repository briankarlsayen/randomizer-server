import express from "express";
import {
  archiveCard,
  createCard,
  getCards,
  selectItem,
  viewCard,
} from "../controllers/card.controller.js";
const router = express.Router();

router.route("/").post(createCard);
router.route("/").get(getCards);
router.route("/select/:id").put(selectItem);
router.route("/:id").get(viewCard);
router.route("/:id").delete(archiveCard);

export default router;
