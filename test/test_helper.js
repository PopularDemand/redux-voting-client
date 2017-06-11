import { JSDOM } from 'jsdom';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';

const dom = new JSDOM('<!doctype html><html><body></body></html>');
const win = dom.window;
const doc = win.document;

// make document and window available to react functions
global.document = doc;
global.window = win;
global.navigator = {
  userAgent: 'node.js'
};

// hoist window props so they can be called without 'window.' prefix
Object.keys(window).forEach( (key) => {
  if (!key in global) {
    global[key] = window[key];
  }
});

chai.use(chaiImmutable);
