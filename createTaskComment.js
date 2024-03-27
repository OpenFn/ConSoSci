fn(s => {
  const taskIds = Object.keys(s.data).filter(i => i !== 'headers' && i !== '');
  const getStories = taskId => {
    return s.data[taskId]
      .filter(i => i !== 'headers')
      .map(story => ({
        text: story.comment,
        // html_text: `<body>${story.comment}</body>`,
        is_pinned: false,
        // sticker_name: 'dancing_unicorn',
      }));
  };

  // Array of objects representing tasks with their respective stories
  s.tasksWithStories = taskIds.map(task => {
    return {
      taskId: task,
      stories: getStories(task),
    };
  });

  //   console.log(s.tasksWithStories);

  return s;
});

each('$.tasksWithStories[*]', async state => {
  const { taskId, stories } = state.data;
  for (const story of stories) {
    await createStoryForTask(taskId, { story })(state);
  }
  return state;
});

each('$.tasksWithStories[*]', async state => {
  const { taskId, stories } = state.data;
  for (const story of stories) {
    await sendRequest(`tasks/${taskId}/stories`, {
      query: { opt_fields: [] },
      body: {
        data: story,
      },
    })(state);
  }
  return state;
});
