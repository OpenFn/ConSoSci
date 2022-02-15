fn(state => {
  const handleValue = value => {
    if (value && value !== undefined && value !== 'undefined' && value !== '')
      return value === 'unknown_species'
        ? 'unknown'
        : value
        ? value.toString().replace(/_/g, ' ')
        : value;
  };

  const multiSelectIds = ['gear_type', 's_gear_type'];
  const { body } = state.data;

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

  // multiSelectIds.forEach(msIds => {
  //   convertMultiSelectsIntoArrays(state.data.body, msIds);
  // });

  generateUuid(
    state.data.body,
    state.data.body._id + '-' + state.data.body._xform_id_string
  );

  state.data = { ...state.data, ...state.data.body };
  return { ...state, body, handleValue };
});

//------------------ WCSPROGRAMS_KoboDataset -------------------------
fn(async state => {
  const mapping = {
    FormName: dataValue('formName'),
    DatasetId: dataValue('_xform_id_string'),
    LastUpdated: new Date().toISOString(),
  };
  return upsert('WCSPROGRAMS_KoboDataset', 'DatasetId', mapping, {
    setNull: ["''", "'undefined'"],
  })(state);
});

//------------------ WCSPROGRAMS_SharksRays -------------------------
fn(async state => {
  const mapping = {
    Verification: dataValue('verification'),
    SharkRayVendorsNb: state => {
      return dataValue('market_details/shark_ray_vendors_nb')(state) ||
        dataValue('market_details/market_001/shark_ray_vendors_nb')(state)
        ? dataValue('market_details/shark_ray_vendors_nb')(state) ||
            dataValue('market_details/market_001/shark_ray_vendors_nb')(state)
        : 0;
    },
    Consent: dataValue('consent'),
    Pic3: dataValue('pic3'),
    Pic2: dataValue('pic2'),
    Pic1: dataValue('pic1'),
    WCSPROGRAMS_SurveyorID_Surveyor: await findValue({
      uuid: 'wcsprograms_surveyorid',
      relation: 'WCSPROGRAMS_surveyor',
      where: { WCSPROGRAMS_surveyorExtCode: dataValue('surveyor') },
    })(state),
    WCSPROGRAMS_MarketID_Market: await findValue({
      uuid: 'wcsprograms_marketid',
      relation: 'WCSPROGRAMS_market',
      where: { WCSPROGRAMS_marketExtCode: dataValue('market') },
    })(state),
    WCSPROGRAMS_SiteID_LandingSite: await findValue({
      uuid: 'wcsprograms_siteid',
      relation: 'WCSPROGRAMS_site',
      where: { WCSPROGRAMS_siteExtCode: dataValue('landing_site') },
    })(state),
    WCSPROGRAMS_SurveyID_Survey: await findValue({
      uuid: 'wcsprograms_surveyid',
      relation: 'WCSPROGRAMS_survey',
      where: { WCSPROGRAMS_surveyExtCode: dataValue('survey') },
    })(state),
    WCSPROGRAMS_DistrictID_District: await findValue({
      uuid: 'wcsprograms_districtid',
      relation: 'WCSPROGRAMS_district',
      where: { WCSPROGRAMS_districtExtCode: dataValue('district') },
    })(state),
    // WCSPROGRAMS_CountryID_Country: await findValue({
    //   uuid: 'wcsprograms_countryid',
    //   relation: 'WCSPROGRAMS_country',
    //   where: { WCSPROGRAMS_countryExtCode: dataValue('country') },
    // })(state),
    WCSPROGRAMS_RegionID_Country: await findValue({
      uuid: 'wcsprograms_regionid',
      relation: 'WCSPROGRAMS_Region',
      where: {
        WCSPROGRAMS_RegionExtCode: dataValue('country'),
      },
    })(state),
    Gps: dataValue('gps'),
    WCSPROGRAMS_SurveytypeID_SurveyType: await findValue({
      uuid: 'wcsprograms_surveytypeid',
      relation: 'WCSPROGRAMS_surveytype',
      where: { WCSPROGRAMS_surveytypeExtCode: dataValue('survey_type') },
    })(state), //dataValue('survey_type') placeholder
    Deviceid: dataValue('deviceid'),
    FormDateEnd: dataValue('end'),
    Start: dataValue('start'),
    Today: dataValue('today'),
    Latitude: state =>
      state.data.gps ? state.data.gps.split(' ')[0] : undefined,
    Longitude: state =>
      state.data.gps ? state.data.gps.split(' ')[1] : undefined,
    AnswerId: state.body._id,
    GeneratedUuid: dataValue('__generatedUuid'),
    Payload: state.data.body,
  };
  console.log(mapping);
  return upsert('WCSPROGRAMS_SharksRays', 'GeneratedUuid', mapping, {
    setNull: ["''", "'undefined'"],
  })(state);
});

