import { GetServerSideProps } from "next";
import { SearchProps } from "../api/SearchProps";
import { Search } from "../components/Search";
import { getMakes } from "../database/getMakes";
import { getModels } from "../database/getModels";
import { getAsString } from "../utils/getAsString";

const Home = ({ makes, models, singleColumn }: SearchProps) => (
  <Search singleColumn={singleColumn} makes={makes} models={models} />
);

export const getServerSideProps: GetServerSideProps<SearchProps> = async (
  ctx
) => {
  const make = getAsString(ctx.query.make);

  const [makes, models] = await Promise.all([getMakes(), getModels(make)]);

  return { props: { makes, models } };
};

export default Home;
