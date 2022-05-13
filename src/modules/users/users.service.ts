import { Inject, Injectable, Logger } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';

import { MongoHelper } from '~/common/helpers/mongo.helper';
import {
  EventBusService,
  EVENT_BUS,
} from '~/providers/event-bus/event-bus.service';
import { User } from './users.model';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UserCreatedEvent } from './events';
import { CriteriaDto } from '../shared/dto';
import {
  UserAlreadyExistsException,
  UserNotFoundException,
} from './exceptions';
import { UserEntity } from './entities';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectModel(User)
    private readonly userModel: ReturnModelType<typeof User>,
    @Inject(EVENT_BUS) private readonly eventBusService: EventBusService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const found = await this.userModel.findById(createUserDto.id).exec();

    if (found) {
      throw new UserAlreadyExistsException();
    }

    const { id, ...values } = createUserDto;

    const userCreated = await this.userModel.create({
      _id: id,
      ...values,
    });

    void this.eventBusService.publish(
      UserCreatedEvent.create({
        id: userCreated._id,
        username: userCreated.username,
        email: userCreated.email,
        phone: userCreated.phone,
        role: userCreated.role,
      }),
    );
  }

  async getById(id: string) {
    const found = await this.userModel.findById(id).exec();

    if (!found) {
      throw new UserNotFoundException();
    }

    return UserEntity.create(found);
  }

  async findByUsername(username: string) {
    const found = await this.userModel.findOne({ username }).exec();

    return found ? UserEntity.create(found) : undefined;
  }

  async findByCriteria(criteriaDto: CriteriaDto) {
    const { items, total } = await MongoHelper.findByCriteria(
      this.userModel,
      criteriaDto,
    );

    return { items: items.map(UserEntity.create), total };
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<void> {
    await this.getById(id);

    await this.userModel.updateOne({ _id: id }, updateUserDto);
  }

  async remove(id: string): Promise<void> {
    await this.getById(id);

    await this.userModel.deleteOne({ _id: id });
  }
}
