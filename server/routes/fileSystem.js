import express from 'express';

// Controller
import { getSystemDir, getSystemInfo } from '../controller/fileSystem.js'

const router = express.Router();

router.get('/', getSystemInfo)
router.post('/', getSystemDir)


export default router;