sql(state => {
  const { data } = state;
  return (
    `insert into "tbl_site" ("` +
    [
      'siteID',
      'studyID',
      'countryCode',
      'adminLevel1',
      'adminLevel3',
      'siteName',
      'siteType',
      'decimalLatitude',
      'decimalLongitude',
      'verbatimElevation',
    ].join('", "') +
    `") values ('` +
    [
      data.__query_params.siteId,
      data.__query_params.studyId,
      data.__query_params.country,
      data.__query_params.state,
      data['survey_info/district'],
      data['survey_info/village'],
      data.__query_params.siteType,
      data.__query_params.lat,
      data.__query_params.long,
      data.__query_params.alt,
    ]
      .join("', '")
      .replace(/''/g, null) +
    `') ON CONFLICT DO NOTHING;`
  );
});

sql(state => {
  const { data } = state;
  return (
    `insert into "tbl_siteChar" ("` +
    [
      'siteID',
      'studyID',
      'siteCharID',
      // more columns?
    ].join('", "') +
    `") values ('` +
    [
      data.__query_params.siteId,
      data.__query_params.studyId,
      data.__query_params.siteId,
      // more values?
    ]
      .join("', '")
      .replace(/''/g, null) +
    `') ON CONFLICT DO NOTHING;`
  );
});

sql(state => {
  const { data } = state;
  return (
    `insert into "tbl_household" ("` +
    [
      'siteID',
      'studyID',
      'householdID',
      'description',
      // more columns?
    ].join('", "') +
    `") values ('` +
    [
      data.__query_params.siteId,
      data.__query_params.studyId,
      state.fake_uuid,
      data['survey_info/household_id'],
      // more values?
    ]
      .join("', '")
      .replace(/''/g, null) +
    `') ON CONFLICT DO NOTHING;`
  );
});

sql(state => {
  const { data } = state;
  return (
    `insert into "tbl_householdChar" ("` +
    [
      'siteID',
      'householdCharID',
      'householdID',
      'numberOccupants',
      'numberChildren',
      'numberAdultMen',
      'numberAdultWomen',
      'studyID',
    ].join('", "') +
    `") values ('` +
    [
      data.__query_params.siteId,
      state.fake_uuid,
      state.fake_uuid,
      data['group_begin/group_people/nb_people'],
      parseInt(data['group_begin/group_people/nb_babies']) +
        parseInt(data['group_begin/group_people/nb_children']),
      parseInt(data['group_begin/group_people/nb_youngmen']) +
        parseInt(data['group_begin/group_people/nb_men']) +
        parseInt(data['group_begin/group_people/nb_oldmen']),
      parseInt(data['group_begin/group_people/nb_women']) +
        parseInt(data['group_begin/group_people/nb_oldwomen']) +
        parseInt(data['group_begin/group_people/nb_pregnant']) +
        parseInt(data['group_begin/group_people/nb_brestfeeding']),
      data.__query_params.studyId,
    ]
      .join("', '")
      .replace(/''/g, null) +
    `') ON CONFLICT DO NOTHING;`
  );
});

sql(state => {
  const { data } = state;
  return (
    `insert into "tbl_sample" ("` +
    [
      'siteCharID',
      'sampleID',
      'sampleDateStart',
      'sampleDateEnd',
      'householdID',
      'householdCharID',
      'sampleUnit',
      'numberSampleUnits',
      'samplingEffortInDays',
      'siteID',
      'studyID',
    ].join('", "') +
    `") values ('` +
    [
      data.__query_params.siteId,
      state.fake_uuid,
      data['survey_info/info_recall_date'],
      data['survey_info/info_recall_date'],
      state.fake_uuid,
      state.fake_uuid,
      data['group_begin/group_sample/sample_unit'],
      data['group_begin/group_sample/number_sample_units'],
      data['group_begin/group_sample/sampling_effort_in_days'],
      data.__query_params.siteId,
      data.__query_params.studyId,
    ]
      .join("', '")
      .replace(/''/g, null) +
    `') ON CONFLICT DO NOTHING;`
  );
});

sql(state => {
  const { data } = state;
  return (
    `insert into "tbl_wildmeat" ("` +
    [
      'wildmeatID',
      'siteID',
      'sampleID',
      'unit',
      'amount',
      'massInGrams',
      'price',
      'acquisition',
      'condition',
      'currency',
      'scientificName',
      'studyID',
      'siteCharID_deleted',
    ].join('", "') +
    `") values ('` +
    data['group_begin/group_food']
      .map((item, index) =>
        [
          // TODO: Replace this with real uuid
          state.fake_uuid + 100000000 + index,
          data.__query_params.siteId,
          state.fake_uuid,
          item['group_begin/group_food/quantity_technique'] === 'known_quantity'
            ? 'kilogram'
            : 'other',
          item['group_begin/group_food/quantity_technique'] === 'known_quantity'
            ? item['group_begin/group_food/quantity']
            : '-8',
          // TODO: Determine how we handle the '-8's
          parseInt(item['group_begin/group_food/quantity']) * 1000,
          item['group_begin/group_food/Cost'],
          item['group_begin/group_food/obtention'],
          item['group_begin/group_food/state'] === 'other_state'
            ? '-8'
            : item['group_begin/group_food/state'],
          'CDF',
          item['group_begin/group_food/species'],
          data.__query_params.studyId,
          0,
        ].join("', '")
      )
      .join("'), ('")
      .replace(/''/g, null) +
    `') ON CONFLICT DO NOTHING;`
  );
});
