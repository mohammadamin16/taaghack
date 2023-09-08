import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ApiResponse } from "../core/types";
import { getBooks } from "../core/api";

export const useTaaghche = () => {
  const [data, setData] = useState<ApiResponse | undefined>();
  const [loading, setLoading] = useState(false);

  const offlineHandler = () => {
    toast.error("You went offline!");
  };
  useEffect(() => {
    if (!navigator.onLine) {
      toast.error("You Are Offline!");
    }

    setLoading(true);

    getBooks()
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Something went wrong!");
      });
    window.addEventListener("offline", offlineHandler);
    return () => {
      window.removeEventListener("offline", offlineHandler);
    };
  }, []);
  return { loading, data };
};
