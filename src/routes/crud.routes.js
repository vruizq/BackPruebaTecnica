import { Router } from "express";
import { getCrud, getCrudById, updateById, deleteById, setCrud } from "../controllers/crud.controller.js";
const router= Router()

router.post('/crud',setCrud)
router.get('/crud', getCrud)
router.get('/crud/', getCrudById)
router.put('/crud/:Id',updateById)
router.delete('/crud/:Id',deleteById)

export default router;