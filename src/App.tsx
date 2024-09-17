import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useState } from "react";

interface Radio {
	name: string;
	stationuuid: string;
}

async function getData() {
	try {
		const response = await fetch(
			"http://all.api.radio-browser.info/json/stations/bystate/ohio"
		);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
	}
}

function App() {
	const [open, setOpen] = useState(false);
	const [options, setOptions] = useState<readonly Radio[]>([]);
	const [loading, setLoading] = useState(false);

	const handleOpen = async () => {
		setLoading(true);
		const radioStations = await getData();
		setOptions([...radioStations]);
		setOpen(true);
		setLoading(false);
	};

	const handleClose = () => {
		setOpen(false);
		setOptions([]);
	};

	return (
		<div className="" style={{ padding: "4rem" }}>
			<Autocomplete
				sx={{ width: 300 }}
				open={open}
				onOpen={handleOpen}
				onClose={handleClose}
				isOptionEqualToValue={(option, value) => option.name === value.name}
				getOptionLabel={(option) => option.name}
				options={options}
				loading={loading}
				renderOption={(props, option) => {
					return (
						<li {...props} key={option.stationuuid}>
							{option.name}
						</li>
					);
				}}
				renderInput={(props) => {
					return (
						<TextField
							{...props}
							label="Select One"
							slotProps={{
								input: {
									...props.InputProps,
									endAdornment: (
										<>
											{loading ? (
												<CircularProgress color="inherit" size={20} />
											) : null}
											{props.InputProps.endAdornment}
										</>
									),
								},
							}}
						/>
					);
				}}
			/>
		</div>
	);
}

export default App;
