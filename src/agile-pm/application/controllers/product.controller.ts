import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { CurUser } from 'src/common/decorators/cur-user.decorator';
import { CreateProductCommand } from '../commands/create-product.command';
import { CreateProductDto, CreateProductRes } from './dto/create-product.dto';

@Controller('product')
@ApiTags('产品')
export class ProductController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  // 创建产品
  @Post()
  async createProduct(
    @CurUser() userId: string,
    @Body() dto: CreateProductDto,
  ): Promise<CreateProductRes> {
    const productId: string = await this.commandBus.execute(
      new CreateProductCommand(userId, dto.name, dto.description),
    );
    return { productId };
  }
}
