// Note: This data cleaning operation returns state,
// modified in whatever way necessary.
alterState(state => {
  const original = state.data.body;
  let cleanedSubmission = {};

  for (const key in original) {
    switch (original[key]) {
      case 'yes':
        cleanedSubmission[key] = 1;
        break;

      case 'no':
        cleanedSubmission[key] = 0;
        break;

      default:
        break;
    }
  }

  state.data = cleanedSubmission;
  return state;
});

upsert('WCSPROGRAMS_KoboBnsAnswer', 'DatasetUuidId', {
  DatasetUuidId: dataValue('_uuid'),
  AnswerId: dataValue('_id'),
  SurveyDate: dataValue('today'),
  Landscape: dataValue('landscape'),
  Surveyor: dataValue('surveyor'),
  Participant: dataValue('participant'),
  Arrival: dataValue('arrival'),
  District: dataValue('district'),
  Village: dataValue('village'),
  //HhId: dataValue('hh_id'), //temp commenting out until 'undefined' string issue resolved in LP
  BenefProject: dataValue('benef_project'),
  HhTypeControl: dataValue('hh_type'),
  HhTypeOrgBenef: dataValue('hh_type'),
  HhTypeOtherBenef: dataValue('hh_type'),
  //ExplainProject: dataValue('explain_project'),
  KnowPa: dataValue('know_PA'),
  //BenefPa: dataValue('benef_PA'),
  //ExplainBenefPa: dataValue('explain_benef_PA'),
  Livelihood1: dataValue('livelihoods/l1'),
  Livelihood2: dataValue('livelihoods/l2'),
  //Livelihood3: dataValue('livelihoods/l3'),
  //Livelihood4: dataValue('livelihoods/l4'),
  BnsPlus: dataValue('bns_plus'),
  // more: dataValue('moreFields'), ...
});

// Upsert behavior for child tables/ repeat groups --> TO DISCUSS
// Refactor this for scale so it doesn't perform a no-op delete 9/10 times.
// Maybe check result of previous op, then only delete if it was an update.
sql({
  query: `DELETE FROM WCSPROGRAMS_KoboBnsAnswerhhmembers where AnswerId = ${state.data.AnswerId}`,
});

insertMany('WCSPROGRAMS_KoboBnsAnswerhhmembers', state => {
  state.data.hhMembers.map(member => {
    return {
      AnswerId: state.data.body._id, //is _id how we map to parent Answer? or _uuid?
      Head: member.gender_head ? 'yes' : 'no',
      Gender: member.gender_head,
      Ethnicity: member.ethnicity_head,
      Birth: member.birth_head,
    };
  });
});

//Looks like we need to insert 1 record for each NrCollect (?) --> see separate insert statements belpw
insert('WCSPROGRAMS_KoboBnsAnswernr', {
  AnswerId: dataValue('_id'), //is _id how we map to parent Answer? or _uuid?
  NrCollect: dataValue('firewood'),
});
insert('WCSPROGRAMS_KoboBnsAnswernr', {
  AnswerId: dataValue('_id'),
  NrCollect: dataValue('gnetum'),
});
insert('WCSPROGRAMS_KoboBnsAnswernr', {
  AnswerId: dataValue('_id'),
  NrCollect: dataValue('marantaceas'),
});
insert('WCSPROGRAMS_KoboBnsAnswernr', {
  AnswerId: dataValue('_id'),
  NrCollect: dataValue('bushmeat'),
});
insert('WCSPROGRAMS_KoboBnsAnswernr', {
  AnswerId: dataValue('_id'),
  NrCollect: dataValue('liana'),
});

/*upsert('WCSPROGRAMS_KoboBnsAnswernr', 'DatasetUuidId', {
  DatasetUuidId: dataValue('_uuid'), //need to configure this on all child tables?
  AnswerId: dataValue('_id'),
  NrCollect: dataValue('firewood'),
  NrCollect: dataValue('gnetum'),
  NrCollect: dataValue('marantaceas'),
  NrCollect: dataValue('bushmeat'),
  NrCollect: dataValue('liana'),
  // more: dataValue('moreFields'),
});*/

