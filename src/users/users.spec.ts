import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';

export const mockModel = {
  find: jest.fn().mockReturnThis(),
  exec: jest.fn(),
  create: jest.fn().mockResolvedValue({ id: 1 }),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
};

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const users: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getModelToken('User'),
          useValue: mockModel,
        },
      ],
    }).compile();
    const app = users.createNestApplication();
    await app.init();

    usersController = users.get<UsersController>(UsersController);
    usersService = users.get<UsersService>(UsersService);
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const results = [
        {
          _id: '1',
          name: 'Jane Doe',
          address: '505 Wall St',
          phone: '505 236 775',
          profileImg: 'placeholder',
          email: 'janeDoe@gmail.com',
          password: 'password123',
        },
        {
          _id: '2',
          name: 'John Doe',
          address: '505 Wall St',
          phone: '505 236 775',
          profileImg: 'placeholder',
          email: 'johnDoe@gmail.com',
          password: 'password123',
        },
      ];
      jest
        .spyOn(usersService, 'findAll')
        .mockImplementation(async () => results);
      expect(await usersService.findAll()).toBe(results);
    });
  });

  describe('findOne', () => {
    it('should return a single user', async () => {
      const result = {
        _id: '1',
        name: 'Jane Doe',
        address: '505 Wall St',
        phone: '505 236 775',
        profileImg: 'placeholder',
        email: 'janeDoe@gmail.com',
        password: 'password123',
      };
      jest
        .spyOn(usersService, 'findById')
        .mockImplementation(async () => result);
      expect(await usersService.findById('1')).toBe(result);
    });
  });
});
