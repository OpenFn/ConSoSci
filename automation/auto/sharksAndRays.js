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
upsert('WCS__KoboDataset', 'DatasetId', {
  FormName: dataValue('formName'),
  DatasetId: dataValue('_xform_id_string'),
  LastUpdated: new Date().toISOString(),
  Payload: state.data.body
}); 
upsert('WCS_SR_SharkAndRaysTraining', 'generated_uuid', {
  Verification: dataValue('verification'),
  SharkRayVendorsNb: dataValue('market_details/shark_ray_vendors_nb'),
  Pic3: dataValue('pic3'),
  Pic2: dataValue('pic2'),
  Pic1: dataValue('pic1'),
  Surveyor: dataValue('surveyor'),
  Market: dataValue('market'),
  LandingSite: dataValue('landing_site'),
  Survey: dataValue('survey'),
  Country: dataValue('country'),
  Gps: dataValue('gps'),
  SurveyType: dataValue('survey_type'),
  Deviceid: dataValue('deviceid'),
  EndDate: dataValue('end'),
  Start: dataValue('start'),
  Today: dataValue('today'),
  Payload: state.data.body,
  GeneratedUuid: dataValue('undefined'),
  generated_uuid: dataValue('__generatedUuid')
}); 
upsertMany('WCS_SR_SharkAndRaysTraining_Boat', 'generated_uuid', state => { const dataArray = state.data['boat'] || [];
          return dataArray.map(x => ({
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
  MeatPrice: x['boat/meat_price'],
  OilPrice: x['boat/oil_price'],
  NbSharksUnsampled: x['boat/nb_sharks_unsampled'],
  NbRaysUnsampled: x['boat/nb_rays_unsampled'],
  NbSharkLikeRaysUnsampled: x['boat/nb_shark_like_rays_unsampled'],
  SharkandraystrainingUuid: dataValue('undefined'),
  Payload: state.data.body,
  GeneratedUuid: dataValue('undefined'),
  generated_uuid: x['__generatedUuid'],
  SharkAndRaysTraining_uuid: x['__parentUuid']
}))}); 
each(dataPath('boat[*]'), upsertMany('WCS_SR_SharkAndRaysTraining_CatchDetails', 'generated_uuid', state => { const dataArray = state.data['boat/catch_details'] || [];
          return dataArray.map(x => ({
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
  Comment: x['boat/catch_details/comment'],
  BoatUuid: dataValue('undefined'),
  Payload: state.data.body,
  GeneratedUuid: dataValue('undefined'),
  generated_uuid: x['__generatedUuid'],
  boat_uuid: x['__parentUuid']
}))})); 
each(dataPath('boat[*]'), upsertMany('WCS_SR_SharkAndRaysTraining_FishCatch', 'generated_uuid', state => { const dataArray = state.data['boat/fish_catch'] || [];
          return dataArray.map(x => ({
  FishSpecie: x['boat/fish_catch/fish_specie'],
  NbObserved: x['boat/fish_catch/nb_observed'],
  TotalWeightFish: x['boat/fish_catch/total_weight_fish'],
  FishPartConsumed: x['boat/fish_catch/fish_part_consumed'],
  FishPriceKg: x['boat/fish_catch/fish_price_kg'],
  BoatUuid: dataValue('undefined'),
  Payload: state.data.body,
  GeneratedUuid: dataValue('undefined'),
  generated_uuid: x['__generatedUuid'],
  boat_uuid: x['__parentUuid']
}))})); 
each(dataPath('boat[*]'), each(dataPath('fish_catch[*]'), upsertMany('WCS_SR_SharkAndRaysTraining_Sample', 'generated_uuid', state => { const dataArray = state.data['boat/fish_catch/sample'] || [];
          return dataArray.map(x => ({
  FishLength: x['boat/fish_catch/sample/fish_length'],
  FishWeight: x['boat/fish_catch/sample/fish_weight'],
  FishCatchUuid: dataValue('undefined'),
  Payload: state.data.body,
  GeneratedUuid: dataValue('undefined'),
  generated_uuid: x['__generatedUuid'],
  fish_catch_uuid: x['__parentUuid']
}))}))); 
upsertMany('WCS_SR_SharkAndRaysTraining_Vendor', 'generated_uuid', state => { const dataArray = state.data['market_details/vendor'] || [];
          return dataArray.map(x => ({
  VendorSex: x['market_details/vendor/vendor_sex'],
  WhenLastSellSharkRay: x['market_details/vendor/when_last_sell_shark_ray'],
  WhereBought: x['market_details/vendor/where_bought'],
  WhoSoldTo: x['market_details/vendor/who_sold_to'],
  WhoSoldOther: x['market_details/vendor/who_sold_other'],
  SharkandraystrainingUuid: dataValue('undefined'),
  Payload: state.data.body,
  GeneratedUuid: dataValue('undefined'),
  generated_uuid: x['__generatedUuid'],
  SharkAndRaysTraining_uuid: x['__parentUuid']
}))}); 
each(dataPath('market_details[*]'), upsertMany('WCS_SR_SharkAndRaysTraining_Sales', 'generated_uuid', state => { const dataArray = state.data['market_details/vendor/sales'] || [];
          return dataArray.map(x => ({
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
  SComment: x['market_details/vendor/sales/s_comment'],
  VendorUuid: dataValue('undefined'),
  Payload: state.data.body,
  GeneratedUuid: dataValue('undefined'),
  generated_uuid: x['__generatedUuid'],
  vendor_uuid: x['__parentUuid']
}))})); 
