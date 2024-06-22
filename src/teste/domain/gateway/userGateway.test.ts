import { User, UserProps } from "../../../main/domain/entities/user";
import { UserGateway } from "../../../main/domain/gateway/userGateway";

const userGatewayMock: jest.Mocked<UserGateway> = {
    save: jest.fn(),
    list: jest.fn(),
    listById: jest.fn(),
    delete: jest.fn()
};

jest.mock("../../../main/domain/gateway/userGateway", () => ({
    __esModule: true,
    UserGateway: jest.fn(() => userGatewayMock)
}));

describe("UserGateway", () => {
    it('list method should return a list of users', async () => {
        const user1: User = User.create('John Doe', 'john.doe@example.com', 'securepassword');
        const user2: User = User.create('Jane Doe', 'jane.doe@example.com', 'anotherpassword');
        const expectedUsers: User[] = [user1, user2];

        userGatewayMock.list.mockResolvedValue(expectedUsers);

        const users = await userGatewayMock.list();

        expect(users).toEqual(expectedUsers);
    });

    it('save method should save a user', async () => {
        const user: User = User.create('John Doe', 'john.doe@example.com', 'securepassword');
        await userGatewayMock.save(user);

        expect(userGatewayMock.save).toHaveBeenCalledWith(user);
    });

    it('listById method should return a user by id', async () => {
        const props: UserProps = {
            id: crypto.randomUUID().toString(),
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: 'securepassword'
        };
        const newUser = User.with(props);

        userGatewayMock.listById.mockImplementation(async (id: string) => {
            if (id === newUser.getId()) {
                return newUser;
            } else {
                throw new Error('User not found');
            }
        });
        const fetchedUser = await userGatewayMock.listById(newUser.getId());

        expect(fetchedUser).toEqual(newUser);
    });

    it('delete method should delete a user by id', async () => {
        const userId = crypto.randomUUID();
        await userGatewayMock.delete(userId);

        expect(userGatewayMock.delete).toHaveBeenCalledWith(userId);
    });
});
