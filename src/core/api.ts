import axios from "axios";
// const URL =
//   "/api/everything?filters=%7B%22list%22:%5B%7B%22type%22:21,%22value%22:0%7D,%7B%22type%22:6,%22value%22:-30000%7D,%7B%22type%22:3,%22value%22:-2925%7D,%7B%22type%22:3,%22value%22:-28%7D,%7B%22type%22:50,%22value%22:0%7D%5D%7D&offset=0-0-0-16&trackingData=110160240&order=1";
const getTaaghcheUrl = (offset?: string) =>
  `https://get.taaghche.com/v2/everything?filters=%7B%22list%22:%5B%7B%22type%22:21,%22value%22:0%7D,%7B%22type%22:6,%22value%22:-30000%7D,%7B%22type%22:3,%22value%22:-2925%7D,%7B%22type%22:3,%22value%22:-28%7D,%7B%22type%22:50,%22value%22:0%7D%5D%7D&offset=${
    offset ?? "0-0-0-16"
  }&trackingData=110160240&order=1`;
export const getBooks = (offset?: string) => {
  return axios(getTaaghcheUrl(offset), {
    method: "get",
    withCredentials: false,
  });
};
