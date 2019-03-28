const { Op } = require('sequelize');

async function userFindQuery(userModel, {
  limit = 10,
  offset = 0,
  firstName,
  lastName,
  nameLike
}) {
  let userCollection;
  const params = {
    limit: Number(limit),
    offset: Number(offset)
  };

  if (nameLike) {
    params.where = {
      ...params.where,
      firstName: {
        [Op.substring]: nameLike
      }
    };
  }

  if (firstName) {
    params.where = {
      ...params.where,
      firstName
    };
  }

  if (lastName) {
    params.where = {
      ...params.where,
      lastName
    };
  }

  try {
    userCollection = await userModel.findAndCountAll(params);
  } catch (e) {
    console.log('Error to find users', e);
    throw e;
  }

  return userCollection;
}

module.exports = userFindQuery;
