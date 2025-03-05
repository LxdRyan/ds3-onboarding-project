import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUserById(id: number): Promise<import("./dto/user.dto").UserDTO | null>;
    createUser(createUserDto: CreateUserDTO): Promise<import("./entities/user.entity").User>;
}
