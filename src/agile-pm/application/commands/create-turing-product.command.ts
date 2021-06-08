import { ICommand } from '@nestjs/cqrs';

// 给图灵课程系统提供的创建产品快捷键
export class CreateTuringProductCommand implements ICommand {
  constructor(
    public readonly productName: string,
    public readonly productDescription: string,
    public readonly productOwnerId: string,
    public readonly teamMemberIds: string[],
  ) {}
}
