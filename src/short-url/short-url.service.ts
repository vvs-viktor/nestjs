import {HttpException, HttpStatus, Injectable, NotFoundException, Redirect} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from "mongoose";
import {ShortUrl, ShortUrlDocument} from './schemas/short-url.schemas';
import {CreateShortUrlDto} from './dto/create-short-url.dto';

@Injectable()
export class ShortUrlService {
	constructor(@InjectModel(ShortUrl.name) private shortUrlModel: Model<ShortUrlDocument>) {}

	async getAll(): Promise<ShortUrl[]> {
		return await this.shortUrlModel.find().exec()
	}

	async getOneByUrl(shortUrl: string) {
		const shortUrlInfo = await this.shortUrlModel.findOne({ short: shortUrl });

		if (shortUrlInfo) {
			return { url: shortUrlInfo.full };
		} else {
			throw new NotFoundException('This url not found');
			// throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}
	}

	async create(shortUrlDto: CreateShortUrlDto): Promise<ShortUrl> {
		return this.shortUrlModel.create(shortUrlDto);
	}

}
