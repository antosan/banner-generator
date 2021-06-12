import { VercelRequest, VercelResponse } from '@vercel/node';
import { createCanvas, loadImage, registerFont } from 'canvas';
import { join } from 'path';
import { formatEventDate, getLines } from '../utils';

registerFont(join(__dirname, '_files/fonts/OpenSans-Light.ttf'), {
  family: 'Open Sans',
  weight: '300',
});
registerFont(join(__dirname, '_files/fonts/OpenSans-SemiBold.ttf'), {
  family: 'Open Sans',
  weight: '600',
});

async function generateBanner(meetup: string, date: string) {
  const bannerPath = join(__dirname, '_files/images/banner.jpeg');

  const bannerImage = await loadImage(bannerPath);

  const canvas = createCanvas(bannerImage.width, bannerImage.height);
  const ctx = canvas.getContext('2d');

  ctx.drawImage(bannerImage, 0, 0, bannerImage.width, bannerImage.height);

  ctx.fillStyle = '#000';
  ctx.font = '600 40px "Open Sans"';
  ctx.fillText('NodeSchool Nairobi', 60, 335);

  ctx.fillStyle = '#f40057';
  ctx.font = '600 80px "Open Sans"';
  ctx.fillText(`Meetup #${meetup}`, 57, 417);

  ctx.fillStyle = '#000';
  ctx.font = '600 40px "Open Sans"';
  ctx.fillText(formatEventDate(date), 62, 513);

  ctx.fillStyle = '#f40057';
  ctx.font = '600 30px "Open Sans"';
  ctx.fillText('nodeschool.io/nairobi', 60, 557);

  ctx.font = '600 24px "Open Sans"';
  ctx.fillText('twitter: @nodeschoolnrb', 935, 56);

  return canvas.toDataURL();
}

async function generatePoster(meetup: string, date: string) {
  const posterPath = join(__dirname, '_files/images/poster.jpeg');

  const posterImage = await loadImage(posterPath);

  const canvas = createCanvas(posterImage.width, posterImage.height);
  const ctx = canvas.getContext('2d');

  ctx.drawImage(posterImage, 0, 0, posterImage.width, posterImage.height);

  ctx.fillStyle = '#000';
  ctx.font = '600 45px "Open Sans"';
  ctx.fillText('NodeSchool Nairobi', 64, 382);

  ctx.fillStyle = '#f40057';
  ctx.font = '600 90px "Open Sans"';
  ctx.fillText(`Meetup #${meetup}`, 60, 473);

  ctx.fillStyle = '#000';
  ctx.font = '600 43px "Open Sans"';
  ctx.fillText(formatEventDate(date), 64, 579);

  ctx.fillStyle = '#f40057';
  ctx.font = '600 30px "Open Sans"';
  ctx.fillText('nodeschool.io/nairobi', 64, 628);

  ctx.font = '600 17px "Open Sans"';
  ctx.fillText('twitter: @nodeschoolnrb', 740, 75);

  const fontSize = 28;
  const description =
    'NodeSchool is an open-source project run by volunteers with a goal to host community learning events around the world.';
  const titleLines = getLines(ctx, description, 320);
  const lineHeight = fontSize * 1.2;

  titleLines
    .map((line, index) => ({
      text: line,
      x: 63,
      y: 695 + index * lineHeight,
    }))
    .forEach(({ text, x, y }) => {
      ctx.fillStyle = '#000';
      ctx.font = `300 ${fontSize}px "Open Sans"`;
      ctx.fillText(text, x, y);
    });

  return canvas.toDataURL();
}

module.exports = async (req: VercelRequest, res: VercelResponse) => {
  if (req.method === 'GET') {
    try {
      const { meetup, date } = req.query;

      res.setHeader('Access-Control-Allow-Origin', '*');

      if (!meetup || !date) {
        return res.status(400).json({ message: 'A required query parameter was not specified for this request.' });
      }

      const bannerDataUrl = await generateBanner(String(meetup), String(date));
      const posterDataUrl = await generatePoster(String(meetup), String(date));

      return res.status(200).json({ banner: bannerDataUrl, poster: posterDataUrl });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } else {
    return res.status(405).json({ message: `The HTTP '${req.method}' method is not allowed at this route.` });
  }
};
