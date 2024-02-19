import React, {useState} from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import { TextField } from '@mui/material';
import { Form } from 'react-router-dom';
import { IUser } from '../../../types/types';

export interface IUserDialogProps {
  // id: number;
  method: 'post' | 'patch',
  action: string, 
  keepMounted: boolean;
  value?: IUser;
  open: boolean;
  onClose: (value?: string) => void;
}

interface IInputInterface {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function UserDialog(props: IUserDialogProps) {
  const { onClose, open, value: valueProp, action, method, ...other } = props;
  // const [valueEmail, setValueEmail] = React.useState<string>('');
  // const [valuePassword, setValuePassword] = React.useState<string>('');
  // const [valueConfirmPassword, setValueConfirmPassword] = React.useState<string>('');

  const [input, setInput] = useState<IInputInterface>({
    email: '',
    password: '',
    confirmPassword: ''
  });
 
  const [error, setError] = useState<IInputInterface>({
    email: '',
    password: '',
    confirmPassword: ''
  });

  React.useEffect(() => {
    if (valueProp !== undefined)     {
        setInput(prev => ({
          ...prev,
          email: valueProp.email
        }));
      }
  }, [valueProp, open]);

  const handleCancel = () => {
    onClose();
  };

  const onInputChange = (e: any) => {
    const { name, value } = e.target;
    
    setInput(prev => ({
      ...prev,
      [name]: value
    }));

    validateInput(e);
  }
  
  const validateInput: any = (e: any) => {
    let { name, value } = e.target;
    setError(prev => {
      const stateObj: IInputInterface = { ...prev, [name]: "" };
  
      switch (name) {
        case "email":
          if (!value) {
            stateObj.email = "Введите email пользователя";
          }
          break;
  
        case "password":
          if (!value) {
            stateObj.password = "Введите пароль";
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj.confirmPassword = "Пароли не совпадают.";
          } else {
            stateObj.confirmPassword = input.confirmPassword ? "" : error.confirmPassword;
          }
          break;
  
        case "confirmPassword":
          if (!value) {
            stateObj.confirmPassword = "Введите подтверждение пароля.";
          } else if (input.password && value !== input.password) {
            stateObj.confirmPassword = "Пароли не совпадают.";
          }
          break;
  
        default:
          break;
      }
  
      return stateObj;
    });
  }
  
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
                  type="email"
                  label="E-mail"
                  value={input.email}
                  onChange={onInputChange}
                  onBlur={validateInput}
                  name="email"
                  required
                  // error={!!touched.firstName && !!errors.firstName}
                  // helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
              />
              {error.email && <span className='err'>{error.email}</span>}
              
              <TextField
                  fullWidth
                  variant="filled"
                  type="password"
                  label="Пароль"
                  value={input.password}
                  onChange={onInputChange}
                  onBlur={validateInput}
                  name="password"
                  required={ (method === 'post') ? true : false }
                  // error={!!touched.lastName && !!errors.lastName}
                  // helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
              />
              {error.password && <span className='err'>{error.password}</span>}
              
              <TextField
                  fullWidth
                  variant="filled"
                  type="password"
                  label="Подтвердить пароль"
                  value={input.confirmPassword}
                  onChange={onInputChange}
                  onBlur={validateInput}
                  name="confirmPassword"
                  required={ (method === 'post') ? true : false }
                  // error={!!touched.lastName && !!errors.lastName}
                  // helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
              />
              {error.confirmPassword && <span className='err'>{error.confirmPassword}</span>}
              
              <input type="hidden" value={valueProp?.id} name="id" />
 
        </DialogContent>
        <DialogActions>
          <Button autoFocus type="button" onClick={handleCancel}>Отмена</Button>
          {
            (error.confirmPassword || error.email || error.password) ?
              (<Button type="submit" disabled >Сохранить</Button>) : 
              (<Button type="submit" >Сохранить</Button>)
          }
        </DialogActions>
      </Form>

    </Dialog>
  );
}
