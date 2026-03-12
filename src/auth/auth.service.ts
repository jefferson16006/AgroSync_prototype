import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as argon from 'argon2';
import { AuthLoginDto, AuthRegisterDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { JwtService } from "@nestjs/jwt";
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AuthService {
	constructor(private user: UsersService, private jwt: JwtService) {}

	async registerUser(dto: AuthRegisterDto) {
		const hash = await argon.hash(dto.password);

		try {
			const user = await this.user.createUser(dto.email, hash, dto.fullName, dto.role);

			const result = {
				status: "Success",
				msg: "User registered succesfully",
				accessToken: await this.signToken(user.userId, user.email, user.role)
			}

			return result;
		} catch (err) {
			if(err instanceof PrismaClientKnownRequestError) {
				if(err.code === 'P2002') {
					throw new ForbiddenException("Credentials already exists");
				}
			}
			throw err;
		}
	}

	async logUserIn(dto: AuthLoginDto) {
		try {
			const user = await this.user.findByEmail(dto.email);

			if(!user) {
				throw new NotFoundException("Invalid credential");
			}

			const pwdMatches = await argon.verify(user.password!, dto.password);
			if(!pwdMatches) {
				throw new UnauthorizedException("Credentials Invalid");
			}

			const result = {
				status: "Success",
				msg: "User logged in succesfully",
				accessToken: await this.signToken(user.userId, user.email, user.role)
			}

			return result;
		} catch (err) {
			if(err instanceof PrismaClientKnownRequestError) {
				if(err.code === 'P2002') {
					throw new ForbiddenException("Credentials already exists");
				}
			}
			throw err;
		}
	}

	async signToken(userId: string, email: string, role: string): Promise<string> {
		const payload = {
			sub: userId,
			email,
      role
		}

		const token = await this.jwt.signAsync(payload, {
			expiresIn: '30m',
			secret: process.env.JWT_SECRET
		})

		return token;
	}
}
