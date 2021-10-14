import { useRouter } from "next/router";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { getAsString } from "../utils/getAsString";
import { MaterialUiLink } from "./MaterialUiLink";

export function CarPagination({ totalPages }: { totalPages: number }) {
  const { query } = useRouter();

  return (
    <Pagination
      page={parseInt(getAsString(query.page) || '1')}
      count={totalPages}
      renderItem={(item) => (
        <PaginationItem
          component={MaterialUiLink}
          query={query}
          item={item}
          {...item}
        />
      )}
    />
  );
}