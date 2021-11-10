fn(state => {
  const multiSelectIds = [
    'type_grazing_animals',
    'type_tree_crops',
    'where_animals_shifted',
  ];

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
    state.data.body._id + '-' + state.data.body._xform_id_string
  );

  state.data = { ...state.data, ...state.data.body };
  return state;
});
each(
  dataPath('type_grazing_animals[*]'),
  each(
    dataPath('undefined[*]'),
    fn(async state => {
      const dataArray = state.data['type_grazing_animals'] || [];

      const mapping = [];

      for (let x of dataArray) {
        mapping.push({
          TT_AnimalName: x['name'],
          TT_AnimalExtCode: x['name'],
          GeneratedUuid: x['__generatedUuid'],
          UndefinedUuid: x['__parentUuid'],
        });
      }
      return upsertMany('TT_Animal', 'GeneratedUuid', () => mapping, {
        setNull: ["''", "'undefined'"],
      })(state);
    })
  )
);
each(
  dataPath('type_tree_crops[*]'),
  each(
    dataPath('undefined[*]'),
    fn(async state => {
      const dataArray = state.data['type_tree_crops'] || [];

      const mapping = [];

      for (let x of dataArray) {
        mapping.push({
          TT_TreeName: x['name'],
          TT_TreeExtCode: x['name'],
          GeneratedUuid: x['__generatedUuid'],
          UndefinedUuid: x['__parentUuid'],
        });
      }
      return upsertMany('TT_Tree', 'GeneratedUuid', () => mapping, {
        setNull: ["''", "'undefined'"],
      })(state);
    })
  )
);
each(
  dataPath('where_animals_shifted[*]'),
  each(
    dataPath('undefined[*]'),
    fn(async state => {
      const dataArray = state.data['where_animals_shifted'] || [];

      const mapping = [];

      for (let x of dataArray) {
        mapping.push({
          TT_AnimalActionShiftID: x['name'],
          TT_AnimalActionShiftExtCode: x['name'],
          GeneratedUuid: x['__generatedUuid'],
          UndefinedUuid: x['__parentUuid'],
        });
      }
      return upsertMany('TT_SiteRegistrationAnimalActionShift', 'GeneratedUuid', () => mapping, {
        setNull: ["''", "'undefined'"],
      })(state);
    })
  )
);
fn(async state => {
  const mapping = {
    DatasetName: dataValue('formName'),
    DatasetUuidID: dataValue('_xform_id_string'),
    DatasetYear: new Date().getFullYear(),
    LastUpdateTime: new Date().toISOString(),
    LastCheckedTime: new Date().toISOString(),
  };
  return upsert('TT_KoboData', 'DatasetUuidID', mapping, {
    setNull: ["''", "'undefined'"],
  })(state);
});
fn(async state => {
  const mapping = {
    __Version__: dataValue('__version__'),
    LandownerApprovalPhoto: dataValue('approval_photo_landowner'),
    WitnessSignaturePhoto: dataValue('witness_signature'),
    DateWitnessSigned: dataValue('date_witness_signed'),
    WitnessName: dataValue('name_witness'),
    Signature: dataValue('signature'),
    ApprovalDate: dataValue('date_rep_signed'),
    NameOfAppover: dataValue('name'),
    DistanceToHousehold: dataValue('distance_to_househol'),
    AreaOfLandOwned: dataValue('total_area_land_owned'),
    NumberOfLandholdings: dataValue('total_nb_separate_farm'),
    OnlyFarmOwned:
      dataValue('only_farm_owned') === 'yes'
        ? true
        : dataValue('only_farm_owned') === 'no'
        ? false
        : null,
    SketchMapPhoto: dataValue('photo_sketch_map'),
    TT_ProportionID_Settlement: await findValue({
      uuid: 'tt_landproportionid',
      relation: 'TT_LandProportion',
      where: { TT_LandProportionExtCode: dataValue('prop_settlement') },
    })(state),
    TT_LandProportionID_Wetland: await findValue({
      uuid: 'tt_landproportionid',
      relation: 'TT_LandProportion',
      where: { TT_LandProportionExtCode: dataValue('prop_wetland') },
    })(state),
    TT_LandProportionID_NativeVegetation: await findValue({
      uuid: 'tt_landproportionid',
      relation: 'TT_LandProportion',
      where: { TT_LandProportionExtCode: dataValue('prop_native_veg') },
    })(state),
    TT_LandProportionID_FallowLand: await findValue({
      uuid: 'tt_landproportionid',
      relation: 'TT_LandProportion',
      where: { TT_LandProportionExtCode: dataValue('prop_fallow_land') },
    })(state),
    TT_LandProportionID_GrazingLand: await findValue({
      uuid: 'tt_landproportionid',
      relation: 'TT_LandProportion',
      where: { TT_LandProportionExtCode: dataValue('prop_grazing_land') },
    })(state),
    TT_LandProportionID_CropLand: await findValue({
      uuid: 'tt_landproportionid',
      relation: 'TT_LandProportion',
      where: { TT_LandProportionExtCode: dataValue('prop_crop_land') },
    })(state),
    FarmArea: dataValue('total_area_farm'),
    //TT_AnimalActionShiftID: await findValue({ // DO WE NEED THIS HERE? IT'S M:M AND MAPPED BELOW WITH EACH
    //  uuid: 'tt_whereid',
    //  relation: 'TT_where',
    //  where: { TT_whereExtCode: dataValue('where_animals_shifted') },
    //})(state),
    TT_AnimalActionID: await findValue({
      uuid: 'tt_animalactionid',
      relation: 'TT_AnimalAction',
      where: { TT_AnimalActionExtCode: dataValue('what_happen_grazing_animals') },
    })(state),
    TT_LandNotRequiredTypeID: await findValue({
      uuid: 'tt_landnotrequiredtypeid',
      relation: 'TT_LandNotRequiredType',
      where: {
        TT_LandNotRequiredTypeExtCode: dataValue('why_not_continued_use'),
      },
    })(state),
    TT_FallowPeriodID: await findValue({
      uuid: 'tt_fallowperiodid',
      relation: 'TT_FallowPeriod',
      where: { TT_FallowPeriodExtCode: dataValue('fallow_period') },
    })(state),
    //TT_TreeTypeID: await findValue({ // DO WE NEED THIS HERE? IT'S M:M AND MAPPED BELOW WITH EACH
    //  uuid: 'tt_treetypeid',
    //  relation: 'TT_TreeType',
    //  where: { TT_TreeTypeExtCode: dataValue('type_tree_crops') },
    //})(state),
    TT_AnimalsOnParcelID: await findValue({
      uuid: 'tt_animalsonparcelid',
      relation: 'TT_AnimalsOnParcel',
      where: { TT_AnimalsOnParcelExtCode: dataValue('nb_animals_on_parcel') },
    })(state),
    //TT_AnimalID: await findValue({ // DO WE NEED THIS HERE? IT'S M:M AND MAPPED BELOW WITH EACH
    //  uuid: 'tt_animalid',
    //  relation: 'TT_Animal',
    //  where: { TT_AnimalExtCode: dataValue('type_grazing_animals') },
    //})(state),
    MainCrop: dataValue('main_crop'),
    TT_LandUseID: await findValue({
      uuid: 'tt_landusetypeid',
      relation: 'TT_LandUseType',
      where: { TT_LandUseTypeExtCode: dataValue('current_landuse') },
    })(state),
    TreesToBePlanted: dataValue('total_nb_tree_planted'),
    TertiarySpecies: dataValue('tertiary_species'),
    SecondarySpecies: dataValue('secondary_species'),
    MainSpecies: dataValue('main_species'),
    ProposedInterventionDescription: dataValue(
      'please_describe_the_roposed_intervention'
    ),
    TT_InterventionTypeID: await findValue({
      uuid: 'tt_interventiontypeid',
      relation: 'TT_InterventionType',
      where: { TT_InterventionTypeExtCode: dataValue('proposed_intervention') },
    })(state),
    PlotPhoto: dataValue('photo'),
    RoundedShapeAcre: dataValue('rounded_shape_acre'),
    ShapeAcre: dataValue('shape_acre'),
    ShapeArea: dataValue('shape_area'),
    ParcelShape: dataValue('shape'),
    OtherAddressDescription: dataValue('other_admin_unit'),
    Village: dataValue('village'),
    District: dataValue('district'),
    ContactNumber: dataValue('contact_nb'),
    LandOwnersRepresentativeName: dataValue('land_owners_representative'),
    TT_LandTitleTypeID: await findValue({
      uuid: 'tt_landtitletypeid',
      relation: 'TT_LandTitleType',
      where: { TT_LandTitleTypeExtCode: dataValue('type_land_title') },
    })(state),
    NameOfInstitutionOrIndividual: dataValue('name_institution_individual'),
    wcs_identifier: dataValue('wcs_identifier'),
    SurveyorContactNumber: dataValue('surveyor_contact'),
    SurveyorName: dataValue('surveyor'),
    TT_RegionID: await findValue({
      uuid: 'tt_regionid',
      relation: 'TT_Region',
      where: { TT_RegionExtCode: dataValue('country') },
    })(state),
    SurveyDate: dataValue('today'),
    FormDateEnd: dataValue('end'),
    Start: dataValue('start'),
    AnswerId: dataValue('_id'),
    GeneratedUuid: dataValue('__generatedUuid'),
    Payload: state.data.body,
  };
  return upsert('TT_SiteRegistration', 'GeneratedUuid', mapping, {
    setNull: ["''", "'undefined'"],
  })(state);
});
each(
  dataPath('where_animals_shifted[*]'),
  each(
    dataPath('undefined[*]'),
    fn(async state => {
      const dataArray = state.data['where_animals_shifted'] || [];

      const mapping = [];

      for (let x of dataArray) {
        mapping.push({
          TT_AnimalActionShiftID: await findValue({
            uuid: 'tt_animalactionshiftid',
            relation: 'TT_AnimalActionShift',
            where: { TT_AnimalActionShiftExtCode: x },
          })(state),
          TT_SiteRegistrationID: x['__parentUuid'],
          GeneratedUuid: x['__generatedUuid'],
          UndefinedUuid: x['__parentUuid'],
        });
      }
      return upsertMany(
        'TT_SiteRegistrationAnimalActionShift',
        'GeneratedUuid',
        () => mapping,
        { setNull: ["''", "'undefined'"] }
      )(state);
    })
  )
);
each(
  dataPath('type_tree_crops[*]'),
  each(
    dataPath('undefined[*]'),
    fn(async state => {
      const dataArray = state.data['type_tree_crops'] || [];

      const mapping = [];

      for (let x of dataArray) {
        mapping.push({
          TT_TreeTypeID: await findValue({
            uuid: 'tt_treetypeid',
            relation: 'TT_TreeType',
            where: { TT_TreeTypeExtCode: x },
          })(state),
          TT_SiteRegistrationID: x['__parentUuid'],
          GeneratedUuid: x['__generatedUuid'],
          UndefinedUuid: x['__parentUuid'],
        });
      }
      return upsertMany(
        'TT_SiteRegistrationTreeType',
        'GeneratedUuid',
        () => mapping,
        { setNull: ["''", "'undefined'"] }
      )(state);
    })
  )
);
each(
  dataPath('type_grazing_animals[*]'),
  each(
    dataPath('undefined[*]'),
    fn(async state => {
      const dataArray = state.data['type_grazing_animals'] || [];

      const mapping = [];

      for (let x of dataArray) {
        mapping.push({
          TT_AnimalID: await findValue({
            uuid: 'tt_animalid',
            relation: 'TT_Animal',
            where: { TT_AnimalExtCode: x },
          })(state),
          TT_SiteRegistrationID: x['__parentUuid'],
          GeneratedUuid: x['__generatedUuid'],
          UndefinedUuid: x['__parentUuid'],
        });
      }
      return upsertMany(
        'TT_SiteRegistrationAnimal',
        'GeneratedUuid',
        () => mapping,
        { setNull: ["''", "'undefined'"] }
      )(state);
    })
  )
);
