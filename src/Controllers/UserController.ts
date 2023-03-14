import { Request, Response } from "express";
import { BadRequesError } from "../helpers/api-erros";
import { userRepository } from "../repositories/userRepository";
import bcrypt, { genSalt } from 'bcrypt';
import jwt from 'jsonwebtoken'

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

        const {email, password} = req.body;

        const user = await userRepository.findOneBy({email});

        if(!user) {
            throw new BadRequesError('E-mail ou senha inválidas');
        };

        const verifyPass = await bcrypt.compare(password, user.password);

        if(!verifyPass) {
            throw new BadRequesError('E-mail ou senha inválidas');
        }

        const token = jwt.sign({id: user.id}, process.env.JWT_PASS ?? '', {expiresIn: '8h'})
        console.log(token);
        

    }
}