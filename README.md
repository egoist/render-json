# render-json

> Render JSON data into your template.

## Install

```bash
$ npm install --save render-json
```

## Usage

```js
const render = require('render-json')

const options = {
  input: 'package.json',
  output: 'README.md'
  template: 'README_template.hbs' // handlebars syntax
}

render(options)
  .then(() => {
    console.log('done!')
  })
```

## Template data

```js
{
  json: {}, // parsed input file
  year: 2016 // current year
}
```

Or the `input` itself if it's an `object`.

## API

### render(options)

#### options

##### input

Type: `string` `object`<br>
Required: `true`

- `string` Path to input file.
- `object` Directly use given object to render template.

##### output

Type: `string`<br>
Required: `true`

Path to output file.

##### template

Type: `string`<br>
Required: `true`

Path to template, `handlebars` syntax by default.

##### isPackageJson

Type: `boolean`<br>
Default: `false`

Whether the input file should be treated as `package.json`.

##### force

Type: `boolean`<br>
Default: `false`

Overwrite the output file.

## License

MIT &copy; [EGOIST](https://github.com/egoist)
