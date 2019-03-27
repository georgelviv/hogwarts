async function usersCountQuery(userModel) {
  let total;
  try {
    total = await userModel.count();
    console.log(total);
  } catch (e) {
    console.log('Error to count users', e);
    throw e;
  }

  return total;
}

module.exports = usersCountQuery;
