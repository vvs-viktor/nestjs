import {Body, Controller, Get, Header, Param, Post, Redirect} from '@nestjs/common';
import {ShortUrlService} from './short-url.service';
import {CreateShortUrlDto} from './dto/create-short-url.dto';
import {ShortUrl} from './schemas/short-url.schemas';

@Controller('short-url')
export class ShortUrlController {
	constructor(private readonly shortUrlService: ShortUrlService) {}

	@Get()
	getAll(): Promise<ShortUrl[]> {
		return this.shortUrlService.getAll();
	}

	@Get(':shortUrl')
	@Redirect()
	getOneByUrl(@Param('shortUrl') shortUrl: string) {
		return this.shortUrlService.getOneByUrl(shortUrl);
	}

	@Post()
	@Header('Cache-Control', 'none')
	create(@Body() createShortUrlDto: CreateShortUrlDto): Promise<ShortUrl> {
		return this.shortUrlService.create(createShortUrlDto);
	}
}
