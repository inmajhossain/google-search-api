import axios from "axios";
import { useState } from "react";

export default function useFetch() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  //https://developers.google.com/custom-search/v1/overview (For API KEY)
  // const API = import.meta.env.VITE_API_KEY;
  const API = `AIzaSyDlOmonTC6Lo29OUCIkw49UcwMbxIlh74U`;
  //Ei link bosale website a auto google search add hoye jabe
  //https://programmablesearchengine.google.com/controlpanel/create/congrats?cx=92cec02f0f3f247be
  {
    /* <script async src="https://cse.google.com/cse.js?cx=92cec02f0f3f247be">
</script>
<div class="gcse-search"></div> */
  }
  //   const searchTerm = "react js";
  const searchID = `92cec02f0f3f247be`;

  const getResults = async (query, start = 1) => {
    const BASE_URL = `https://www.googleapis.com/customsearch/v1?key=${API}&q=${query}&num=5&cx=${searchID}`;
    try {
      setError(null);
      setLoading(true);
      const response = await axios.get(BASE_URL);
      if (start === 1) {
        setResults(response.data.items || []);
      } else {
        setResults((prev) => [...prev, ...(response.data.items || [])]);
      }
      console.log(response.data);
      console.log(response.data.items);
    } catch (err) {
      console.log(err);
      setError(err.message);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return [results, loading, error, getResults];
}