//------------------ WCSPROGRAMS_SharksRaysBoat ---------------------
fn(async state => {
  const mappingBoat = {
    // DD added Boat
    WCSPROGRAMS_SharksRaysYesNoID_BoatInfo: await findValue({
      uuid: 'WCSPROGRAMS_SharksRaysYesNoID',
      relation: 'WCSPROGRAMS_SharksRaysYesNo',
      where: {
        WCSPROGRAMS_SharksRaysYesNoExtCode: dataValue('boat/boat_info'),
      },
    })(state),
    WCSPROGRAMS_SharksRaysYesNoID_CatchInfo: await findValue({
      uuid: 'WCSPROGRAMS_SharksRaysYesNoID',
      relation: 'WCSPROGRAMS_SharksRaysYesNo',
      where: {
        WCSPROGRAMS_SharksRaysYesNoExtCode: dataValue('boat/catch_info'),
      },
    })(state),
    WCSPROGRAMS_BoatID_BoatType: await findValue({
      uuid: 'wcsprograms_boatid',
      relation: 'WCSPROGRAMS_boat',
      where: {
        WCSPROGRAMS_boatExtCode:
          dataValue('boat/boat_type') || dataValue('boat/catch/boat_type'),
      },
    })(state),
    OtherBoat:
      dataValue('boat/other_boat') || dataValue('boat/catch/other_boat'),
    Crew: dataValue('boat/crew'),
    WomenCrew: dataValue('boat/women_crew'),
    Engine: dataValue('boat/engine') || dataValue('boat/catch/engine'),
    WCSPROGRAMS_GearID_PrimaryGear: await findValue({
      uuid: 'wcsprograms_gearid',
      relation: 'WCSPROGRAMS_gear',
      where: { WCSPROGRAMS_gearExtCode: dataValue('boat/primary_gear') },
    })(state),
    PrimaryNetType: dataValue('boat/primary_net_type'),
    PrimaryLineType: dataValue('boat/primary_line_type'),
    PrimaryOtherType: dataValue('boat/primary_other_type'),
    PrimaryGearLocalName: dataValue('boat/primary_gear_local_name'),
    PrimaryNetLength: dataValue('boat/primary_net_length'),
    PrimaryNetHeight: dataValue('boat/primary_net_height'),
    PrimaryMeshSize: dataValue('boat/primary_mesh_size'),
    WCSPROGRAMS_UnitID_PrimaryMeshSizeUnit: await findValue({
      uuid: 'wcsprograms_unitid',
      relation: 'WCSPROGRAMS_unit',
      where: {
        WCSPROGRAMS_unitExtCode: dataValue('boat/primary_mesh_size_unit'),
      },
    })(state),
    PrimaryLinesNb: dataValue('boat/primary_lines_nb'),
    PrimaryHooksNb: dataValue('boat/primary_hooks_nb'),
    PrimaryHookSize: dataValue('boat/primary_hook_size'),
    WCSPROGRAMS_GearID_SecondaryGear: await findValue({
      uuid: 'wcsprograms_gearid',
      relation: 'WCSPROGRAMS_gear',
      where: { WCSPROGRAMS_gearExtCode: dataValue('boat/secondary_gear') },
    })(state),
    SecondaryNetType: dataValue('boat/secondary_net_type'),
    SecondaryLineType: dataValue('boat/secondary_line_type'),
    SecondaryOtherType: dataValue('boat/secondary_other_type'),
    SecondaryGearLocalName: dataValue('boat/secondary_gear_local_name'),
    SecondaryNetLength: dataValue('boat/secondary_net_length'),
    SecondaryNetHeight: dataValue('boat/secondary_net_height'),
    SecondaryMeshSize: dataValue('boat/secondary_mesh_size'),
    WCSPROGRAMS_UnitID_SecondaryMeshSizeUnit: await findValue({
      uuid: 'wcsprograms_unitid',
      relation: 'WCSPROGRAMS_unit',
      where: {
        WCSPROGRAMS_unitExtCode: dataValue('boat/secondary_mesh_size_unit'),
      },
    })(state),
    SecondaryLinesNb: dataValue('boat/secondary_lines_nb'),
    SecondaryHooksNb: dataValue('boat/secondary_hooks_nb'),
    SecondaryHookSize: dataValue('boat/secondary_hook_size'),
    FishingLocation:
      dataValue('boat/fishing_location') ||
      dataValue('boat/catch/fishing_location'),
    FishingDepth: dataValue('boat/fishing_depth'),
    WCSPROGRAMS_HabitatID_FishingHabitat: await findValue({
      uuid: 'wcsprograms_habitatid',
      relation: 'WCSPROGRAMS_habitat',
      where: {
        WCSPROGRAMS_habitatExtCode: dataValue('boat/fishing_habitat'),
      },
    })(state),
    OtherHabitat: dataValue('boat/other_habitat'),
    DistanceSite: dataValue('boat/distance_site'),
    FishingStart:
      dataValue('boat/fishing_start') || dataValue('boat/catch/fishing_start'),
    FishingEnd:
      dataValue('boat/fishing_end') || dataValue('boat/catch/fishing_end'),
    FishingTime: dataValue('boat/fishing_time'),
    TravelTime: dataValue('boat/travel_time'),
    NbBoats: dataValue('boat/nb_boats'),
    WCSPROGRAMS_SharksRaysYesNoID_Targeted: await findValue({
      uuid: 'WCSPROGRAMS_SharksRaysYesNoID',
      relation: 'WCSPROGRAMS_SharksRaysYesNo',
      where: {
        WCSPROGRAMS_SharksRaysYesNoExtCode:
          dataValue('boat/targeted') || dataValue('boat/catch/targeted'),
      },
    })(state),
    LastCatchSharkRay:
      dataValue('boat/last_catch_shark_ray') ||
      dataValue('boat/catch/last_catch_shark_ray'),
    WCSPROGRAMS_SharksRaysYesNoID_ReleaseSharkRay: await findValue({
      uuid: 'WCSPROGRAMS_SharksRaysYesNoID',
      relation: 'WCSPROGRAMS_SharksRaysYesNo',
      where: {
        WCSPROGRAMS_SharksRaysYesNoExtCode:
          dataValue('boat/release_shark_ray') ||
          dataValue('boat/catch/release_shark_ray'),
      },
    })(state),
    PercentEat: dataValue('boat/percent_eat'),
    PercentSell: dataValue('boat/percent_sell'),
    PercentGive: dataValue('boat/percent_give'),
    WhereSellFins: dataValue('boat/where_sell_fins'),
    WhereSellMeat: dataValue('boat/where_sell_meat'),
    WhereSellOil: dataValue('boat/where_sell_oil'),
    FinsPrice: dataValue('boat/fins_price'),
    FinsPriceUsd: dataValue('boat/fins_price_usd'),
    MeatPrice: dataValue('boat/meat_price'),
    MeatPriceUsd: dataValue('boat/meat_price_usd'),
    OilPrice: dataValue('boat/oil_price'),
    OilPriceUsd: dataValue('boat/oil_price_usd'),
    NbSharksUnsampled: dataValue('boat/nb_sharks_unsampled'),
    NbRaysUnsampled: dataValue('boat/nb_rays_unsampled'),
    NbSharkLikeRaysUnsampled: dataValue('boat/nb_shark_like_rays_unsampled'),
    SharksraysUuid: dataValue('__parentUuid'),
    AnswerId: dataValue('_id'),
    GeneratedUuid: dataValue('__generatedUuid'),
    WCSPROGRAMS_SharksRaysID: await findValue({
      uuid: 'WCSPROGRAMS_SharksRaysID',
      relation: 'WCSPROGRAMS_SharksRays',
      where: {
        AnswerId: state.body._id,
      },
    })(state),
  };
  console.log(mappingBoat);
  return upsert(
    'WCSPROGRAMS_SharksRaysBoat',
    'GeneratedUuid', // Check unique constraint on DB.
    mappingBoat, // DD added Boat
    { setNull: ["''", "'undefined'"] }
  )(state);
});

