const fs = require('fs');
const dataGeneral = JSON.parse(fs.readFileSync('./tmp/generalState.json'));
const dataBiomass = JSON.parse(fs.readFileSync('./tmp/biomassState.json'));
const dataGroundSpecies = JSON.parse(
  fs.readFileSync('./tmp/groundSpeciesState.json')
);
const dataGroundTruthing = JSON.parse(
  fs.readFileSync('./tmp/groundTruthingState.json')
);
const dataLianaOld = JSON.parse(fs.readFileSync('./tmp/lianaOldState.json'));
const dataNativeTreeShrub = JSON.parse(
  fs.readFileSync('./tmp/nativeTreeShrubState.json')
);

const newState = {
  tag: 'legacy_plant_data',
  surveys: [],
};
let surveys = {};

const groupBy = (array, key) => {
  // Return the end result
  return array.reduce((result, currentValue) => {
    // If an array already present for key, push it to the array. Else create an array and push the object
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue
    );

    // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
    return result;
  }, {}); // empty object is the initial value for result object
};

const combineStates = (obj, arrayName) => {
  for (key in obj) {
    let found = false;
    for (srv of newState.surveys) {
      if (srv['surveyid'] === obj[key][0].surveyid) {
        srv[arrayName] = obj[key];
        found = true;
      }
    }
    if (!found) {
      {
        // we build a new one.
        const surveys = {
          surveyid: obj[key][0].surveyid,
          survey_area: obj[key][0].survey_area,
          Transect_no: obj[key][0].Transect_no,
          Plot_no: obj[key][0].Plot_no,
        };
        surveys[arrayName] = obj[key];
        // console.log(surveys);
        newState.surveys.push(surveys);
      }
    }
  }
};

const resultBiomass = groupBy(dataBiomass.biomass, 'surveyid');
const resultGeneral = groupBy(dataGeneral.general, 'surveyid');
const resultGroundSpecies = groupBy(
  dataGroundSpecies.ground_species,
  'surveyid'
);
const resultGroundTruthing = groupBy(
  dataGroundTruthing.groundtruthing,
  'surveyid'
);
const resultLiana = groupBy(dataLianaOld.liana_old, 'surveyid');
const resultNative = groupBy(dataNativeTreeShrub.native_tree_shrub, 'surveyid');

for (key in resultBiomass) {
  surveys = {
    surveyid: resultBiomass[key][0].surveyid,
    survey_area: resultBiomass[key][0].survey_area,
    Transect_no: resultBiomass[key][0].Transect_no,
    Plot_no: resultBiomass[key][0].Plot_no,
    biomass: resultBiomass[key],
  };
  newState.surveys.push(surveys);
}

combineStates(resultGeneral, 'general');
combineStates(resultGroundSpecies, 'ground_species');
combineStates(resultGroundTruthing, 'groundtruthing');
combineStates(resultLiana, 'liana_old');
combineStates(resultNative, 'native_tree_shrubs');

// console.log(newState);

fs.writeFileSync('./tmp/newState.json', `${JSON.stringify(newState)}`);
