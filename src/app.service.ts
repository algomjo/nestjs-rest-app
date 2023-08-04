/* eslint-disable prettier/prettier */
// app.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { encode } from 'base64-arraybuffer';
import * as path from 'path';
import * as fs from 'fs/promises';
import { User } from './interfaces/user.interface';
import { UserAvatar } from './interfaces/UserAvatar';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('UserAvatar') private readonly userAvatarModel: Model<UserAvatar>,
  ) {}

  async createUser() {
    // Simula a criação de um usuário na API "https://reqres.in/"
    const response = await axios.post('https://reqres.in/api/users', {
      name: 'John Doe',
      email: 'john.doe@example.com',
    });

    // Obtenha a ID fornecida pela API
    const apiUserId = response.data.id;

    // Crie um novo usuário no MongoDB usando a ID fornecida pela API
    const user: User = await this.userModel.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
    });

    // Enviar e-mail (simulado)
    this.sendEmail(user);

    // Publicar evento RabbitMQ (simulado)
    this.publishToRabbitMQ(user);

    return user;
  }

  async getUser(userId: string) {
    // Recupere os dados da API "https://reqres.in/"
    const response = await axios.get(`https://reqres.in/api/users/${userId}`);
    return response.data;
  }

  async getUserAvatar(userId: string) {
    try {
      // Verificar se o usuário existe na API "https://reqres.in/"
      const userResponse = await axios.get(`https://reqres.in/api/users/${userId}`);
      const userData = userResponse.data.data;

      if (!userData.avatar) {
        throw new NotFoundException('User avatar not found.');
      }

      // Verificar se o avatar já foi salvo no banco de dados
      let userAvatar: UserAvatar = await this.userAvatarModel.findOne({ userId }).exec();

      if (!userAvatar) {
        // Se o avatar não estiver no banco de dados, obtenha-o da URL "avatar"
        const response = await axios.get(userData.avatar, {
          responseType: 'arraybuffer',
        });

        // Converta o buffer da imagem em base64
        const base64Avatar = encode(new Uint8Array(response.data));

        // Salve o avatar como um arquivo no diretório "avatars"
        const avatarFileName = `${userId}-${uuidv4()}.png`;
        const avatarPath = path.join(__dirname, '..', 'avatars', avatarFileName);
        await fs.writeFile(avatarPath, response.data);

        // Salve o avatar no banco de dados
        userAvatar = await this.userAvatarModel.create({
          userId,
          hash: avatarFileName,
          avatar: base64Avatar,
        });
      }

      // Recupere a representação codificada em base64 do avatar do banco de dados
      return { avatar: userAvatar.avatar };
    } catch (error) {
      throw new NotFoundException('User not found.');
    }
  }

  async deleteUserAvatar(userId: string) {
    try {
      // Verificar se o usuário existe no banco de dados
      const userAvatar: UserAvatar = await this.userAvatarModel.findOne({ userId }).exec();

      if (!userAvatar) {
        throw new NotFoundException('User avatar not found.');
      }

      // Excluir o arquivo do armazenamento do sistema de arquivos (FileSystem)
      const avatarPath = path.join(__dirname, '..', 'avatars', userAvatar.hash);
      await fs.unlink(avatarPath);

      // Remover a entrada do banco de dados
      await this.userAvatarModel.deleteOne({ userId });

      return { message: 'Avatar deleted successfully.' };
    } catch (error) {
      throw new NotFoundException('User not found.');
    }
  }

  // Simula o envio de e-mail
  private sendEmail(user: User) {
    console.log(`Sending email to: ${user.email}`);
  }

  // Simula a publicação de um evento RabbitMQ
  private publishToRabbitMQ(user: User) {
    console.log(`Publishing RabbitMQ event for user: ${user.name}`);
  }
}
