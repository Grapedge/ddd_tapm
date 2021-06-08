import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus, EventBus, ofType, QueryBus } from '@nestjs/cqrs';
import { ApiBasicAuth, ApiTags } from '@nestjs/swagger';
import { filter, first } from 'rxjs/operators';
import { TeamCreatedEvent } from 'src/agile-pm/domain/models/team/team-created';
import { CurUser } from 'src/common/decorators/cur-user.decorator';
import { AddTeamMembersCommand } from '../commands/add-team-members.command';
import { CreateProductCommand } from '../commands/create-product.command';
import { CreateProductForTuringDto } from './dto/create-product-for-turing.dto';
import { CreateProductDto, CreateProductRes } from './dto/create-product.dto';

@Controller('product')
@ApiTags('产品')
export class ProductController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly eventBus: EventBus,
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

  @Post('turing')
  // 这个接口是为了方便外部图灵课程系统使用的
  @ApiBasicAuth() // TODO Basic Auth
  async createForTuring(
    @Body() dto: CreateProductForTuringDto,
  ): Promise<CreateProductRes> {
    const productId = await this.commandBus.execute(
      new CreateProductCommand(dto.productOwnerId, dto.name, dto.description),
    );
    // 等待团队创建完成
    this.eventBus.subject$
      .pipe(
        ofType(TeamCreatedEvent),
        filter((event) => event.productId === productId),
        first(),
      )
      .subscribe(() => {
        this.commandBus.execute(
          new AddTeamMembersCommand(
            productId,
            dto.productOwnerId,
            dto.teamMemberIds,
          ),
        );
      });

    return { productId };
  }
}
