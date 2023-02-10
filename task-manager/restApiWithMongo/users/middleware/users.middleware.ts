import express from 'express';
import userService from '../services/user.service';
import debug from 'debug';

const log: debug.IDebugger = debug('app:users-controller');

class UsersMiddleware{
    async validateRequiredUserBodyFields(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction)
        {
            if(req.body && req.body.email && req.body.password){
                next();
            } else {
                res.status(400).send({
                    error: `Missing required fields email and password ${JSON.stringify(req.body)}`
                });
            }
        }
    

    async validateSameEmailBelongToSameUser(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction){
            const user = await userService.getUserByEmail(req.body.email);
            if (user && user.id === req.params.userId){
                res.status(400).send({error: `Invalid email ${user}`});
            } else{
                next();
            }       
        }
    async validateUserExists(req: express.Request,
        res: express.Response,
        next: express.NextFunction){
            if(await userService.getById(req.params.userId)){
                next();
            } else {
                res.status(400).send({error: `User ${req.params.userId} not found`});
            }
        }
        validatePatchEmail = async (
            req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ) => {
            if (req.body.email) {
                log('Validating email', req.body.email);
        
                this.validateSameEmailBelongToSameUser(req, res, next);
            } else {
                next();
            }
        };
    async extractUserId(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction) 
    {
        req.body.id = req.params.userId;
        next();
    }
    
}

export default new UsersMiddleware();