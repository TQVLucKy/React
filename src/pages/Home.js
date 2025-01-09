import { Route, Routes, Link } from "react-router-dom";
import Thu1 from './Thu1';
import LinkList from "../components/Link";

export default function Home() {
  return (
    <>
      <LinkList />
      <h1>HomePage nè</h1>
      
      <nav style={{marginTop:'30px'}}>
        <Link to="/thu1">Thu 1</Link> 
      </nav>
      
      <Routes>
        <Route path="/thu1" element={<Thu1 />} />
      </Routes>
    </>
  );
}
