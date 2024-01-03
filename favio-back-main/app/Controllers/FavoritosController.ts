import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Favorito from 'App/Models/Favorito'
import { DateTime } from 'luxon'
const stringVazia = ""

export default class FavoritosController {
  public async index({}: HttpContextContract) {
    return Favorito.all()
  }

  public async store({ request, response }: HttpContextContract) {
    const { nome, url, importante } = request.body()
    console.log(request.completeUrl())
    if (nome === stringVazia || url === stringVazia || importante === undefined) {
      return response.status(400)
    } else {
      const favorito = { nome, url, importante }
      Favorito.create(favorito)
      return response.status(201).send(favorito)
    }
  }

  public async show({ params, response }: HttpContextContract) {
    const favoritoEncontrado = await Favorito.findByOrFail('id', params.id)
    if (favoritoEncontrado == undefined) {
      return response.status(404)
    } else {
      return response.status(201).send(favoritoEncontrado)
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    const { nome, url, importante } = request.body()
    const favoritoEncontrado = await Favorito.findByOrFail('id', params.id)
    if (!favoritoEncontrado) {
      return response.status(404)
    } else {
      favoritoEncontrado.nome = nome
      favoritoEncontrado.url = url
      favoritoEncontrado.importante = importante
    }

    await favoritoEncontrado.save()
    await favoritoEncontrado.merge({ updatedAt: DateTime.local() }).save()
    return response.status(200).send(favoritoEncontrado)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const favoritoEncontrado = await Favorito.findByOrFail('id', params.id)
    if (!favoritoEncontrado) {
      return response.status(400)
    } else {
      favoritoEncontrado.delete()
      return response.status(204)
    }
  }
}