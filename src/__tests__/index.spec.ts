import { expect } from 'chai';
import { parseString } from 'xml2js';
import { SgmlParser } from '../';

let api: SgmlParser;
let result: string;
const testData: string = `<rec>
<obj_blk>
<objid>dbb_50-00-10t</objid>
<author>John Doe</author>
<status>Draft</statusApproved
<datemod>12/31/98
<datecomp>10/14/1997 2:02:52 PM</datecomp>
<product>dbb</product>
<page>Task</page>
<pagedescr>Includes the procedure for creating a SiteSearch database 
from Standard Generalized Markup Language (SGML) source data. Provides 
additional links with each step for more detailed 
instructions.</pagedescr>
<search>Creating a SiteSearch Database from SGML Data</search>
<para>Main -> Documentation -> Database Building -> Creating a 
SiteSearch Database -> Creating a SiteSearch Database from SGML 
Data</para>
<history_blk>
<para>None.</para>
</history_blk>
</obj_blk>
<title>Creating a SiteSearch Database from SGML Data</title>
<intro_blk>
<para>Creating a SiteSearch database from Standard Generalized Markup 
Language (SGML) source data requires an understanding of the tagging 
structure used to organize your data. Before you create the database, 
it is important to plan the database because you will be responsible 
for defining the structure and relationships between data in the first 
step, creating a .dtd file. Below is the procedure used to convert SGML 
data into ASN.1/BER format and to build a SiteSearch database from this 
BER data.</para>
</intro_blk>
<proc_blk>
<stitle>Procedure</stitle>
<para>The following steps describe how to create a SiteSearch database 
from existing SGML source data:</para>
<table_blk>
<step_blk>
<step>1. Create a .dtd file.</step>
<step>This step contains guidelines for creating a database tag 
definition (.dtd) data map file that defines the hierarchical 
relationships between the tagged instances within your SGML source 
data. SSDOT, a menu-driven interface designed to automate the creation 
and maintenance of databases, will use this file during the conversion 
process to translate the source data records into ASN.1/BER 
format.</step>
</step_blk>
<step_blk>
<step>2. Convert your SGML source data to ASN.1/BER format.</step>
<step>This step discusses using SSDOT to convert your SGML-formatted 
source data into ASN.1/BER format so that the records are usable by the 
SiteSearch system.</step>
</step_blk>
<step_blk>
<step>3. Create a database description (.dsc) file.</step>
<step>This step instructs you how to create a .dsc file. The .dsc file 
is a text file that defines how the SiteSearch database building 
software constructs your database. Attributes defined in the .dsc file 
include:</step>
<ul>
<li>database size</li>
<li>specific indexes to generate</li>
<li>index characteristics</li>
</ul>
</step_blk>
<step_blk>
<step>4. Build the database.</step>
<step>In this step, SSDOT converts the BER data into a searchable 
SiteSearch database.  This step is referred to as the database build 
process.</step>
</step_blk>
</table_blk>
</proc_blk>
<ref_blk>
<stitle>See Also</stitle>
<para>Planning a Database</para>
<para>Creating a SiteSearch Database</para>
<para>Creating a SiteSearch Database from MARC Data</para>
<para>Creating a SiteSearch Database from Other Source Data</para>
</ref_blk>
</rec>`;

describe('[Class] SGML Parser', () => {
  describe('[Function] sgmlToXml', () => {
    beforeEach(() => {
      api = new SgmlParser();
    });

    it('returns a string', () => {
      expect(api.sgmlToXml(testData)).to.be.a('string');
    });

    it('contains the XML declaration at the start', () => {
      const result = api.sgmlToXml(testData);
      expect(result.indexOf('<?xml version="1.0" encoding="utf-8" ?>')).to.equal(0);
    });

    it('can be parsed from XML to JSON', done => {
      parseString(result, (err, data) => {
        if (!err) {
          expect(JSON.stringify(data)).to.be.a('string');
          done();
        } else {
          done();
        }
      });
    });
  });

  describe('[Function] sgmlFromFileToXml', () => {
    beforeEach(async () => {
      api = new SgmlParser();
      result = await api.sgmlFromFileToXml('./src/__tests__/data.sgml');
    });

    it('returns a promise', () => {
      expect(api.sgmlFromFileToXml('./src/__tests__/data.sgml')).to.be.a('promise');
    });

    it('can return a string from the promise', async () => {
      expect(result).to.be.a('string');
    });

    it('contains the XML declaration at the start', async () => {
      expect(result.indexOf('<?xml version="1.0" encoding="utf-8" ?>')).to.equal(0);
    });

    it('can be parsed as XML to JSON', async done => {
      parseString(result, (err, data) => {
        if (!err) {
          expect(JSON.stringify(data)).to.be.a('string');
          done();
        } else {
          done();
        }
      });
    });
  });
});
