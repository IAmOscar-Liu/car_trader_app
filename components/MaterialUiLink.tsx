import { PaginationRenderItemParams } from "@material-ui/lab";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import React, { forwardRef } from "react";

interface Props {
  item: PaginationRenderItemParams;
  query: ParsedUrlQuery;
}

export const MaterialUiLink = forwardRef<HTMLAnchorElement, Props>(
  ({ item, query, ...props }, ref) => (
    <Link
      href={{
        pathname: "/cars",
        query: { ...query, page: item.page },
      }}
      shallow
    >
      <a {...props} ref={ref}></a>
    </Link>
  )
);
