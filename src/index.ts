import * as fs from 'fs';

export class SgmlParser {
  /**
   * Attempt to convert SGML to XML format.
   * @public
   * @param {string} filename <string> Reads a string value which points to the file containing the SGML.
   * @returns {Promise} <string> Xml data returned as a promise of type string.
   */
  public sgmlToXml(filename: string): Promise<string> {
    const result = new Promise<string>((resolve, reject) => {
      fs.readFile(filename, 'utf-8', (err, data) => {
        if (err) {
          reject(err);
        }
        else {
          let ofx = data
            .replace(/>\s+</g, '><')
            .replace(/\s+</g, '<')
            .replace(/>\s+/g, '>')
            .replace(/<(\w+?)>([^<]*)/g, this.checkClosingTagsExist)
            .replace(/<([A-Z0-9_]*)+\.+([A-Z0-9_]*)>([^<]+)/g, '<$1$2>$3')
            .replace(/<(\w+?)>([^<]+)/g, '<$1>$2</$1>')
            .replace(/(\w*)[:](\w+)(?![<]$)/g, '<$1>$2</$1>');

          const result = `<?xml version="1.0" encoding="utf-8" ?><SGML>${ofx}</SGML>`;
          resolve(result);
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
  private checkClosingTagsExist(
    substring: string,
    p1: string,
    p2: string,
    offset: number,
    whole: string
  ): string {
    if (!p2 || p2 === '') {
      const check = whole.search(`</${p1}>`);
      if (check === -1) {
        substring = `${substring}</${p1}>`;
      }
    }
    return substring;
  }
}
