import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Product } from 'src/agile-pm/domain/models/product/product';
import { ProductOwnerId } from 'src/agile-pm/domain/models/product/product-owner-id';
import { ProductRepository } from 'src/agile-pm/domain/models/product/product-repository';
import { InjectProductRepository } from '../decorators/product-repository.decorator';
import { CreateProductCommand } from './create-product.command';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler
  implements ICommandHandler<CreateProductCommand>
{
  constructor(
    @InjectProductRepository()
    private readonly repository: ProductRepository,
    private publisher: EventPublisher,
  ) {}

  async execute(command: CreateProductCommand): Promise<string> {
    const productId = this.repository.nextId();
    const product = this.publisher.mergeObjectContext(
      new Product(
        productId,
        new ProductOwnerId(command.productOwnerId),
        command.name,
        command.description,
        new Date(),
      ),
    );
    product.create();
    await this.repository.save(product);
    product.commit();
    return productId.id;
  }
}
