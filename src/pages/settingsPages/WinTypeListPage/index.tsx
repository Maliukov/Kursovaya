import React, {FC, useState} from "react"
import {useLoaderData} from "react-router-dom";
import {ISimpleData, IWinTypeList} from "../../../types/types";
import AdminNavBar from "../../../components/AdminNavBar";
import { toast } from "react-toastify";
import { axiosInstance } from "../../../api/axios.api";
import { GridColDef, GridActionsCellItem, DataGrid, GridRowParams } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { Box } from "@mui/material";
import SimpleAsk2Dialog from "../../../components/dialogs/SimpleAsk2Dialog";
import WinTypeDialogForm from "./WinTypeDialogForm";
import WinTypeAddButton from "./WinTypeAddButton";

export const winTypeListAction = async ({ request }: any) => {
  switch (request.method) {
    case "POST": {
      const formData = await request.formData();

      const data = {
        name: formData.get('name'),
        description: formData.get('description'),
      }

      try {
        formData.append('data', JSON.stringify(data));

        await axiosInstance.post('wintype', formData, {headers: {
            "Content-type": "multipart/form-data",
          }});

        toast.success(`Добавлен!`);

      } catch (err: any) {
        const error = err.response?.data.message;

        toast.error(error.toString());
    }

      return null
    }
    case "PATCH": {
      const formData = await request.formData()
      const data = {
        id: formData.get('id'),
        name: formData.get('name'),
        description: formData.get('description'),
      }

      try {
        formData.append('data', JSON.stringify(data));

        await axiosInstance.patch(`wintype/${data.id}`, formData, {headers: {
            "Content-type": "multipart/form-data",
          }});

        toast.success(`Тип окна ${data.name} обновлен!`);

      } catch (err: any) {
        const error = err.response?.data.message;

        toast.error(error.toString());
      }


      return null
    }    
    case "DELETE": {
      const formData = await request.formData()
      const id = formData.get('id')

      try {
        await axiosInstance.delete(`wintype/${id}`)

        toast.success(`Запись удалена успешно!`);
      } catch (err: any) {
        const error = err.response?.data.message;

        toast.error(error.toString());
      }

      return null
    }

  }
}

export const winTypeListLoader = async () => {
  const { data } = await axiosInstance.get<IWinTypeList[]>('wintype');

  return data
}

const WinTypeListPage: FC = () => {
  const data = useLoaderData() as IWinTypeList[];
  
  const [openAsk2Dialog, setOpenAsk2Dialog] = useState<boolean>(false);
  const [openWinTypeDialog, setOpenWinTypeDialog] = useState<boolean>(false);

  const [value, setValue] = useState<ISimpleData>();
  const [valueWinType, setWinTypeUser] = useState<IWinTypeList>();

  const handleDeleteClick = (param: GridRowParams ) => () => {
    setOpenAsk2Dialog(true);
    setValue({ ...param.row });
  };

  const handleEditClick = (param: GridRowParams ) => () => {
    setOpenWinTypeDialog(true);
    setWinTypeUser({ ...param.row });
  };


  const handleClose = () => {
    setOpenAsk2Dialog(false);
    setOpenWinTypeDialog(false);
  };  


  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: 'image',
      headerName: 'Эскиз',
      flex: 1,
      editable: false,
      renderCell: (params) => <img src={`${process.env.REACT_APP_IMAGE_URL}/${params.value}`} width="100px" height="100px" alt="Эскиз окна"/>
    },    
    {
      field: "name",
      headerName: "Наименование",
      flex: 1,
      cellClassName: "name-column--cell",
      editable: false,
    },
    {
      field: "description",
      headerName: "Описание",
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
        
        <WinTypeAddButton action={'/wintypelist'}  />
  
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

      { openWinTypeDialog && (
          <WinTypeDialogForm 
        // id={param.row.id} 
            method={'patch'} 
						action={'/wintypelist'} 
            keepMounted
            open={openWinTypeDialog}
            value={valueWinType}
            onClose={handleClose}
          />
        )
      }

      { openAsk2Dialog && (
            <SimpleAsk2Dialog 
          // id={param.row.id} 
              method={'delete'} 
              action={'/wintypelist'} 
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

export default WinTypeListPage;
