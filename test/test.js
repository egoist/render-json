import fs from 'fs'
import test from 'ava'
import render from '../'

test('throws', async t => {
  try {
    await render()
    t.fail()
  } catch (e) {
    t.true(e.message.indexOf('Expected the path of input JSON file') !== -1)
  }
})

test('render', async t => {
  const options = {
    input: './input.json',
    output: './output.txt',
    template: './template.hbs'
  }
  await render(options)
  const content = fs.readFileSync('./output.txt', 'utf8')
  t.is(content.trim(), 'EGOIST')
})
