import {User, UserProps} from '../../../main/domain/entities/user';

describe('User Tests', () => {    

     it('should create a new user instance using create method', () => {
        const testUser = User.create('John Doe', 'john.doe@example.com', 'securepassword');
        expect(testUser).toBeInstanceOf(User);
        expect(testUser.getName()).toBe('John Doe');
        expect(testUser.getEmail()).toBe('john.doe@example.com');
        expect(testUser.getPassword()).toBe('securepassword');
    }); 

    it('should create a new user instance using with method', () => {
        const props: UserProps = {
            id: crypto.randomUUID().toString(),
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: 'securepassword'
        };

        const newUser = User.with(props)
        expect(newUser).toBeInstanceOf(User);
        expect(newUser.getId()).toHaveLength(36);
        expect(newUser.getName()).toBe('John Doe');
        expect(newUser.getEmail()).toBe('john.doe@example.com');
        expect(newUser.getPassword()).toBe('securepassword');
    });

    it('should set name correctly', () => {
        const testUser = User.create('John Doe', 'john.doe@example.com', 'securepassword');
        testUser.setName('Jane Doe');
        expect(testUser.getName()).toBe('Jane Doe');
    });

    it('should set email correctly', () => {
        const testUser = User.create('John Doe', 'john.doe@example.com', 'securepassword');
        testUser.setEmail('jane.doe@example.com');
        expect(testUser.getEmail()).toBe('jane.doe@example.com');
    });

    it('should set password correctly', () => {
        const testUser = User.create('John Doe', 'john.doe@example.com', 'securepassword');
        testUser.setPassword('newpassword');
        expect(testUser.getPassword()).toBe('newpassword');
    });

});
