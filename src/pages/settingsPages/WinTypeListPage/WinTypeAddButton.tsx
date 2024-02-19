import React, {FC, useState } from "react"
import AddIcon from '@mui/icons-material/Add';
import {  Button } from "@mui/material";
import WinTypeDialogForm from "./WinTypeDialogForm";

const WinTypeAddButton: FC<{action: string}> = ({ action }) => {
  const [open, setOpen] = useState<boolean>(false);

	const handleClick = () => {
    setOpen(true);
	};    

  const handleClose = () => {
    setOpen(false);
  };  


	return (
		<div>
			<Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
					Добавить тип окна
			</Button>

      { open && (
					<WinTypeDialogForm
						// id={1}
						action={action} 
						method={'post'}
						keepMounted
						open={open}
						onClose={handleClose}
					/>
				)
			}
		</div>			
  )
}

export default WinTypeAddButton;