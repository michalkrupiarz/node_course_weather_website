import {CommonRoutesConfig} from '../common/common.routes.config';
import UsersController from './controllers/users.controller';
import UsersMiddleware from './middleware/users.middleware';
import express from 'express';
import usersMiddleware from './middleware/users.middleware';

export class UsersRoutes extends CommonRoutesConfig {
    constructor(app: express.Application){
        super(app, 'UserRoutes');
    }

    configureRoutes(): express.Application{

        this.app.route('/users')
            .get(UsersController.listUsers)
            .post(UsersMiddleware.validateRequiredUserBodyFields,
                UsersMiddleware.validateSameEmailBelongToSameUser,
                UsersController.createUser);

        this.app.param('userId', UsersMiddleware.extractUserId);

        this.app.route('/users/:userId')
            .all(UsersMiddleware.validateUserExists)
            .get(UsersController.getUserById)
            .delete(UsersController.removeUser);

        this.app.put('/users/:userId', [
            UsersMiddleware.validateRequiredUserBodyFields,
            UsersMiddleware.validateSameEmailBelongToSameUser,
            UsersController.putUser]);

        this.app.patch(`/users/:userId`, [
            UsersMiddleware.validatePatchEmail,
            UsersController.patchUser]);

        return this.app;
    }
}