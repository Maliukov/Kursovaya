import React, {FC} from "react"
import {useLoaderData} from "react-router-dom";
import {ISimpleData} from "../../types/types";
import AdminNavBar from "../../components/AdminNavBar";
import SimpleGrid from "../../components/SimpleGrid";

const GlassListPage: FC = () => {
  const data = useLoaderData() as ISimpleData[];
  return (
    <>
      <AdminNavBar />

      <SimpleGrid data={data} action={'/glasslist'}  />

    </>

  )
}

export default GlassListPage;
