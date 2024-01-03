import { test } from '@japa/runner'

test.group('Atualizar favorito', () => {
  test('atualizar favorito', async ({client}) => {
    const resposta = await client.put('/favoritos/1').json({nome: 'SGA', url: 'sga.com.br', importante: true})
    resposta.assertStatus(201)
  })

  test('atualizando favorito inexistente', async ({client}) => {
    const resposta = await client.put('favoritos/idnaoexiste').json({nome: 'SGA', url: 'sga.com.br', importante: true})
    resposta.assertStatus(404)
  })

  test('atualizando favorito com campo faltante', async ({client}) => {
    const resposta = await client.put('favoritos/3').json({nome: 'SGA', importante: true})
    resposta.assertStatus(201)
    resposta.assertBodyContains({id: 3, nome: 'SGA', url: 'http://www.uol.com.br', importante: true })
  })

  test('atualizando favorito com os mesmos nomes de outro favorito', async ({client}) => {
    const resposta = await client.put('favoritos/4').json({nome: 'UFRN', url: 'http://www.ufrn.com.br', importante: true})
    resposta.assertStatus(404)
  })

})