//------------------ WCSPROGRAMS_SharksRaysSales ---------------------
fn(state => {
  const outerPath = state.body['market_details/vendor']
    ? 'market_details/vendor'
    : 'market_details/market_001/vendor';
  const outerDataArray =
    state.body['market_details/vendor'] ||
    state.body['market_details/market_001/vendor'] ||
    [];

  if (outerDataArray.length > 0) {
    return each(
      // '$.body.market_details[*]',
      outerDataArray,
      fn(async state => {
        const path = `${outerPath}/sales`;
        const dataArray = state.data[`${path}`] || [];
        console.log(path);

        if (dataArray.length > 0) {
          const mappingSales = []; // DD added Sales to give specific mapping name

          for (let x of dataArray) {
            mappingSales.push({
              // DD added Sales to give specific mapping name
              WCSPROGRAMS_TypeID_SType: await findValue({
                uuid: 'wcsprograms_typeid',
                relation: 'WCSPROGRAMS_type',
                where: {
                  WCSPROGRAMS_typeExtCode: x[`${path}/s_type`],
                },
              })(state),
              WCSPROGRAMS_GenusID_SGenus: await findValue({
                uuid: 'wcsprograms_genusid',
                relation: 'WCSPROGRAMS_genus',
                where: {
                  WCSPROGRAMS_genusExtCode: x[`${path}/s_genus`],
                },
              })(state),
              //=================================================//
              // WCSPROGRAMS_SpeciesID_SSpecies: await findValue({
              //   uuid: 'wcsprograms_speciesid',
              //   relation: 'WCSPROGRAMS_species',
              //   where: {
              //     WCSPROGRAMS_speciesExtCode: dataValue(
              //       'market_details/vendor/sales/s_species'
              //     ),
              //   },
              // })(state),
              //NOTE: Replaced above auto-mapping with below Taxa mapping
              WCSPROGRAMS_TaxaID_SSpecies: await findValue({
                uuid: 'wcsprograms_taxaid',
                relation: 'WCSPROGRAMS_Taxa',
                where: {
                  ScientificName: state.handleValue(x[`${path}/s_species`]),
                },
              })(state),
              //=================================================//
              SPic4:
                x['market_details/vendor/sales/s_img4/s_pic_4'] ||
                x['market_details/market_001/vendor/sales/s_img4/s_pic_4'],
              SPic5:
                x['market_details/vendor/sales/s_img5/s_pic_5'] ||
                x['market_details/market_001/vendor/sales/s_img5/s_pic_5'],
              SPic6:
                x['market_details/vendor/sales/s_img6/s_pic6'] ||
                x['market_details/market_001/vendor/sales/s_img6/s_pic6'],
              SPic7:
                x['market_details/vendor/sales/s_img7/s_pic7'] ||
                x['market_details/market_001/vendor/sales/s_img7/s_pic7'],
              SPic8:
                x['market_details/vendor/sales/s_img8/s_pic8'] ||
                x['market_details/market_001/vendor/sales/s_img8/s_pic8'],
              SPic9:
                x['market_details/vendor/sales/s_img9/s_pic9'] ||
                x['market_details/market_001/vendor/sales/s_img9/s_pic9'],
              SPic10:
                x['market_details/vendor/sales/s_img10/s_pic10'] ||
                x['market_details/market_001/vendor/sales/s_img10/s_pic10'],
              SPic11:
                x['market_details/vendor/sales/s_img11/s_pic11'] ||
                x['market_details/market_001/vendor/sales/s_img11/s_pic11'],
              SPic12:
                x['market_details/vendor/sales/s_img12/s_pic12'] ||
                x['market_details/market_001/vendor/sales/s_img12/s_pic12'],
              SLocalName:
                x['market_details/vendor/sales/s_local_name'] ||
                x['market_details/market_001/vendor/sales/s_local_name'],
              WCSPROGRAMS_SexID_SSex: await findValue({
                uuid: 'wcsprograms_sexid',
                relation: 'WCSPROGRAMS_sex',
                where: {
                  WCSPROGRAMS_sexExtCode: x[`${path}/s_sex`],
                },
              })(state),
              SWeight:
                x['market_details/vendor/sales/s_weight'] ||
                x['market_details/market_001/vendor/sales/s_weight'],
              SDiscWidth:
                x['market_details/vendor/sales/s_disc_width'] ||
                x['market_details/market_001/vendor/sales/s_disc_width'],
              SDiscLength:
                x['market_details/vendor/sales/s_disc_length'] ||
                x['market_details/market_001/vendor/sales/s_disc_length'],
              STotalLength:
                x['market_details/vendor/sales/s_total_length'] ||
                x['market_details/market_001/vendor/sales/s_total_length'],
              SPrecaudalLength:
                x['market_details/vendor/sales/s_precaudal_length'] ||
                x['market_details/market_001/vendor/sales/s_precaudal_length'],
              SForkLength:
                x['market_details/vendor/sales/s_fork_length'] ||
                x['market_details/market_001/vendor/sales/s_fork_length'],
              SCarapaceLength:
                x['market_details/vendor/sales/s_carapace_length'] ||
                x['market_details/market_001/vendor/sales/s_carapace_length'],
              SCarapaceWidth:
                x['market_details/vendor/sales/s_carapace_width'] ||
                x['market_details/market_001/vendor/sales/s_carapace_width'],
              SGearType:
                x['market_details/vendor/sales/s_gear_type'] ||
                x['market_details/market_001/vendor/sales/s_gear_type'],
              SGearTypeOther:
                x['market_details/vendor/sales/s_gear_type_other'] ||
                x['market_details/market_001/vendor/sales/s_gear_type_other'],
              //=== Adjusted to match WCS table name
              WCSPROGRAMS_SharksRaysYesNoID_SDnaSampleCollected:
                await findValue({
                  uuid: 'WCSPROGRAMS_SharksRaysYesNoID',
                  relation: 'WCSPROGRAMS_SharksRaysYesNo',
                  where: {
                    WCSPROGRAMS_SharksRaysYesNoExtCode:
                      x[`${path}/s_dna_sample_collected`],
                  },
                })(state),
              //=================================================//
              //NOTE: abandoned; Replaced about auto-mapping to map yes/no values to BIT column
              // SDnaSampleCollected:
              //   x['market_details/vendor/sales/s_dna_sample_collected'] === 'yes'
              //     ? true
              //     : x['boat/catch_details/dna_sample_collected'] === 'no'
              //       ? false
              //       : undefined,
              //=================================================//
              SDnaCode:
                x['market_details/vendor/sales/s_dna_code'] ||
                x['market_details/market_001/vendor/sales/s_dna_code'],
              SPriceSoldFor:
                x['market_details/vendor/sales/s_price_sold_for'] ||
                x['market_details/market_001/vendor/sales/s_price_sold_for'],
              SPriceSoldUsd:
                x['market_details/vendor/sales/s_price_sold_usd'] ||
                x['market_details/market_001/vendor/sales/s_price_sold_usd'],
              SComment:
                x['market_details/vendor/sales/s_comment'] ||
                x['market_details/market_001/vendor/sales/s_comment'],
              VendorUuid: x['__parentUuid'],
              AnswerId: state.body._id,
              GeneratedUuid: x['__generatedUuid'],
              WCSPROGRAMS_SharksRaysID: await findValue({
                uuid: 'WCSPROGRAMS_SharksRaysID',
                relation: 'WCSPROGRAMS_SharksRays',
                where: {
                  AnswerId: state.body._id,
                },
              })(state),
            });
          }
          console.log(mappingSales);
          return upsertMany(
            'WCSPROGRAMS_SharksRaysSales',
            'GeneratedUuid', // Check unique constraint on DB.
            () => mappingSales, // DD added Sales to give specific name to mapping
            { setNull: ["''", "'undefined'"] }
          )(state);
        }
        console.log(
          'No "market_details/vendor/sales" or "market_details/market_001/vendor/sales" array. Skipping upsert.'
        );
        return state;
      })
    )(state);
  }
  console.log(
    'No "market_details/vendor" or "market_details/market_001/vendor" array. Skipping upsert.'
  );
  return state;
});

