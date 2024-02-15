import { Controller, Get, Post, Param, Body, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  messagesService: MessagesService;

  constructor(public messageService : MessagesService) {
    this.messagesService = messageService;
  }

  @Get()
  listMessages() {
    return this.messagesService.findAll();
  }

  @Post()
  createMessages(@Body() body : CreateMessageDto) {
    // console.log(body);
    return this.messagesService.create(body.content);
  }

  @Get('/:id')
  async getMessage(@Param('id') id : string) {
    // console.log(id);
    const message = await this.messagesService.findOne(id);
    
    if (!message) {
      throw new NotFoundException('message not found');
    }

    return message;
  }
}
