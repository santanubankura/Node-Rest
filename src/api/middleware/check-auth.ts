import { verify } from 'jsonwebtoken';
import { JWT_KEY } from '../../settings';

/** Manage authentication using JSON Web Token **/

export default (req: any, res: any, next: any) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		req.userData = verify(token, JWT_KEY);
		next();
	} catch (error) {
		return res.status(401).json({ message: 'Auth failed', error });
	}
};
