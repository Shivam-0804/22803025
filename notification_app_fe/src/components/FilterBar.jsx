import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

function FilterBar({ filterType, setFilterType, sortType, setSortType }) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        marginBottom: 3,
        flexWrap: "wrap",
      }}
    >
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel>Type</InputLabel>

        <Select
          value={filterType}
          label="Type"
          onChange={(e) => setFilterType(e.target.value)}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="social">Social</MenuItem>
          <MenuItem value="promotion">Promotion</MenuItem>
          <MenuItem value="updates">Updates</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel>Sort</InputLabel>

        <Select
          value={sortType}
          label="Sort"
          onChange={(e) => setSortType(e.target.value)}
        >
          <MenuItem value="latest">Latest</MenuItem>
          <MenuItem value="oldest">Oldest</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default FilterBar;
