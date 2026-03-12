import { Injectable } from '@nestjs/common';
import { UserStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

	async createUser(email: string, password: string, fullName: string, role: UserStatus) {
		return await this.prisma.users.create({
			data: {
				email,
				password,
				fullName,
        role
			}
		})
	}

	async findByEmail(email: string) {
		return await this.prisma.users.findUniqueOrThrow({
			where: {
				email
			}
		})
	}

	async findById(id: string) {
		return await this.prisma.users.findUniqueOrThrow({
			where: {
				userId: id
			}
		})
	}
}
