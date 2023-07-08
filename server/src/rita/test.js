import Rita from "rita";
// to find rhymes

// to load a grammar
var inputText = "This is a two sentence example. This is the second one.";
// var markov = new Rita.markov(2, { trace: false }); // limit nFactor to 2

// markov.addText(inputText);

// var sentences = markov.generate(6, { allowDuplicates: false });

// console.log("result:", sentences); // send result to output

var txt =
  "The temperature parameter acts as a knob to adjust the probability that input elements will be selected for the output. At higher values, infrequent words are more likely to be chosen, while at lower values the most frequent inputs are more likely to be output. If no value is provided, then tokens are chosen according to their relative frequency in the input";

var rm = Rita.markov(2);
rm.addText(txt);
var sentences = rm.generate(2, { allowDuplicates: false });
console.log(sentences);
