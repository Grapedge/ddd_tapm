import { Inject } from '@nestjs/common';

export const ProductRepoistoryToken = Symbol('Product Repo');

export const InjectProductRepository = () => Inject(ProductRepoistoryToken);
