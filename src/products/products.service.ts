import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Product, ProductDocument } from './schemas/product.schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateProductDto } from './dto/update-product.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private readonly userService: UsersService,
  ) {}

  async getAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async getById(id: string): Promise<Product> {
    return this.productModel.findById(id);
  }

  async create(productDto: CreateProductDto): Promise<Product> {
    const product = await this.productModel.create(productDto);
    // const product = new this.productModel(productDto);
    // await product.save();

    const user = await this.userService.findById(productDto.owner);
    user.products.push(product._id);
    user.save();

    return product;
  }

  async remove(id: string): Promise<Product> {
    return this.productModel.findByIdAndRemove(id);
  }

  async update(id: string, productDto: UpdateProductDto): Promise<Product> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      productDto,
      { new: true },
    );

    const user = await this.userService.findById(productDto.owner);
    if (
      !user.products.find(
        (item) => item.toString() === updatedProduct._id.toString(),
      )
    ) {
      user.products.push(updatedProduct._id);
      user.save();
    }

    return updatedProduct;
  }
}