//----------------- WCSPROGRAMS_SharksRaysVendor -------------------------
fn(async state => {
  const path = state.body['market_details/vendor']
    ? 'market_details/vendor'
    : 'market_details/market_001/vendor';
  const dataArray =
    state.body['market_details/vendor'] ||
    state.body['market_details/market_001/vendor'] ||
    [];
  if (dataArray.length > 0) {
    const mappingVendor = []; // DD added Vendor

    for (let x of dataArray) {
      mappingVendor.push({
        WCSPROGRAMS_SexID_VendorSex: await findValue({
          uuid: 'wcsprograms_sexid',
          relation: 'WCSPROGRAMS_sex',
          where: {
            WCSPROGRAMS_sexExtCode: x[`${path}/vendor_sex`],
          },
        })(state),
        WhenLastSellSharkRay:
          x['market_details/vendor/when_last_sell_shark_ray'] ||
          x['market_details/market_001/vendor/when_last_sell_shark_ray'],
        WCSPROGRAMS_VendorID_WhereBought: await findValue({
          uuid: 'wcsprograms_vendorid',
          relation: 'WCSPROGRAMS_vendor',
          where: {
            WCSPROGRAMS_vendorExtCode: x[`${path}/where_bought`],
          },
        })(state),
        WCSPROGRAMS_VendorID_WhoSoldTo: await findValue({
          uuid: 'wcsprograms_vendorid',
          relation: 'WCSPROGRAMS_vendor',
          where: {
            WCSPROGRAMS_vendorExtCode: x[`${path}/who_sold_to`],
          },
        })(state),
        WhoSoldOther:
          x['market_details/vendor/who_sold_other'] ||
          x['market_details/market_001/vendor/who_sold_other'],
        SharksraysUuid: x['__parentUuid'],
        AnswerId: state.body._id,
        GeneratedUuid: x['__generatedUuid'],
        WCSPROGRAMS_SharksRaysID: await findValue({
          uuid: 'WCSPROGRAMS_SharksRaysID',
          relation: 'WCSPROGRAMS_SharksRays',
          where: {
            AnswerId: state.body._id,
          },
        })(state),
      });
    }
    console.log(mappingVendor);
    return upsertMany(
      'WCSPROGRAMS_SharksRaysVendor',
      'GeneratedUuid', // Check unique constraint on DB.
      () => mappingVendor, // DD added Vendor
      { setNull: ["''", "'undefined'"] }
    )(state);
  }
  console.log(
    'No "market_details/vendor" or "market_details/market_001/vendor" array. Skipping upsert.'
  );
  return state;
});

