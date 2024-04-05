each(
  '$.filteredKoboFormData[*]',
  upsertTask('1198901998266253', state => {
    return {
      externalId: 'name',
      data: {
        name: state.filteredKoboFormData.name,
        approval_status: 'pending',
        projects: ['1203181218738601'],
        assignee: '1203181218738601',
      },
    };
  })
);
