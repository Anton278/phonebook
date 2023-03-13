import Router from "express";
import ContactsController from "../controllers/contactsController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = new Router();

router.get("", authMiddleware, ContactsController.getAll);
router.put("", authMiddleware, ContactsController.update);
router.delete("", authMiddleware, ContactsController.delete);
router.post("", authMiddleware, ContactsController.create);

export default router;
