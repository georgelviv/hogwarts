async function usersClearQuery(userModel) {
  try {
    await userModel.destroy({
      where: {},
      truncate: true
    });
  } catch (e) {
    console.log('Error to clear user collection', e);
    throw e;
  }

  return true;
}

module.exports = usersClearQuery;
