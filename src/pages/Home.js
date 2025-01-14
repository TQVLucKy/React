import { Route, Routes, Link } from "react-router-dom";
import Thu1 from './Thu1';
import LinkList from "../components/Link";
import Slider from "react-slick";
import { Button, Box } from "@mui/material";


export default function Home() {
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
  }
  return (
    <>
     <Box sx={{ marginBottom: 2 }}>
        <LinkList />
        <Link to="/thu1" >
          <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
            Thu 1
          </Button>
        </Link>
      </Box>

      <div style={{ width: 1000, height: 'auto'}}>

        <Slider {...settings}>
          <img src="https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?cs=srgb&dl=pexels-pixabay-206359.jpg&fm=jpg" style={{ height: 300 }} />
          <img src="https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" style={{ height: 300 }} />
          <img src="https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" style={{ height: 300 }} />
          <img src="https://images.pexels.com/photos/640809/pexels-photo-640809.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" style={{ height: 300 }} />
        </Slider>
      </div>
      <Routes>
        <Route path="/thu1" element={<Thu1 />} />
      </Routes>
    </>
  );
}
