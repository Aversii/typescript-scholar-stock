import { User } from "./domain/entities/user"

const newUser = User.create('John Doe', 'john.doe@example.com', 'securepassword');
console.log(newUser.getId())