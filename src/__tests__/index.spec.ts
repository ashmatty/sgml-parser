import { expect } from 'chai';
import * as xml2js from 'xml2js';
import { SgmlParser } from '../';

let api: SgmlParser;
let result: string;

describe('SGML Parser', () => {
  describe('sgmlToXml', () => {
    beforeEach(async () => {
      api = new SgmlParser();
      result = await api.sgmlToXml('./src/__tests__/data.sgml');
    });

    it('returns a promise', () => {
      expect(api.sgmlToXml('./src/__tests__/data.sgml')).to.be.a('promise');
    });

    it('can return a string from the promise', async () => {
      expect(result).to.be.a('string');
    });

    it('contains the XML declaration at the start', async () => {
      expect(result.indexOf('<?xml version="1.0" encoding="utf-8" ?>')).to.equal(0);
    });

    it('can be parsed as XML to JSON', async (done) => {
      xml2js.parseString(result, (err, data) => {
        if (!err) {
          expect(JSON.stringify(data)).to.be.a('string');
          done();
        }
        else {
          done();
        }
      });
    });
  });
});
