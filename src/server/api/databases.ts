import express, { Router, Request, Response } from "express";

const router: Router = express.Router();

router.get('/list', async (req: Request, res: Response) => {
  console.log('get /list with query: ', req.query);
  return res.status(200).json({ code: 200, data: [], msg: '' });
})

export default router;