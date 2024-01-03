import { test } from '@japa/runner'

test.group('Criar favorito', () => {
  test('criar favorito', async ({ client }) => {
    const resposta = await client
      .post('/favoritos')
      .json({ nome: 'GLOBO', url: 'www.g1.com.br', importante: false })
    resposta.assertStatus(201)
    resposta.assertBodyContains({ nome: 'GLOBO' })
  })
  test('criar favorito com campo faltante', async ({ client }) => {
    const resposta = await client
      .post('/favoritos')
      .json({ url: 'www.portal.edu.br', importante: false })
    resposta.assertStatus(400)
  })
  test('criar favorito que já existe', async ({ client }) => {
    const resposta = await client
      .post('/favoritos')
      .json({ nome: 'CNN', url: 'http://www.cnn.com.br', importante: true })
    resposta.assertStatus(400)
  })
})