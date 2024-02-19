import React, {FC} from "react"
import {Form} from "react-router-dom";
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography, colors } from "@mui/material";

interface ISimpleForm {
    method: 'post' | 'patch',
    action: string, 
}

const SimpleForm: FC<ISimpleForm> = ({action, method}) => {
  return (
      <Container component="main" maxWidth="lg">
        <Form
          action={action}
          method={method}
          style={
            {
                marginTop: 8,
                display: "grid"
            }
          }
        
        >
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Наименование"
            // onBlur={handleBlur}
            // onChange={handleChange}
            // value={values.firstName}
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
            // onChange={handleChange}
            // value={values.lastName}
            name="description"
            // error={!!touched.lastName && !!errors.lastName}
            // helperText={touched.lastName && errors.lastName}
            sx={{ gridColumn: "span 2" }}
          />
          <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="secondary" variant="contained">
              Добавить
            </Button>
          </Box>

        </Form>
      </Container>
  )
}

export default SimpleForm;