import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Form } from 'react-router-dom';
import { ISimpleData } from '../../types/types';
import { Typography } from '@mui/material';

export interface ISimpleDialogProps {
  // id: number;
  method: 'delete' ,
  action: string, 
  keepMounted: boolean;
  value?: ISimpleData;
  open: boolean;
  onClose: (value?: string) => void;
}

export default function SimpleAsk2Dialog(props: ISimpleDialogProps) {
  const { onClose, value: valueProp, open, action, method, ...other } = props;

  const handleCancel = () => {
    onClose();
  };

  return (
		<Dialog
			open={open}
			onClose={handleCancel}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<Form
				action={action}
				method={method}
				style={
					{
							marginTop: 8,
							display: "grid"
					}
				}

				onSubmit={() => onClose()}
			>
				<DialogTitle id="alert-dialog-title">
						{"Удалить вырабранную запись?"}
				</DialogTitle>
				<DialogContent>
						<DialogContentText id="alert-dialog-description">
							<Typography>Наименование: {valueProp?.name}</Typography>
							<Typography>Описание: {valueProp?.description}</Typography>
						</DialogContentText>

						<input type="hidden" value={valueProp?.id} name="id" />

				</DialogContent>
				<DialogActions>
					<Button type="button" onClick={handleCancel}>Отмена</Button>
					<Button type="submit" autoFocus>Удалить</Button>
				</DialogActions>

			</Form>
		</Dialog>
  );
}