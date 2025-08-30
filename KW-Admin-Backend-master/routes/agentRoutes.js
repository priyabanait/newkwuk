import express from 'express';
import { syncAgentsFromKWPeople, syncAgentsFromMultipleKWPeople, getFilteredAgents, fetchPropertiesWithAgents } from '../controllers/agentController.js';

const router = express.Router();

router.post('/sync', syncAgentsFromKWPeople);
router.get('/agents/merge', getFilteredAgents);
router.get('/agents/merge/multiple', syncAgentsFromMultipleKWPeople);
router.post('/properties', fetchPropertiesWithAgents);


export default router;