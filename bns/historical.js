//== Job to be used for fetching data from Kobo for historical, once-off migrations  ==//
// This can be run on-demand at any time by clicking "run" //

alterState(state => {
  console.log(`Started at: ${new Date().toISOString()}`);
  state.submissions = [];
  state.data = {
    surveys: [
      //** Specify new forms to fetch here **//
      //** Tag options: bns_survey, bns_price, nrgt_current, nrgt_historical  **//
      // Historical  forms to migrate:
      //Make sure the tag matches the Trigger of the related Job

      //******* OPENFN TEST FORMS ******///
      //{ id: 'aijj9FSpuCzMTRnMPGike8', tag: 'nrgt_historical', name: 'NRGT Makira 2017 - Test OpenFn', owner: 'bns' }, // TEST
      // { id: 'av4hQ37rMgwFoh9ogjeyKh', tag: 'nrgt_current', name: 'NRGT 2019 - Test OpenFn', owner: 'bns' }, // TEST
      // { id: 'azrSYMFpj3M8jdFkApT3o6/', tag: 'bns_price', name: 'BNS Prix Ndoki 2019 - Test OpenFn', owner: 'bns' }, // TEST
      // { id: 'aMpW7wwRBRbtCfidtK2rRn', tag: 'bns_survey', name: 'BNS Ndoki 2019 - OpenFn Test', owner: 'bns' }, // TEST

      //****** Ongoing Forms to Rerun ****//


      //******* WCS HISTORICAL FORMS ******///

      //BNS
      // HH 2023
    // { id: 'a9SgR3L9Vzn8CC5UPAa2ou', tag: 'bns_survey', name: 'BNS EPP 2e/3e cohortes 2023', owner: 'wcs_poultry', instance: 'WCS Congo unpublished data 2023' }, 
    // { id: 'aAGC9q7nwXPnVLP6bFNAEw', tag: 'bns_survey', name: 'BNS_Individual_Niassa_2023', owner: 'wcs_niassa', instance: 'WCS Niassa unpublished data 2023' }, 
      
    //   //Prices 2023
    // { id: 'aAKdquWgPSLjzB3UgGBcsW', tag: 'bns_price', name: 'BNS_Precos_Niassa_2023', owner: 'wcs_niassa', instance: 'WCS Niassa unpublished data 2023'}, 
      
    //   // HH 2022
    // { id: 'aXf5DPR25YsB8f3mXS7LDh', tag: 'bns_survey', name: 'BNS household Crossriver 2022', owner: 'wcs_crossriver', instance: 'WCS Cross River unpublished data 2022'}, 
    // { id: 'aH2cMdEFcpwjmtBpz7TnyH', tag: 'bns_survey', name: 'BNS_Nosy Be_2022', owner: 'wcs_soariake', instance: 'S. Rakotoharimalala, R. Ranaivoson, C. Razafindrakoto, D. Detoeuf, WCS Madagascar 2022'},
    // { id: 'aGT9DSs6zf6q54okHR6UxY', tag: 'bns_survey', name: 'BNS_ABS_2022', owner: 'wcs_antongil', instance: 'S. Rakotoharimalala, R. Ranaivoson, C. Razafindrakoto, D. Detoeuf, WCS Madagascar 2022'}, 
    // { id: 'aGKL3jhaGpvfCP7ekPNyr4', tag: 'bns_survey', name: 'BNS_Ankarea/Ankivonjy_2022', owner: 'wcs_soariake', instance: 'S. Rakotoharimalala, R. Ranaivoson, C. Razafindrakoto, D. Detoeuf, WCS Madagascar 2022'}, 
    // { id: 'a5MyeTAhZ5WHadabcNVMcU', tag: 'bns_survey',name: 'BNS_Soariake_2022_FINAL', owner: 'wcs_soariake', instance: 'S. Rakotoharimalala, R. Ranaivoson, C. Razafindrakoto, D. Detoeuf, WCS Madagascar 2022' }, 
    // { id: 'aXc8nMwPbqrKMDqrBPu4LW', tag: 'bns_survey', name: 'hunter BNS', owner: 'cemogor', instance: 'C. Emogor unpublished data 2022' },  // synced Jan 2023
    // { id: 'aRnpV9xNVcbqLPbmoKn9sR', tag: 'bns_survey', name: 'BNS NDOKI 2022', owner: 'wcs_ndoki', instance: 'SWM Ndoki unpublished data 2022' }, // synced 18 March 2022
    // { id: 'aF9PF9YUE5yBVsUvWUr2pV', tag: 'bns_survey', name: 'BNS_Individual_Niassa_2022', owner: 'wcs_niassa', instance: 'Niassa Special Reserve unpublished data 2022' }, // synced 18 April 2022 
    // { id: 'aDvmfKGNq6H2yhcMTbP5tB', tag: 'bns_survey', name: 'BNS ménage Kahuzi 2022', owner: 'wcs_mtkb', instance: 'Kahuzi Biega National Park unpublished data 2022' }, //resynced August 2022
    // { id: 'aLJLeHSYsN7DCLQmmYJR8w', tag: 'bns_survey', name: 'BNS EPP Poulet 2022', owner: 'wcs_poultry', instance: 'WCS Congo - Environmental Partnership Program, Livelihood diversification and poultry production - unpublished data 2022' }, // Synced Sept 22, 2022
      
      //Prices 2022
    // { id: 'aGBARLZxAd9zYZ37S8DZwj', tag: 'bns_price', name: 'BNS Prices Crossriver 2022', owner: 'wcs_crossriver', instance: 'WCS Cross River unpublished data 2022' }, 
    // { id: 'aBEqtVJto8GjzfgBzJBAis', tag: 'bns_price', name: 'Prix_BNS_Nosy Be_2022', owner: 'wcs_soariake', instance: 'S. Rakotoharimalala, R. Ranaivoson, C. Razafindrakoto, D. Detoeuf, WCS Madagascar 2022'}, 
    // { id: 'aLa2L2dNrkhceAsp2AWD4A', tag: 'bns_price', name: 'Prix_BNS_ABS_2022', owner: 'wcs_antongil', instance: 'S. Rakotoharimalala, R. Ranaivoson, C. Razafindrakoto, D. Detoeuf, WCS Madagascar 2022'}, 
    // { id: 'aSuJPLgRj4vTA8gMmDyKJK', tag: 'bns_price', name: 'Prix_BNS_Ankarea/Ankivony_2022', owner: 'wcs_soariake', instance: 'S. Rakotoharimalala, R. Ranaivoson, C. Razafindrakoto, D. Detoeuf, WCS Madagascar 2022'}, 
    // { id: 'a4pMJRa3jn264kvVSv3vm7', tag: 'bns_price', name: 'Prix_BNS_Soariake_2022', owner: 'wcs_soariake', instance: 'S. Rakotoharimalala, R. Ranaivoson, C. Razafindrakoto, D. Detoeuf, WCS Madagascar 2022' }, 
    // { id: 'aKTbms2Fw6fa2XS3rKMwxv', tag: 'bns_price', name: 'BNS Ndoki Prix 2022', owner: 'wcs_ndoki', instance: 'SWM Ndoki unpublished data 2022' }, // synced 18 March 2022
    //   { id: 'aZgCs6vmSVdDMmYWoW9hfe', tag: 'bns_price', name: 'BNS_Precos_Niassa_2022', owner: 'wcs_niassa', instance: 'Niassa Special Reserve unpublished data 2022' }, // synced 18 April 2022 
    // { id: 'aaCTf3buZnjjQDu9wmyACF', tag: 'bns_price', name: 'BNS Prix Kahuzi 2022', owner: 'wcs_mtkb', instance: 'Kahuzi Biega National Park unpublished data 2022' }, //resynced August 2022 
      
    //   // HH 2021 
    //   { id: 'aEMeCB6j4BfUVDF4FrGuKw', tag: 'bns_survey', name: 'Conso+BNS Bismarck 2021', owner: 'wcs_bismarck', instance: 'WCS Bismarck unpublished data 2021'  }, // synced August 2022
    //   { id: 'aSgFKK6Ufq7a4qXDe5yshg', tag: 'bns_survey', name: 'BNS Ituri : Enquête Ménages 2021', owner: 'wcs_ituri', instance: 'WCS Ituri unpublished data 2021'  }, // synced Feb 24 2022
    //   { id: 'aokQtdTGTnLW6omXRrf4ss', tag: 'bns_survey', name: 'BNS menages Lac Tele 2021', owner: 'wcs_lactele', instance: 'G. Bondeko, O. Mbala, L. Molouagna, R. Silaho. , WCS Lac Télé unpublished data 2021'  }, // synced August 2022
    //   { id: 'aLe9gkcRNXbtNHF6m8tNn8', tag: 'bns_survey', name: 'Socio-economic survey-EU', owner: 'wcs_ug_eu', instance: 'M. Nyago, P. Hatanga, H. Musabende, S. Nampindo, S. Amoko, M. Busiinge, WCS Uganda unpublished data 2021'  }, // synced Feb 24 2022
      // { id: 'aVLz2FxFcw99cv89xNY46K', tag: 'bns_survey', name: 'BNS Makira 2021', owner: 'wcs_mamabaie', instance: 'C. Spira, C. Milina, WCS Madagascar unpublished data 2021' }, // synced Feb 24 2022

      // // Prices 2021
        { id: 'atKMA7EXQWRKYTUVAi3JgZ', tag: 'bns_price', name: 'BNS Price Bismarck 2021', owner: 'wcs_bismarck', instance: 'WCS Bismarck unpublished data 2021'}, // synced August 2023
      // { id: 'arwWLVDnQkJkNV4HtzgmeX', tag: 'bns_price', name: 'BNS Prix Ituri 2021', owner: 'wcs_ituri', instance: 'WCS Ituri unpublished data 2021'}, // synced Feb 24 2022
      // { id: 'aKZCAWsMgUkJDcYKv2Dern', tag: 'bns_price', name: 'BNS Prix Lac Télé 2021', owner: 'wcs_lactele', instance: 'G. Bondeko, O. Mbala, L. Molouagna, R. Silaho. , WCS Lac Télé unpublished data 2021'},//rsynced Feb 24 2022
      // { id: 'aVcvLwLaG9ZCnQ9b7ACc2h', tag: 'bns_price', name: 'Prix Makira 2021', owner: 'wcs_mamabaie', instance: 'C. Spira, C. Milina, WCS Madagascar unpublished data 2021'}, // synced Feb 24 2022

      // //  HH 2020
      // { id: 'ad7S4hPBN7qM4Ac3mpEdwZ', tag: 'bns_survey', name: 'BNS_Nosy Be_2020', owner: 'wcs_soariake', instance: 'S. Rakotoharimalala, R. Ranaivoson, C. Razafindrakoto, D. Detoeuf, C. Spira, WCS Madagascar unpublished data 2020' }, // resynced December 2021
      // { id: 'atyo55YdBdfxzXiaBdrbvr', tag: 'bns_survey', name: 'BNS Ndoki Parc 2020', owner: 'wcs_ndoki', instance: 'Y. Londza & Nouabalé-Ndoki National Park team' }, // resynced December 2021
     // { id: 'ar9wXnLW2sdaamGgJsUrjP', tag: 'bns_survey', name: 'Socio-Eco Uganda 2020', owner: 'wcs_uganda_carbon', instance: 'M. Nyago, H. Musabende & WCS Uganda Carbon team'}, // resynced December 2021
      // { id: 'amD3cUsR4Jurj3ZSUyQdBH', tag: 'bns_survey', name: 'BNS Cross River 2017 - 2020 ', owner: 'wcs_crossriver', instance: 'I. Imong, J. Ntui, O. Okagbare, S. Ova, L. Nkonyu, WCS Nigeria unpublished data 2017-2020'}, // resynced December 2021
      // { id: 'aPH34CUc7zGbzeowRALdTu', tag: 'bns_survey', name: 'Basic Necessity Survey Cross River', owner: 'cemogor', instance: 'C. Emogor unpublished data 2020'}, // Synced Sept 22, 2022
      
      // // Prices 2020
      //   { id: 'aj67aaDZa52oLBFPVGWWwu', tag: 'bns_price', name: 'Prix_BNS_Nosy Be_2020', owner: 'wcs_soariake', instance: 'S. Rakotoharimalala, R. Ranaivoson, C. Razafindrakoto, D. Detoeuf, C. Spira, WCS Madagascar unpublished data 2020' }, // resynced December 2021 
      //   { id: 'aTRKQW2b8TJGxF7DVPfjFv', tag: 'bns_price', name: 'BNS Ndoki Prix 2020', owner: 'wcs_ndoki', instance: 'Y. Londza & Nouabalé-Ndoki National Park team' }, // resynced December 2021

      // HH 2019
      // { id: 'ahz5DN45juUzp7eUfGS5QA', tag: 'bns_survey', name: 'BNS SWM Ndoki 2019', owner: 'wcs_ndoki', instance: 'G. Mavah, B. Avelino, G. Ngohouani, R. Mouanda, F. Mossoula, B. Ngampamou' }, // resynced December 2021
      // { id: 'acK4WZ2ueqk8NvUdwctxz8', tag: 'bns_survey', name: 'BNS_Soariake_2019', owner: 'wcs_soariake', instance: 'S. Rakotoharimalala, R. Ranaivoson, C. Razafindrakoto, D. Detoeuf, C. Spira, WCS Madagascar unpublished data 2019' }, // resynced December 2021
      // { id: 'auPGpyWbn4PhTuWFBfKYES', tag: 'bns_survey', name: 'BNS_ABS_2019_FINAL', owner: 'wcs_antongil', instance: 'S. Rakotoharimalala, R. Ranaivoson, C. Razafindrakoto, D. Detoeuf, C. Spira, WCS Madagascar unpublished data 2019' }, // resynced December 2021
      // { id: 'azepksQ62i8vETEzUfz8jj', tag: 'bns_survey', name: 'BNS_Ankarea/Ankivonjy_2019', owner: 'wcs_soariake', instance: 'S. Rakotoharimalala, R. Ranaivoson, C. Razafindrakoto, D. Detoeuf, C. Spira, WCS Madagascar unpublished data 2019' }, // resynced August 2022
      // { id: 'ahz5DN45juUzp7eUfGS5QA', tag: 'bns_survey', name: 'BNS Ndoki 2019', owner: 'wcs_ndoki', instance: 'G. Mavah, B. Avelino, G. Ngohouani, R. Mouanda, F. Mossoula, B. Ngampamou, WCS Congo unpublished data 2019' }, // resynced December 2021
      // { id: 'aCShrrKNApccvaAPzxzbxK', tag: 'bns_survey', name: 'BNS ménage Kahuzi 2019', owner: 'wcs_mtkb', instance: 'F. Kavuba, A. Twendilonge, R. Cito, WCS RDC unpublished data 2019' }, // resynced December 2021
      // { id: 'arJkDGmkhhCiJ2eYwRcCit', tag: 'bns_survey', name: 'BNS Makira 2019', owner: 'wcs_mamabay', instance: 'C. Spira, N. Dokolahy, J. Ranariniaina, M. Cournarie, L. Andriamampianina,  D. Detoeuf, WCS Madagascar unpublished data 2019' }, // resynced December 2021
      // { id: 'aFQWAYHXXfh8i2cmXw9BFi', tag: 'bns_survey', name: 'BNS Ituri: Enquête Ménages 2019', owner: 'wcs_ituri', instance: 'B. Ntumba, A. Ohole, B. Ikati, T. Muller, WCS RDC unpublished data 2019' }, // resynced December 2021

      // Prices 2019
        // { id: 'aq5r9cKQYBRDT9SBqYanUP', tag: 'bns_price', name: 'BNS SWM Prix Ndoki 2019', owner: 'wcs_ndoki', citation: "G. Mavah, B. Avelino, G. Ngohouani, R. Mouanda, F. Mossoula, B. Ngampamou" }, // resynced January 2022
        // { id: 'aApqbThMPaMJhczK2QKVLD', tag: 'bns_price', name: 'BNS Prix Kahuzi 2019', owner: 'wcs_mtkb', instance: 'F. Kavuba, A. Twendilonge, R. Cito, WCS RDC unpublished data 2019' }, // resynced January 2022
        // { id: 'aJZxvpgS73vJu4NUxTtvwJ', tag: 'bns_price', name: 'Prix_BNS_ABS_2019', owner: 'wcs_antongil', instance: 'S. Rakotoharimalala, R. Ranaivoson, C. Razafindrakoto, D. Detoeuf, C. Spira, WCS Madagascar unpublished data 2019' }, // resynced January 2022
        // { id: 'av3SpGmYTBP9A6dLMbzhZR', tag: 'bns_price', name: 'Prix_BNS_Soariake_2019', owner: 'wcs_soariake', instance: 'S. Rakotoharimalala, R. Ranaivoson, C. Razafindrakoto, D. Detoeuf, C. Spira, WCS Madagascar unpublished data 2019' }, // resynced January 2022
        // { id: 'awAV28ebngN7GTV2nqmyKU', tag: 'bns_price', name: 'Price Makira 2019', owner: 'wcs_mamabaie', instance: 'C. Spira, N. Dokolahy, J. Ranariniaina, M. Cournarie, L. Andriamampianina,  D. Detoeuf, WCS Madagascar unpublished data 2019'  }, // resynced January 2022
        // { id: 'aq5r9cKQYBRDT9SBqYanUP', tag: 'bns_price', name: 'BNS Prix Ndoki 2019', owner: 'wcs_ndoki', instance: 'G. Mavah, B. Avelino, G. Ngohouani, R. Mouanda, F. Mossoula, B. Ngampamou' }, //  resynced January 2022
        // { id: 'awQmCEf63g5KN2G4kcBWrc', tag: 'bns_price', name: 'BNS Prix Ituri 2019', owner: 'wcs_ituri', instance: 'B. Ntumba, A. Ohole, B. Ikati, T. Muller, WCS RDC unpublished data 2019' }, // resynced January 2022
        // { id: 'a2bwTreEbymbWD3JGJ2qXT', tag: 'bns_price', name: 'Prix_BNS_Ankarea/Ankivony_2019', owner: 'wcs_soariake', instance: 'S. Rakotoharimalala, R. Ranaivoson, C. Razafindrakoto, D. Detoeuf, C. Spira, WCS Madagascar unpublished data 2019' }, // resynced August 2022

      // HH 2018
      //   { id: 'aQbjGLfvPTEUjdTmsdTu46', tag: 'bns_survey', name: 'BNS Ndoki 2018', owner: 'wcs_ndoki', instance: 'Y. Londza, F. Sellat, D. Detoeuf, WCS Congo unpublished data 2018' }, // resynced January 2022

      // // Prices 2018
      //   { id: 'ao52kp6BgLgooE3MRsdy4B', tag: 'bns_price', name: 'BNS Prix Ndoki 2018', owner: 'wcs_ndoki', instance: 'Y. Londza, F. Sellat, D. Detoeuf, WCS Congo unpublished data 2018'  }, //  resynced January 2022

      // HH 2017
        // { id: 'aEypYtcfNGvDtpkSUPXrJN', tag: 'bns_survey', name: 'BNS ménage Kahuzi 2018-2019', owner: 'wcs_mtkb', instance: 'C. Spira, A. Kirkby, F. Kavuba, D. Detoeuf, A. Twendilonge, WCS RDC unpublished data 2017' }, // resynced August 2022
        // { id: 'a9R68Er4oeDx6quZre2DM7', tag: 'bns_survey', name: 'BNS Makira 2017', owner: 'wcs_mamabaie', instance: 'M. Ravelona, WCS Madagascar unpublished data 2017' }, // resynced January 2022
        // { id: 'auqBASwJMLvkqtAJnZ8SXx', tag: 'bns_survey', name: 'BNS Lac Télé 2017', owner: 'wcs_lactele', instance: 'G. Bondeko, N. Loundou, R. Mouanda, R. Mossaba, M. Boboto, D. Detoeuf, WCS Congo unpublished data 2017' }, // resynced January 2022
        // { id: 'a2m5Hp4BoN956CBxfKHdJY', tag: 'bns_survey', name: 'BNS Ituri: Enquête Ménages 2017', owner: 'wcs_ituri', instance: 'M. Enduyi, A. Tsongo, J. Maneno, O. Angauko, A. Ohole, WCS RDC unpublished data 2017'}, // resynced January 2022
        // { id: 'amD3cUsR4Jurj3ZSUyQdBH', tag: 'bns_survey', name: 'BNS Crossriver 2017', owner: 'wcs_crossriver', instance: 'I. Imong, J. Ntui, O. Okagbare, S. Ova, L. Nkonyu, WCS Nigeria unpublished data 2017'}, // resynced January 2022

      // Prices 2017
        // { id: 'aqwNyk7ikXxU9x4u77YfnS', tag: 'bns_price', name: 'Prices Crossriver 2017 ', owner: 'wcs_crossriver', instance: 'I. Imong, J. Ntui, O. Okagbare, S. Ova, L. Nkonyu, WCS Nigeria unpublished data 2017'}, // resynced January 2022
        // { id: 'apMTFWRd9fQWHvpJHLfvk6', tag: 'bns_price', name: 'BNS Prix Lac Télé 2017', owner: 'wcs_lactele' , instance: 'G. Bondeko, N. Loundou, R. Mouanda, R. Mossaba, M. Boboto, D. Detoeuf, WCS Congo unpublished data 2017' }, // resynced January 2022
        // { id: 'aTkDkjcfNN7vQJdZeJHkJq', tag: 'bns_price', name: 'Price Makira 2017', owner: 'wcs_mamabaie', instance: 'M. Ravelona, WCS Madagascar unpublished data 2017' }, // resynced January 2022
        // { id: 'a6BjZ8ncLtTtfBSGZ9PqoJ', tag: 'bns_price', name: 'BNS Prix Ituri 2017', owner: 'wcs_ituri', instance: 'M. Enduyi, A. Tsongo, J. Maneno, O. Angauko, A. Ohole, WCS RDC unpublished data 2017'}, // resynced January 2022

      //NRGT
      //2023
        // { id: 'a33XvMuPQLpeygLURuNUBP', tag: 'nrgt_current', name: 'NRGT SWM 2023', owner: 'wcs_ndoki', instance: 'WCS Congo unpublished data 2023' }, //May 2023
        // { id: 'a8KBiBL44hEpNfkS4RmxeN', tag: 'nrgt_current', name: 'NRGT_Niassa_2023', owner: 'wcs_niassa', instance: 'WCS Niassa unpublished data 2023' }, 
      
      //2022
      //  { id: 'amaXEkoh4eNcKyjjys8jGGc', tag: 'nrgt_current', name: 'NRGT Crossriver 2022', owner: 'wcs_crossriver', instance: 'WCS Cross River unpublished data 2022'}, 
       // { id: 'aXFnVax8EugC22oRJAnWoV', tag: 'nrgt_current', name: 'NRGT Kahuzi 2022', owner: 'wcs_mtkb', instance: 'A. Twendilonge, F. Kavuba, WCS Kahuzi unpublished data 2022' }, // resynced 2nd Nov 2022
       // { id: 'aBfgRPninKvZEtfpMMqchu', tag: 'nrgt_current', name: 'NRGT Ituri 2022', owner: 'wcs_ituri', instance: 'B. Ikati, D. Bilua, S. Ahasa, WCS Ituri unpublished data 2022' }, // synced Oct 2022
     // { id: 'aMBGNEH6BzFVjxSZ2zHegc', tag: 'nrgt_current', name: 'NRGT_Niassa_2022', owner: 'wcs_niassa', instance: 'Niassa Special Reserve unpublished data 2022'}, // synced Sept 21, 2022,
      
      //2021
      //  { id: 'atB3SwmsxjhoYppdTiCxEw', tag: 'nrgt_current', name: 'NRGT Makira 2021', owner: 'wcs_mamabaie', instance:'WCS Madagascar unpublished data 2021'}, // synced Sept 23, 2022

      //2020
      //  { id: 'axSXT4r6TkLxnr3CBggmzg', tag: 'nrgt_current', name: 'NRGT Ndoki 2020', owner: 'wcs_ndoki', instance: 'Y. Londza, WCS Congo unpublished data 2020' }, // synced Sept 07, 2021
      
      //2019
       // { id: 'aZZV4KikgRKz79LqqQR5Ma', tag: 'nrgt_current', name: 'NRGT Ituri 2019', owner: 'wcs_ituri', instance: 'B. Ntumba, A. Ohole, B. Ikati, T. Muller, WCS RDC unpublished data 2019' }, // resynced January 2022
       // { id: 'anAcQ9on4inNnmtqFVpabh', tag: 'nrgt_historical', name: 'NRGT Kahuzi Biega 2019', owner: 'wcs_mtkb', instance:'F. Kavuba, A. Twendilonge, R. Cito, WCS RDC unpublished data 2019'}, // resynced Feb 2022
      //  { id: 'ajDeQVDrz2AZxvxLLWjiBE', tag: 'nrgt_current', name: 'NRGT Makira 2019', owner: 'wcs_mamabaie', instance:'C. Spira, N. Dokolahy, J. Ranariniaina, M. Cournarie, L. Andriamampianina,  D. Detoeuf, WCS Madagascar unpublished data 2019'}, // resynced January 2022

      //2018
      //  { id: 'apFFEwXk38TQ2SCkV99bFY', tag: 'nrgt_historical', name: 'NRGT Kahuzi Biega 2018', owner: 'wcs_mtkb', instance:'' }, // resynced Fec 2022
      // { id: 'aLhFXhkmM4rZJvtqiSjChE', tag: 'nrgt_historical', name: 'NRGT Ndoki 2018', owner: 'wcs_ndoki', instance:'' }, // resynced January 2022
       // { id: 'awR6CQTvEqiL9PYvMic7dE', tag: 'nrgt_historical', name: 'NRGT Bateke 2018', owner: 'wcs_bateke', instance:'' }, // resynced January 2022

      //2017
       // { id: 'apnzrb2RuoKu8Uxy2svwF6', tag: 'nrgt_historical', name: 'NRGT Crossriver 2017', owner: 'wcs_crossriver', instance:'I. Imong, J. Ntui, O. Okagbare, S. Ova, L. Nkonyu, WCS Nigeria unpublished data 2017' }, // resynced Oct 2022
       // { id: 'aeWW3VLbdMDgUHHdoRCUH9', tag: 'nrgt_historical', name: 'NRGT Ituri 2017', owner: 'wcs_ituri', instance:'B. Ntumba, A. Ngomba, A. Walanga, I. Liengola, WCS RDC unpublished data 2017' }, // resynced January 2022
      //  { id: 'aU6gbhMjfHyGekAma8wHhG', tag: 'nrgt_historical', name: 'NRGT Lac Télé 2017', owner: 'wcs_lactele', instance:'G. Bondeko, N. Loundou, R. Mouanda, R. Mossaba, M. Boboto, D. Detoeuf, WCS Congo unpublished data 2017' }, // resynced January 2022
       // { id: 'asRbCJuyX3KJMFkB2p9Hh7', tag: 'nrgt_historical', name: 'NRGT Makira 2017', owner: 'wcs_mamabaie', instance:'N. Dokolahy, M. Ravelona, D. Detoeuf, WCS Madagascar unpublished data 2017' }, // resynced January 2022

    ].map(survey => ({
      formId: survey.id,
      tag: survey.tag,
      name: survey.name,
      owner: survey.owner,
      instance: survey.instance,
      url: `https://kf.kobotoolbox.org/api/v2/assets/${survey.id}/data/?format=json`,
      //* REPLACE L157 w/ the below URL to sync only 1 submision for each form; see "limit=1" *//
      //url: `https://kf.kobotoolbox.org/api/v2/assets/${survey.id}/data/?format=json&limit=1`,
    })),
  };
  console.log(`Fetching data for ${state.data.surveys.length} surveys.`);
  return state;
});

each(dataPath('surveys[*]'), state => {
  const { url, tag, formId, name, instance, owner } = state.data;
  return get(url, {}, state => {
    state.data.submissions = state.data.results.map((submission, i) => {
      return {
        i,
        // Here we append the tags defined above to the Kobo form submission data
        form: tag,
        formName: name,
        formOwner: owner,
        instance: instance,
        body: submission,
      };
    });
    const count = state.data.submissions.length;
    console.log(`Fetched ${count} submissions from ${formId} (${tag || ''}).`);
    //Once we fetch the data, we want to post each individual Kobo survey
    //back to the OpenFn inbox to run through the jobs =========================
    return each(dataPath('submissions[*]'), state => {
      console.log(`Posting ${state.data.i + 1} of ${count}...`);
      return post(state.configuration.openfnInboxUrl, { body: state => state.data })(state);
    })(state);
    // =========================================================================
  })(state);
});

alterState(state => {
  console.log(`Finished at: ${new Date().toISOString()}`);
  return {
    data: {
      message: "No cursor required. Job fetches all submission for given forms."
    },
    references: []
  };
});
