import httpService from "./http.service";

const bookEndpoint = "book/";

const bookService = {
  get: async () => {
    const { data } = await httpService.get(bookEndpoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.put(bookEndpoint + payload._id, payload);
    return data;
  }
};
export default bookService;
