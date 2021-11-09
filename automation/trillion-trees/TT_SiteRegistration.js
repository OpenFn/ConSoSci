fn(state => {
    const multiSelectIds = ["type_grazing_animals", "type_tree_crops", "where_animals_shifted"];

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
each(dataPath('type_grazing_animals[*]'), each(dataPath('undefined[*]'), fn(async state => {
 const dataArray = state.data['type_grazing_animals'] || [] 

          const mapping = []; 
 
          for (let x of dataArray) { 

            mapping.push({
  TT_AnimalsName: x['name'],
  TT_AnimalsExtCode: x['name'],
  GeneratedUuid: x['__generatedUuid'],
  UndefinedUuid: x['__parentUuid']
}) 

            } 
 return upsertMany('TT_Animals', 'GeneratedUuid', () => mapping, {setNull: ["''", "'undefined'"]})(state); 
}) 
))
each(dataPath('type_tree_crops[*]'), each(dataPath('undefined[*]'), fn(async state => {
 const dataArray = state.data['type_tree_crops'] || [] 

          const mapping = []; 
 
          for (let x of dataArray) { 

            mapping.push({
  TT_TreeName: x['name'],
  TT_TreeExtCode: x['name'],
  GeneratedUuid: x['__generatedUuid'],
  UndefinedUuid: x['__parentUuid']
}) 

            } 
 return upsertMany('TT_Tree', 'GeneratedUuid', () => mapping, {setNull: ["''", "'undefined'"]})(state); 
}) 
))
each(dataPath('where_animals_shifted[*]'), each(dataPath('undefined[*]'), fn(async state => {
 const dataArray = state.data['where_animals_shifted'] || [] 

          const mapping = []; 
 
          for (let x of dataArray) { 

            mapping.push({
  TT_WhereName: x['name'],
  TT_WhereExtCode: x['name'],
  GeneratedUuid: x['__generatedUuid'],
  UndefinedUuid: x['__parentUuid']
}) 

            } 
 return upsertMany('TT_Where', 'GeneratedUuid', () => mapping, {setNull: ["''", "'undefined'"]})(state); 
}) 
))
fn(async state => {
 const mapping = {
  FormName: dataValue('formName'),
  DatasetId: dataValue('_xform_id_string'),
  LastUpdated: new Date().toISOString()
} 
 return upsert('TT_SiteRegistration', 'DatasetId', mapping, {setNull: ["''", "'undefined'"]})(state); 
}) 
fn(async state => {
 const mapping = {
  __Version__: dataValue('__version__'),
  ApprovalPhotoLandowner: dataValue('approval_photo_landowner'),
  WitnessSignature: dataValue('witness_signature'),
  DateWitnessSigned: dataValue('date_witness_signed'),
  NameWitness: dataValue('name_witness'),
  Signature: dataValue('signature'),
  DateRepSigned: dataValue('date_rep_signed'),
  Name: dataValue('name'),
  DistanceToHousehol: dataValue('distance_to_househol'),
  TotalAreaLandOwned: dataValue('total_area_land_owned'),
  TotalNbSeparateFarm: dataValue('total_nb_separate_farm'),
  TT_YesnoID_OnlyFarmOwned: dataValue('only_farm_owned') === 'yes'? true: dataValue('only_farm_owned') === 'no'? false: undefined,
  PhotoSketchMap: dataValue('photo_sketch_map'),
  TT_ProportionID_PropSettlement: await findValue({uuid: 'tt_proportionid', relation: 'TT_proportion', where: { TT_proportionExtCode: dataValue('prop_settlement') }})(state),
  TT_ProportionID_PropWetland: await findValue({uuid: 'tt_proportionid', relation: 'TT_proportion', where: { TT_proportionExtCode: dataValue('prop_wetland') }})(state),
  TT_ProportionID_PropNativeVeg: await findValue({uuid: 'tt_proportionid', relation: 'TT_proportion', where: { TT_proportionExtCode: dataValue('prop_native_veg') }})(state),
  TT_ProportionID_PropFallowLand: await findValue({uuid: 'tt_proportionid', relation: 'TT_proportion', where: { TT_proportionExtCode: dataValue('prop_fallow_land') }})(state),
  TT_ProportionID_PropGrazingLand: await findValue({uuid: 'tt_proportionid', relation: 'TT_proportion', where: { TT_proportionExtCode: dataValue('prop_grazing_land') }})(state),
  TT_ProportionID_PropCropLand: await findValue({uuid: 'tt_proportionid', relation: 'TT_proportion', where: { TT_proportionExtCode: dataValue('prop_crop_land') }})(state),
  TotalAreaFarm: dataValue('total_area_farm'),
  WhereAnimalsShifted: x['where_animals_shifted'],
  TT_ActionID_WhatHappenGrazingAnimals: await findValue({uuid: 'tt_actionid', relation: 'TT_action', where: { TT_actionExtCode: dataValue('what_happen_grazing_animals') }})(state),
  WhyNotContinuedUse: dataValue('why_not_continued_use'),
  TT_LengthID_FallowPeriod: await findValue({uuid: 'tt_lengthid', relation: 'TT_length', where: { TT_lengthExtCode: dataValue('fallow_period') }})(state),
  TypeTreeCrops: x['type_tree_crops'],
  TT_CountID_NbAnimalsOnParcel: await findValue({uuid: 'tt_countid', relation: 'TT_count', where: { TT_countExtCode: dataValue('nb_animals_on_parcel') }})(state),
  TypeGrazingAnimals: x['type_grazing_animals'],
  MainCrop: dataValue('main_crop'),
  TT_LandID_CurrentLanduse: await findValue({uuid: 'tt_landid', relation: 'TT_land', where: { TT_landExtCode: dataValue('current_landuse') }})(state),
  TotalNbTreePlanted: dataValue('total_nb_tree_planted'),
  TertiarySpecies: dataValue('tertiary_species'),
  SecondarySpecies: dataValue('secondary_species'),
  MainSpecies: dataValue('main_species'),
  PleaseDescribeTheRoposedIntervention: dataValue('please_describe_the_roposed_intervention'),
  TT_InterventionsID_ProposedIntervention: await findValue({uuid: 'tt_interventionsid', relation: 'TT_interventions', where: { TT_interventionsExtCode: dataValue('proposed_intervention') }})(state),
  Photo: dataValue('photo'),
  RoundedShapeAcre: dataValue('rounded_shape_acre'),
  ShapeAcre: dataValue('shape_acre'),
  ShapeArea: dataValue('shape_area'),
  Shape: dataValue('shape'),
  OtherAdminUnit: dataValue('other_admin_unit'),
  Village: dataValue('village'),
  District: dataValue('district'),
  ContactNb: dataValue('contact_nb'),
  LandOwnersRepresentative: dataValue('land_owners_representative'),
  TT_TypeID_TypeLandTitle: await findValue({uuid: 'tt_typeid', relation: 'TT_type', where: { TT_typeExtCode: dataValue('type_land_title') }})(state),
  NameInstitutionIndividual: dataValue('name_institution_individual'),
  WcsIdentifier: dataValue('wcs_identifier'),
  SurveyorContact: dataValue('surveyor_contact'),
  Surveyor: dataValue('surveyor'),
  TT_CountryID_Country: await findValue({uuid: 'tt_countryid', relation: 'TT_country', where: { TT_countryExtCode: dataValue('country') }})(state),
  Deviceid: dataValue('deviceid'),
  Today: dataValue('today'),
  FormDateEnd: dataValue('end'),
  Start: dataValue('start'),
  AnswerId: dataValue('_id'),
  GeneratedUuid: dataValue('__generatedUuid'),
  Payload: state.data.body
} 
 return upsert('TT_SiteRegistration', 'GeneratedUuid', mapping, {setNull: ["''", "'undefined'"]})(state); 
}) 
each(dataPath('where_animals_shifted[*]'), each(dataPath('undefined[*]'), fn(async state => {
 const dataArray = state.data['where_animals_shifted'] || [] 

          const mapping = []; 
 
          for (let x of dataArray) { 

            mapping.push({
  TT_WhereID: await findValue({uuid: 'tt_whereid', relation: 'TT_Where', where: { TT_WhereExtCode: x }})(state),
  TT_SiteregistrationID: x['__parentUuid'],
  GeneratedUuid: x['__generatedUuid'],
  UndefinedUuid: x['__parentUuid']
}) 

            } 
 return upsertMany('TT_SiteregistrationWhere', 'GeneratedUuid', () => mapping, {setNull: ["''", "'undefined'"]})(state); 
}) 
))
each(dataPath('type_tree_crops[*]'), each(dataPath('undefined[*]'), fn(async state => {
 const dataArray = state.data['type_tree_crops'] || [] 

          const mapping = []; 
 
          for (let x of dataArray) { 

            mapping.push({
  TT_TreeID: await findValue({uuid: 'tt_treeid', relation: 'TT_Tree', where: { TT_TreeExtCode: x }})(state),
  TT_SiteregistrationID: x['__parentUuid'],
  GeneratedUuid: x['__generatedUuid'],
  UndefinedUuid: x['__parentUuid']
}) 

            } 
 return upsertMany('TT_SiteregistrationTree', 'GeneratedUuid', () => mapping, {setNull: ["''", "'undefined'"]})(state); 
}) 
))
each(dataPath('type_grazing_animals[*]'), each(dataPath('undefined[*]'), fn(async state => {
 const dataArray = state.data['type_grazing_animals'] || [] 

          const mapping = []; 
 
          for (let x of dataArray) { 

            mapping.push({
  TT_AnimalsID: await findValue({uuid: 'tt_animalsid', relation: 'TT_Animals', where: { TT_AnimalsExtCode: x }})(state),
  TT_SiteregistrationID: x['__parentUuid'],
  GeneratedUuid: x['__generatedUuid'],
  UndefinedUuid: x['__parentUuid']
}) 

            } 
 return upsertMany('TT_SiteregistrationAnimals', 'GeneratedUuid', () => mapping, {setNull: ["''", "'undefined'"]})(state); 
}) 
))
