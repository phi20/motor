// brands.js
import { List, Datagrid, TextField } from 'react-admin';

export const BrandList = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
    </Datagrid>
  </List>
);
