import {toMatchImageSnapshot} from 'jest-image-snapshot';
import expect from 'expect';

require('debug-utils').default();

expect.extend({toMatchImageSnapshot});
