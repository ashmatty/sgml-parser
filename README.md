# Sgml-Parser
This is to parse SGML into XML format because SGML is not an easy format to deal with.

Other formats are yet to come!

This is fairly new so please raise issues when you come across them.

## Description
Basically as above. It parses a SGML's file contents in and produces an XML string. More functionality to come soon.

## Installation
Install using NPM or Yarn with
```
npm install sgml-parser
```

## Usage
### sgmlToXml(string)
Converts the file into XML.

#### TypeScript
```
import { SgmlParser } from 'sgml-parser';

const sgmlParser:SgmlParser = new SgmlParser();

sgmlParser.sgmlToXml('yourfile.sgml').then(   
  (result: string) => {
    console.log(result);
});
```

#### JavaScript
```
var SgmlParser = require('sgml-parser');

var parser = new SgmlParser();

sgmlParser.sgmlToXml('yourfile.sgml').then(   
  function(result) {
    console.log(result);
});
```

## Tests
All tests are under the `src/__tests__/` folder and are written in Mocha and Chai using TypeScript.

## References
Sample test data was extracted from:
http://opensitesearch.sourceforge.net/docs/helpzone/dbb/dbb_50-00-12e.html#source
