import { test } from '@japa/runner'

test.group('Excluir favorito', () => {
  test('deletar pelo nome', async ({ client }) => {
    const resposta = await client.delete('/favoritos').json({ nome: 'IFRN' })
    resposta.assertStatus(204)
  })

  test('deletar favorito que não existe', async ({ client }) => {
    const resposta = await client.delete('/favoritos').json({ nome: 'TWITTER' })
    resposta.assertStatus(404)
  })
})