// ---------------- WCSPROGRAMS_SharksRaysSample ----------------------
// removed parent 'boat[*]'
each(
  // dataPath('fish_catch[*]'),
  '$.body.fish_catch[*]',
  fn(async state => {
    const dataArray = state.data['boat/fish_catch/sample'] || [];

    const mappingSample = []; // DD added Sample

    for (let x of dataArray) {
      mappingSample.push({
        // DD added Sample
        FishLength: x['boat/fish_catch/sample/fish_length'],
        FishWeight: x['boat/fish_catch/sample/fish_weight'],
        FishCatchUuid: x['__parentUuid'],
        AnswerId: state.body._id,
        GeneratedUuid: x['__generatedUuid'],
        WCSPROGRAMS_SharksRaysID: await findValue({
          uuid: 'WCSPROGRAMS_SharksRaysID',
          relation: 'WCSPROGRAMS_SharksRays',
          where: {
            AnswerId: state.body._id,
          },
        })(state),
      });
    }
    console.log(mappingSample);
    return upsertMany(
      'WCSPROGRAMS_SharksRaysSample',
      'GeneratedUuid', // Check unique constraint on DB.
      () => mappingSample, // DD added Sample
      { setNull: ["''", "'undefined'"] }
    )(state);
  })
);

//----------------- WCSPROGRAMS_SharksRaysFishCatch -------------------------
// removed parent 'boat[*]'
fn(async state => {
  const dataArray = state.body['boat/fish_catch'] || [];
  if (dataArray.length > 0) {
    const mappingFish = []; // DD added Fish

    for (let x of dataArray) {
      mappingFish.push({
        // DD added Fish
        WCSPROGRAMS_FishID_FishSpecie: await findValue({
          uuid: 'wcsprograms_fishid',
          relation: 'WCSPROGRAMS_fish',
          where: {
            WCSPROGRAMS_fishExtCode: x['boat/fish_catch/fish_specie'],
          },
        })(state),
        NbObserved: x['boat/fish_catch/nb_observed'],
        TotalWeightFish: x['boat/fish_catch/total_weight_fish'],
        FishPartConsumed: x['boat/fish_catch/fish_part_consumed'],
        FishPriceKg: x['boat/fish_catch/fish_price_kg'],
        FishPriceSoldUsd: x['boat/fish_catch/fish_price_sold_usd'],
        BoatUuid: x['__parentUuid'],
        AnswerId: state.body._id,
        GeneratedUuid: x['__generatedUuid'],
        WCSPROGRAMS_SharksRaysID: await findValue({
          uuid: 'WCSPROGRAMS_SharksRaysID',
          relation: 'WCSPROGRAMS_SharksRays',
          where: {
            AnswerId: state.body._id,
          },
        })(state),
      });
    }
    console.log(mappingFish);
    return upsertMany(
      'WCSPROGRAMS_SharksRaysFishCatch',
      'GeneratedUuid', // Check unique constraint on DB.
      () => mappingFish,
      { setNull: ["''", "'undefined'"] }
    )(state);
  }
  console.log('No "boat/fish_catch" array. Skipping upsert.');
  return state;
});

