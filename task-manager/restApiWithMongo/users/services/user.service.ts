import UsersDao from "../daos/users.dao";
import { CRUD } from "../../common/interfaces";
import { CreateUserDto, PutUserDto, PatchUserDto } from "../dto/create.user.dto";

class UsersService implements CRUD{
    async create(resource: CreateUserDto) {
        return UsersDao.addUser(resource);
    }

    async deleteById(id: string) {
        return UsersDao.removeUserById(id);
    }

    async list(limit: number, page: number) {
        const u = UsersDao.getUsers();
        return u;
    }

    async patchById(id: string, resource: PatchUserDto) {
        return UsersDao.patchUserById(id, resource);
    }

    async getById(id: string) {
        return UsersDao.getUserById(id);
    }

    async putById(id: string, resource: PutUserDto) {
        return UsersDao.putUserBydId(id, resource);
    }

    async getUserByEmail(email: string) {
        return UsersDao.getUserByEmail(email);
    }
}
export default new UsersService();