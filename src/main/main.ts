import { User } from "./domain/entities/user"

const newUser = User.create('John Doe', 'john.doeexample.com', 'securepassword');
console.log(newUser.getId())