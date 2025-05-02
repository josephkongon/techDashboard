import { useQuery } from "react-query";
import { BASE_QUERY_OPTIONS } from "@/types/constand.ts";
import { getContactUs } from "@/service/api/contactUs.ts";

const useContactUs = () => {
  const {
    isLoading,
    refetch,
    isFetching,
    data: resData,
  } = useQuery(["get-contact-use"], async () => getContactUs(), {
    ...BASE_QUERY_OPTIONS,
  });

  return {
    refetch,
    isFetching,
    data: resData,
  };
};

export default useContactUs;
