import {
  List, Datagrid, TextField, NumberField, TextInput, NumberInput, ReferenceInput, SelectInput,
  ImageField, Filter, Show, SimpleShowLayout, ReferenceField
} from 'react-admin';
import Aside from './AsideFilter';


const ProductFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Name" source="name" alwaysOn />
    <TextInput label="Description" source="description" />
    <TextInput label="Model Number" source="model_number" />

    <ReferenceInput label="Brand" source="brand" reference="brands" allowEmpty>
      <SelectInput optionText="name" />
    </ReferenceInput>

    <ReferenceInput label="Series" source="series" reference="series" allowEmpty>
      <SelectInput optionText="name" />
    </ReferenceInput>

    <ReferenceInput label="Reducer Type" source="reducer_type" reference="reducer-types" allowEmpty>
      <SelectInput optionText="name" />
    </ReferenceInput>

    <NumberInput label="Torque ≥" source="rated_torque__gte" />
    <NumberInput label="Torque ≤" source="rated_torque__lte" />
    <NumberInput label="Speed ≥" source="rated_speed__gte" />
    <NumberInput label="Speed ≤" source="rated_speed__lte" />
    <NumberInput label="Voltage ≥" source="rated_voltage__gte" />
    <NumberInput label="Voltage ≤" source="rated_voltage__lte" />
    <NumberInput label="Power ≥" source="rated_power__gte" />
    <NumberInput label="Power ≤" source="rated_power__lte" />
    <NumberInput label="Diameter ≥" source="stator_diameter__gte" />
    <NumberInput label="Diameter ≤" source="stator_diameter__lte" />
    <NumberInput label="Thickness ≥" source="stator_thickness__gte" />
    <NumberInput label="Thickness ≤" source="stator_thickness__lte" />
    <NumberInput label="Gear Ratio ≥" source="gear_ratio__gte" />
    <NumberInput label="Gear Ratio ≤" source="gear_ratio__lte" />
    <NumberInput label="Price ≥" source="price__gte" />
    <NumberInput label="Price ≤" source="price__lte" />
  </Filter>
);


export const ProductList = props => (
  <List aside={<Aside />} filters={<ProductFilter />} {...props}>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="model_number" />
      <TextField source="brand.name" />
      <TextField source="series.name" />
      <TextField source="reducer_type.name" />
      <NumberField source="rated_torque" />
      <NumberField source="rated_speed" />
      <NumberField source="rated_voltage" />
      <NumberField source="rated_power" />
      <NumberField source="stator_diameter" />
      <NumberField source="stator_thickness" />
      <NumberField source="gear_ratio" />
      <NumberField source="price" />
    </Datagrid>
  </List>
);


export const ProductShow = props => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="description" />
      <TextField source="model_number" />
      <ReferenceField source="brand_id" reference="brands">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="series_id" reference="series">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="reducer_type_id" reference="reducer-types">
        <TextField source="name" />
      </ReferenceField>
      <NumberField source="rated_torque" />
      <NumberField source="rated_speed" />
      <NumberField source="rated_voltage" />
      <NumberField source="rated_power" />
      <NumberField source="stator_diameter" />
      <NumberField source="stator_thickness" />
      <NumberField source="gear_ratio" />
      <NumberField source="price" />
      <ImageField source="image" title="name" />
    </SimpleShowLayout>
  </Show>
);
