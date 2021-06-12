# Banner Generator

This is a Vercel serverless function that uses the [node-canvas](https://github.com/Automattic/node-canvas) library to generate banners and posters for NodeSchool Nairobi events.

## API Reference

#### Get the banner and poster images as data URLs

```http
GET /api/banner?meetup=1&date=2021-06-12
```

| Parameter | Type     | Description                                                        |
| :-------- | :------- | :----------------------------------------------------------------- |
| `meetup`  | `number` | **Required**. What number in the sequence is this meetup e.g. 2    |
| `date`    | `string` | **Required**. The date the meetup will be held. Format: YYYY-MM-DD |

## Demo

https://banner-generator-nu.vercel.app/

## Run Locally

```bash
git clone git@github.com:antosan/banner-generator.git
cd banner-generator
npm install
npm start
```

## Deployment

To deploy this project run

```bash
npm run deploy
```

## Caveats

- Had to use `canvas@2.6.1` https://github.com/vercel/vercel/issues/3460#issuecomment-855262350
- Download `node12_canvas_lib64_layer.zip` from https://github.com/jwerre/node-canvas-lambda and extract it to `canvas_lib64`
- This wouldn't work in Next.js https://vercel.com/docs/configuration#project/functions

## Acknowledgements

- [Generating Social Images with Remix](https://camchenry.com/blog/generating-social-images-with-remix)
- [node-canvas](https://github.com/Automattic/node-canvas)
- [node-canvas-lambda](https://github.com/jwerre/node-canvas-lambda)
- [node-canvas runtime error](https://github.com/vercel/vercel/issues/3460)
