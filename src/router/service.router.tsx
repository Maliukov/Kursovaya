import { axiosInstance } from "../api/axios.api";
import { ISimpleData } from "../types/types";
import { toast } from "react-toastify";

export const simpleListLoader = async (endPoint: string) => {
  const { data } = await axiosInstance.get<ISimpleData[]>(endPoint);

  return data;
};

export const simpleListAction = async ({ request }: any, endPoint: string) => {
  switch (request.method) {
    case "POST": {
      const formData = await request.formData();
      const data = {
        name: formData.get("name"),
        description: formData.get("description"),
      };

      try {
        await axiosInstance.post(`${endPoint}`, data);
        toast.success(`Запись ${data.name} добавлена!`);
      } catch (err: any) {
        const error = err.response?.data.message;

        toast.error(error.toString());
      }

      return null;
    }
    case "PATCH": {
      const formData = await request.formData();
      const data = {
        id: formData.get("id"),
        name: formData.get("name"),
        description: formData.get("description"),
      };

      try {
        await axiosInstance.patch(`${endPoint}/${data.id}`, data);
        toast.success(`Запись ${data.name} обновлена!`);
      } catch (err: any) {
        const error = err.response?.data.message;

        toast.error(error.toString());
      }

      return null;
    }
    case "DELETE": {
      const formData = await request.formData();
      const profSysId = formData.get("id");

      try {
        await axiosInstance.delete(`${endPoint}/${profSysId}`);

        toast.success(`Запись удалена успешно!`);
      } catch (err: any) {
        const error = err.response?.data.message;

        toast.error(error.toString());
      }

      return null;
    }
  }
};
