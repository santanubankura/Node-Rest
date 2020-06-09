import * as multer from 'multer';
import * as express from 'express';
import checkAuth from '../middleware/check-auth';
import { all, create, get, update, remove } from '../controllers/products';

const router: express.Router = express.Router();

const storage: multer.StorageEngine = multer.diskStorage({
	destination(req: express.Request, file: Express.Multer.File, cb: (error: Error, destination: string) => void) {
		cb(null, './uploads/');
	},
	filename(req: express.Request, file: Express.Multer.File, cb: (error: Error, filename: string) => void) {
		cb(null, new Date().toISOString() + file.originalname);
	}
});


const fileFilter = (
	req: express.Request,
	file: Express.Multer.File,
	cb: (error: Error, save: boolean) => void
): void => {
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
		cb(null, true);
	} else {
		cb(null, false);
	}
};


const upload: any = multer({
	storage,
	fileFilter,
	limits: {
		fileSize: 1024 * 1024 * 5
	}
});


router.get('/', all);
router.post('/', checkAuth, upload.single('productImage'), create);
router.get('/:productId', get);
router.patch('/:productId', checkAuth, update);
router.delete('/:productId', checkAuth, remove);

export default router;