// Refactor this for scale so it doesn't perform a no-op delete 9/10 times.
// Maybe check result of previous op, then only delete if it was an update.
sql({
  query: `DELETE FROM KoboBnsAnswergs where AnswerId = ${state.data.AnswerId}`,
});

//==>NOTE: KoboBnsAnswergs is not actually a repeat group!
//Inserting each of 37 score groups as individual records in WCSPROGRAMS_KoboBnsAnswergs table
insert('WCSPROGRAMS_KoboBnsAnswergs', {
  AnswerId: state.data._id,
  gs: dataValue('bns_matrix_machete/bns_matrix_machete_note'),
  have: dataValue('bns_matrix_machete/bns_matrix_machete_possess'),
  necessary: dataValue('bns_matrix_machete/bns_matrix_machete_necessary'),
  quantity: dataValue('bns_matrix_machete/bns_matrix_machete_number'),
});
insert('WCSPROGRAMS_KoboBnsAnswergs', {
  AnswerId: state.data._id,
  gs: dataValue('bns_matrix_hairdresser/bns_matrix_hairdresser_note'),
  have: dataValue('bns_matrix_hairdresser/bns_matrix_hairdresser_possess'),
  necessary: dataValue('body.bns_matrix_hairdresser/bns_matrix_hairdresser_necessary'),
  quantity: dataValue('body.bns_matrix_hairdresser/bns_matrix_hairdresser_number'),
});
insert('WCSPROGRAMS_KoboBnsAnswergs', {
  AnswerId: state.data._id,
  gs: dataValue('bns_matrix_cookstove/bns_matrix_cookstove_note'),
  have: dataValue('bns_matrix_cookstove/bns_matrix_cookstove_possess'),
  necessary: dataValue('body.bns_matrix_cookstove/bns_matrix_cookstove_necessary'),
  quantity: dataValue('bns_matrix_cookstove/bns_matrix_cookstove_number'),
});
insert('WCSPROGRAMS_KoboBnsAnswergs', {
  AnswerId: state.data._id,
  gs: dataValue('bns_matrix_cookstove/bns_matrix_cookstove_note'),
  have: dataValue('bns_matrix_cookstove/bns_matrix_cookstove_possess'),
  necessary: dataValue('body.bns_matrix_cookstove/bns_matrix_cookstove_necessary'),
  quantity: dataValue('bns_matrix_cookstove/bns_matrix_cookstove_number'),
});
insert('WCSPROGRAMS_KoboBnsAnswergs', {
  AnswerId: state.data._id,
  gs: dataValue('body.bns_matrix_equipped_pharmacy_village/bns_matrix_equipped_pharmacy_village_note'),
  have: dataValue('body.bns_matrix_equipped_pharmacy_village/bns_matrix_equipped_pharmacy_village_possess'),
  necessary: dataValue('body.bns_matrix_equipped_pharmacy_village/bns_matrix_equipped_pharmacy_village_necessary'),
  quantity: dataValue('body.bns_matrix_equipped_pharmacy_village/bns_matrix_equipped_pharmacy_village_number'),
});
insert('WCSPROGRAMS_KoboBnsAnswergs', {
  AnswerId: state.data._id,
  gs: dataValue('bns_matrix_generator/bns_matrix_generator_note'),
  have: dataValue('bns_matrix_generator/bns_matrix_generator_possess'),
  necessary: dataValue('body.bns_matrix_generator/bns_matrix_generator_necessary'),
  quantity: dataValue('bns_matrix_generator/bns_matrix_generator_number'),
});
insert('WCSPROGRAMS_KoboBnsAnswergs', {
  AnswerId: state.data._id,
  gs: dataValue('body.bns_matrix_sewing_machine/bns_matrix_sewing_machine_note'),
  have: dataValue('body.bns_matrix_sewing_machine/bns_matrix_sewing_machine_possess'),
  necessary: dataValue('body.bns_matrix_sewing_machine/bns_matrix_sewing_machine_necessary'),
  quantity: dataValue('body.bns_matrix_sewing_machine/bns_matrix_sewing_machine_number'),
});
insert('WCSPROGRAMS_KoboBnsAnswergs', {
  AnswerId: state.data._id,
  gs: dataValue('bns_matrix_meal_2_day/bns_matrix_meal_2_day_note'),
  have: dataValue('bns_matrix_meal_2_day/bns_matrix_meal_2_day_possess'),
  necessary: dataValue('body.bns_matrix_meal_2_day/bns_matrix_meal_2_day_necessary'),
  quantity: dataValue('body.bns_matrix_meal_2_day/bns_matrix_meal_2_day_number'),
});
insert('WCSPROGRAMS_KoboBnsAnswergs', {
  AnswerId: state.data._id,
  gs: dataValue('bns_matrix_jerrycan_25l/bns_matrix_jerrycan_25l_note'),
  have: dataValue('body.bns_matrix_jerrycan_25l/bns_matrix_jerrycan_25l_possess'),
  necessary: dataValue('body.bns_matrix_jerrycan_25l/bns_matrix_jerrycan_25l_necessary'),
  quantity: dataValue('body.bns_matrix_jerrycan_25l/bns_matrix_jerrycan_25l_number'),
});
insert('WCSPROGRAMS_KoboBnsAnswergs', {
  AnswerId: state.data._id,
  gs: dataValue('bns_matrix_table_chairs/bns_matrix_table_chairs_note'),
  have: dataValue('body.bns_matrix_table_chairs/bns_matrix_table_chairs_possess'),
  necessary: dataValue('body.bns_matrix_table_chairs/bns_matrix_table_chairs_necessary'),
  quantity: dataValue('body.bns_matrix_table_chairs/bns_matrix_table_chairs_number'),
});
insert('WCSPROGRAMS_KoboBnsAnswergs', {
  AnswerId: state.data._id,
  gs: dataValue('body.bns_matrix_women_care_provided_women/bns_matrix_women_care_provided_women_note'),
  have: dataValue('body.bns_matrix_women_care_provided_women/bns_matrix_women_care_provided_women_possess'),
  necessary: dataValue('body.bns_matrix_women_care_provided_women/bns_matrix_women_care_provided_women_necessary'),
  quantity: dataValue('body.bns_matrix_women_care_provided_women/bns_matrix_women_care_provided_women_number'),
});
insert('WCSPROGRAMS_KoboBnsAnswergs', {
  AnswerId: state.data._id,
  gs: dataValue('body.bns_matrix_brick_house_metal_roof/bns_matrix_brick_house_metal_roof_note'),
  have: dataValue('body.bns_matrix_brick_house_metal_roof/bns_matrix_brick_house_metal_roof_possess'),
  necessary: dataValue('body.bns_matrix_brick_house_metal_roof/bns_matrix_brick_house_metal_roof_necessary'),
  quantity: dataValue('body.bns_matrix_brick_house_metal_roof/bns_matrix_brick_house_metal_roof_number'),
});
insert('WCSPROGRAMS_KoboBnsAnswergs', {
  AnswerId: state.data._id,
  gs: dataValue('body.bns_matrix_work_without_discrimination/bns_matrix_work_without_discrimination_note'),
  have: dataValue('body.bns_matrix_work_without_discrimination/bns_matrix_work_without_discrimination_possess'),
  necessary: dataValue('body.bns_matrix_work_without_discrimination/bns_matrix_work_without_discrimination_necessary'),
  quantity: dataValue('body.bns_matrix_work_without_discrimination/bns_matrix_work_without_discrimination_number'),
});
insert('WCSPROGRAMS_KoboBnsAnswergs', {
  AnswerId: state.data._id,
  gs: dataValue('bns_matrix_tv/bns_matrix_tv_note'),
  have: dataValue('bns_matrix_tv/bns_matrix_tv_possess'),
  necessary: dataValue('bns_matrix_tv/bns_matrix_tv_necessary'),
  quantity: dataValue('bns_matrix_tv/bns_matrix_tv_number'),
});
insert('WCSPROGRAMS_KoboBnsAnswergs', {
  AnswerId: state.data._id,
  gs: dataValue('body.bns_matrix_access_employment/bns_matrix_access_employment_note'),
  have: dataValue('body.bns_matrix_access_employment/bns_matrix_access_employment_possess'),
  necessary: dataValue('body.bns_matrix_access_employment/bns_matrix_access_employment_necessary'),
  quantity: dataValue('body.bns_matrix_access_employment/bns_matrix_access_employment_number'),
});
insert('WCSPROGRAMS_KoboBnsAnswergs', {
  AnswerId: state.data._id,
  gs: dataValue('body.bns_matrix_hurricane_lamp/bns_matrix_hurricane_lamp_note'),
  have: dataValue('body.bns_matrix_hurricane_lamp/bns_matrix_hurricane_lamp_possess'),
  necessary: dataValue('body.bns_matrix_hurricane_lamp/bns_matrix_hurricane_lamp_necessary'),
  quantity: dataValue('body.bns_matrix_hurricane_lamp/bns_matrix_hurricane_lamp_number'),
});
insert('WCSPROGRAMS_KoboBnsAnswergs', {
  AnswerId: state.data._id,
  gs: dataValue('body.bns_matrix_natural_resources_1h/bns_matrix_natural_resources_1h_note'),
  have: dataValue('body.bns_matrix_natural_resources_1h/bns_matrix_natural_resources_1h_possess'),
  necessary: dataValue('body.bns_matrix_natural_resources_1h/bns_matrix_natural_resources_1h_necessary'),
  quantity: dataValue('body.bns_matrix_natural_resources_1h/bns_matrix_natural_resources_1h_number'),
});
insert('WCSPROGRAMS_KoboBnsAnswergs', {
  AnswerId: state.data._id,
  gs: dataValue('bns_matrix_fishing_net/bns_matrix_fishing_net_note'),
  have: dataValue('bns_matrix_fishing_net/bns_matrix_fishing_net_possess'),
  necessary: dataValue('body.bns_matrix_fishing_net/bns_matrix_fishing_net_necessary'),
  quantity: dataValue('body.bns_matrix_fishing_net/bns_matrix_fishing_net_number'),
});
insert('WCSPROGRAMS_KoboBnsAnswergs', {
  AnswerId: state.data._id,
  gs: dataValue('bns_matrix_new_clothes/bns_matrix_new_clothes_note'),
  have: dataValue('bns_matrix_new_clothes/bns_matrix_new_clothes_possess'),
  necessary: dataValue('body.bns_matrix_new_clothes/bns_matrix_new_clothes_necessary'),
  quantity: dataValue('body.bns_matrix_new_clothes/bns_matrix_new_clothes_number'),
});
insert('WCSPROGRAMS_KoboBnsAnswergs', {
  AnswerId: state.data._id,
  gs: dataValue('bns_matrix_moto/bns_matrix_moto_note'),
  have: dataValue('bns_matrix_moto/bns_matrix_moto_possess'),
  necessary: dataValue('bns_matrix_moto/bns_matrix_moto_necessary'),
  quantity: dataValue('bns_matrix_moto/bns_matrix_moto_number'),
});
insert('WCSPROGRAMS_KoboBnsAnswergs', {
  AnswerId: state.data._id,
  gs: dataValue('bns_matrix_jewelry/bns_matrix_jewelry_note'),
  have: dataValue('bns_matrix_jewelry/bns_matrix_jewelry_possess'),
  necessary: dataValue('bns_matrix_jewelry/bns_matrix_jewelry_necessary'),
  quantity: dataValue('bns_matrix_jewelry/bns_matrix_jewelry_number'),
});
insert('WCSPROGRAMS_KoboBnsAnswergs', {
  AnswerId: state.data._id,
  gs: dataValue('bns_matrix_mosquito_net/bns_matrix_mosquito_net_note'),
  have: dataValue('body.bns_matrix_mosquito_net/bns_matrix_mosquito_net_possess'),
  necessary: dataValue('body.bns_matrix_mosquito_net/bns_matrix_mosquito_net_necessary'),
  quantity: dataValue('body.bns_matrix_mosquito_net/bns_matrix_mosquito_net_number'),
});
insert('WCSPROGRAMS_KoboBnsAnswergs', {
  AnswerId: state.data._id,
  gs: dataValue('bns_matrix_money_school/bns_matrix_money_school_note'),
  have: dataValue('body.bns_matrix_money_school/bns_matrix_money_school_possess'),
  necessary: dataValue('body.bns_matrix_money_school/bns_matrix_money_school_necessary'),
  quantity: dataValue('body.bns_matrix_money_school/bns_matrix_money_school_number'),
});
insert('WCSPROGRAMS_KoboBnsAnswergs', {
  AnswerId: state.data._id,
  gs: dataValue('bns_matrix_chicken/bns_matrix_chicken_note'),
  have: dataValue('bns_matrix_chicken/bns_matrix_chicken_possess'),
  necessary: dataValue('bns_matrix_chicken/bns_matrix_chicken_necessary'),
  quantity: dataValue('bns_matrix_chicken/bns_matrix_chicken_number'),
});
insert('WCSPROGRAMS_KoboBnsAnswergs', {
  AnswerId: state.data._id,
  gs: dataValue('bns_matrix_canoe/bns_matrix_canoe_note'),
  have: dataValue('bns_matrix_canoe/bns_matrix_canoe_possess'),
  necessary: dataValue('bns_matrix_canoe/bns_matrix_canoe_necessary'),
  quantity: dataValue('bns_matrix_canoe/bns_matrix_canoe_number'),
});
insert('WCSPROGRAMS_KoboBnsAnswergs', {
  AnswerId: state.data._id,
  gs: dataValue('bns_matrix_sport_ground/bns_matrix_sport_ground_note'),
  have: dataValue('body.bns_matrix_sport_ground/bns_matrix_sport_ground_possess'),
  necessary: dataValue('body.bns_matrix_sport_ground/bns_matrix_sport_ground_necessary'),
  quantity: dataValue('body.bns_matrix_sport_ground/bns_matrix_sport_ground_number'),
});
insert('WCSPROGRAMS_KoboBnsAnswergs', {
  AnswerId: state.data._id,
  gs: dataValue('bns_matrix_phone/bns_matrix_phone_note'),
  have: dataValue('bns_matrix_phone/bns_matrix_phone_possess'),
  necessary: dataValue('bns_matrix_phone/bns_matrix_phone_necessary'),
  quantity: dataValue('bns_matrix_phone/bns_matrix_phone_number'),
});
insert('WCSPROGRAMS_KoboBnsAnswergs', {
  AnswerId: state.data._id,
  gs: dataValue('bns_matrix_gun/bns_matrix_gun_note'),
  have: dataValue('bns_matrix_gun/bns_matrix_gun_possess'),
  necessary: dataValue('bns_matrix_gun/bns_matrix_gun_necessary'),
  quantity: dataValue('bns_matrix_gun/bns_matrix_gun_number'),
});
insert('WCSPROGRAMS_KoboBnsAnswergs', {
  AnswerId: state.data._id,
  gs: dataValue('body.bns_matrix_adult_learning/bns_matrix_adult_learning_note'),
  have: dataValue('body.bns_matrix_adult_learning/bns_matrix_adult_learning_possess'),
  necessary: dataValue('body.bns_matrix_adult_learning/bns_matrix_adult_learning_necessary'),
  quantity: dataValue('body.bns_matrix_adult_learning/bns_matrix_adult_learning_number'),
});
insert('WCSPROGRAMS_KoboBnsAnswergs', {
  AnswerId: state.data._id,
  gs: dataValue('bns_matrix_lance/bns_matrix_lance_note'),
  have: dataValue('bns_matrix_lance/bns_matrix_lance_possess'),
  necessary: dataValue('bns_matrix_lance/bns_matrix_lance_necessary'),
  quantity: dataValue('bns_matrix_lance/bns_matrix_lance_number'),
});
insert('WCSPROGRAMS_KoboBnsAnswergs', {
  AnswerId: state.data._id,
  gs: dataValue('body.bns_matrix_bed_and_mattress/bns_matrix_bed_and_mattress_note'),
  have: dataValue('body.bns_matrix_bed_and_mattress/bns_matrix_bed_and_mattress_possess'),
  necessary: dataValue('body.bns_matrix_bed_and_mattress/bns_matrix_bed_and_mattress_necessary'),
  quantity: dataValue('body.bns_matrix_bed_and_mattress/bns_matrix_bed_and_mattress_number'),
});
insert('WCSPROGRAMS_KoboBnsAnswergs', {
  AnswerId: state.data._id,
  gs: dataValue('body.bns_matrix_drinking_water_15min/bns_matrix_drinking_water_15min_note'),
  have: dataValue('body.bns_matrix_drinking_water_15min/bns_matrix_drinking_water_15min_possess'),
  necessary: dataValue('body.bns_matrix_drinking_water_15min/bns_matrix_drinking_water_15min_necessary'),
  quantity: dataValue('body.bns_matrix_drinking_water_15min/bns_matrix_drinking_water_15min_number'),
});
insert('WCSPROGRAMS_KoboBnsAnswergs', {
  AnswerId: state.data._id,
  gs: dataValue('body.bns_matrix_sheep_breeding/bns_matrix_sheep_breeding_note'),
  have: dataValue('body.bns_matrix_sheep_breeding/bns_matrix_sheep_breeding_possess'),
  necessary: dataValue('body.bns_matrix_sheep_breeding/bns_matrix_sheep_breeding_necessary'),
  quantity: dataValue('body.bns_matrix_sheep_breeding/bns_matrix_sheep_breeding_number'),
});
insert('WCSPROGRAMS_KoboBnsAnswergs', {
  AnswerId: state.data._id,
  gs: dataValue('bns_matrix_freezer/bns_matrix_freezer_note'),
  have: dataValue('bns_matrix_freezer/bns_matrix_freezer_possess'),
  necessary: dataValue('bns_matrix_freezer/bns_matrix_freezer_necessary'),
  quantity: dataValue('bns_matrix_freezer/bns_matrix_freezer_number'),
});
insert('WCSPROGRAMS_KoboBnsAnswergs', {
  AnswerId: state.data._id,
  gs: dataValue('body.bns_matrix_women_decision_village/bns_matrix_women_decision_village_note'),
  have: dataValue('body.bns_matrix_women_decision_village/bns_matrix_women_decision_village_possess'),
  necessary: dataValue('body.bns_matrix_women_decision_village/bns_matrix_women_decision_village_necessary'),
  quantity: dataValue('body.bns_matrix_women_decision_village/bns_matrix_women_decision_village_number'),
});
insert('WCSPROGRAMS_KoboBnsAnswergs', {
  AnswerId: state.data._id,
  gs: dataValue('body.bns_matrix_protein_once_week/bns_matrix_protein_once_week_note'),
  have: dataValue('body.bns_matrix_protein_once_week/bns_matrix_protein_once_week_possess'),
  necessary: dataValue('body.bns_matrix_protein_once_week/bns_matrix_protein_once_week_necessary'),
  quantity: dataValue('body.bns_matrix_protein_once_week/bns_matrix_protein_once_week_number'),
});
insert('WCSPROGRAMS_KoboBnsAnswergs', {
  AnswerId: state.data._id,
  gs: dataValue('bns_matrix_field_half_ha/bns_matrix_field_half_ha_note'),
  have: dataValue('body.bns_matrix_field_half_ha/bns_matrix_field_half_ha_possess'),
  necessary: dataValue('body.bns_matrix_field_half_ha/bns_matrix_field_half_ha_necessary'),
  quantity: dataValue('body.bns_matrix_field_half_ha/bns_matrix_field_half_ha_number'),
});

upsert('WCSPROGRAMS_KoboBnsAnswergps', 'DatasetUuidId', {
  DatasetUuidId: dataValue('_uuid'),
  AnswerId: dataValue('_id'),
  Geom: dataValue('_geolocation'), //this is a Kobo array -- transform?
  Lat: dataValue('gps/lat'),
  Long: dataValue('gps/long'),
  // more: dataValue('moreFields'),
});
