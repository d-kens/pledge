import { User } from 'src/entity/user.entity';
import { RoleEnum } from 'src/enum/role.enum';

export class UserResponsedto {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  role: RoleEnum;

  constructor(user: User) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.phoneNumber = user.phoneNumber;
    this.email = user.email;
    this.role = user.role;
  }
}
