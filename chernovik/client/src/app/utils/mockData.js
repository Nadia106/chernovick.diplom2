import { useEffect, useState } from "react";
import genre from "../D.MockData/genre.json";
import book from "../D.MockData/book.json";
import user from "../D.MockData/user.json";
import httpService from "../services/http.service";

const useMockData = () => {
  const statusConsts = {
    idle: "Not Started",
    pending: "In Process",
    successed: "Ready",
    error: "Error occurred"
  };
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(statusConsts.idle);
  const [progress, setProgress] = useState(0);
  const [count, setCount] = useState(0);
  const summaryCount = genre.length + book.length + user.length;
  const incrementCount = () => {
    setCount((prevState) => prevState + 1);
  };
  const updateProgress = () => {
    if (count !== 0 && status === statusConsts.idle) {
      setStatus(statusConsts.pending);
    }
    const newProgress = Math.floor((count / summaryCount) * 100);
    if (progress < newProgress) {
      setProgress(() => newProgress);
    }
    if (newProgress === 100) {
      setStatus(statusConsts.successed);
    }
  };

  useEffect(() => {
    updateProgress();
  }, [count]);

  async function initialize() {
    try {
      for (const b of book) {
        await httpService.put("book/" + b._id, b);
        incrementCount();
      }
      for (const u of user) {
        await httpService.put("user/" + u._id, u);
        incrementCount();
      }
      for (const g of genre) {
        await httpService.put("genre/" + g._id, g);
        incrementCount();
      }
    } catch (error) {
      setError(error);
      setStatus(statusConsts.error);
    }
  }

  return { error, initialize, progress, status };
};

export default useMockData;