//------------------ WCSPROGRAMS_SharksRaysCatchDetails ---------------
// removed parent 'boat[*]'
// Iterate directly on 'boat/catch_details' array
fn(async state => {
  const path = state.body['boat/catch_details']
    ? 'boat/catch_details'
    : 'boat/catch/catch_details';

  const dataArray =
    state.body['boat/catch_details'] ||
    state.body['boat/catch/catch_details'] ||
    [];

  if (dataArray.length > 0) {
    const mappingDetails = []; // DD added Details

    for (let x of dataArray) {
      mappingDetails.push({
        // DD added Details
        WCSPROGRAMS_TypeID_Type: await findValue({
          uuid: 'wcsprograms_typeid',
          relation: 'WCSPROGRAMS_type',
          where: {
            WCSPROGRAMS_typeExtCode: x[`${path}/type`],
          },
        })(state),
        WCSPROGRAMS_GenusID_Genus: await findValue({
          uuid: 'wcsprograms_genusid',
          relation: 'WCSPROGRAMS_genus',
          where: {
            WCSPROGRAMS_genusExtCode: x[`${path}/genus`],
          },
        })(state),
        //=================================================//
        // WCSPROGRAMS_SpeciesID_Species: await findValue({
        //   uuid: 'wcsprograms_speciesid',
        //   relation: 'WCSPROGRAMS_species',
        //   where: {
        //     WCSPROGRAMS_speciesExtCode: x[`${path}/species`],
        //   },
        // })(state),
        //
        //NOTE: Replaced above auto-mapping with below Taxa mapping
        WCSPROGRAMS_TaxaID_Species: await findValue({
          uuid: 'wcsprograms_taxaid',
          relation: 'WCSPROGRAMS_Taxa',
          where: {
            ScientificName: state.handleValue(x[`${path}/species`]),
          },
        })(state),
        //=================================================//
        LocalName: x[`${path}/local_name`],
        WCSPROGRAMS_SexID_Sex: await findValue({
          uuid: 'wcsprograms_sexid',
          relation: 'WCSPROGRAMS_sex',
          where: {
            WCSPROGRAMS_sexExtCode: x[`${path}/sex`],
          },
        })(state),
        Weight: x[`${path}/weight`],
        DiscWidth: x[`${path}/disc_width`],
        DiscLength: x[`${path}/disc_length`],
        TotalLength: x[`${path}/total_length`],
        ForkLength: x[`${path}/fork_length`],
        PrecaudalLength: x[`${path}/precaudal_length`],
        Pic4: x[`${path}/img4/pic_4`],
        Pic5: x[`${path}/img5/pic_5`],
        Pic6: x[`${path}/img6/pic6`],
        Pic7: x[`${path}/img7/pic7`],
        Pic8: x[`${path}/img8/pic8`],
        Pic9: x[`${path}/img9/pic9`],
        Pic10: x[`${path}/img10/pic10`],
        Pic11: x[`${path}/img11/pic11`],
        Pic12: x[`${path}/img12/pic12`],
        GearType: x[`${path}/gear_type`],
        GearTypeOther: x[`${path}/gear_type_other`],
        //=================================================//
        WCSPROGRAMS_SharksRaysYesNoID_DnaSampleCollected: await findValue({
          uuid: 'WCSPROGRAMS_SharksRaysYesNoID',
          relation: 'WCSPROGRAMS_SharksRaysYesNo',
          where: {
            WCSPROGRAMS_SharksRaysYesNoExtCode:
              x[`${path}/dna_sample_collected`],
          },
        })(state),
        //Abandoned: Replaced about auto-mapping to map yes/no values to BIT column
        // DnaSampleCollected:
        //   x[`${path}/dna_sample_collected`] === 'yes'
        //     ? true
        //     : x[`${path}/dna_sample_collected`] === 'no'
        //       ? false
        //       : undefined,
        //=================================================//
        DnaCode: x[`${path}/dna_code`],
        PriceSoldFor: x[`${path}/price_sold_for`],
        PriceSoldUsd: x[`${path}/price_sold_usd`],
        Comment: x[`${path}/comment`],
        BoatUuid: x['__parentUuid'],
        AnswerId: state.body._id,
        GeneratedUuid: x['__generatedUuid'],
        WCSPROGRAMS_SharksRaysID: await findValue({
          uuid: 'WCSPROGRAMS_SharksRaysID',
          relation: 'WCSPROGRAMS_SharksRays',
          where: {
            AnswerId: state.body._id,
          },
        })(state),
      });
    }
    console.log(mappingDetails);
    return upsertMany(
      'WCSPROGRAMS_SharksRaysCatchDetails',
      'GeneratedUuid', // Check unique constraint on DB.
      () => mappingDetails, // DD added Details
      { setNull: ["''", "'undefined'"] }
    )(state);
  }
  console.log(
    'No boat/catch_details or boat/catch/catch_details array. Skipping upsert.'
  );
  return state;
});

