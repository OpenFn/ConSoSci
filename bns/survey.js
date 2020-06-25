// Built for Microsoft SQL Azure (RTM) - 12.0.2000.8
upsert('WCSPROGRAMS_KoboBnsAnswer', 'DatasetUuidId', {
  DatasetUuidId: dataValue('body._uuid'),
  AnswerId: dataValue('body._id'),
  SurveyDate: dataValue('body.today'),
  Landscape: dataValue('body.landscape'),
  Surveyor: dataValue('body.surveyor'),
  Participant: dataValue('body.participant'),
  Arrival: dataValue('body.arrival'),
  District: dataValue('body.district'),
  Village: dataValue('body.village'),
  //HhId: dataValue('body.hh_id'),
  BenefProject: dataValue('body.benef_project'),
  HhTypeControl: dataValue('body.hh_type'),
  HhTypeOrgBenef: dataValue('body.hh_type'),
  HhTypeOtherBenef: dataValue('body.hh_type'),
  //ExplainProject: dataValue('body.explain_project'),
  KnowPa: dataValue('body.know_PA'),
  //BenefPa: dataValue('body.benef_PA'),
  //ExplainBenefPa: dataValue('body.explain_benef_PA'),
  Livelihood1: dataValue('body.livelihoods/l1'),
  Livelihood2: dataValue('body.livelihoods/l2'),
  //Livelihood3: dataValue('body.livelihoods/l3'),
  //Livelihood4: dataValue('body.livelihoods/l4'),
  BnsPlus: dataValue('body.bns_plus'),
  // more: dataValue('moreFields'), ...
});

// Refactor this for scale so it doesn't perform a no-op delete 9/10 times.
// Maybe check result of previous op, then only delete if it was an update.
sql({
  query: `DELETE FROM WCSPROGRAMS_KoboBnsAnswerhhmembers where AnswerId = ${state.data.AnswerId}`,
});

insertMany('WCSPROGRAMS_KoboBnsAnswerhhmembers', state => {
  state.data.hhMembers.map(member => {
    return {
      AnswerId: state.data.body._id, //is _id how we map to parent Answer? or _uuid?
      //Name: member.name,
      Head: gender_head ? 'yes' : 'no',
      Gender: gender_head,
      Ethnicity: ethnicity_head,
      Birth: birth_head,
    };
  });
});

upsert('WCSPROGRAMS_KoboBnsAnswernr', 'DatasetUuidId', {
  DatasetUuidId: dataValue('body._uuid'), //need to configure this on all child tables?
  AnswerId: dataValue('body._id'),
  NrCollect: dataValue('body.firewood'),
  NrCollect: dataValue('body.gnetum'),
  NrCollect: dataValue('body.marantaceas'),
  NrCollect: dataValue('body.bushmeat'),
  NrCollect: dataValue('body.liana'),
  // more: dataValue('moreFields'),
});

// Refactor this for scale so it doesn't perform a no-op delete 9/10 times.
// Maybe check result of previous op, then only delete if it was an update.
sql({
  query: `DELETE FROM KoboBnsAnswergs where AnswerId = ${state.data.AnswerId}`,
});

