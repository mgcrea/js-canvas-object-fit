import Canvas from 'canvas';
import expect from 'expect';
// import mkdirp from 'mkdirp';
import Promise from 'bluebird';
import fs from 'fs';

import {drawImage} from '../../src';

Promise.promisifyAll(fs);
// const mkdirpAsync = Promise.promisify(mkdirp);
// const tmpPath = `${fixturesPath}/../.tmp`;
const fixturesPath = `${__dirname}/../fixtures`;

describe('download', () => {
  // beforeAll(() => Promise.all([mkdirpAsync(tmpPath)]));
  describe('image.jpg', () => {
    it('should properly support objectFit = "none"', async () => {
      const [width, height] = [200, 200];
      const canvas = new Canvas(width, height);
      const context = canvas.getContext('2d');
      const image = new Canvas.Image();
      image.src = await fs.readFileAsync(`${fixturesPath}/image.jpg`);
      // First draw using default API
      context.drawImage(image, 0, 0, width, height);
      const bufferA = canvas.toBuffer('png');
      expect(Buffer.isBuffer(bufferA)).toBeTruthy();
      context.clearRect(0, 0, canvas.width, canvas.height);
      // Then draw using custom API
      drawImage(context, image, 0, 0, canvas.width, canvas.height, {objectFit: 'none'});
      const bufferB = canvas.toBuffer('png');
      expect(Buffer.isBuffer(bufferB)).toBeTruthy();
      expect(bufferB).toMatchImageSnapshot();
      // Test equality
      expect(bufferA.equals(bufferB)).toBeTruthy();
    });
    it('should properly support objectFit = "cover"', async () => {
      const [width, height] = [200, 200];
      const canvas = new Canvas(width, height);
      const context = canvas.getContext('2d');
      const image = new Canvas.Image();
      image.src = await fs.readFileAsync(`${fixturesPath}/image.jpg`);
      drawImage(context, image, 0, 0, canvas.width, canvas.height, {objectFit: 'cover'});
      const buffer = canvas.toBuffer('png');
      expect(Buffer.isBuffer(buffer)).toBeTruthy();
      expect(buffer).toMatchImageSnapshot();
    });
    it('should properly support objectFit = "contain"', async () => {
      const [width, height] = [200, 200];
      const canvas = new Canvas(width, height);
      const context = canvas.getContext('2d');
      const image = new Canvas.Image();
      image.src = await fs.readFileAsync(`${fixturesPath}/image.jpg`);
      drawImage(context, image, 0, 0, canvas.width, canvas.height, {objectFit: 'contain'});
      const buffer = canvas.toBuffer('png');
      expect(Buffer.isBuffer(buffer)).toBeTruthy();
      expect(buffer).toMatchImageSnapshot();
    });
  });
  describe('image-rotated.jpg', () => {
    it('should properly support objectFit = "none"', async () => {
      const [width, height] = [200, 200];
      const canvas = new Canvas(width, height);
      const context = canvas.getContext('2d');
      const image = new Canvas.Image();
      image.src = await fs.readFileAsync(`${fixturesPath}/image-rotated.jpg`);
      // First draw using default API
      context.drawImage(image, 0, 0, width, height);
      const bufferA = canvas.toBuffer('png');
      expect(Buffer.isBuffer(bufferA)).toBeTruthy();
      context.clearRect(0, 0, canvas.width, canvas.height);
      // Then draw using custom API
      drawImage(context, image, 0, 0, canvas.width, canvas.height, {objectFit: 'none', orientation: 6});
      const bufferB = canvas.toBuffer('png');
      expect(Buffer.isBuffer(bufferB)).toBeTruthy();
      expect(bufferB).toMatchImageSnapshot();
      // Test equality
      expect(bufferA.equals(bufferB)).toBeFalsy();
    });
    it('should properly support objectFit = "cover"', async () => {
      const [width, height] = [200, 200];
      const canvas = new Canvas(width, height);
      const context = canvas.getContext('2d');
      const image = new Canvas.Image();
      image.src = await fs.readFileAsync(`${fixturesPath}/image-rotated.jpg`);
      drawImage(context, image, 0, 0, canvas.width, canvas.height, {objectFit: 'cover', orientation: 6});
      const buffer = canvas.toBuffer('png');
      expect(Buffer.isBuffer(buffer)).toBeTruthy();
      expect(buffer).toMatchImageSnapshot();
    });
    it('should properly support objectFit = "contain"', async () => {
      const [width, height] = [200, 200];
      const canvas = new Canvas(width, height);
      const context = canvas.getContext('2d');
      const image = new Canvas.Image();
      image.src = await fs.readFileAsync(`${fixturesPath}/image-rotated.jpg`);
      drawImage(context, image, 0, 0, canvas.width, canvas.height, {objectFit: 'contain', orientation: 6});
      const buffer = canvas.toBuffer('png');
      expect(Buffer.isBuffer(buffer)).toBeTruthy();
      expect(buffer).toMatchImageSnapshot();
    });
  });
});