//------------------ WCSPROGRAMS_SalesGear ---------------
fn(state => {
  const outerPath = state.body['market_details/vendor']
    ? 'market_details/vendor'
    : 'market_details/market_001/vendor';
  const outerDataArray =
    state.body['market_details/vendor'] ||
    state.body['market_details/market_001/vendor'] ||
    [];

  if (outerDataArray.length > 0) {
    return each(
      outerDataArray,
      each(
        dataPath(`${outerPath}/sales[*]`),
        fn(async state => {
          const nestedPath = `${outerPath}/sales`;
          const dataArray = state.data[`${nestedPath}/s_gear_type`]
            ? state.data[`${nestedPath}/s_gear_type`].split(' ')
            : [];

          console.log(dataArray);

          if (dataArray.length > 0) {
            const mappingSGear = []; // DD added SGear
            for (let x of dataArray) {
              mappingSGear.push({
                // DD added SGear
                WCSPROGRAMS_GearID: await findValue({
                  uuid: 'wcsprograms_gearid',
                  relation: 'WCSPROGRAMS_Gear',
                  where: {
                    WCSPROGRAMS_GearExtCode: x,
                  },
                })(state),
                WCSPROGRAMS_SalesID: await findValue({
                  uuid: 'wcsprograms_salesid',
                  relation: 'WCSPROGRAMS_SharksRaysSales',
                  where: {
                    AnswerId: state.body._id,
                  },
                })(state),
              });
            }
            console.log(mappingSGear);
            return upsertMany(
              'WCSPROGRAMS_SalesGear',
              ['WCSPROGRAMS_GearID', 'WCSPROGRAMS_SalesID'], // Check unique constraint on DB.
              () => mappingSGear, // DD added SGear
              { setNull: ["''", "'undefined'"] }
            )(state);
          }
          return state;
        })
      )
    )(state);
  }
  console.log(
    'No "market_details/vendor" or "market_details/market_001/vendor" array. Skipping upsert.'
  );
  return state;
});

