import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { md5 } from 'js-md5'
import { DateTime } from 'luxon'

export default class UsersController {
  public async index({}: HttpContextContract) {
    return User.all()
  }

  public async store({ request, response }: HttpContextContract) {
    const { nome, cpf, senha } = request.body()
    if (nome === undefined || cpf === undefined || senha === undefined) {
      return response.status(400)
    } else {
      const newUser = { nome, cpf, senha }
      const newPassword = md5(senha)
      newUser.senha(newPassword)
      User.create(newUser)
      return response.status(201).send(newUser)
    }
  }

  public async show({ params, response }: HttpContextContract) {
    const usuarioEncontrado = await User.findByOrFail('id', params.id)
    if (usuarioEncontrado === undefined) {
      return response.status(404)
    } else {
      return response.status(201).send(usuarioEncontrado)
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    const { nome, cpf, senha } = request.body()
    const usuarioEncontrado = await User.findByOrFail('id', params.id)
    if (!usuarioEncontrado) {
      return response.status(404)
    } else {
      usuarioEncontrado.nome = nome
      usuarioEncontrado.cpf = cpf
      usuarioEncontrado.senha = senha
    }

    await usuarioEncontrado.save()
    await usuarioEncontrado.merge({ updatedAt: DateTime.local() }).save()
    return response.status(200).send(usuarioEncontrado)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const usuarioEncontrado = await User.findByOrFail('id', params.id)
    if (!usuarioEncontrado) {
      return response.status(400)
    } else {
      usuarioEncontrado.delete()
      return response.status(204)
    }
  }
}