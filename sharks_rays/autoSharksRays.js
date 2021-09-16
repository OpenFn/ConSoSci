alterState(state => {
  const multiSelectIds = ["gear_type", "s_gear_type"];

  function convertMultiSelectsIntoArrays(body, multiSelectIds) {
    for (const property in body) {
      if (Array.isArray(body[property])) {
        convertMultiSelectsIntoArrays(body[property], multiSelectIds);
      } else {
        for (const thing in body[property]) {
          if (Array.isArray(body[property][thing])) {
            convertMultiSelectsIntoArrays(
              body[property][thing],
              multiSelectIds
            );
          } else if (thing.includes(multiSelectIds)) {
            const multiVals = body[property][thing].split(' ');
            body[property][thing] = multiVals.map(val => ({ name: val }));
          }
        }
      }
    }
  }

  function generateUuid(body, uuid) {
    for (const property in body) {
      if (Array.isArray(body[property]) && body !== null) {
        body['__generatedUuid'] = uuid;
        body[property].forEach((thing, i, arr) => {
          if (thing !== null) {
            thing['__parentUuid'] = uuid;
            let newUuid = uuid + '-' + (i + 1);
            thing['__generatedUuid'] = newUuid;
            for (const property in thing) {
              if (Array.isArray(thing[property])) {
                generateUuid(thing, newUuid);
              }
            }
          }
        });
      }
    }
  }

  multiSelectIds.forEach(msIds => {
    convertMultiSelectsIntoArrays(state.data.body, msIds);
  });

  generateUuid(
    state.data.body,
    state.data.body._id+'-'+state.data.body._xform_id_string
  );

  state.data = { ...state.data, ...state.data.body };
  return state;
}); 
alterState(async state => {
 const mapping = {
  WCSPROGRAMS_SurveyTypeName: dataValue('survey_type'),
  WCSPROGRAMS_SurveyTypeExtCode: dataValue('survey_type'),
  //Payload: state.data.body
} 
 return upsertIf(dataValue('survey_type'),'WCSPROGRAMS_SurveyType', 'WCSPROGRAMS_SurveyTypeExtCode', mapping, {setNull: ["''", "'undefined'"]})(state); 
}) 
alterState(async state => {
 const mapping = {
  WCSPROGRAMS_CountryName: dataValue('country'),
  WCSPROGRAMS_CountryExtCode: dataValue('country'),
  Payload: state.data.body
} 
 return upsertIf(dataValue('country'),'WCSPROGRAMS_Country', 'WCSPROGRAMS_CountryExtCode', mapping, {setNull: ["''", "'undefined'"]})(state); 
}) 
alterState(async state => {
 const mapping = {
  WCSPROGRAMS_DistrictName: dataValue('district'),
  WCSPROGRAMS_DistrictExtCode: dataValue('district'),
  Payload: state.data.body
} 
 return upsertIf(dataValue('district'),'WCSPROGRAMS_District', 'WCSPROGRAMS_DistrictExtCode', mapping, {setNull: ["''", "'undefined'"]})(state); 
}) 
alterState(async state => {
 const mapping = {
  WCSPROGRAMS_SurveyName: dataValue('survey'),
  WCSPROGRAMS_SurveyExtCode: dataValue('survey'),
  Payload: state.data.body
} 
 return upsertIf(dataValue('survey'),'WCSPROGRAMS_Survey', 'WCSPROGRAMS_SurveyExtCode', mapping, {setNull: ["''", "'undefined'"]})(state); 
}) 
alterState(async state => {
 const mapping = {
  WCSPROGRAMS_LandingSiteName: dataValue('landing_site'),
  WCSPROGRAMS_LandingSiteExtCode: dataValue('landing_site'),
  Payload: state.data.body
} 
 return upsertIf(dataValue('landing_site'),'WCSPROGRAMS_LandingSite', 'WCSPROGRAMS_LandingSiteExtCode', mapping, {setNull: ["''", "'undefined'"]})(state); 
}) 
alterState(async state => {
 const mapping = {
  WCSPROGRAMS_MarketName: dataValue('market'),
  WCSPROGRAMS_MarketExtCode: dataValue('market'),
  Payload: state.data.body
} 
 return upsertIf(dataValue('market'),'WCSPROGRAMS_Market', 'WCSPROGRAMS_MarketExtCode', mapping, {setNull: ["''", "'undefined'"]})(state); 
}) 
alterState(async state => {
 const mapping = {
  WCSPROGRAMS_SurveyorName: dataValue('surveyor'),
  WCSPROGRAMS_SurveyorExtCode: dataValue('surveyor'),
  Payload: state.data.body
} 
 return upsertIf(dataValue('surveyor'),'WCSPROGRAMS_Surveyor', 'WCSPROGRAMS_SurveyorExtCode', mapping, {setNull: ["''", "'undefined'"]})(state); 
}) 
alterState(async state => {
 const mapping = {
  WCSPROGRAMS_BoatInfoName: dataValue('boat/boat_info'),
  WCSPROGRAMS_BoatInfoExtCode: dataValue('boat/boat_info'),
  Payload: state.data.body
} 
 return upsertIf(dataValue('boat/boat_info'),'WCSPROGRAMS_BoatInfo', 'WCSPROGRAMS_BoatInfoExtCode', mapping, {setNull: ["''", "'undefined'"]})(state); 
}) 
alterState(async state => {
 const mapping = {
  WCSPROGRAMS_BoatTypeName: dataValue('boat/boat_type'),
  WCSPROGRAMS_BoatTypeExtCode: dataValue('boat/boat_type'),
  Payload: state.data.body
} 
 return upsertIf(dataValue('boat/boat_type'),'WCSPROGRAMS_BoatType', 'WCSPROGRAMS_BoatTypeExtCode', mapping, {setNull: ["''", "'undefined'"]})(state); 
}) 
alterState(async state => {
 const mapping = {
  WCSPROGRAMS_PrimaryGearName: dataValue('boat/primary_gear'),
  WCSPROGRAMS_PrimaryGearExtCode: dataValue('boat/primary_gear'),
  Payload: state.data.body
} 
 return upsertIf(dataValue('boat/primary_gear'),'WCSPROGRAMS_PrimaryGear', 'WCSPROGRAMS_PrimaryGearExtCode', mapping, {setNull: ["''", "'undefined'"]})(state); 
}) 
alterState(async state => {
 const mapping = {
  WCSPROGRAMS_PrimaryMeshSizeUnitName: dataValue('boat/primary_mesh_size_unit'),
  WCSPROGRAMS_PrimaryMeshSizeUnitExtCode: dataValue('boat/primary_mesh_size_unit'),
  Payload: state.data.body
} 
 return upsertIf(dataValue('boat/primary_mesh_size_unit'),'WCSPROGRAMS_PrimaryMeshSizeUnit', 'WCSPROGRAMS_PrimaryMeshSizeUnitExtCode', mapping, {setNull: ["''", "'undefined'"]})(state); 
}) 
alterState(async state => {
 const mapping = {
  WCSPROGRAMS_SecondaryGearName: dataValue('boat/secondary_gear'),
  WCSPROGRAMS_SecondaryGearExtCode: dataValue('boat/secondary_gear'),
  Payload: state.data.body
} 
 return upsertIf(dataValue('boat/secondary_gear'),'WCSPROGRAMS_SecondaryGear', 'WCSPROGRAMS_SecondaryGearExtCode', mapping, {setNull: ["''", "'undefined'"]})(state); 
}) 
alterState(async state => {
 const mapping = {
  WCSPROGRAMS_SecondaryMeshSizeUnitName: dataValue('boat/secondary_mesh_size_unit'),
  WCSPROGRAMS_SecondaryMeshSizeUnitExtCode: dataValue('boat/secondary_mesh_size_unit'),
  Payload: state.data.body
} 
 return upsertIf(dataValue('boat/secondary_mesh_size_unit'),'WCSPROGRAMS_SecondaryMeshSizeUnit', 'WCSPROGRAMS_SecondaryMeshSizeUnitExtCode', mapping, {setNull: ["''", "'undefined'"]})(state); 
}) 
alterState(async state => {
 const mapping = {
  WCSPROGRAMS_FishingHabitatName: dataValue('boat/fishing_habitat'),
  WCSPROGRAMS_FishingHabitatExtCode: dataValue('boat/fishing_habitat'),
  Payload: state.data.body
} 
 return upsertIf(dataValue('boat/fishing_habitat'),'WCSPROGRAMS_FishingHabitat', 'WCSPROGRAMS_FishingHabitatExtCode', mapping, {setNull: ["''", "'undefined'"]})(state); 
}) 
alterState(async state => {
 const mapping = {
  WCSPROGRAMS_TargetedName: dataValue('boat/targeted'),
  WCSPROGRAMS_TargetedExtCode: dataValue('boat/targeted'),
  Payload: state.data.body
} 
 return upsertIf(dataValue('boat/targeted'),'WCSPROGRAMS_Targeted', 'WCSPROGRAMS_TargetedExtCode', mapping, {setNull: ["''", "'undefined'"]})(state); 
}) 
alterState(async state => {
 const mapping = {
  WCSPROGRAMS_ReleaseSharkRayName: dataValue('boat/release_shark_ray'),
  WCSPROGRAMS_ReleaseSharkRayExtCode: dataValue('boat/release_shark_ray'),
  Payload: state.data.body
} 
 return upsertIf(dataValue('boat/release_shark_ray'),'WCSPROGRAMS_ReleaseSharkRay', 'WCSPROGRAMS_ReleaseSharkRayExtCode', mapping, {setNull: ["''", "'undefined'"]})(state); 
}) 
alterState(async state => {
 const mapping = {
  WCSPROGRAMS_TypeName: dataValue('boat/catch_details/type'),
  WCSPROGRAMS_TypeExtCode: dataValue('boat/catch_details/type'),
  Payload: state.data.body
} 
 return upsertIf(dataValue('boat/catch_details/type'),'WCSPROGRAMS_Type', 'WCSPROGRAMS_TypeExtCode', mapping, {setNull: ["''", "'undefined'"]})(state); 
}) 
alterState(async state => {
 const mapping = {
  WCSPROGRAMS_GenusName: dataValue('boat/catch_details/genus'),
  WCSPROGRAMS_GenusExtCode: dataValue('boat/catch_details/genus'),
  Payload: state.data.body
} 
 return upsertIf(dataValue('boat/catch_details/genus'),'WCSPROGRAMS_Genus', 'WCSPROGRAMS_GenusExtCode', mapping, {setNull: ["''", "'undefined'"]})(state); 
}) 
alterState(async state => {
 const mapping = {
  WCSPROGRAMS_SpeciesName: dataValue('boat/catch_details/species'),
  WCSPROGRAMS_SpeciesExtCode: dataValue('boat/catch_details/species'),
  Payload: state.data.body
} 
 return upsertIf(dataValue('boat/catch_details/species'),'WCSPROGRAMS_Species', 'WCSPROGRAMS_SpeciesExtCode', mapping, {setNull: ["''", "'undefined'"]})(state); 
}) 
alterState(async state => {
 const mapping = {
  WCSPROGRAMS_SexName: dataValue('boat/catch_details/sex'),
  WCSPROGRAMS_SexExtCode: dataValue('boat/catch_details/sex'),
  Payload: state.data.body
} 
 return upsertIf(dataValue('boat/catch_details/sex'),'WCSPROGRAMS_Sex', 'WCSPROGRAMS_SexExtCode', mapping, {setNull: ["''", "'undefined'"]})(state); 
}) 
each(dataPath('boat[*]'), each(dataPath('catch_details[*]'), alterState(async state => {
 const dataArray = state.data['boat/catch_details/gear_type'] || [] 

        const mapping = []; 
 
        for (let x of dataArray) { 

          mapping.push({
  WCSPROGRAMS_GearTypeID: x['name'],
  WCSPROGRAMS_CatchDetailsID: x['__parentUuid'],
  Payload: state.data.body,
  GeneratedUuid: x['__generatedUuid'],
  CatchDetailsUuid: x['__parentUuid']
}) 

          } 
 return upsertMany('WCSPROGRAMS_CatchDetailsGearType', 'GeneratedUuid', () => mapping, {setNull: ["''", "'undefined'"]})(state); 
}) 
))
each(dataPath('boat[*]'), each(dataPath('catch_details[*]'), alterState(async state => {
 const dataArray = state.data['boat/catch_details/gear_type'] || [] 

        const mapping = []; 
 
        for (let x of dataArray) { 

          mapping.push({
  WCSPROGRAMS_GearTypeID: x['name'],
  WCSPROGRAMS_GearTypeName: x['name'],
  WCSPROGRAMS_GearTypeExtCode: x['name'],
  Payload: state.data.body,
  GeneratedUuid: x['__generatedUuid'],
  CatchDetailsUuid: x['__parentUuid']
}) 

          } 
 return upsertMany('WCSPROGRAMS_GearType', 'GeneratedUuid', () => mapping, {setNull: ["''", "'undefined'"]})(state); 
}) 
))
alterState(async state => {
 const mapping = {
  WCSPROGRAMS_DnaSampleCollectedName: dataValue('boat/catch_details/dna_sample_collected'),
  WCSPROGRAMS_DnaSampleCollectedExtCode: dataValue('boat/catch_details/dna_sample_collected'),
  Payload: state.data.body
} 
 return upsertIf(dataValue('boat/catch_details/dna_sample_collected'),'WCSPROGRAMS_DnaSampleCollected', 'WCSPROGRAMS_DnaSampleCollectedExtCode', mapping, {setNull: ["''", "'undefined'"]})(state); 
}) 
alterState(async state => {
 const mapping = {
  WCSPROGRAMS_FishSpecieName: dataValue('boat/fish_catch/fish_specie'),
  WCSPROGRAMS_FishSpecieExtCode: dataValue('boat/fish_catch/fish_specie'),
  Payload: state.data.body
} 
 return upsertIf(dataValue('boat/fish_catch/fish_specie'),'WCSPROGRAMS_FishSpecie', 'WCSPROGRAMS_FishSpecieExtCode', mapping, {setNull: ["''", "'undefined'"]})(state); 
}) 
alterState(async state => {
 const mapping = {
  WCSPROGRAMS_VendorSexName: dataValue('market_details/vendor/vendor_sex'),
  WCSPROGRAMS_VendorSexExtCode: dataValue('market_details/vendor/vendor_sex'),
  Payload: state.data.body
} 
 return upsertIf(dataValue('market_details/vendor/vendor_sex'),'WCSPROGRAMS_VendorSex', 'WCSPROGRAMS_VendorSexExtCode', mapping, {setNull: ["''", "'undefined'"]})(state); 
}) 
alterState(async state => {
 const mapping = {
  WCSPROGRAMS_WhereBoughtName: dataValue('market_details/vendor/where_bought'),
  WCSPROGRAMS_WhereBoughtExtCode: dataValue('market_details/vendor/where_bought'),
  Payload: state.data.body
} 
 return upsertIf(dataValue('market_details/vendor/where_bought'),'WCSPROGRAMS_WhereBought', 'WCSPROGRAMS_WhereBoughtExtCode', mapping, {setNull: ["''", "'undefined'"]})(state); 
}) 
alterState(async state => {
 const mapping = {
  WCSPROGRAMS_WhoSoldToName: dataValue('market_details/vendor/who_sold_to'),
  WCSPROGRAMS_WhoSoldToExtCode: dataValue('market_details/vendor/who_sold_to'),
  Payload: state.data.body
} 
 return upsertIf(dataValue('market_details/vendor/who_sold_to'),'WCSPROGRAMS_WhoSoldTo', 'WCSPROGRAMS_WhoSoldToExtCode', mapping, {setNull: ["''", "'undefined'"]})(state); 
}) 
alterState(async state => {
 const mapping = {
  WCSPROGRAMS_STypeName: dataValue('market_details/vendor/sales/s_type'),
  WCSPROGRAMS_STypeExtCode: dataValue('market_details/vendor/sales/s_type'),
  Payload: state.data.body
} 
 return upsertIf(dataValue('market_details/vendor/sales/s_type'),'WCSPROGRAMS_SType', 'WCSPROGRAMS_STypeExtCode', mapping, {setNull: ["''", "'undefined'"]})(state); 
}) 
alterState(async state => {
 const mapping = {
  WCSPROGRAMS_SGenusName: dataValue('market_details/vendor/sales/s_genus'),
  WCSPROGRAMS_SGenusExtCode: dataValue('market_details/vendor/sales/s_genus'),
  Payload: state.data.body
} 
 return upsertIf(dataValue('market_details/vendor/sales/s_genus'),'WCSPROGRAMS_SGenus', 'WCSPROGRAMS_SGenusExtCode', mapping, {setNull: ["''", "'undefined'"]})(state); 
}) 
alterState(async state => {
 const mapping = {
  WCSPROGRAMS_SSpeciesName: dataValue('market_details/vendor/sales/s_species'),
  WCSPROGRAMS_SSpeciesExtCode: dataValue('market_details/vendor/sales/s_species'),
  Payload: state.data.body
} 
 return upsertIf(dataValue('market_details/vendor/sales/s_species'),'WCSPROGRAMS_SSpecies', 'WCSPROGRAMS_SSpeciesExtCode', mapping, {setNull: ["''", "'undefined'"]})(state); 
}) 
alterState(async state => {
 const mapping = {
  WCSPROGRAMS_SSexName: dataValue('market_details/vendor/sales/s_sex'),
  WCSPROGRAMS_SSexExtCode: dataValue('market_details/vendor/sales/s_sex'),
  Payload: state.data.body
} 
 return upsertIf(dataValue('market_details/vendor/sales/s_sex'),'WCSPROGRAMS_SSex', 'WCSPROGRAMS_SSexExtCode', mapping, {setNull: ["''", "'undefined'"]})(state); 
}) 
each(dataPath('market_details[*]'), each(dataPath('vendor[*]'), alterState(async state => {
 const dataArray = state.data['market_details/vendor/sales/s_gear_type'] || [] 

        const mapping = []; 
 
        for (let x of dataArray) { 

          mapping.push({
  WCSPROGRAMS_SGearTypeID: x['name'],
  WCSPROGRAMS_SalesID: x['__parentUuid'],
  Payload: state.data.body,
  GeneratedUuid: x['__generatedUuid'],
  SalesUuid: x['__parentUuid']
}) 

          } 
 return upsertMany('WCSPROGRAMS_SalesSGearType', 'GeneratedUuid', () => mapping, {setNull: ["''", "'undefined'"]})(state); 
}) 
))
each(dataPath('market_details[*]'), each(dataPath('vendor[*]'), alterState(async state => {
 const dataArray = state.data['market_details/vendor/sales/s_gear_type'] || [] 

        const mapping = []; 
 
        for (let x of dataArray) { 

          mapping.push({
  WCSPROGRAMS_SGearTypeID: x['name'],
  WCSPROGRAMS_SGearTypeName: x['name'],
  WCSPROGRAMS_SGearTypeExtCode: x['name'],
  Payload: state.data.body,
  GeneratedUuid: x['__generatedUuid'],
  SalesUuid: x['__parentUuid']
}) 

          } 
 return upsertMany('WCSPROGRAMS_SGearType', 'GeneratedUuid', () => mapping, {setNull: ["''", "'undefined'"]})(state); 
}) 
))
alterState(async state => {
 const mapping = {
  WCSPROGRAMS_SDnaSampleCollectedName: dataValue('market_details/vendor/sales/s_dna_sample_collected'),
  WCSPROGRAMS_SDnaSampleCollectedExtCode: dataValue('market_details/vendor/sales/s_dna_sample_collected'),
  Payload: state.data.body
} 
 return upsertIf(dataValue('market_details/vendor/sales/s_dna_sample_collected'),'WCSPROGRAMS_SDnaSampleCollected', 'WCSPROGRAMS_SDnaSampleCollectedExtCode', mapping, {setNull: ["''", "'undefined'"]})(state); 
}) 
alterState(async state => {
 const mapping = {
  FormName: dataValue('formName'),
  DatasetId: dataValue('_xform_id_string'),
  LastUpdated: new Date().toISOString(),
  Payload: state.data.body
} 
 return upsert('WCSPROGRAMS_KoboDataset', 'DatasetId', mapping, {setNull: ["''", "'undefined'"]})(state); 
}) 
alterState(async state => {
 const mapping = {
  Verification: dataValue('verification'),
  SharkRayVendorsNb: dataValue('market_details/shark_ray_vendors_nb'),
  Consent: dataValue('consent'),
  Pic3: dataValue('pic3'),
  Pic2: dataValue('pic2'),
  Pic1: dataValue('pic1'),
  Surveyor: dataValue('surveyor'),
  Market: dataValue('market'),
  LandingSite: dataValue('landing_site'),
  Survey: dataValue('survey'),
  District: dataValue('district'),
  Country: dataValue('country'),
  Gps: dataValue('gps'),
  SurveyType: dataValue('survey_type'),
  Deviceid: dataValue('deviceid'),
  FormDateEnd: dataValue('end'),
  Start: dataValue('start'),
  Today: dataValue('today'),
  Latitude: dataValue('undefined'),
  Longitude: dataValue('undefined'),
  Payload: state.data.body,
  AnswerId: dataValue('_id'),
  GeneratedUuid: dataValue('__generatedUuid')
} 
 return upsert('WCSPROGRAMS_SharksRays', 'GeneratedUuid', mapping, {setNull: ["''", "'undefined'"]})(state); 
}) 
alterState(async state => {
 const dataArray = state.data['boat'] || [] 

        const mapping = []; 
 
        for (let x of dataArray) { 

          mapping.push({
  BoatInfo: x['boat/boat_info'],
  BoatType: x['boat/boat_type'],
  OtherBoat: x['boat/other_boat'],
  Crew: x['boat/crew'],
  WomenCrew: x['boat/women_crew'],
  Engine: x['boat/engine'],
  PrimaryGear: x['boat/primary_gear'],
  PrimaryNetType: x['boat/primary_net_type'],
  PrimaryLineType: x['boat/primary_line_type'],
  PrimaryOtherType: x['boat/primary_other_type'],
  PrimaryGearLocalName: x['boat/primary_gear_local_name'],
  PrimaryNetLength: x['boat/primary_net_length'],
  PrimaryNetHeight: x['boat/primary_net_height'],
  PrimaryMeshSize: x['boat/primary_mesh_size'],
  PrimaryMeshSizeUnit: x['boat/primary_mesh_size_unit'],
  PrimaryLinesNb: x['boat/primary_lines_nb'],
  PrimaryHooksNb: x['boat/primary_hooks_nb'],
  PrimaryHookSize: x['boat/primary_hook_size'],
  SecondaryGear: x['boat/secondary_gear'],
  SecondaryNetType: x['boat/secondary_net_type'],
  SecondaryLineType: x['boat/secondary_line_type'],
  SecondaryOtherType: x['boat/secondary_other_type'],
  SecondaryGearLocalName: x['boat/secondary_gear_local_name'],
  SecondaryNetLength: x['boat/secondary_net_length'],
  SecondaryNetHeight: x['boat/secondary_net_height'],
  SecondaryMeshSize: x['boat/secondary_mesh_size'],
  SecondaryMeshSizeUnit: x['boat/secondary_mesh_size_unit'],
  SecondaryLinesNb: x['boat/secondary_lines_nb'],
  SecondaryHooksNb: x['boat/secondary_hooks_nb'],
  SecondaryHookSize: x['boat/secondary_hook_size'],
  FishingLocation: x['boat/fishing_location'],
  FishingDepth: x['boat/fishing_depth'],
  FishingHabitat: x['boat/fishing_habitat'],
  OtherHabitat: x['boat/other_habitat'],
  DistanceSite: x['boat/distance_site'],
  FishingStart: x['boat/fishing_start'],
  FishingEnd: x['boat/fishing_end'],
  FishingTime: x['boat/fishing_time'],
  TravelTime: x['boat/travel_time'],
  NbBoats: x['boat/nb_boats'],
  Targeted: x['boat/targeted'],
  LastCatchSharkRay: x['boat/last_catch_shark_ray'],
  ReleaseSharkRay: x['boat/release_shark_ray'],
  PercentEat: x['boat/percent_eat'],
  PercentSell: x['boat/percent_sell'],
  PercentGive: x['boat/percent_give'],
  WhereSellFins: x['boat/where_sell_fins'],
  WhereSellMeat: x['boat/where_sell_meat'],
  WhereSellOil: x['boat/where_sell_oil'],
  FinsPrice: x['boat/fins_price'],
  FinsPriceUsd: x['boat/fins_price_usd'],
  MeatPrice: x['boat/meat_price'],
  MeatPriceUsd: x['boat/meat_price_usd'],
  OilPrice: x['boat/oil_price'],
  OilPriceUsd: x['boat/oil_price_usd'],
  NbSharksUnsampled: x['boat/nb_sharks_unsampled'],
  NbRaysUnsampled: x['boat/nb_rays_unsampled'],
  NbSharkLikeRaysUnsampled: x['boat/nb_shark_like_rays_unsampled'],
  SharksraysUuid: x['__parentUuid'],
  Payload: state.data.body,
  AnswerId: dataValue('_id'),
  GeneratedUuid: x['__generatedUuid']
}) 

          } 
 return upsertMany('WCSPROGRAMS_SharksRaysBoat', 'GeneratedUuid', () => mapping, {setNull: ["''", "'undefined'"]})(state); 
}) 
each(dataPath('boat[*]'), alterState(async state => {
 const dataArray = state.data['boat/catch_details'] || [] 

        const mapping = []; 
 
        for (let x of dataArray) { 

          mapping.push({
  Type: x['boat/catch_details/type'],
  Genus: x['boat/catch_details/genus'],
  Species: x['boat/catch_details/species'],
  LocalName: x['boat/catch_details/local_name'],
  Sex: x['boat/catch_details/sex'],
  Weight: x['boat/catch_details/weight'],
  DiscWidth: x['boat/catch_details/disc_width'],
  DiscLength: x['boat/catch_details/disc_length'],
  TotalLength: x['boat/catch_details/total_length'],
  ForkLength: x['boat/catch_details/fork_length'],
  PrecaudalLength: x['boat/catch_details/precaudal_length'],
  Pic4: x['boat/catch_details/img4/pic_4'],
  Pic5: x['boat/catch_details/img5/pic_5'],
  Pic6: x['boat/catch_details/img6/pic6'],
  Pic7: x['boat/catch_details/img7/pic7'],
  Pic8: x['boat/catch_details/img8/pic8'],
  Pic9: x['boat/catch_details/img9/pic9'],
  Pic10: x['boat/catch_details/img10/pic10'],
  Pic11: x['boat/catch_details/img11/pic11'],
  Pic12: x['boat/catch_details/img12/pic12'],
  GearType: x['boat/catch_details/gear_type'],
  GearTypeOther: x['boat/catch_details/gear_type_other'],
  DnaSampleCollected: x['boat/catch_details/dna_sample_collected'],
  DnaCode: x['boat/catch_details/dna_code'],
  PriceSoldFor: x['boat/catch_details/price_sold_for'],
  PriceSoldUsd: x['boat/catch_details/price_sold_usd'],
  Comment: x['boat/catch_details/comment'],
  BoatUuid: x['__parentUuid'],
  Payload: state.data.body,
  AnswerId: dataValue('_id'),
  GeneratedUuid: x['__generatedUuid']
}) 

          } 
 return upsertMany('WCSPROGRAMS_SharksRaysCatchDetails', 'GeneratedUuid', () => mapping, {setNull: ["''", "'undefined'"]})(state); 
}) 
)
each(dataPath('boat[*]'), alterState(async state => {
 const dataArray = state.data['boat/fish_catch'] || [] 

        const mapping = []; 
 
        for (let x of dataArray) { 

          mapping.push({
  FishSpecie: x['boat/fish_catch/fish_specie'],
  NbObserved: x['boat/fish_catch/nb_observed'],
  TotalWeightFish: x['boat/fish_catch/total_weight_fish'],
  FishPartConsumed: x['boat/fish_catch/fish_part_consumed'],
  FishPriceKg: x['boat/fish_catch/fish_price_kg'],
  FishPriceSoldUsd: x['boat/fish_catch/fish_price_sold_usd'],
  BoatUuid: x['__parentUuid'],
  Payload: state.data.body,
  AnswerId: dataValue('_id'),
  GeneratedUuid: x['__generatedUuid']
}) 

          } 
 return upsertMany('WCSPROGRAMS_SharksRaysFishCatch', 'GeneratedUuid', () => mapping, {setNull: ["''", "'undefined'"]})(state); 
}) 
)
each(dataPath('boat[*]'), each(dataPath('fish_catch[*]'), alterState(async state => {
 const dataArray = state.data['boat/fish_catch/sample'] || [] 

        const mapping = []; 
 
        for (let x of dataArray) { 

          mapping.push({
  FishLength: x['boat/fish_catch/sample/fish_length'],
  FishWeight: x['boat/fish_catch/sample/fish_weight'],
  FishCatchUuid: x['__parentUuid'],
  Payload: state.data.body,
  AnswerId: dataValue('_id'),
  GeneratedUuid: x['__generatedUuid']
}) 

          } 
 return upsertMany('WCSPROGRAMS_SharksRaysSample', 'GeneratedUuid', () => mapping, {setNull: ["''", "'undefined'"]})(state); 
}) 
))
alterState(async state => {
 const dataArray = state.data['market_details/vendor'] || [] 

        const mapping = []; 
 
        for (let x of dataArray) { 

          mapping.push({
  VendorSex: x['market_details/vendor/vendor_sex'],
  WhenLastSellSharkRay: x['market_details/vendor/when_last_sell_shark_ray'],
  WhereBought: x['market_details/vendor/where_bought'],
  WhoSoldTo: x['market_details/vendor/who_sold_to'],
  WhoSoldOther: x['market_details/vendor/who_sold_other'],
  SharksraysUuid: x['__parentUuid'],
  Payload: state.data.body,
  AnswerId: dataValue('_id'),
  GeneratedUuid: x['__generatedUuid']
}) 

          } 
 return upsertMany('WCSPROGRAMS_SharksRaysVendor', 'GeneratedUuid', () => mapping, {setNull: ["''", "'undefined'"]})(state); 
}) 
each(dataPath('market_details[*]'), alterState(async state => {
 const dataArray = state.data['market_details/vendor/sales'] || [] 

        const mapping = []; 
 
        for (let x of dataArray) { 

          mapping.push({
  SType: x['market_details/vendor/sales/s_type'],
  SGenus: x['market_details/vendor/sales/s_genus'],
  SSpecies: x['market_details/vendor/sales/s_species'],
  SPic4: x['market_details/vendor/sales/s_img4/s_pic_4'],
  SPic5: x['market_details/vendor/sales/s_img5/s_pic_5'],
  SPic6: x['market_details/vendor/sales/s_img6/s_pic6'],
  SPic7: x['market_details/vendor/sales/s_img7/s_pic7'],
  SPic8: x['market_details/vendor/sales/s_img8/s_pic8'],
  SPic9: x['market_details/vendor/sales/s_img9/s_pic9'],
  SPic10: x['market_details/vendor/sales/s_img10/s_pic10'],
  SPic11: x['market_details/vendor/sales/s_img11/s_pic11'],
  SPic12: x['market_details/vendor/sales/s_img12/s_pic12'],
  SLocalName: x['market_details/vendor/sales/s_local_name'],
  SSex: x['market_details/vendor/sales/s_sex'],
  SWeight: x['market_details/vendor/sales/s_weight'],
  SDiscWidth: x['market_details/vendor/sales/s_disc_width'],
  SDiscLength: x['market_details/vendor/sales/s_disc_length'],
  STotalLength: x['market_details/vendor/sales/s_total_length'],
  SPrecaudalLength: x['market_details/vendor/sales/s_precaudal_length'],
  SForkLength: x['market_details/vendor/sales/s_fork_length'],
  SCarapaceLength: x['market_details/vendor/sales/s_carapace_length'],
  SCarapaceWidth: x['market_details/vendor/sales/s_carapace_width'],
  SGearType: x['market_details/vendor/sales/s_gear_type'],
  SGearTypeOther: x['market_details/vendor/sales/s_gear_type_other'],
  SDnaSampleCollected: x['market_details/vendor/sales/s_dna_sample_collected'],
  SDnaCode: x['market_details/vendor/sales/s_dna_code'],
  SPriceSoldFor: x['market_details/vendor/sales/s_price_sold_for'],
  SPriceSoldUsd: x['market_details/vendor/sales/s_price_sold_usd'],
  SComment: x['market_details/vendor/sales/s_comment'],
  VendorUuid: x['__parentUuid'],
  Payload: state.data.body,
  AnswerId: dataValue('_id'),
  GeneratedUuid: x['__generatedUuid']
}) 

          } 
 return upsertMany('WCSPROGRAMS_SharksRaysSales', 'GeneratedUuid', () => mapping, {setNull: ["''", "'undefined'"]})(state); 
}) 
)
