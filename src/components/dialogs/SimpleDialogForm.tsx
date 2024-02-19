import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import { TextField } from '@mui/material';
import { Form } from 'react-router-dom';
import { ISimpleData } from '../../types/types';


export interface ISimpleDialogProps {
  // id: number;
  method: 'post' | 'patch',
  action: string, 
  keepMounted: boolean;
  value?: ISimpleData;
  open: boolean;
  onClose: (value?: string) => void;
}

export default function SimpleDialogForm(props: ISimpleDialogProps) {
  const { onClose, value: valueProp, open, action, method, ...other } = props;
  const [valueName, setValueName] = React.useState<string>('');
  const [valueDescription, setValueDescription] = React.useState<string>('');

  React.useEffect(() => {
    if (valueProp !== undefined)     {
      setValueName(valueProp.name);
      setValueDescription(valueProp.description);
    }
  }, [valueProp, open]);

  const handleCancel = () => {
    onClose();
  };

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
    //   TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <DialogTitle>Добавить запись</DialogTitle>
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
          <DialogContent dividers>
            <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Наименование"
                  required
                  // onBlur={handleBlur}
                  onChange={e => setValueName(e.target.value)}
                  value={valueName}
                  name="name"
                  // error={!!touched.firstName && !!errors.firstName}
                  // helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
              />
              <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Описание"
                  // onBlur={handleBlur}
                  onChange={e => setValueDescription(e.target.value)}
                  value={valueDescription}
                  name="description"
                  // error={!!touched.lastName && !!errors.lastName}
                  // helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
              />
      
              <input type="hidden" value={valueProp?.id} name="id" />
 
        </DialogContent>
        <DialogActions>
          <Button autoFocus type="button" onClick={handleCancel}>Отмена</Button>
          <Button type="submit">Сохранить</Button>
        </DialogActions>
      </Form>

    </Dialog>
  );
}
