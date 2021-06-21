alterState(state => {
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

  generateUuid(
    state.data.body,
    state.data.body._id+'-'+state.data.body._xform_id_string
  );

  state.data = { ...state.data, ...state.data.body };
  return state;
}); 
alterState(async state => {
 const mapping = {
  SurveyTypeName: dataValue('survey_type'),
  SurveyTypeExtCode: dataValue('survey_type'),
  Payload: state.data.body
} 
 return upsertIf(dataValue('survey_type'),'WCSPROGRAMS__SurveyType', 'SurveyTypeExtCode', mapping)(state); 
}) 
alterState(async state => {
 const mapping = {
  CountryName: dataValue('country'),
  CountryExtCode: dataValue('country'),
  Payload: state.data.body
} 
 return upsertIf(dataValue('country'),'WCSPROGRAMS__Country', 'CountryExtCode', mapping)(state); 
}) 
alterState(async state => {
 const mapping = {
  DistrictName: dataValue('district'),
  DistrictExtCode: dataValue('district'),
  Payload: state.data.body
} 
 return upsertIf(dataValue('district'),'WCSPROGRAMS__District', 'DistrictExtCode', mapping)(state); 
}) 
alterState(async state => {
 const mapping = {
  SurveyName: dataValue('survey'),
  SurveyExtCode: dataValue('survey'),
  Payload: state.data.body
} 
 return upsertIf(dataValue('survey'),'WCSPROGRAMS__Survey', 'SurveyExtCode', mapping)(state); 
}) 
alterState(async state => {
 const mapping = {
  LandingSiteName: dataValue('landing_site'),
  LandingSiteExtCode: dataValue('landing_site'),
  Payload: state.data.body
} 
 return upsertIf(dataValue('landing_site'),'WCSPROGRAMS__LandingSite', 'LandingSiteExtCode', mapping)(state); 
}) 
alterState(async state => {
 const mapping = {
  MarketName: dataValue('market'),
  MarketExtCode: dataValue('market'),
  Payload: state.data.body
} 
 return upsertIf(dataValue('market'),'WCSPROGRAMS__Market', 'MarketExtCode', mapping)(state); 
}) 
alterState(async state => {
 const mapping = {
  SurveyorName: dataValue('surveyor'),
  SurveyorExtCode: dataValue('surveyor'),
  Payload: state.data.body
} 
 return upsertIf(dataValue('surveyor'),'WCSPROGRAMS__Surveyor', 'SurveyorExtCode', mapping)(state); 
}) 
alterState(async state => {
 const mapping = {
  FormName: dataValue('formName'),
  DatasetId: dataValue('_xform_id_string'),
  LastUpdated: new Date().toISOString(),
  Payload: state.data.body
} 
 return upsert('WCSPROGRAMS__KoboDataset', 'DatasetId', mapping)(state); 
}) 
alterState(async state => {
 const mapping = {
  Verification: dataValue('verification'),
  SharkRayVendorsNb: dataValue('market_details/shark_ray_vendors_nb'),
  Consent: dataValue('consent'),
  Pic3: dataValue('pic3'),
  Pic2: dataValue('pic2'),
  Pic1: dataValue('pic1'),
  Surveyor: await findValue({uuid: 'surveyorid', relation: 'WCSPROGRAMS__Surveyor', where: { SurveyorName: dataValue('surveyor') }})(state),
  Market: await findValue({uuid: 'marketid', relation: 'WCSPROGRAMS__Market', where: { MarketName: dataValue('market') }})(state),
  LandingSite: await findValue({uuid: 'landingsiteid', relation: 'WCSPROGRAMS__LandingSite', where: { LandingSiteName: dataValue('landing_site') }})(state),
  Survey: await findValue({uuid: 'surveyid', relation: 'WCSPROGRAMS__Survey', where: { SurveyName: dataValue('survey') }})(state),
  District: await findValue({uuid: 'districtid', relation: 'WCSPROGRAMS__District', where: { DistrictName: dataValue('district') }})(state),
  Country: await findValue({uuid: 'countryid', relation: 'WCSPROGRAMS__Country', where: { CountryName: dataValue('country') }})(state),
  Gps: dataValue('gps'),
  SurveyType: await findValue({uuid: 'surveytypeid', relation: 'WCSPROGRAMS__SurveyType', where: { SurveyTypeName: dataValue('survey_type') }})(state),
  Deviceid: dataValue('deviceid'),
  EndDate: dataValue('end'),
  Start: dataValue('start'),
  Today: dataValue('today'),
  Payload: state.data.body,
  AnswerId: dataValue('_id'),
  GeneratedUuid: dataValue('__generatedUuid')
} 
 return upsert('WCSPROGRAMS__SharksRays', 'GeneratedUuid', mapping)(state); 
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
 return upsertMany('WCSPROGRAMS__SharksRays_Boat', 'GeneratedUuid', () => mapping)(state); 
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
 return upsertMany('WCSPROGRAMS__SharksRays_CatchDetails', 'GeneratedUuid', () => mapping)(state); 
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
 return upsertMany('WCSPROGRAMS__SharksRays_FishCatch', 'GeneratedUuid', () => mapping)(state); 
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
 return upsertMany('WCSPROGRAMS__SharksRays_Sample', 'GeneratedUuid', () => mapping)(state); 
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
 return upsertMany('WCSPROGRAMS__SharksRays_Vendor', 'GeneratedUuid', () => mapping)(state); 
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
 return upsertMany('WCSPROGRAMS__SharksRays_Sales', 'GeneratedUuid', () => mapping)(state); 
}) 
)
