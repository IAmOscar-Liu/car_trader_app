import { Grid } from "@material-ui/core";
import deepEqual from "fast-deep-equal";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { stringify } from "querystring";
import React, { useState } from "react";
import useSWR from "swr";
import { CarModel } from "../api/car";
import { Make } from "../api/Make";
import { Model } from "../api/Model";
import { CarCard } from "../components/CarCard";
import { CarPagination } from "../components/CarPagination";
import { Search } from "../components/Search";
import { getMakes } from "../database/getMakes";
import { getModels } from "../database/getModels";
import { getPaginatedCars } from "../database/getPaginatedCars";
import { getAsString } from "../utils/getAsString";

interface Props {
  makes: Make[];
  models: Model[];
  cars: CarModel[];
  totalPages: number;
}

const cars: React.FC<Props> = ({ makes, models, cars, totalPages }) => {
  const { query } = useRouter();
  const [serverQuery] = useState(query);
  console.log("serverQuery: ", serverQuery, " query: ", query);
  const { data } = useSWR("/api/cars?" + stringify(query), {
    dedupingInterval: 15000,
    initialData: deepEqual(query, serverQuery)
      ? { cars, totalPages }
      : undefined,
  });
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={5} md={3} lg={2}>
        <Search singleColumn makes={makes} models={models} />
      </Grid>
      <Grid container item xs={12} sm={7} md={9} lg={10} spacing={3}>
        <Grid item xs={12}>
          <CarPagination totalPages={data?.totalPages} />
        </Grid>
        {(data?.cars || []).map((car) => (
          <Grid key={car.id} item xs={12} sm={6}>
            <CarCard car={car} />
          </Grid>
        ))}
        <Grid item xs={12}>
          <CarPagination totalPages={data?.totalPages} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const make = getAsString(ctx.query.make);

  const [makes, models, pagination] = await Promise.all([
    getMakes(),
    getModels(make),
    getPaginatedCars(ctx.query),
  ]);

  return {
    props: {
      makes,
      models,
      cars: pagination.cars,
      totalPages: pagination.totalPages,
    },
  };
};

export default cars;
