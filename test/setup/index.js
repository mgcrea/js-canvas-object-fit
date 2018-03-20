import {configureToMatchImageSnapshot} from 'jest-image-snapshot';
import expect from 'expect';

require('debug-utils').default();


const toMatchImageSnapshot = configureToMatchImageSnapshot({
  customDiffConfig: {failureThreshold: .1}
});

expect.extend({toMatchImageSnapshot});
