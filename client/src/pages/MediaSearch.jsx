import {
  Box,
  Stack,
  TextField,
  Toolbar,
  MenuItem,
  FormControl,
} from "@mui/material";
import { useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import mediaApi from "../api/modules/media.api";
import MediaGrid from "../components/common/MediaGrid";
import uiConfigs from "../configs/ui.configs";
import Select from "@mui/material/Select";
import Pagination from "@mui/material/Pagination";
import { useSearchParams } from "react-router-dom";

const MediaSearch = () => {
  const [data, setData] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = useMemo(() => {
    return {
      page: searchParams.get("page") ? searchParams.get("page") : 1,
      type: searchParams.get("type") ? searchParams.get("type") : "name",
      query: searchParams.get("query") ? searchParams.get("query") : "",
    };
  }, [searchParams]);
  const handleChangeType = (event) => {
    searchParams.set("type", event.target.value);
    searchParams.delete("page");
    setSearchParams(searchParams);
  };

  useEffect(() => {
    const search = async (param) => {
      try {
        const { response } = await mediaApi.search(param);
        setData(response);
      } catch (err) {
        toast.error(err.message);
        setData(null);
      }
    };
    search(filter);
  }, [filter]);

  const media = useMemo(() => {
    return {
      list: data ? data.data : [],
      count: data ? data.count : 0,
    };
  }, [data]);

  const onQueryChange = (e) => {
    if (e.target.value) searchParams.set("query", e.target.value);
    else searchParams.delete("query");
    searchParams.delete("page");
    setSearchParams(searchParams);
  };
  const handleChangePage = (event, value) => {
    if (value !== 1) {
      searchParams.set("page", value);
    } else searchParams.delete("page");
    setSearchParams(searchParams);
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
                value={filter.type}
                onChange={handleChangeType}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value={"name"}>Name</MenuItem>
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

          <MediaGrid medias={media.list} mediaType={"game"} />

          {media.count > 20 && (
            <Stack
              spacing={2}
              sx={{
                display: "flex",
                flexWrap: "nowrap",
                alignItems: "center",
              }}
            >
              <Pagination
                count={media.count > 10000 ? 500 : Math.ceil(media.count / 20)}
                shape="rounded"
                page={Number(filter.page)}
                onChange={handleChangePage}
              />
            </Stack>
          )}
        </Stack>
      </Box>
    </>
  );
};

export default MediaSearch;
