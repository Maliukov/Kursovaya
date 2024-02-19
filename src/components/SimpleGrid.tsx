import React, {FC, useState} from "react"
import { Box } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { ISimpleData } from "../types/types";
import SimpleDialogForm from "./dialogs/SimpleDialogForm";
import SimpleAddButton from "./SimpleAddButton";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SimpleAsk2Dialog from "./dialogs/SimpleAsk2Dialog";


const SimpleGrid: FC<{data: ISimpleData[], action: string }> = ({ data, action }) => {
  const [openSimpleDialog, setOpenSimpleDialog] = useState<boolean>(false);
  const [openAsk2Dialog, setOpenAsk2Dialog] = useState<boolean>(false);
  const [value, setValue] = useState<ISimpleData>();

  const handleClose = () => {
    setOpenSimpleDialog(false);
    setOpenAsk2Dialog(false);
  };  

  const handleEditClick = (param: GridRowParams ) => () => {
    setOpenSimpleDialog(true);
    setValue({ ...param.row })
  };

  const handleDeleteClick = (param: GridRowParams ) => () => {
    setOpenAsk2Dialog(true);
    setValue({ ...param.row })
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.5 },
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
      <Box m="20px">
      {/* <Header
        title="CONTACTS"
        subtitle="List of Contacts for Future Reference"
      /> */}
        <SimpleAddButton action={action} />        
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

      { openSimpleDialog && (
          <SimpleDialogForm 
        // id={param.row.id} 
            method={'patch'} 
						action={action} 
            keepMounted
            open={openSimpleDialog}
            value={value}
            onClose={handleClose}
          />
        )
      }

      { openAsk2Dialog && (
          <SimpleAsk2Dialog 
        // id={param.row.id} 
            method={'delete'} 
						action={action} 
            keepMounted
            open={openAsk2Dialog}
            value={value}
            onClose={handleClose}
          />
        )
      }

      </Box>
  )
}

export default SimpleGrid;
