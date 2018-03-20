# XHR File

[![project status](https://img.shields.io/badge/status-beta-blue.svg?style=flat)](https://github.com/mgcrea/js-xhr-file) [![license](https://img.shields.io/github/license/mgcrea/js-xhr-file.svg?style=flat)](https://tldrlegal.com/license/mit-license) [![build status](http://img.shields.io/travis/mgcrea/js-xhr-file/master.svg?style=flat)](http://travis-ci.org/mgcrea/js-xhr-file) [![dependencies status](https://img.shields.io/david/mgcrea/js-xhr-file.svg?style=flat)](https://david-dm.org/mgcrea/js-xhr-file) [![devDependencies status](https://img.shields.io/david/dev/mgcrea/js-xhr-file.svg?style=flat)](https://david-dm.org/mgcrea/js-xhr-file#info=devDependencies) [![coverage status](http://img.shields.io/codeclimate/coverage/github/mgcrea/js-xhr-file.svg?style=flat)](https://codeclimate.com/github/mgcrea/js-xhr-file) [![climate status](https://img.shields.io/codeclimate/github/mgcrea/js-xhr-file.svg?style=flat)](https://codeclimate.com/github/mgcrea/js-xhr-file)

Upload/Download files using XMLHttpRequest with a Promise-based API.

- Relies on [XMLHttpRequest](https://developer.mozilla.org/en/docs/Web/API/XMLHttpRequest) to perform HTTP requests.

## Usage

### Quickstart

1. Upload a file and track progress

    ```js
    import {upload} from 'xhr-file';

    const hostUrl = 'https://localhost:3000/files';
    const onProgress = (ev) => {
      if (ev.lengthComputable) {
        const progress = Math.floor(100 * ev.loaded / ev.total);
        console.log(`progress=${progress}%`);
      }
    };
    upload(fileUrl, {file, onProgress, headers: {['X-Foo']: 'bar'})
      .then((res) => {
        console.log('res', res);
      })
    ```

2. Download a file

    ```js
    import {download} from 'xhr-file';

    const fileUrl = 'https://localhost:3000/files/foo.png';
    const onProgress = (ev) => {
      if (ev.lengthComputable) {
        const progress = Math.floor(100 * ev.loaded / ev.total);
        console.log(`progress=${progress}%`);
      }
    };
    download(fileUrl, {onProgress, headers: {['X-Foo']: 'bar'})
      .then((blob) => {
        console.log('file blob', blob);
      })
    ```


### Available scripts

| **Script** | **Description** |
|----------|-------|
| test | Run mocha unit tests |
| lint | Run eslint static tests |
| test:watch | Run and watch mocha unit tests |
| compile | Compile the library |


## Authors

**Olivier Louvignes**

+ http://olouv.com
+ http://github.com/mgcrea

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
