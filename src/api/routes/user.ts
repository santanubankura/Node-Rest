import * as express from 'express';
import checkAuth from '../middleware/check-auth';
import { login, signUp, remove } from '../controllers/user';

const router: express.Router = express.Router();

router.post('/login', login);
router.post('/signup', signUp);
router.delete('/:userId', checkAuth, remove);

export default router;
