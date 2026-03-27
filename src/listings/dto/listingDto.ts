import { Categories } from "@prisma/client"
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator"

export class CreateListingDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsOptional()
  description: string

  @IsNumber()
  @Min(0)
  price: number

  @IsNumber()
  @Min(1)
  quantity: number

  @IsString()
  @IsEnum(Categories)
  category: Categories 

  @IsString()
  @IsNotEmpty()
  location: string

  @IsString()
  @IsOptional()
  scanId: string
}

export class UpdateListingDto {
  @IsString()
  @IsOptional()
  title: string

  @IsString()
  @IsOptional()
  description: string

  @IsOptional()
  @IsNumber()
  @Min(0)
  price: number

  @IsOptional()
  @IsNumber()
  @Min(1)
  quantity: number

  @IsString()
  @IsEnum(Categories)
  @IsOptional()
  category: Categories

  @IsString()
  @IsOptional()
  location: string
}