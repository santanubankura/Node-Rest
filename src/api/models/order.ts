import * as mongoose from 'mongoose';

const order: mongoose.Schema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	product: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Product',
		required: true
	},
	quantity: {
		type: Number,
		default: 1
	}
});

export default mongoose.model('Order', order);
