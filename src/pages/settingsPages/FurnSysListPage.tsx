import React, {FC} from "react"
import {useLoaderData} from "react-router-dom";
import {ISimpleData} from "../../types/types";
import AdminNavBar from "../../components/AdminNavBar";
import SimpleGrid from "../../components/SimpleGrid";

const FurnSysListPage: FC = () => {
  const data = useLoaderData() as ISimpleData[];
  return (
    <>
      <AdminNavBar />

      <SimpleGrid data={data} action={'/furnsyslist'}  />

    </>

  )
}

export default FurnSysListPage;
