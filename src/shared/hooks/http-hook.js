import { useCallback, useRef, useState } from "react";
import { useEffectOnce } from "./useEffectOnce-hook";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const activeHttpRequest = useRef([]);

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);
      const httpAbortCtrl = new AbortController();

      activeHttpRequest.current.push(httpAbortCtrl);

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal,
        });

        const responseData = await response.json();

        // after every request we want to make sure that we remove the current abort controller
        activeHttpRequest.current = activeHttpRequest.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        );

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        return responseData;
      } catch (error) {
        setError(error.message);
        setIsLoading(false);

        throw error;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  useEffectOnce(() => {
    return () => {
      activeHttpRequest.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  });

  /**
   * In React 18, the useEffect with no dependencies is mounted twice. So the components is being unmounted
   * when it is not supposed to be unmounted
   *
   *
   * SO A TEMPORARY SOLUTION FOR THIS IS TO USE A CUSTOM useEffectOnce HOOK
   * 
   * */

  // useEffect(() => {
  //   /**
  //    * this function will be executed as a CLEANUP function
  //    * before the useEffect is EXECUTED AGAIN or when the component
  //    * that uses the useEffect UNMOUNTS
  //    */
  //   return () => {
  //     // activeHttpRequest.current.forEach((abortCtrl) => abortCtrl.abort());
  //     console.log("component unmounted")
  //   };
  // }, []);

  return { isLoading, error, sendRequest, clearError };
};
