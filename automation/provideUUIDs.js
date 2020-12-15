const submissionData = {
  _id: '5fa139894d4dc0c51e3dedeb',
  name: 'Victoria Holder',
  gender: 'female',
  email: 'victoriaholder@geekko.com',
  friends: [
    {
      name: 'Solis Guerra',
      pets: [
        {
          type: 'cat',
          name: 'Jessie Finley',
        },
        {
          type: 'cat',
          name: 'Delgado Larsen',
        },
        {
          type: 'cat',
          name: 'Ida Stuart',
        },
      ],
    },
    {
      name: 'Howell Bartlett',
      pets: [
        {
          type: 'cat',
          name: 'Potter Kline',
        },
        {
          type: 'cat',
          name: 'Fernandez Torres',
        },
        {
          type: 'cat',
          name: 'Contreras Charles',
        },
      ],
    },
    {
      name: 'Cora Gibbs',
      pets: [
        {
          type: 'cat',
          name: 'Ladonna Battle',
        },
        {
          type: 'cat',
          name: 'House Graves',
        },
        {
          type: 'cat',
          name: 'Hayes Sanford',
        },
      ],
    },
  ],
};

function addUUIDs(object, key, initialUuid) {
  if (initialUuid) {
    object[key] = initialUuid;
  }

  for (const property in object) {
    if (Array.isArray(object[property])) {
      object[property].forEach((thing, i, arr) => {
        thing[key] = `${object[key]}-${i}`;
        for (const property in thing) {
          if (Array.isArray(thing[property])) {
            addUUIDs(thing, key);
          }
        }
      });
    }
  }
}

addUUIDs(submissionData, '__newUuid', 'parent1');
console.log(JSON.stringify(submissionData, null, 2));
