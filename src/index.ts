import * as fs from 'fs';
import { parseString } from 'xml2js';

export class SgmlParser {
  /**
   * Simply reads a file and then passes the data directly to sgmlToXml().
   * @param {string} filename <string> Reads a string value which points to the file containing the SGML.
   * @returns {Promise} <string> Xml data returned as a promise of type string.
   */
  public sgmlFromFileToXml(filename: string): Promise<string> {
    const result = new Promise<string>((resolve, reject) => {
      fs.readFile(filename, 'utf-8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(this.sgmlToXml(data));
        }
      });
    });
    return result;
  }

  /**
   * Attempt to convert SGML to XML format.
   * @param {string} sgml SGML as a single string.
   * @returns {string} Returns a string containing the XML result.
   */
  public sgmlToXml(sgml: string): string {
    let ofx = sgml
      .replace(/>\s+</g, '><')
      .replace(/\s+</g, '<')
      .replace(/>\s+/g, '>')
      // .replace(/<(\w+?)>/g, this.checkClosingTagsExist)
      .replace(/<([A-Z0-9_]*)+\.+([A-Z0-9_]*)>([^<]+)/g, '<$1$2>$3')
      .replace(/<(\w+?)>([^<]+)/g, '<$1>$2</$1>')
      .replace(/(\w*)[:](\w+)(?![<]$)/g, '<$1>$2</$1>');

    return `<?xml version="1.0" encoding="utf-8" ?><SGML>${ofx}</SGML>`;
  }

  /**
   * Converts sgml JSON using xml2js behind the scenes.
   * @param {string} sgml SGML as a string.
   * @returns {object} <Promise<object>> Returns a promise, where if successful, will contain a JS object.
   */
  public sgmlToJson(sgml: string): Promise<object> {
    const xml = this.sgmlToXml(sgml);
    const result = new Promise<object>((resolve, reject) => {
      parseString(xml, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
    return result;
  }

  /**
   * This is a callback function as a parameter used by Regex's replace function.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
   * @description Checks that closing tags exist or data exists. Due to the nature of SGML,
   * elements containing data can also hold null as a value. Under this circumstance
   * the element should NOT have a closing tag and therefore be used to differentiate
   * between a data element and a parent element.
   * @param {string} substring <string>
   * @param {string} p1 <string>
   * @param {string} p2 <string>
   * @param {number} offset <number>
   * @param {string} whole <string>
   * @returns {string} replacement
   */
  private checkClosingTagsExist(substring: string, p1: string, p2: string, offset: number, whole: string): string {
    if (!p2 || p2 === '') {
      // TODO: checking this will not work if there are multiple correct
      // TODO: closing tags with the exception of (n + 1) tags missing.
      // Find next closing tag.
      // const nextClose = whole.match(new RegExp(`<\/${p1}>`, 'g'));
      // Find next open
      // const nextOpen = whole.match(new RegExp(`<${p1}`, 'g'));

      const elements = SgmlParser.findOpenClose(p1, whole);

      // if (!!(nextOpen && nextClose) && nextClose.length !== nextOpen.length) {
      //   substring = `${substring}</${p1}>`;
      // }
    }
    return substring;
  }

  private static findOpenClose(name: string, whole: string): object {
    let openCloses: { opens: number[]; closes: number[] } = {
      opens: [],
      closes: [],
    };

    // Opening elements
    let check = 0;
    while (check !== -1) {
      check = whole.indexOf(`<${name}>`, check);
      
      if (check !== -1) {
        openCloses.opens.push(check);
        check++;
      }
    }

    check = 0;
    while (check !== -1) {
      check = whole.indexOf(`</${name}>`, check);

      if (check !== -1) {
        openCloses.closes.push(check);
        check++;
      }
    }

    return openCloses;
  }
}
