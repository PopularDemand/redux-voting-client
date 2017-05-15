import jsdom from 'jsdom';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
const win = doc.defaultView;

// make document and window available to react functions
global.document = doc;
global.window = win;

// hoist window props so they can be called without 'window.' prefix
Object.keys(window).forEach( (key) => {
  if (!key in global) {
    global[key] = window[key];
  }
});

chai.use(chaiImmutable);