import httpService from "./http.service";

const genreEndpoint = "genre/";

const genresService = {
  fetchAll: async () => {
    const { data } = await httpService.get(genreEndpoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.put(
      genreEndpoint + payload._id,
      payload
    );
    return data;
  }
};

export default genresService;
