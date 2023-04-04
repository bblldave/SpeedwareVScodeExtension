const nearley = require("nearley");
const grammar = require("./spw.js");
const fs = require("mz/fs");

async function main(){
  const filename = process.argv[2];

  const code = (await fs.readFile(filename)).toString();
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
  const outputFilename = filename.replace(".spw",".ast");
  parser.feed(code);
  console.log(parser.results);
  if (parser.results.length > 1){
    console.log("Error: ambiguous grammar detected");
  } else if (parser.results.length == 1){
    const ast = parser.results[0];
    await fs.writeFile(outputFilename, JSON.stringify(ast,null, "   "));
    console.log(`Wrote ${outputFilename}`);
  } else {
    console.log("Error: no parse found");
  }
  console.log(parser.results);
}

main().catch(err => console.log(err.stack));
