import { Router } from 'express';
import { RoomController } from './Controllers/RoomController';
import { SubjectController } from './Controllers/SubjectController';
import { UserController } from './Controllers/UserController';
import { ApiError, BadRequesError } from './helpers/api-erros';

const routes = Router();

routes.post('/subject', new SubjectController().create);

routes.post('/room', new RoomController().create);

routes.post('/room/:idRoom', new RoomController().createVideo);

routes.post('/room/:idRoom/subject', new RoomController().roomSubject);

routes.get('/room', new RoomController().list);
// -----------------------------------------------------
routes.post('/user', new UserController().create);
routes.post('/login', new UserController().login);
routes.get('/profile', new UserController().getProfile)


export default routes
