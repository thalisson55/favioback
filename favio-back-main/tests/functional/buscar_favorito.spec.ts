import { test } from '@japa/runner'

test.group('Buscar favorito', () => {

  test('exibir favoritos', async ({ client }) => {
    const resposta = await client.get('/favoritos')
    resposta.assertStatus(200)
    resposta.assertBodyContains([])
  })
  
  test('buscar favorito com id', async ({ client }) => {
    const resposta = await client.get('/favoritos/1')
    resposta.assertStatus(200)
    resposta.assertBodyContains({ id: 1 })
  })

  test('favorito nao encontrado', async ({ client }) => {
    const resposta = await client.get('/favoritos/idnaoexiste')
    resposta.assertStatus(404)
  })
})