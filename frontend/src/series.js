// series.js
import {
    List, Datagrid, TextField, ReferenceField
  } from 'react-admin';
  
  export const SeriesList = props => (
    <List {...props}>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="name" />
        <ReferenceField label="Brand" source="brand" reference="brands">
          <TextField source="name" />
        </ReferenceField>
      </Datagrid>
    </List>
  );
  