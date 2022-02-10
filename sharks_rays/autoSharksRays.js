alterState(state => {
  const handleValue = value => {
    if (value && value !== undefined && value !== 'undefined' && value !== '')
      return value === 'unknown species'
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
alterState(async state => {
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
alterState(async state => {
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
alterState(async state => {
  const dataArray = state.body['boat'] || [];

  if (dataArray.length > 0) {
    const mappingBoat = []; // DD added Boat

    for (let x of dataArray) {
      mappingBoat.push({
        // DD added Boat
        WCSPROGRAMS_SharksRaysYesNoID_BoatInfo: await findValue({
          uuid: 'WCSPROGRAMS_SharksRaysYesNoID',
          relation: 'WCSPROGRAMS_SharksRaysYesNo',
          where: {
            WCSPROGRAMS_SharksRaysYesNoExtCode: x['boat/boat_info'],
          },
        })(state),
        WCSPROGRAMS_SharksRaysYesNoID_CatchInfo: await findValue({
          uuid: 'WCSPROGRAMS_SharksRaysYesNoID',
          relation: 'WCSPROGRAMS_SharksRaysYesNo',
          where: {
            WCSPROGRAMS_SharksRaysYesNoExtCode: x['boat/catch_info'],
          },
        })(state),
        WCSPROGRAMS_BoatID_BoatType: await findValue({
          uuid: 'wcsprograms_boatid',
          relation: 'WCSPROGRAMS_boat',
          where: {
            WCSPROGRAMS_boatExtCode:
              x['boat/boat_type'] || x['boat/catch/boat_type'],
          },
        })(state),
        OtherBoat: x['boat/other_boat'] || x['boat/catch/other_boat'],
        Crew: x['boat/crew'],
        WomenCrew: x['boat/women_crew'],
        Engine: x['boat/engine'] || x['boat/catch/engine'],
        WCSPROGRAMS_GearID_PrimaryGear: await findValue({
          uuid: 'wcsprograms_gearid',
          relation: 'WCSPROGRAMS_gear',
          where: { WCSPROGRAMS_gearExtCode: x['boat/primary_gear'] },
        })(state),
        PrimaryNetType: x['boat/primary_net_type'],
        PrimaryLineType: x['boat/primary_line_type'],
        PrimaryOtherType: x['boat/primary_other_type'],
        PrimaryGearLocalName: x['boat/primary_gear_local_name'],
        PrimaryNetLength: x['boat/primary_net_length'],
        PrimaryNetHeight: x['boat/primary_net_height'],
        PrimaryMeshSize: x['boat/primary_mesh_size'],
        WCSPROGRAMS_UnitID_PrimaryMeshSizeUnit: await findValue({
          uuid: 'wcsprograms_unitid',
          relation: 'WCSPROGRAMS_unit',
          where: {
            WCSPROGRAMS_unitExtCode: x['boat/primary_mesh_size_unit'],
          },
        })(state),
        PrimaryLinesNb: x['boat/primary_lines_nb'],
        PrimaryHooksNb: x['boat/primary_hooks_nb'],
        PrimaryHookSize: x['boat/primary_hook_size'],
        WCSPROGRAMS_GearID_SecondaryGear: await findValue({
          uuid: 'wcsprograms_gearid',
          relation: 'WCSPROGRAMS_gear',
          where: { WCSPROGRAMS_gearExtCode: x['boat/secondary_gear'] },
        })(state),
        SecondaryNetType: x['boat/secondary_net_type'],
        SecondaryLineType: x['boat/secondary_line_type'],
        SecondaryOtherType: x['boat/secondary_other_type'],
        SecondaryGearLocalName: x['boat/secondary_gear_local_name'],
        SecondaryNetLength: x['boat/secondary_net_length'],
        SecondaryNetHeight: x['boat/secondary_net_height'],
        SecondaryMeshSize: x['boat/secondary_mesh_size'],
        WCSPROGRAMS_UnitID_SecondaryMeshSizeUnit: await findValue({
          uuid: 'wcsprograms_unitid',
          relation: 'WCSPROGRAMS_unit',
          where: {
            WCSPROGRAMS_unitExtCode: x['boat/secondary_mesh_size_unit'],
          },
        })(state),
        SecondaryLinesNb: x['boat/secondary_lines_nb'],
        SecondaryHooksNb: x['boat/secondary_hooks_nb'],
        SecondaryHookSize: x['boat/secondary_hook_size'],
        FishingLocation:
          x['boat/fishing_location'] || x['boat/catch/fishing_location'],
        FishingDepth: x['boat/fishing_depth'],
        WCSPROGRAMS_HabitatID_FishingHabitat: await findValue({
          uuid: 'wcsprograms_habitatid',
          relation: 'WCSPROGRAMS_habitat',
          where: {
            WCSPROGRAMS_habitatExtCode: x['boat/fishing_habitat'],
          },
        })(state),
        OtherHabitat: x['boat/other_habitat'],
        DistanceSite: x['boat/distance_site'],
        FishingStart: x['boat/fishing_start'] || x['boat/catch/fishing_start'],
        FishingEnd: x['boat/fishing_end'] || x['boat/catch/fishing_end'],
        FishingTime: x['boat/fishing_time'],
        TravelTime: x['boat/travel_time'],
        NbBoats: x['boat/nb_boats'],
        WCSPROGRAMS_SharksRaysYesNoID_Targeted: await findValue({
          uuid: 'WCSPROGRAMS_SharksRaysYesNoID',
          relation: 'WCSPROGRAMS_SharksRaysYesNo',
          where: {
            WCSPROGRAMS_SharksRaysYesNoExtCode:
              x['boat/targeted'] || x['boat/catch/targeted'],
          },
        })(state),
        LastCatchSharkRay:
          x['boat/last_catch_shark_ray'] ||
          x['boat/catch/last_catch_shark_ray'],
        WCSPROGRAMS_SharksRaysYesNoID_ReleaseSharkRay: await findValue({
          uuid: 'WCSPROGRAMS_SharksRaysYesNoID',
          relation: 'WCSPROGRAMS_SharksRaysYesNo',
          where: {
            WCSPROGRAMS_SharksRaysYesNoExtCode:
              x['boat/release_shark_ray'] || x['boat/catch/release_shark_ray'],
          },
        })(state),
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
        AnswerId: state.body._id,
        GeneratedUuid: x['__generatedUuid'],
      });
    }
    console.log(mappingBoat);
    return upsertMany(
      'WCSPROGRAMS_SharksRaysBoat',
      'GeneratedUuid',
      () => mappingBoat, // DD added Boat
      { setNull: ["''", "'undefined'"] }
    )(state);
  }
  console.log('No "boat" array. Skipping upsert.');
  return state;
});

//------------------ WCSPROGRAMS_SharksRaysCatchDetails ---------------
each(
  '$.body.boat[*]',
  alterState(async state => {
    const path = state.data['boat/catch_details']
      ? 'boat/catch_details'
      : 'boat/catch/catch_details';
    const dataArray =
      state.data['boat/catch_details'] ||
      state.data['boat/catch/catch_details'] ||
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
          WCSPROGRAMS_TaxaID_Species: await findValue({
            uuid: 'WCSPROGRAMS_TaxaID',
            relation: 'WCSPROGRAMS_Taxa',
            where: {
              ScientificName: state.handleValue(x[`${path}/species`]),
            },
          })(state),
          LocalName:
            x['boat/catch_details/local_name'] ||
            x['boat/catch/catch_details/local_name'],
          WCSPROGRAMS_SexID_Sex: await findValue({
            uuid: 'wcsprograms_sexid',
            relation: 'WCSPROGRAMS_sex',
            where: {
              WCSPROGRAMS_sexExtCode: x[`${path}/sex`],
            },
          })(state),
          Weight:
            x['boat/catch_details/weight'] ||
            x['boat/catch/catch_details/weight'],
          DiscWidth:
            x['boat/catch_details/disc_width'] ||
            x['boat/catch/catch_details/disc_width'],
          DiscLength:
            x['boat/catch_details/disc_length'] ||
            x['boat/catch/catch_details/disc_length'],
          TotalLength:
            x['boat/catch_details/total_length'] ||
            x['boat/catch/catch_details/total_length'],
          ForkLength:
            x['boat/catch_details/fork_length'] ||
            x['boat/catch/catch_details/fork_length'],
          PrecaudalLength:
            x['boat/catch_details/precaudal_length'] ||
            x['boat/catch/catch_details/precaudal_length'],
          Pic4:
            x['boat/catch_details/img4/pic_4'] ||
            x['boat/catch/catch_details/img4/pic_4'],
          Pic5:
            x['boat/catch_details/img5/pic_5'] ||
            x['boat/catch/catch_details/img5/pic_5'],
          Pic6:
            x['boat/catch_details/img6/pic6'] ||
            x['boat/catch/catch_details/img6/pic6'],
          Pic7:
            x['boat/catch_details/img7/pic7'] ||
            x['boat/catch/catch_details/img7/pic7'],
          Pic8:
            x['boat/catch_details/img8/pic8'] ||
            x['boat/catch/catch_details/img8/pic8'],
          Pic9:
            x['boat/catch_details/img9/pic9'] ||
            x['boat/catch/catch_details/img9/pic9'],
          Pic10:
            x['boat/catch_details/img10/pic10'] ||
            x['boat/catch/catch_details/img10/pic10'],
          Pic11:
            x['boat/catch_details/img11/pic11'] ||
            x['boat/catch/catch_details/img11/pic11'],
          Pic12:
            x['boat/catch_details/img12/pic12'] ||
            x['boat/catch/catch_details/img12/pic12'],
          GearType:
            x['boat/catch_details/gear_type'] ||
            x['boat/catch/catch_details/gear_type'],
          GearTypeOther:
            x['boat/catch/catch_details/gear_type_other'] ||
            x['boat/catch/catch_details/gear_type_other'],
          WCSPROGRAMS_SharksRaysYesNoID_DnaSampleCollected: await findValue({
            uuid: 'WCSPROGRAMS_SharksRaysYesNoID',
            relation: 'WCSPROGRAMS_SharksRaysYesNo',
            where: {
              WCSPROGRAMS_SharksRaysYesNoExtCode:
                x[`${path}/dna_sample_collected`],
            },
          })(state),
          DnaCode:
            x['boat/catch_details/dna_code'] ||
            x['boat/catch/catch_details/dna_code'],
          PriceSoldFor:
            x['boat/catch_details/price_sold_for'] ||
            x['boat/catch/catch_details/price_sold_for'],
          PriceSoldUsd:
            x['boat/catch_details/price_sold_usd'] ||
            x['boat/catch/catch_details/price_sold_usd'],
          Comment:
            x['boat/catch_details/comment'] ||
            x['boat/catch/catch_details/comment'],
          BoatUuid: x['__parentUuid'],
          AnswerId: state.body._id,
          GeneratedUuid: x['__generatedUuid'],
        });
      }
      console.log(mappingDetails);
      return upsertMany(
        'WCSPROGRAMS_SharksRaysCatchDetails',
        'GeneratedUuid',
        () => mappingDetails, // DD added Details
        { setNull: ["''", "'undefined'"] }
      )(state);
    }
    console.log(
      'No boat/catch_details or boat/catch/catch_details array. Skipping upsert.'
    );
    return state;
  })
);

//------------------ WCSPROGRAMS_CatchDetailsGear ---------------------
each(
  '$.body.boat[*]',
  each(
    dataPath('boat/catch_details[*]'),
    alterState(async state => {
      const path = state.data['boat/catch_details/gear_type']
        ? 'boat/catch_details'
        : 'boat/catch/catch_details';
      const dataArray = state.data[`${path}/gear_type`].split(' ') || [];

      const mappingGear = []; // DD added Gear

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
          // GeneratedUuid: x['__generatedUuid'],
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
  )
);

// ---------------- WCSPROGRAMS_SharksRaysSample ----------------------
each(
  '$.body.boat[*]',
  each(
    dataPath('fish_catch[*]'),
    alterState(async state => {
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
  )
);

//----------------- WCSPROGRAMS_SharksRaysFishCatch -------------------------
each(
  '$.body.boat[*]',
  alterState(async state => {
    const dataArray = state.data['boat/fish_catch'] || [];
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
    console.log('No "boat/fish_catch array". Skipping upsert.');
    return state;
  })
);

//----------------- WCSPROGRAMS_SharksRaysVendor -------------------------
alterState(async state => {
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

//----------------- WCSPROGRAMS_SharksRaysSales -------------------------
each(
  //'$.market_details[*]',
  '$.body.market_details/vendor[*]',
  alterState(async state => {
    const path = state.data['market_details/vendor/sales']
      ? 'market_details/vendor/sales'
      : 'market_details/market_001/vendor/sales';
    const dataArray =
      state.data['market_details/vendor/sales'] ||
      state.data['market_details/market_001/vendor/sales'] ||
      [];

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
            uuid: 'WCSPROGRAMS_TaxaID',
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
          WCSPROGRAMS_SharksRaysYesNoID_SDnaSampleCollected: await findValue({
            uuid: 'WCSPROGRAMS_SharksRaysYesNoID',
            relation: 'WCSPROGRAMS_SharksRaysYesNo',
            where: {
              WCSPROGRAMS_SharksRaysYesNoExtCode:
                x[`${path}/s_dna_sample_collected`],
            },
          })(state),
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
      'No market_details/vendor/sales or market_details/market_001/vendor/sales array. Skipping upsert.'
    );
    return state;
  })
);

//------------------ WCSPROGRAMS_SalesGear ---------------
each(
  '$.body.market_details/vendor[*]',
  //'$.market_details[*]',
  each(
    dataPath('market_details/vendor/sales[*]'),
    //dataPath('vendor[*]'),
    alterState(async state => {
      const path = state.data['market_details/vendor/sales/s_gear_type']
        ? 'market_details/vendor/sales'
        : 'market_details/market_001/vendor/sales';
      const dataArray = state.data[`${path}/s_gear_type`].split(' ') || [];

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
          // GeneratedUuid: x['__generatedUuid'],
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
    })
  )
);