//==>NOTE: KoboBnsAnswergs is not actually a repeat group!
//Refector to handle 37 different question groups --> inserting 37 records total (IF defined)
insertMany('WCSPROGRAMS_KoboBnsAnswergs', state => {
  state.data.group1 = {
    AnswerId: state.data._id,
    gs: dataValue('body.bns_matrix_machete/bns_matrix_machete_note'),
    have: dataValue('body.bns_matrix_machete/bns_matrix_machete_possess'),
    necessary: dataValue(
      'body.bns_matrix_machete/bns_matrix_machete_necessary'
    ),
    quantity: dataValue('body.bns_matrix_machete/bns_matrix_machete_number'),
  };
  state.data.group2 = {
    AnswerId: state.data._id,
    gs: dataValue('body.bns_matrix_hairdresser/bns_matrix_hairdresser_note'),
    have: dataValue(
      'body.bns_matrix_hairdresser/bns_matrix_hairdresser_possess'
    ),
    necessary: dataValue(
      'body.bns_matrix_hairdresser/bns_matrix_hairdresser_necessary'
    ),
    quantity: dataValue(
      'body.bns_matrix_hairdresser/bns_matrix_hairdresser_number'
    ),
  };
  state.data.group3 = {
    AnswerId: state.data._id,
    gs: dataValue('body.bns_matrix_cookstove/bns_matrix_cookstove_note'),
    have: dataValue('body.bns_matrix_cookstove/bns_matrix_cookstove_possess'),
    necessary: dataValue(
      'body.bns_matrix_cookstove/bns_matrix_cookstove_necessary'
    ),
    quantity: dataValue(
      'body.bns_matrix_cookstove/bns_matrix_cookstove_number'
    ),
  };
  state.data.group4 = {
    AnswerId: state.data._id,
    gs: dataValue('body.bns_matrix_cookstove/bns_matrix_cookstove_note'),
    have: dataValue('body.bns_matrix_cookstove/bns_matrix_cookstove_possess'),
    necessary: dataValue(
      'body.bns_matrix_cookstove/bns_matrix_cookstove_necessary'
    ),
    quantity: dataValue(
      'body.bns_matrix_cookstove/bns_matrix_cookstove_number'
    ),
  };
  state.data.group5 = {
    AnswerId: state.data._id,
    gs: dataValue(
      'body.bns_matrix_equipped_pharmacy_village/bns_matrix_equipped_pharmacy_village_note'
    ),
    have: dataValue(
      'body.bns_matrix_equipped_pharmacy_village/bns_matrix_equipped_pharmacy_village_possess'
    ),
    necessary: dataValue(
      'body.bns_matrix_equipped_pharmacy_village/bns_matrix_equipped_pharmacy_village_necessary'
    ),
    quantity: dataValue(
      'body.bns_matrix_equipped_pharmacy_village/bns_matrix_equipped_pharmacy_village_number'
    ),
  };
  state.data.group6 = {
    AnswerId: state.data._id,
    gs: dataValue('body.bns_matrix_generator/bns_matrix_generator_note'),
    have: dataValue('body.bns_matrix_generator/bns_matrix_generator_possess'),
    necessary: dataValue(
      'body.bns_matrix_generator/bns_matrix_generator_necessary'
    ),
    quantity: dataValue(
      'body.bns_matrix_generator/bns_matrix_generator_number'
    ),
  };
  state.data.group7 = {
    AnswerId: state.data._id,
    gs: dataValue(
      'body.bns_matrix_sewing_machine/bns_matrix_sewing_machine_note'
    ),
    have: dataValue(
      'body.bns_matrix_sewing_machine/bns_matrix_sewing_machine_possess'
    ),
    necessary: dataValue(
      'body.bns_matrix_sewing_machine/bns_matrix_sewing_machine_necessary'
    ),
    quantity: dataValue(
      'body.bns_matrix_sewing_machine/bns_matrix_sewing_machine_number'
    ),
  };
  state.data.group8 = {
    AnswerId: state.data._id,
    gs: dataValue('body.bns_matrix_meal_2_day/bns_matrix_meal_2_day_note'),
    have: dataValue('body.bns_matrix_meal_2_day/bns_matrix_meal_2_day_possess'),
    necessary: dataValue(
      'body.bns_matrix_meal_2_day/bns_matrix_meal_2_day_necessary'
    ),
    quantity: dataValue(
      'body.bns_matrix_meal_2_day/bns_matrix_meal_2_day_number'
    ),
  };
  state.data.group9 = {
    AnswerId: state.data._id,
    gs: dataValue('body.bns_matrix_jerrycan_25l/bns_matrix_jerrycan_25l_note'),
    have: dataValue(
      'body.bns_matrix_jerrycan_25l/bns_matrix_jerrycan_25l_possess'
    ),
    necessary: dataValue(
      'body.bns_matrix_jerrycan_25l/bns_matrix_jerrycan_25l_necessary'
    ),
    quantity: dataValue(
      'body.bns_matrix_jerrycan_25l/bns_matrix_jerrycan_25l_number'
    ),
  };
  state.data.group10 = {
    AnswerId: state.data._id,
    gs: dataValue('body.bns_matrix_table_chairs/bns_matrix_table_chairs_note'),
    have: dataValue(
      'body.bns_matrix_table_chairs/bns_matrix_table_chairs_possess'
    ),
    necessary: dataValue(
      'body.bns_matrix_table_chairs/bns_matrix_table_chairs_necessary'
    ),
    quantity: dataValue(
      'body.bns_matrix_table_chairs/bns_matrix_table_chairs_number'
    ),
  };
  state.data.group11 = {
    AnswerId: state.data._id,
    gs: dataValue(
      'body.bns_matrix_women_care_provided_women/bns_matrix_women_care_provided_women_note'
    ),
    have: dataValue(
      'body.bns_matrix_women_care_provided_women/bns_matrix_women_care_provided_women_possess'
    ),
    necessary: dataValue(
      'body.bns_matrix_women_care_provided_women/bns_matrix_women_care_provided_women_necessary'
    ),
    quantity: dataValue(
      'body.bns_matrix_women_care_provided_women/bns_matrix_women_care_provided_women_number'
    ),
  };
  state.data.group12 = {
    AnswerId: state.data._id,
    gs: dataValue(
      'body.bns_matrix_brick_house_metal_roof/bns_matrix_brick_house_metal_roof_note'
    ),
    have: dataValue(
      'body.bns_matrix_brick_house_metal_roof/bns_matrix_brick_house_metal_roof_possess'
    ),
    necessary: dataValue(
      'body.bns_matrix_brick_house_metal_roof/bns_matrix_brick_house_metal_roof_necessary'
    ),
    quantity: dataValue(
      'body.bns_matrix_brick_house_metal_roof/bns_matrix_brick_house_metal_roof_number'
    ),
  };
  state.data.group13 = {
    AnswerId: state.data._id,
    gs: dataValue(
      'body.bns_matrix_work_without_discrimination/bns_matrix_work_without_discrimination_note'
    ),
    have: dataValue(
      'body.bns_matrix_work_without_discrimination/bns_matrix_work_without_discrimination_possess'
    ),
    necessary: dataValue(
      'body.bns_matrix_work_without_discrimination/bns_matrix_work_without_discrimination_necessary'
    ),
    quantity: dataValue(
      'body.bns_matrix_work_without_discrimination/bns_matrix_work_without_discrimination_number'
    ),
  };
  state.data.group14 = {
    AnswerId: state.data._id,
    gs: dataValue('body.bns_matrix_tv/bns_matrix_tv_note'),
    have: dataValue('body.bns_matrix_tv/bns_matrix_tv_possess'),
    necessary: dataValue('body.bns_matrix_tv/bns_matrix_tv_necessary'),
    quantity: dataValue('body.bns_matrix_tv/bns_matrix_tv_number'),
  };
  state.data.group15 = {
    AnswerId: state.data._id,
    gs: dataValue(
      'body.bns_matrix_access_employment/bns_matrix_access_employment_note'
    ),
    have: dataValue(
      'body.bns_matrix_access_employment/bns_matrix_access_employment_possess'
    ),
    necessary: dataValue(
      'body.bns_matrix_access_employment/bns_matrix_access_employment_necessary'
    ),
    quantity: dataValue(
      'body.bns_matrix_access_employment/bns_matrix_access_employment_number'
    ),
  };
  state.data.group16 = {
    AnswerId: state.data._id,
    gs: dataValue(
      'body.bns_matrix_hurricane_lamp/bns_matrix_hurricane_lamp_note'
    ),
    have: dataValue(
      'body.bns_matrix_hurricane_lamp/bns_matrix_hurricane_lamp_possess'
    ),
    necessary: dataValue(
      'body.bns_matrix_hurricane_lamp/bns_matrix_hurricane_lamp_necessary'
    ),
    quantity: dataValue(
      'body.bns_matrix_hurricane_lamp/bns_matrix_hurricane_lamp_number'
    ),
  };
  state.data.group17 = {
    AnswerId: state.data._id,
    gs: dataValue(
      'body.bns_matrix_natural_resources_1h/bns_matrix_natural_resources_1h_note'
    ),
    have: dataValue(
      'body.bns_matrix_natural_resources_1h/bns_matrix_natural_resources_1h_possess'
    ),
    necessary: dataValue(
      'body.bns_matrix_natural_resources_1h/bns_matrix_natural_resources_1h_necessary'
    ),
    quantity: dataValue(
      'body.bns_matrix_natural_resources_1h/bns_matrix_natural_resources_1h_number'
    ),
  };
  state.data.group18 = {
    AnswerId: state.data._id,
    gs: dataValue('body.bns_matrix_fishing_net/bns_matrix_fishing_net_note'),
    have: dataValue(
      'body.bns_matrix_fishing_net/bns_matrix_fishing_net_possess'
    ),
    necessary: dataValue(
      'body.bns_matrix_fishing_net/bns_matrix_fishing_net_necessary'
    ),
    quantity: dataValue(
      'body.bns_matrix_fishing_net/bns_matrix_fishing_net_number'
    ),
  };
  state.data.group19 = {
    AnswerId: state.data._id,
    gs: dataValue('body.bns_matrix_new_clothes/bns_matrix_new_clothes_note'),
    have: dataValue(
      'body.bns_matrix_new_clothes/bns_matrix_new_clothes_possess'
    ),
    necessary: dataValue(
      'body.bns_matrix_new_clothes/bns_matrix_new_clothes_necessary'
    ),
    quantity: dataValue(
      'body.bns_matrix_new_clothes/bns_matrix_new_clothes_number'
    ),
  };
  state.data.group20 = {
    AnswerId: state.data._id,
    gs: dataValue('body.bns_matrix_moto/bns_matrix_moto_note'),
    have: dataValue('body.bns_matrix_moto/bns_matrix_moto_possess'),
    necessary: dataValue('body.bns_matrix_moto/bns_matrix_moto_necessary'),
    quantity: dataValue('body.bns_matrix_moto/bns_matrix_moto_number'),
  };
  state.data.group21 = {
    AnswerId: state.data._id,
    gs: dataValue('body.bns_matrix_jewelry/bns_matrix_jewelry_note'),
    have: dataValue('body.bns_matrix_jewelry/bns_matrix_jewelry_possess'),
    necessary: dataValue(
      'body.bns_matrix_jewelry/bns_matrix_jewelry_necessary'
    ),
    quantity: dataValue('body.bns_matrix_jewelry/bns_matrix_jewelry_number'),
  };
  state.data.group22 = {
    AnswerId: state.data._id,
    gs: dataValue('body.bns_matrix_mosquito_net/bns_matrix_mosquito_net_note'),
    have: dataValue(
      'body.bns_matrix_mosquito_net/bns_matrix_mosquito_net_possess'
    ),
    necessary: dataValue(
      'body.bns_matrix_mosquito_net/bns_matrix_mosquito_net_necessary'
    ),
    quantity: dataValue(
      'body.bns_matrix_mosquito_net/bns_matrix_mosquito_net_number'
    ),
  };
  state.data.group23 = {
    AnswerId: state.data._id,
    gs: dataValue('body.bns_matrix_money_school/bns_matrix_money_school_note'),
    have: dataValue(
      'body.bns_matrix_money_school/bns_matrix_money_school_possess'
    ),
    necessary: dataValue(
      'body.bns_matrix_money_school/bns_matrix_money_school_necessary'
    ),
    quantity: dataValue(
      'body.bns_matrix_money_school/bns_matrix_money_school_number'
    ),
  };
  state.data.group24 = {
    AnswerId: state.data._id,
    gs: dataValue('body.bns_matrix_chicken/bns_matrix_chicken_note'),
    have: dataValue('body.bns_matrix_chicken/bns_matrix_chicken_possess'),
    necessary: dataValue(
      'body.bns_matrix_chicken/bns_matrix_chicken_necessary'
    ),
    quantity: dataValue('body.bns_matrix_chicken/bns_matrix_chicken_number'),
  };
  state.data.group25 = {
    AnswerId: state.data._id,
    gs: dataValue('body.bns_matrix_canoe/bns_matrix_canoe_note'),
    have: dataValue('body.bns_matrix_canoe/bns_matrix_canoe_possess'),
    necessary: dataValue('body.bns_matrix_canoe/bns_matrix_canoe_necessary'),
    quantity: dataValue('body.bns_matrix_canoe/bns_matrix_canoe_number'),
  };
  state.data.group26 = {
    AnswerId: state.data._id,
    gs: dataValue('body.bns_matrix_sport_ground/bns_matrix_sport_ground_note'),
    have: dataValue(
      'body.bns_matrix_sport_ground/bns_matrix_sport_ground_possess'
    ),
    necessary: dataValue(
      'body.bns_matrix_sport_ground/bns_matrix_sport_ground_necessary'
    ),
    quantity: dataValue(
      'body.bns_matrix_sport_ground/bns_matrix_sport_ground_number'
    ),
  };
  state.data.group27 = {
    AnswerId: state.data._id,
    gs: dataValue('body.bns_matrix_phone/bns_matrix_phone_note'),
    have: dataValue('body.bns_matrix_phone/bns_matrix_phone_possess'),
    necessary: dataValue('body.bns_matrix_phone/bns_matrix_phone_necessary'),
    quantity: dataValue('body.bns_matrix_phone/bns_matrix_phone_number'),
  };
  state.data.group28 = {
    AnswerId: state.data._id,
    gs: dataValue('body.bns_matrix_gun/bns_matrix_gun_note'),
    have: dataValue('body.bns_matrix_gun/bns_matrix_gun_possess'),
    necessary: dataValue('body.bns_matrix_gun/bns_matrix_gun_necessary'),
    quantity: dataValue('body.bns_matrix_gun/bns_matrix_gun_number'),
  };
  state.data.group29 = {
    AnswerId: state.data._id,
    gs: dataValue(
      'body.bns_matrix_adult_learning/bns_matrix_adult_learning_note'
    ),
    have: dataValue(
      'body.bns_matrix_adult_learning/bns_matrix_adult_learning_possess'
    ),
    necessary: dataValue(
      'body.bns_matrix_adult_learning/bns_matrix_adult_learning_necessary'
    ),
    quantity: dataValue(
      'body.bns_matrix_adult_learning/bns_matrix_adult_learning_number'
    ),
  };
  state.data.group30 = {
    AnswerId: state.data._id,
    gs: dataValue('body.bns_matrix_lance/bns_matrix_lance_note'),
    have: dataValue('body.bns_matrix_lance/bns_matrix_lance_possess'),
    necessary: dataValue('body.bns_matrix_lance/bns_matrix_lance_necessary'),
    quantity: dataValue('body.bns_matrix_lance/bns_matrix_lance_number'),
  };
  state.data.group31 = {
    AnswerId: state.data._id,
    gs: dataValue(
      'body.bns_matrix_bed_and_mattress/bns_matrix_bed_and_mattress_note'
    ),
    have: dataValue(
      'body.bns_matrix_bed_and_mattress/bns_matrix_bed_and_mattress_possess'
    ),
    necessary: dataValue(
      'body.bns_matrix_bed_and_mattress/bns_matrix_bed_and_mattress_necessary'
    ),
    quantity: dataValue(
      'body.bns_matrix_bed_and_mattress/bns_matrix_bed_and_mattress_number'
    ),
  };
  state.data.group32 = {
    AnswerId: state.data._id,
    gs: dataValue(
      'body.bns_matrix_drinking_water_15min/bns_matrix_drinking_water_15min_note'
    ),
    have: dataValue(
      'body.bns_matrix_drinking_water_15min/bns_matrix_drinking_water_15min_possess'
    ),
    necessary: dataValue(
      'body.bns_matrix_drinking_water_15min/bns_matrix_drinking_water_15min_necessary'
    ),
    quantity: dataValue(
      'body.bns_matrix_drinking_water_15min/bns_matrix_drinking_water_15min_number'
    ),
  };
  state.data.group33 = {
    AnswerId: state.data._id,
    gs: dataValue(
      'body.bns_matrix_sheep_breeding/bns_matrix_sheep_breeding_note'
    ),
    have: dataValue(
      'body.bns_matrix_sheep_breeding/bns_matrix_sheep_breeding_possess'
    ),
    necessary: dataValue(
      'body.bns_matrix_sheep_breeding/bns_matrix_sheep_breeding_necessary'
    ),
    quantity: dataValue(
      'body.bns_matrix_sheep_breeding/bns_matrix_sheep_breeding_number'
    ),
  };
  state.data.group34 = {
    AnswerId: state.data._id,
    gs: dataValue('body.bns_matrix_freezer/bns_matrix_freezer_note'),
    have: dataValue('body.bns_matrix_freezer/bns_matrix_freezer_possess'),
    necessary: dataValue(
      'body.bns_matrix_freezer/bns_matrix_freezer_necessary'
    ),
    quantity: dataValue('body.bns_matrix_freezer/bns_matrix_freezer_number'),
  };
  state.data.group35 = {
    AnswerId: state.data._id,
    gs: dataValue(
      'body.bns_matrix_women_decision_village/bns_matrix_women_decision_village_note'
    ),
    have: dataValue(
      'body.bns_matrix_women_decision_village/bns_matrix_women_decision_village_possess'
    ),
    necessary: dataValue(
      'body.bns_matrix_women_decision_village/bns_matrix_women_decision_village_necessary'
    ),
    quantity: dataValue(
      'body.bns_matrix_women_decision_village/bns_matrix_women_decision_village_number'
    ),
  };
  state.data.group36 = {
    AnswerId: state.data._id,
    gs: dataValue(
      'body.bns_matrix_protein_once_week/bns_matrix_protein_once_week_note'
    ),
    have: dataValue(
      'body.bns_matrix_protein_once_week/bns_matrix_protein_once_week_possess'
    ),
    necessary: dataValue(
      'body.bns_matrix_protein_once_week/bns_matrix_protein_once_week_necessary'
    ),
    quantity: dataValue(
      'body.bns_matrix_protein_once_week/bns_matrix_protein_once_week_number'
    ),
  };
  state.data.group37 = {
    AnswerId: state.data._id,
    gs: dataValue(
      'body.bns_matrix_field_half_ha/bns_matrix_field_half_ha_note'
    ),
    have: dataValue(
      'body.bns_matrix_field_half_ha/bns_matrix_field_half_ha_possess'
    ),
    necessary: dataValue(
      'body.bns_matrix_field_half_ha/bns_matrix_field_half_ha_necessary'
    ),
    quantity: dataValue(
      'body.bns_matrix_field_half_ha/bns_matrix_field_half_ha_number'
    ),
  };

  return state; //return all score groups 1-37
});

upsert('WCSPROGRAMS_KoboBnsAnswergps', 'DatasetUuidId', {
  DatasetUuidId: dataValue('_uuid'),
  AnswerId: dataValue('_id'),
  Geom: dataValue('_geolocation'), //this is a Kobo array -- transform?
  Lat: dataValue('gps/lat'),
  Long: dataValue('gps/long'),
  // more: dataValue('moreFields'),
});
