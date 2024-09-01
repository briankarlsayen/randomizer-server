import express from "express";
import {
  archiveCardItem,
  createCardItem,
  getCardItems,
  updateCardItem,
} from "../controllers/cardItem.controller.js";

const router = express.Router();

router.route("/").post(createCardItem);
router.route("/:cardid").get(getCardItems);
router.route("/:id").put(updateCardItem);
router.route("/:id").delete(archiveCardItem);

export default router;
