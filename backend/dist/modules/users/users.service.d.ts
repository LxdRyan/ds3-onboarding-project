import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserDTO } from './dto/user.dto';
import { CreateUserDTO } from './dto/create-user.dto';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    getUserById(id: number): Promise<UserDTO | null>;
    getUserByUsername(username: string): Promise<User | null>;
    createUser(createUserDTO: CreateUserDTO): Promise<User>;
}
