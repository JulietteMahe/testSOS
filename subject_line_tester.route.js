const callOpenAI = require("../utils/openai");
const myScoring = require("../utils/scoring");

async function subjectLineTester(req, res) {
  const errors = callOpenAI.validate(req.body);

  if (errors) {
    const errorDetails = errors.details;
    const errorArray = [];
    errorDetails.forEach((error) => {
      errorArray.push(error.message);
    });
    return res.status(422).json(errorArray);
  }

  const newSubject = await callOpenAI.fetchAlternativesFromOpenAI(
    req.body.sentence
  );

  const resultArray = [req.body.sentence, ...newSubject.split(",")];
  /*const finalResults = myScoring.scoringSubjectLine(resultArray);
  console.log(finalResults);
  res.json(finalResults);*/

  const alternativeSubjects = myScoring.scoringAlternative(resultArray.slice(1));
  //console.log(alternativeSubjects); ///  response sent is ok
  res.json(alternativeSubjects);

  const userSubject = myScoring.scoringMySubject(resultArray.shift());
  ///console.log(userSubject);  ///  response sent is ok
  res.json(userSubject);
}

module.exports = subjectLineTester;
