import React, {FC, useState } from "react"
import AddIcon from '@mui/icons-material/Add';
import { axiosInstance } from "../../../api/axios.api";
import {  Button, FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import { SelectChangeEvent } from '@mui/material/Select';
import { IFilterParam, ISimpleData, IWinTypeList } from "../../../types/types";

export interface IPriceListFilterProps {
  // id: number;
  handleFilterClick: (value: IFilterParam) => void;
}

export default function PriceListFilterPanel(props: IPriceListFilterProps) {
  const { handleFilterClick } = props;
  
	const [winTypeId, setWinTypeId] = useState<number>(0);
	const [profSysId, setProfSysId] = useState<number>(0);
	const [furnSysId, setFurnSysId] = useState<number>(0);
	const [glassId, setGlassId] = useState<number>(0);
	
	const [winTypeList, setWinTypeList] = React.useState<IWinTypeList[]>([]);
	const [profSysList, setProfSysList] = React.useState<ISimpleData[]>([]);
	const [furnSysList, setFurnSysList] = React.useState<ISimpleData[]>([]);
	const [glassList, setGlassList] = React.useState<ISimpleData[]>([]);

	function handleClick() {
		const value: IFilterParam = {
			furnSysId: furnSysId,
			glassId: glassId,
			proSysId: profSysId,
			winTypeId: winTypeId
		}; 
		
		handleFilterClick(value);
	}

  React.useEffect(() => {
		const fetchProf = async () => {
			const { data } = await axiosInstance.get<ISimpleData[]>('proflist');

			if (data !== undefined) {
				setProfSysList(data)
			}
		}

		const fetchFurn = async () => {
			const { data } = await axiosInstance.get<ISimpleData[]>('furnlist');

			if (data !== undefined) {
				setFurnSysList(data)
			}
		}

		const fetchGlass = async () => {
			const { data } = await axiosInstance.get<ISimpleData[]>('glasslist');

			if (data !== undefined) {
				setGlassList(data)
			}
		}

		const fetchWinType = async () => {
			const { data } = await axiosInstance.get<IWinTypeList[]>('wintype');

			if (data !== undefined) {
				setWinTypeList(data)
			}
		}

		fetchProf();
		fetchFurn();
		fetchGlass();
		fetchWinType();

	}, []);


	return (
    <div>
			<FormControl sx={{ m: 1, minWidth: 220 }} size="small">
				<InputLabel id="demo-select-small-label">Тип окна</InputLabel>
				<Select
					labelId="demo-select-small-label"
					id="demo-select-small"
					value={winTypeId}
					label="winType"
					onChange={ (event) => setWinTypeId(Number(event.target.value)) }
				>
					<MenuItem value={0}>
						<em>None</em>
					</MenuItem>
					{winTypeList.map((item, idx) => (
						<MenuItem key={item.id} value={item.id}>
							<img src={`${process.env.REACT_APP_IMAGE_URL}/${item.image}`} width="100px" height="100px" alt="Эскиз окна"/>
						</MenuItem>

					))}
				</Select>
			</FormControl>

			<FormControl sx={{ m: 1, minWidth: 220 }} size="small">
				<InputLabel id="demo-select-small-label">Профиль</InputLabel>
				<Select
					labelId="demo-select-small-label"
					id="demo-select-small"
					value={profSysId}
					label="profSys"
					onChange={ (event) =>setProfSysId(Number(event.target.value)) }
				>
					<MenuItem value={0}>
						<em>None</em>
					</MenuItem>
					{profSysList.map((item, idx) => (
						<MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>

					))}
				</Select>
			</FormControl>

			<FormControl sx={{ m: 1, minWidth: 220 }} size="small">
				<InputLabel id="demo-select-small-label">Фурнитура</InputLabel>
				<Select
					labelId="demo-select-small-label"
					id="demo-select-small"
					value={furnSysId}
					label="furnSys"
					onChange={ (event) => setFurnSysId(Number(event.target.value)) }
				>
					<MenuItem value={0}>
						<em>None</em>
					</MenuItem>
					{furnSysList.map((item, idx) => (
						<MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>

					))}
				</Select>
			</FormControl>

			<FormControl sx={{ m: 1, minWidth: 220 }} size="small">
				<InputLabel id="demo-select-small-label">Стеклопакет</InputLabel>
				<Select
					labelId="demo-select-small-label"
					id="demo-select-small"
					value={glassId}
					label="glass"
					onChange={ (event) => setGlassId(Number(event.target.value)) }
				>
					<MenuItem value={0}>
						<em>None</em>
					</MenuItem>
					{glassList.map((item, idx) => (
						<MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>

					))}
				</Select>
			</FormControl>

			<Button color="primary"  onClick={handleClick}>
				Показать
			</Button>
		</div>

	)
}