import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ListingsService } from './listings.service';
import { CreateListingDto, UpdateListingDto } from './dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/auth/Roles/role.enum';

@Controller('listings')
@UseGuards(JwtGuard, RolesGuard)
export class ListingsController {
  constructor(private listingService: ListingsService) {}

  @Roles(Role.Farmer)
  @Post()
  createListing(@Req() req: any, @Body() dto: CreateListingDto) {
    return this.listingService.createListing(req.user.userId!, dto);
  }

  @Get()
  getAllListings(@Req() req: any) {
    return this.listingService.getAllListings(req.user.fullName!);
  }

  @Get(':id')
  getListing(@Param('id', ParseUUIDPipe) id: string, @Req() req: any) {
    return this.listingService.getSingleListing(id, req.user.fullName!);
  }

  @Roles(Role.Farmer)
  @Patch(':id')
  updateListing(@Req() req: any, @Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateListingDto) {
    return this.listingService.updateListing(req.user.userId, id, dto);
  }

  @Roles(Role.Farmer)
  @Delete(':id')
  deleteListing(@Req() req: any, @Param('id', ParseUUIDPipe) id: string) {
    return this.listingService.deleteListing(req.user.userId, id);
  }  
}
