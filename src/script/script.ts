#!/usr/bin/env node

import { FileParser } from "../parser/file/FileParser";
import { program } from "commander";

const fileParser = new FileParser();

console.log(fileParser.parseFile(""));

//add the following line

program.option("--first").option("-s, --separator <char>");

program.parse();

const options = program.opts();
const limit = options.first ? 1 : undefined;
console.log(program.args[0].split(options.separator, limit));
