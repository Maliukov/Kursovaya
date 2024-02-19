import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import { Stack, TextField } from '@mui/material';
import { Form } from 'react-router-dom';
import { IWinTypeList } from '../../../types/types';


export interface IWinTypeDialogProps {
  // id: number;
  method: 'post' | 'patch',
  action: string, 
  keepMounted: boolean;
  value?: IWinTypeList;
  open: boolean;
  onClose: (value?: string) => void;
}

export default function WinTypeDialogForm(props: IWinTypeDialogProps) {
  const { onClose, value: valueProp, open, action, method, ...other } = props;
  const [valueName, setValueName] = React.useState<string>('');
  const [valueDescription, setValueDescription] = React.useState<string>('');

  const [imageUrl, setImageUrl] = React.useState<string | ArrayBuffer | null>('');

  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageUrl(reader.result);
      // console.log('READER >>', reader.result);
      
    };

    reader.readAsDataURL(file);
  };  

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
          encType="multipart/form-data"
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
            <Stack direction="row" alignItems="center" spacing={2}>
              <label htmlFor="file">
                <Button variant="contained" component="span">
                  Upload
                </Button>

                <input
                  hidden
                  id="file" 
                  name="file" 
                  accept="image/*"
                  type="file"
                  onChange={handleFileUpload}
                />
              </label>

              {(imageUrl && typeof imageUrl === 'string') && <img src={imageUrl} alt="Uploaded Image" height="100" width="100"/>}
            </Stack>            
            <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Наименование"
                  // onBlur={handleBlur}
                  onChange={e => setValueName(e.target.value)}
                  value={valueName}
                  name="name"
                  required
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
