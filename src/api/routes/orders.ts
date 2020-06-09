import * as express from 'express';
import checkAuth from '../middleware/check-auth';
import { all, create, get, remove } from '../controllers/orders';

const router: express.Router = express.Router();

router.get('/', checkAuth, all);
router.post('/', checkAuth, create);
router.get('/:orderId', checkAuth, get);
router.delete('/:orderId', checkAuth, remove);

export default router;
