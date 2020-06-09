import * as http from 'http';
import app from './app';
import { PORT } from './settings';

const server = http.createServer(app);

server.listen(PORT);
