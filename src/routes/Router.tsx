import Layout from "@/layouts/Layout";
import { IssueDetail, Issues } from "@/pages/issues";
import { Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Issues />} />
        <Route path="/:issue_number" element={<IssueDetail />} />
      </Route>
    </Routes>
  );
};

export default Router;
