import React, {FC, useEffect, useState} from "react"
import {useLoaderData} from "react-router-dom";
import {IFilterParam, IPriceList, ISimpleData, IUser} from "../../../types/types";
import AdminNavBar from "../../../components/AdminNavBar";
import { toast } from "react-toastify";
import { axiosInstance } from "../../../api/axios.api";
import { GridColDef, GridActionsCellItem, DataGrid, GridRowParams } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { Box } from "@mui/material";
import SimpleAsk2Dialog from "../../../components/dialogs/SimpleAsk2Dialog";
import PriceListFilterPanel from "./PriceListFilterPanel";

export const priceListAction = async ({ request }: any) => {
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

export const priceListLoader = async () => {
  const { data } = await axiosInstance.get<IPriceList[]>('pricelist');

  return data
}

const PriceListPage: FC = () => {
  // const data = useLoaderData() as IPriceList[];
  let data: IPriceList[] = [];

  const [openAsk2Dialog, setOpenAsk2Dialog] = useState<boolean>(false);
  const [openPriceDialog, setOpenPriceDialog] = useState<boolean>(false);

  const [value, setValue] = useState<ISimpleData>();
  const [valueUser, setValueUser] = useState<IUser>();

  const [filterParam, setFilterParam] = useState<IFilterParam>({
    winTypeId: 0,
    proSysId: 0,
    furnSysId: 0,
    glassId: 0,
  })

	// const [winTypeId, setWinTypeId] = useState<number>(0);
	// const [profSysId, setPropProfSysId] = useState<number>(0);
	// const [furnSysId, setFurnSysId] = useState<number>(0);
	// const [glassId, setGlassId] = useState<number>(0);


  const handleDeleteClick = (param: GridRowParams ) => () => {
    setOpenAsk2Dialog(true);
    setValue({ ...param.row });
  };

  const handleEditClick = (param: GridRowParams ) => () => {
    setOpenPriceDialog(true);
    setValueUser({ ...param.row });
  };

  const handleFilterClick = (value: IFilterParam) => {
    if (value !== filterParam) {
      console.log('VALUE >>', value);
      
      setFilterParam(value);
    }
  };

  const handleClose = () => {
    setOpenAsk2Dialog(false);
    setOpenPriceDialog(false);
  };  

  useEffect(() => {
    
    console.log('Filter >>', filterParam);
    
  },[filterParam])

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: 'image',
      headerName: 'Эскиз',
      flex: 1,
      editable: false,
      renderCell: (params) => <img src={`${process.env.REACT_APP_IMAGE_URL}/${params.row?.winType?.image}`} width="100px" height="100px" alt="Эскиз окна"/>
    },    
    {
      field: "profSysName",
      headerName: "Профиль",
      flex: 1,
      editable: false,
      valueGetter: (params) => params.row?.profSys?.name       
    },
    {
      field: "furnSysName",
      headerName: "Фурнитура",
      flex: 1,
      editable: false,
      valueGetter: (params) => params.row?.furnSys?.name       
    },
    {
      field: "glassName",
      headerName: "Стеклопакет",
      flex: 1,
      editable: false,
      valueGetter: (params) => params.row?.glass?.name       
    },
    {
      field: "width",
      headerName: "Ширина, мм",
      flex: 1,
      editable: false,
    },
    {
      field: "height",
      headerName: "Высота, мм",
      flex: 1,
      editable: false,
    },
    {
      field: "price",
      headerName: "Цена",
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
        {/* <UserAddButton action={'/userlist'}  /> */}
  
        <PriceListFilterPanel 
          handleFilterClick={handleFilterClick}
        />

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
        { openPriceDialog && (
        //   <UserDialog 
        // // id={param.row.id} 
        //     method={'patch'} 
				// 		action={'/userlist'} 
        //     keepMounted
        //     open={openPriceDialog}
        //     value={valueUser}
        //     onClose={handleClose}
        //   />
         <div></div>
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

export default PriceListPage;
