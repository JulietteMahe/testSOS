const { emojiPattern } = require("./emojiPattern");
const { spamList } = require("./spamList");

function scoringAlternative(sentences) {
  const finalArray = [];

  sentences.forEach((sentence) => {
    const tempScore = scoring(sentence);
    const numberCarac = numberOfCharacters(sentence);
    const numberOfWords = numberOfWords(sentence);
    const howManyEmoji = howManyEmoji(sentence);
    const howManySpam = howManySpam(sentence);
    
    const subjectLine = {
      sentence,
      score: tempScore,
      characters: numberCarac,
      words: numberOfWords,
      emojis: howManyEmoji,
      spamWords,
    };

    finalArray.push(subjectLine);
  });

  return finalArray;
}

function scoringMySubject(sentence) {
  let finalObject = {};

  const tempScore = scoring(sentence);
  let subjectLine = {
    sentence,
    score: tempScore,
    characters,
    words,
    emojis,
    spamWords,
  };

  finalObject = subjectLine;

  return finalObject;
}



//////////////////////////////////////////// SCORING BETA //////////////////////////////////////////

function scoring(sentence) {
  let tempScores = 0;
  let tempWeight = 0;

  // Below the LENGTH weight var
  let lengthWeight = 5;
  let wordsWeight = 5;

  // Below the SYNTAX weight var
  let capsWeight = 2;
  let lowerCWeight = 1;
  let exclamWeight = 2;
  let qWeight = 1;
  let emojiWeight = 3;

  // Below the SEMANTICS weight var
  let forwardWeight = 4;
  let spamWeight = 5;

  tempScores += stringLength(sentence, lengthWeight);
  tempWeight += lengthWeight;

  tempScores += countWords(sentence, wordsWeight);
  tempWeight += wordsWeight;

  tempScores += allCaps(sentence, capsWeight);
  tempWeight += capsWeight;

  tempScores += allLowerCase(sentence, lowerCWeight);
  tempWeight += lowerCWeight;

  tempScores += includeExclam(sentence, exclamWeight);
  tempWeight += exclamWeight;

  tempScores += countOccurenceQ(sentence, qWeight);
  tempWeight += qWeight;

  tempScores += emojiOccurence(sentence, emojiWeight);
  tempWeight += emojiWeight;

  tempScores += forwardEmail(sentence, forwardWeight);
  tempWeight += forwardWeight;

  tempScores += spamOccurence(sentence, spamWeight);
  tempWeight += spamWeight;

  numberOfCharacters(sentence);
  numberOfWords(sentence);
  howManyEmoji(sentence);
  

  let finalScore = Math.round((tempScores / tempWeight) * 100);
  return finalScore;
}

////////////////////////////////////////// FUNCTIONS  //////////////////////////////////////////

//Below the string to study
let str = "Come check our new arrivals for summer 👗👗";
//score test 81

//////////////////////////////////////// 1.LENGTH

///////////////////  String length

function numberOfCharacters(str) {
    let numberCarac = 0;
  
    // test includes emoji because emoji modify total case (between 2 et 4 case for 1 emoji)
  
    if (emojiPattern.test(str) == true) {
        numberCarac = (str.length) -2;
    } else {
        numberCarac = str.length;
    }
    
    return numberCarac;
}

function stringLength(str, lengthWeight) {
  let lengthScore = 0;

  // test includes emoji because emoji modify total case (between 2 et 4 case for 1 emoji)

  if (emojiPattern.test(str) == true) {
    if (str.length > 32 && str.length < 54) {
      lengthScore += 0.9;
    } else {
      lengthScore += 0.4;
    }
  } else {
    if (str.length > 30 && str.length < 52) {
      lengthScore += 0.9;
    } else {
      lengthScore += 0.4;
    }
  }
  return lengthScore * lengthWeight;
}

///////////////////  Word count

function countWords(str, wordsWeight) {
  let wordsCount = 0;

  // test includes emoji because emoji modify total word count (between 1 and 4 word for 1 emoji)

  if (emojiPattern.test(str) == true) {
    if (str.split(" ").length > 7 && str.split(" ").length < 12) {
      wordsCount += 0.9;
    } else {
      wordsCount += 0.01;
    }
  } else {
    if (str.split(" ").length > 6 && str.split(" ").length < 10) {
      wordsCount += 0.9;
    } else {
      wordsCount += 0.01;
    }
  }

  return wordsCount * wordsWeight;
}

//////////////////////////////////// 2.SYNTAX

///////////////////  allCaps

function allCaps(str, capsWeight) {
  let capsScore = 0;
  let newStr = str.toUpperCase();

  if (newStr === str) {
    capsScore += 0.1;
  } else {
    capsScore += 0.9;
  }
  return capsScore * capsWeight;
}

///////////////////  All lower case

function allLowerCase(str, lowerCWeight) {
  let allLowerScore = 0;
  let newStr = str.toLowerCase();

  if (newStr === str) {
    allLowerScore += 0.33;
  } else {
    allLowerScore += 1;
  }
  return allLowerScore * lowerCWeight;
}

///////////////////  includeExclam

function includeExclam(str, exclamWeight) {
  let exclamScore = 0;

  if (str.includes("!")) {
    exclamScore += 0.1; // BAD
  } else {
    exclamScore += 0.5; // No impact
  }
  return exclamScore * exclamWeight;
}

///////////////////  countOccurenceQ

function countOccurenceQ(str, qWeight, word) {
  let qScore = 0;

  if (str.split("?").length - 1 === 1) {
    qScore += 1;
  } else if (str.split("?").length - 1 > 1) {
    qScore += 0.1;
  } else {
    qScore += 0.5;
  }
  return qScore * qWeight;
}

////////////////// emojiOccurence

function emojiOccurence(str, emojiWeight) {
  let emojiScore = 0;
  emojiCount = ((str || "").match(emojiPattern) || []).length;

  if (emojiCount === 0) {
    emojiScore += 0.5;
  } else if (emojiCount === 1) {
    emojiScore += 0.8;
  } else {
    emojiScore += 0.1;
  }
  return emojiScore * emojiWeight;
}

////////////////////////////////////////// 3. SEMANTICS

function forwardEmail(str, forwardWeight) {
  let forwardScore = 0;
  let newStr = str.toLowerCase();

  if (newStr.includes("re:")) {
    forwardScore += 0.01; // BAD
  } else if (newStr.includes("fwd:")) {
    forwardScore += 0.01; // BAD
  } else {
    forwardScore += 1;
  }
  return forwardScore * forwardWeight;
}

function spamOccurence(str, spamWeight) {
  let spamScore = 0;
  let spamCount = 0;

  for (let i = 0, n = spamList.length; i < n; i++) {
    const item = spamList[i];
    const regex = new RegExp(item.highlight);

    if (regex.test(str)) {
      spamCount += 1;
    }
  }

  // if no spam words, highest score = 1
  if (spamCount === 0) {
    spamScore += 1;
    //if 1 spam word, score is 0,7
  } else if (spamCount === 1) {
    spamScore += 0.7;
    //if 2 spam words, score is low with 0,4
  } else if (spamCount === 2) {
    spamScore += 0.4;
  }
  // if spam words are > 2, score is calculated from an exponential function
  // where spamScore is y and spamCount is x
  // since spamCount is always positive and an int it allows spamScore to be negative and to increase with spamCount
  else {
    spamScore = 5.018248 * Math.pow(0.5501, spamCount) - 0.7;
  }

  return spamScore * spamWeight;
}

module.exports = {
  scoringAlternative,
  scoringMySubject
};
