import React, {FC, useState} from "react"
import {useLoaderData} from "react-router-dom";
import {ISimpleData, IUser} from "../../../types/types";
import AdminNavBar from "../../../components/AdminNavBar";
import { toast } from "react-toastify";
import { axiosInstance } from "../../../api/axios.api";
import { GridColDef, GridActionsCellItem, DataGrid, GridRowParams } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { Box } from "@mui/material";
import UserAddButton from "./UserAddButton";
import SimpleAsk2Dialog from "../../../components/dialogs/SimpleAsk2Dialog";
import UserDialog from "./UserDialog";

export const userListAction = async ({ request }: any) => {
  switch (request.method) {
    case "POST": {
      const formData = await request.formData()
      const data = {
        email: formData.get('email'),
        password: formData.get('password'),
      }

      try {
        await axiosInstance.post('user', data)
        toast.success(`Пользователь ${data.email} добавлен!`);

      } catch (err: any) {
        const error = err.response?.data.message;

        toast.error(error.toString());
      }

      return null
    }
    case "PATCH": {
      const formData = await request.formData()
      const password = formData.get('password');
      let data = {
        id: formData.get('id'),
        email: formData.get('email'),
        password: formData.get('password'),
      };

      if (password === '') {
          delete data.password;
      }

      try {
        await axiosInstance.patch(`user/${data.id}`, data)
        toast.success(`Пользователь ${data.email} обновлен!`);

      } catch (err: any) {
        const error = err.response?.data.message;

        toast.error(error.toString());
      }


      return null
    }
    case "DELETE": {
      const formData = await request.formData()
      const profSysId = formData.get('id')

      try {
        await axiosInstance.delete(`user/${profSysId}`)

        toast.success(`Запись удалена успешно!`);
      } catch (err: any) {
        const error = err.response?.data.message;

        toast.error(error.toString());
      }


      return null
    }

  }
}

export const userListLoader = async () => {
  const { data } = await axiosInstance.get<IUser[]>('user');

  return data
}

const UserListPage: FC = () => {
  const data = useLoaderData() as IUser[];

  const [openAsk2Dialog, setOpenAsk2Dialog] = useState<boolean>(false);
  const [openUserDialog, setOpenUserDialog] = useState<boolean>(false);

  const [value, setValue] = useState<ISimpleData>();
  const [valueUser, setValueUser] = useState<IUser>();

  const handleDeleteClick = (param: GridRowParams ) => () => {
    setOpenAsk2Dialog(true);
    setValue({ ...param.row });
  };

  const handleEditClick = (param: GridRowParams ) => () => {
    setOpenUserDialog(true);
    setValueUser({ ...param.row });
  };


  const handleClose = () => {
    setOpenAsk2Dialog(false);
    setOpenUserDialog(false);
  };  


  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "email",
      headerName: "E-Mail",
      flex: 1,
      cellClassName: "name-column--cell",
      editable: false,
    },
    {
      field: "role",
      headerName: "Роль",
      flex: 1,
      editable: false,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: '',
      width: 100,
      cellClassName: 'actions',
      getActions: (params) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Изменить"
            className="textPrimary"
            onClick={handleEditClick(params)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Удалить"
            onClick={handleDeleteClick(params)}
            color="inherit"
          />,
        ];
      },
    },
  ];  
    
  return (
    <>
      <AdminNavBar />

      <Box m="20px">
      {/* <Header
        title="CONTACTS"
        subtitle="List of Contacts for Future Reference"
      /> */}
        <UserAddButton action={'/userlist'}  />
  
        <Box
          m="40px 0 0 0"
          height="75vh"
        >
          <DataGrid
            rows={data}
            columns={columns}
            // slots={{ toolbar: GridToolbar }}
          />
        </Box>
        { openUserDialog && (
          <UserDialog 
        // id={param.row.id} 
            method={'patch'} 
						action={'/userlist'} 
            keepMounted
            open={openUserDialog}
            value={valueUser}
            onClose={handleClose}
          />
        )
      }

        { openAsk2Dialog && (
            <SimpleAsk2Dialog 
          // id={param.row.id} 
              method={'delete'} 
              action={'/userlist'} 
              keepMounted
              open={openAsk2Dialog}
              value={value}
              onClose={handleClose}
            />
          )
        }

      </Box>

    </>
  )
}

export default UserListPage;
