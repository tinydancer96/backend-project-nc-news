exports.getRoot = async (request, response, next) => {
  try {
    const rootResponse = response.status(200).send();
    return rootResponse;
  } catch (error) {
    next(error);
  }
};
