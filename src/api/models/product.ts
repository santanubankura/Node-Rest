import * as mongoose from 'mongoose';
const product: mongoose.Schema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	productImage: {
		type: String,
		required: true
	}
});


export default mongoose.model('Product', product);
