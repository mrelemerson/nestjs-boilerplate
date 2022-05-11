import { Module } from '@nestjs/common';

import { AuthModule } from './authentication/auth.module';
import { UsersModule } from './users/users.module';
import { OperationsModule } from './operations/operations.module';

@Module({
  imports: [AuthModule, UsersModule, OperationsModule],
})
export class ModulesModule {}
