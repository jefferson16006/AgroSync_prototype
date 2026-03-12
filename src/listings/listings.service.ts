import { ConflictException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateListingDto, UpdateListingDto } from './dto';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';

@Injectable()
export class ListingsService {
  constructor(private prisma: PrismaService) {}

  // Create listing
  async createListing(userId: string, dto: CreateListingDto) {
    try {
      await this.prisma.listings.create({
        data: {
          farmer: {
            connect: { userId: userId }
          },
          title: dto.title,
          description: dto.description,
          price: new Prisma.Decimal(dto.price),
          quantity: dto.quantity,
          location: dto.location,
          category: dto.category,
        }
      })
  
      const response = {
        "status": "Success",
        "msg": "Listing has been created"
      };
  
      return response;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2003') {
          throw new NotFoundException('Farmer account not found');
        }
        if (err.code === 'P2002') {
          throw new ConflictException('A listing with these details already exists');
        }
      }
      throw err;
    }
  }

  // Get all listing
  async getAllListings(fullName: string) {
    const listings = await this.prisma.listings.findMany();

    if(listings.length === 0) {
      throw new NotFoundException('No listings');
    }

    const response = {
      "status": "Success",
      "msg": "All listings retrieved",
      "data": {
        "fullName": fullName,
        listings
      }
    }

    return response;
  }

  // Get single listing
  async getSingleListing(listingId: string, fullName: string) {
    const listing = await this.prisma.listings.findUnique({
      where: {
        listingId
      }
    })

    if(!listing) {
      throw new NotFoundException('Listing with that ID does not exist');
    }

    const response = {
      "status": "Success",
      "msg": "Listing retrieved",
      "data": {
        "fullName": fullName,
        listing
      }
    }

    return response;
  }

  // Update listing
  async updateListing(userId: string, listingId: string, dto: UpdateListingDto) {
    const listing = await this.prisma.listings.findUnique({
      where: {
        listingId
      }
    });

    if(!listing) {
      throw new NotFoundException('Listing with that ID does not exist');
    }
    if(listing.farmerId !== userId) {
      throw new UnauthorizedException("Access denied: you do not have access to this listing");
    }

    const updatedListing = await this.prisma.listings.update({
      where: {
        listingId
      },
      data: {
        ...dto,
        ...(dto.price && { price: new Prisma.Decimal(dto.price) })
      }
    });

    const response = {
      "status": "Success",
      "msg": "Listing updated",
      "data": updatedListing
    }

    return response;
  }

  // Delete listing
  async deleteListing(userId: string, listingId: string) {
    const listing = await this.prisma.listings.findUnique({
      where: {
        listingId
      }
    });

    if(!listing) {
      throw new NotFoundException('Listing with that ID does not exist');
    }
    if(listing.farmerId !== userId) {
      throw new ForbiddenException("Access denied: you do not have access to this listing");
    }

    const deletedListing = await this.prisma.listings.delete({
      where: {
        listingId
      }
    });

    const response = {
      "status": "Success",
      "msg": "Listing deleted",
    }

    return response;
  }
}
