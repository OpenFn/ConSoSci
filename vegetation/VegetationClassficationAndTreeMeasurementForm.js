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
upsert('WCS_Vegetation_VegetationClassficationAndTreeMeasurementForm', 'GeneratedUuid', {
  sbght: dataValue('sbght'),
  sbdbh: dataValue('sbdbh'),
  sght: dataValue('sght'),
  sdbh: dataValue('sdbh'),
  comments: dataValue('comments'),
  out_plot_area: dataValue('out_plot_area'),
  out_plot_radius: dataValue('out_plot_radius'),
  tree_3cm: dataValue('tree_3cm'),
  sbrush_per: dataValue('sbrush_per'),
  shrubyes: dataValue('shrubyes'),
  inner_plot_area: dataValue('inner_plot_area'),
  inner_plot_radius: dataValue('inner_plot_radius'),
  grassyes: dataValue('grassyes'),
  center_plot_area: dataValue('center_plot_area'),
  center_plot_radius: dataValue('center_plot_radius'),
  radius: dataValue('radius'),
  plotClass: dataValue('plotClass'),
  vegClass_same: dataValue('vegClass_same'),
  Cropstatus: dataValue('Cropstatus'),
  Year: dataValue('Year'),
  ddriver: dataValue('ddriver'),
  forest_type: dataValue('forest_type'),
  vegclass: dataValue('vegclass'),
  Ownership: dataValue('Ownership'),
  rzon: dataValue('rzon'),
  cause: dataValue('cause'),
  no.trees: dataValue('no.trees'),
  age: dataValue('age'),
  plot_burnt: dataValue('plot_burnt'),
  fire: dataValue('fire'),
  bareground: dataValue('bareground'),
  seasonality: dataValue('seasonality'),
  erodability: dataValue('erodability'),
  moisture: dataValue('moisture'),
  colour: dataValue('colour'),
  description: dataValue('description'),
  north: dataValue('north'),
  east: dataValue('east'),
  waypoint: dataValue('waypoint'),
  plot_gps: dataValue('plot_gps'),
  plot_number: dataValue('plot_number'),
  transect_no: dataValue('transect_no'),
  name: dataValue('name'),
  district: dataValue('district'),
  drainage: dataValue('drainage'),
  physiography: dataValue('physiography'),
  topography: dataValue('topography'),
  obsevername: dataValue('obsevername'),
  start_time: dataValue('start_time'),
  surveydate: dataValue('surveydate'),
  Payload: state.data.body,
  GeneratedUuid: dataValue('__generatedUuid')
}); 
upsertMany('WCS_Vegetation_VegetationClassficationAndTreeMeasurementForm_StGrassRepeat', 'GeneratedUuid', state => { const dataArray = state.data['st_grass_repeat'] || [];
            return dataArray.map(x => ({
  grass_species: x['st_grass_repeat/grass_species'],
  noknown: x['st_grass_repeat/noknown'],
  grass_perc: x['st_grass_repeat/grass_perc'],
  grass_height: x['st_grass_repeat/grass_height'],
  VegetationClassficationAndTreeMeasurementForm_uuid: x['__parentUuid'],
  Payload: state.data.body,
  GeneratedUuid: x['__generatedUuid']
}))}); 
upsertMany('WCS_Vegetation_VegetationClassficationAndTreeMeasurementForm_BrushRepeat', 'GeneratedUuid', state => { const dataArray = state.data['brush_repeat'] || [];
            return dataArray.map(x => ({
  brus_species: x['brush_repeat/brus_species'],
  brush_perc: x['brush_repeat/brush_perc'],
  VegetationClassficationAndTreeMeasurementForm_uuid: x['__parentUuid'],
  Payload: state.data.body,
  GeneratedUuid: x['__generatedUuid']
}))}); 
upsertMany('WCS_Vegetation_VegetationClassficationAndTreeMeasurementForm_TreeRepeat', 'GeneratedUuid', state => { const dataArray = state.data['tree_repeat'] || [];
            return dataArray.map(x => ({
  shrub_species: x['tree_repeat/shrub_species'],
  Specimen_no: x['tree_repeat/Specimen_no'],
  specimen_photo: x['tree_repeat/specimen_photo'],
  unlisted: x['tree_repeat/unlisted'],
  dbh: x['tree_repeat/dbh'],
  height: x['tree_repeat/height'],
  VegetationClassficationAndTreeMeasurementForm_uuid: x['__parentUuid'],
  Payload: state.data.body,
  GeneratedUuid: x['__generatedUuid']
}))}); 
upsertMany('WCS_Vegetation_VegetationClassficationAndTreeMeasurementForm_Tree10cm', 'GeneratedUuid', state => { const dataArray = state.data['tree_10cm'] || [];
            return dataArray.map(x => ({
  btspecies: x['tree_10cm/btspecies'],
  bspecimenNo: x['tree_10cm/bspecimenNo'],
  bspecimen_photo: x['tree_10cm/bspecimen_photo'],
  bunlisted: x['tree_10cm/bunlisted'],
  bdbh: x['tree_10cm/bdbh'],
  bheight: x['tree_10cm/bheight'],
  VegetationClassficationAndTreeMeasurementForm_uuid: x['__parentUuid'],
  Payload: state.data.body,
  GeneratedUuid: x['__generatedUuid']
}))}); 
