import { Router } from 'express';
import { RoomController } from './Controllers/RoomController';
import { SubjectController } from './Controllers/SubjectController';

const routes = Router();

routes.post('/subject', new SubjectController().create);

routes.post('/room', new RoomController().create);

routes.post('/room/:idRoom', new RoomController().createVideo);

routes.post('/room/:idRoom/subject', new RoomController().roomSubject);

routes.get('/room', new RoomController().list);


export default routes