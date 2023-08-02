import { LoadingButton } from "@mui/lab";
import {
  Box,
  Stack,
  TextField,
  Toolbar,
  MenuItem,
  FormControl,
} from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import mediaApi from "../api/modules/media.api";
import MediaGrid from "../components/common/MediaGrid";
import uiConfigs from "../configs/ui.configs";
import Select from "@mui/material/Select";
const mediaTypes = ["movie", "tv", "people"];
let timer;
const timeout = 500;

const MediaSearch = () => {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("Name");
  const [onSearch, setOnSearch] = useState(false);
  const [mediaType, setMediaType] = useState(mediaTypes[0]);
  const [medias, setMedias] = useState([]);
  const [page, setPage] = useState(1);
  const [listShow, setListShow] = useState([]);

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const search = useCallback(async () => {
    setOnSearch(true);
    const { response, err } = await mediaApi.search({ type, query });

    setOnSearch(false);

    if (err) toast.error(err.message);
    if (response) {
      setListShow(response.slice(0, 8));
      setMedias(response);
      // if (page > 1) setMedias((m) => [...m, ...response.results]);
      // else setMedias([...response.results]);
    }
  }, [mediaType, query, type, page]);

  useEffect(() => {
    if (query.trim().length === 0) {
      setMedias([]);
      setPage(1);
    } else search();
  }, [search, query, type, page]);

  useEffect(() => {
    setListShow(medias.slice(0, page * 8));
  }, [page, listShow]);

  const onQueryChange = (e) => {
    const newQuery = e.target.value;
    clearTimeout(timer);

    timer = setTimeout(() => {
      setQuery(newQuery);
    }, timeout);
  };

  return (
    <>
      <Toolbar />
      <Box
        sx={{
          ...uiConfigs.style.mainContent,
          display: "flex",
          flexWrap: "nowrap",
          alignItems: "center",
        }}
      >
        <Stack spacing={2} sx={{ width: 1 }}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "nowrap",
              alignItems: "center",
            }}
          >
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                value={type}
                onChange={handleChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value={"search"}>Name</MenuItem>
                <MenuItem value={"developers"}>Developers</MenuItem>
                <MenuItem value={"platforms"}>Platforms</MenuItem>
                <MenuItem value={"publishers"}>Publishers</MenuItem>
                <MenuItem value={"genres"}>Genres</MenuItem>
              </Select>
            </FormControl>
            <TextField
              color="success"
              placeholder="Search GameFlix"
              sx={{ width: "100%" }}
              autoFocus
              onChange={onQueryChange}
            />
          </Box>

          <MediaGrid medias={listShow} mediaType={mediaType} />

          {listShow.length < medias.length && (
            <LoadingButton loading={onSearch} onClick={() => setPage(page + 1)}>
              load more
            </LoadingButton>
          )}
        </Stack>
      </Box>
    </>
  );
};

export default MediaSearch;
