import * as morgan from 'morgan';
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';

import userRoutes from './api/routes/user';
import orderRoutes from './api/routes/orders';
import productRoutes from './api/routes/products';

import { ATLAS_URL } from './settings';

const app: express.Application = express();

interface ErrorWithStatus extends Error {
	status?: number;
}

mongoose.connect(ATLAS_URL, {
	useNewUrlParser: true
});

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
	res.header('Access-Control-Allow-Origin', '*');

	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');

		return res.status(200).json({});
	}

	next();
});


app.use('/user', userRoutes);
app.use('/orders', orderRoutes);
app.use('/products', productRoutes);


app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
	const error: ErrorWithStatus = new Error('Not found');

	error.status = 404;

	next(error);
});

app.use((error: ErrorWithStatus, req: express.Request, res: express.Response, next: express.NextFunction) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});

export default app;
