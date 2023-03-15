import { Request, Response } from "express";
import { BadRequesError, UnauthorizedError } from "../helpers/api-erros";
import { userRepository } from "../repositories/userRepository";
import bcrypt, { genSalt } from 'bcrypt';
import jwt from 'jsonwebtoken'

type JwtPayload = {
	id: number
}

export class UserController {

	async create(req: Request, res: Response) {
		const { name, email, password } = req.body

		const userExists = await userRepository.findOneBy({ email })

		if (userExists) {
			throw new BadRequesError('E-mail já existe')
		}

		const hashPassword = await bcrypt.hash(password, 10)

		const newUser = userRepository.create({
			name,
			email,
			password: hashPassword,
		})

		await userRepository.save(newUser)

		const { password: _, ...user } = newUser

		return res.status(201).json(user)
	}


	async login(req: Request, res: Response) {

		const { email, password } = req.body;

		const user = await userRepository.findOneBy({ email });

		if (!user) {
			throw new BadRequesError('E-mail ou senha inválidas');
		};

		const verifyPass = await bcrypt.compare(password, user.password);

		if (!verifyPass) {
			throw new BadRequesError('E-mail ou senha inválidas');
		}

		const token = jwt.sign({ id: user.id }, process.env.JWT_PASS ?? '', { expiresIn: '8h' })
		console.log(token);

		const { password: _, ...userLogin } = user

		return res.json({
			user: userLogin,
			token: token
		})
	}

	async getProfile(req: Request, res: Response) {
		const { authorization } = req.headers

		if (!authorization) {
			throw new UnauthorizedError('Não autorizado');
		}

		const token = authorization.split(' ')[1];
		
		const {id} = jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPayload;


		const user = await userRepository.findOneBy({id});

		if(!user) {
			throw new UnauthorizedError('Não autorizado');
		}
 		

	}
}


