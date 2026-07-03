import {
  createNpcService,
  getNpcsService,
} from "../services/npcService.js";

export async function createNpc(req, res) {
  try {
    const npc = await createNpcService(req.body);

    res.status(201).json(npc);
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message,
    });
  }
}

export async function getNpcs(req, res) {
  try {
    const npcs = await getNpcsService();

    res.json(npcs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}