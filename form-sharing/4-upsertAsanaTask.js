

fn(state => {
    console.log(state.filteredKoboFormsData);
    return state
})

upsertTask("1198901998266253", {
    externalId: "name",
    data: {
      name: "test",
      approval_status: "pending",
      projects: ["1203181218738601"],
      assignee: "1203181218738601",
    },
  });