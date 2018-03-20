# canvas-object-fit

[![project status](https://img.shields.io/badge/status-beta-blue.svg?style=flat)](https://github.com/mgcrea/js-canvas-object-fit) [![license](https://img.shields.io/github/license/mgcrea/js-canvas-object-fit.svg?style=flat)](https://tldrlegal.com/license/mit-license) [![build status](http://img.shields.io/travis/mgcrea/js-canvas-object-fit/master.svg?style=flat)](http://travis-ci.org/mgcrea/js-canvas-object-fit) [![dependencies status](https://img.shields.io/david/mgcrea/js-canvas-object-fit.svg?style=flat)](https://david-dm.org/mgcrea/js-canvas-object-fit) [![devDependencies status](https://img.shields.io/david/dev/mgcrea/js-canvas-object-fit.svg?style=flat)](https://david-dm.org/mgcrea/js-canvas-object-fit#info=devDependencies) [![coverage status](http://img.shields.io/codeclimate/coverage/github/mgcrea/js-canvas-object-fit.svg?style=flat)](https://codeclimate.com/github/mgcrea/js-canvas-object-fit) [![climate status](https://img.shields.io/codeclimate/github/mgcrea/js-canvas-object-fit.svg?style=flat)](https://codeclimate.com/github/mgcrea/js-canvas-object-fit)

Easily draw images in your canvas with object-type contraints.

* Works with [node-canvas](https://github.com/Automattic/node-canvas) on the server.

## Usage

### Quickstart

1.  Draw an image with a `cover` object-fit:

    ```js
    import Canvas from 'canvas';
    import {drawImage} from 'canvas-object-fit';

    const [width, height] = [200, 200];
    const canvas = new Canvas(width, height);
    const context = canvas.getContext('2d');
    const image = new Canvas.Image();
    image.src = await fs.readFileAsync(`${fixturesPath}/image.jpg`);
    drawImage(context, image, 0, 0, canvas.width, canvas.height, {objectFit: 'cover'});
    const buffer = canvas.toBuffer('png');
    ```

1.  Draw an image with a `contain` object-fit and `90-CW` exif orientation:

    ```js
    import Canvas from 'canvas';
    import {drawImage} from 'canvas-object-fit';

    const [width, height] = [200, 200];
    const canvas = new Canvas(width, height);
    const context = canvas.getContext('2d');
    const image = new Canvas.Image();
    image.src = await fs.readFileAsync(`${fixturesPath}/image-rotated.jpg`);
    drawImage(context, image, 0, 0, canvas.width, canvas.height, {objectFit: 'contain', orientation: 6});
    const buffer = canvas.toBuffer('png');
    expect(Buffer.isBuffer(buffer)).toBeTruthy();
    expect(buffer).toMatchImageSnapshot();
    ```

### Available scripts

| **Script** | **Description**                |
| ---------- | ------------------------------ |
| test       | Run mocha unit tests           |
| lint       | Run eslint static tests        |
| test:watch | Run and watch mocha unit tests |
| compile    | Compile the library            |

## Authors

**Olivier Louvignes**

* http://olouv.com
* http://github.com/mgcrea

## License

```
The MIT License

Copyright (c) 2016 Olivier Louvignes

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```
