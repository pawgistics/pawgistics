/* eslint-disable dot-notation */

/*
  A development only scrip to populate the database with some sample data in each
  of the tables.
*/

export default (models) => {
  (async () => {
    const User = models.user;
    const Litter = models.litter;
    const Dog = models.dog;
    const FosterGroup = models.foster_group;

    // eslint-disable-next-line compat/compat
    const fosterGroups = (await Promise.all([
      1,
    ].map(id => FosterGroup.findOrCreate({
      where: {
        id,
      },
    })))).reduce((map, fosterGroup) => {
      // eslint-disable-next-line no-param-reassign
      [map[fosterGroup[0].id]] = fosterGroup;
      return map;
    }, {});

    // eslint-disable-next-line no-console
    console.log(`Created foster groups: ${Object.keys(fosterGroups).join(', ')}`);

    // eslint-disable-next-line compat/compat
    const users = (await Promise.all([
      {
        email: 'admin@pawgistics.com',
        password: 'password',
        admin: true,
        first_name: 'John',
        last_name: 'Doe',
        phone_number: '123-456-7890',
        foster_group: null,
      },
      {
        email: 'volunteer@pawgistics.com',
        password: 'password',
        admin: false,
        first_name: 'Jane',
        last_name: 'Doe',
        phone_number: '123-456-7890',
        foster_group: fosterGroups[1],
      },
    ].map(user => User.findOrCreate({
      where: {
        email: user.email,
      },
      defaults: {
        password: user.password,
        admin: user.admin,
        first_name: user.first_name,
        last_name: user.last_name,
        phone_number: user.phone_number,
        foster_group_id: user.foster_group ? user.foster_group.id : null,
      },
    })))).reduce((map, user) => {
      // eslint-disable-next-line no-param-reassign
      [map[user[0].email]] = user;
      return map;
    }, {});

    // eslint-disable-next-line compat/compat
    const litters = (await Promise.all([
      'Star Wars',
      'DBZ',
    ].map(name => Litter.findOrCreate({
      where: {
        name,
      },
    })))).reduce((map, litter) => {
      // eslint-disable-next-line no-param-reassign
      [map[litter[0].name]] = litter;
      return map;
    }, {});

    // eslint-disable-next-line no-console
    console.log(`Created litters: ${Object.keys(litters).join(', ')}`);

    // eslint-disable-next-line compat/compat
    const dogs = (await Promise.all([
      {
        chip: 123456789,
        name: 'Goku',
        litter: litters['DBZ'],
        instructor: users['admin@pawgistics.com'],
        foster_group: null,
        color: 'blue',
        shape: 'circle',
        gender: 'M',
        uri: 'https://s3.amazonaws.com/canine-assistants-assets/dogs/o9jaFsXt.jpg',
        dob: new Date(),
      },
      {
        chip: 123456790,
        name: 'Luke',
        litter: litters['Star Wars'],
        instructor: users['admin@pawgistics.com'],
        foster_group: fosterGroups[1],
        color: 'red',
        shape: 'triangle',
        gender: 'M',
        uri: 'https://s3.amazonaws.com/canine-assistants-assets/dogs/o9jaFsXt.jpg',
        dob: new Date(),
      },
      {
        chip: 123456791,
        name: 'Bulma',
        litter: litters['DBZ'],
        instructor: users['admin@pawgistics.com'],
        foster_group: fosterGroups[1],
        color: 'orange',
        shape: 'circle',
        gender: 'F',
        uri: 'https://s3.amazonaws.com/canine-assistants-assets/dogs/o9jaFsXt.jpg',
        dob: new Date(),
      },
    ].map(dog => Dog.findOrCreate({
      where: {
        chip: dog.chip,
      },
      defaults: {
        name: dog.name,
        litter_id: dog.litter.id,
        instructor_id: dog.instructor.id,
        foster_group_id: dog.foster_group ? dog.foster_group.id : null,
        color: dog.color,
        shape: dog.shape,
        gender: dog.gender,
        uri: dog.uri,
        dob: dog.dob,
      },
    })))).reduce((map, dog) => {
      // eslint-disable-next-line no-param-reassign
      [map[dog[0].name]] = dog;
      return map;
    }, {});

    // eslint-disable-next-line no-console
    console.log(`Created dogs: ${Object.keys(dogs).join(', ')}`);
  })().catch((err) => {
    // eslint-disable-next-line no-console
    console.log(err);
  });
};
