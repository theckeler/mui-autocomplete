import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import * as React from "react";

interface Radio {
	name: string;
}

function sleep(duration: number): Promise<void> {
	return new Promise<void>((resolve) => {
		setTimeout(() => {
			resolve();
		}, duration);
	});
}

async function getData() {
	try {
		const response = await fetch(
			"http://all.api.radio-browser.info/json/stations/bystate/ohio"
		);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error.message);
	}
}

// const radioStations = await fetch(
// 	"http://all.api.radio-browser.info/json/stations/bystate/ohio"
// );

const radioStations = await getData();

function App() {
	const [open, setOpen] = React.useState(false);
	const [options, setOptions] = React.useState<readonly Radio[]>([]);
	const [loading, setLoading] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
		(async () => {
			setLoading(true);
			await sleep(1e3); // For demo purposes.
			setLoading(false);
			setOptions([...radioStations]);
		})();
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
				renderInput={(params) => (
					<TextField
						{...params}
						label="Mike couldnt figure this out"
						slotProps={{
							input: {
								...params.InputProps,
								endAdornment: (
									<React.Fragment>
										{loading ? (
											<CircularProgress color="inherit" size={20} />
										) : null}
										{params.InputProps.endAdornment}
									</React.Fragment>
								),
							},
						}}
					/>
				)}
			/>
		</div>
	);
}

export default App;
