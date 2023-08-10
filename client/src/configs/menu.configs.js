import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SlideshowOutlinedIcon from "@mui/icons-material/SlideshowOutlined";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";

const main = [
  {
    display: "games",
    path: "/",
    icon: <SportsEsportsIcon />,
  },

  {
    display: "search",
    path: "/search",
    icon: <SearchOutlinedIcon />,
  },
];

const menuConfigs = { main };

export default menuConfigs;