//------------------ WCSPROGRAMS_CatchDetailsGear ---------------------
fn(state => {
  const path = state.body['boat/catch_details']
    ? 'boat/catch_details'
    : 'boat/catch/catch_details';
  const outerDataArray = state.body[`${path}`] || [];

  return each(
    outerDataArray,
    fn(async state => {
      const dataArray = state.data[`${path}/gear_type`]
        ? state.data[`${path}/gear_type`].split(' ')
        : [];

      const mappingGear = []; // DD added Gear
      console.log(dataArray);

      for (let x of dataArray) {
        mappingGear.push({
          // DD added Gear
          WCSPROGRAMS_GearID: await findValue({
            uuid: 'wcsprograms_gearid',
            relation: 'WCSPROGRAMS_Gear',
            where: {
              WCSPROGRAMS_GearExtCode: x,
            },
          })(state),
          WCSPROGRAMS_CatchDetailsID: await findValue({
            uuid: 'wcsprograms_catchdetailsid',
            relation: 'WCSPROGRAMS_SharksRaysCatchDetails',
            where: {
              AnswerId: state.body._id,
            },
          })(state),
        });
      }
      console.log(mappingGear);
      return upsertMany(
        'WCSPROGRAMS_CatchDetailsGear',
        ['WCSPROGRAMS_GearID', 'WCSPROGRAMS_CatchDetailsID'], // Check unique constraint on DB.
        () => mappingGear, // DD added Gear
        { setNull: ["''", "'undefined'"] }
      )(state);
    })
  )(state);
});
