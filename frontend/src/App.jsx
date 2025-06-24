import { Admin, Resource } from 'react-admin';
import dataProvider from './dataProvider';
import { ProductList, ProductShow } from './products';

export default function App() {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="products" list={ProductList} show={ProductShow}/>
      {/* <Resource name="brands" list={BrandList} />
      <Resource name="series" list={SeriesList} />
      <Resource name="reducer-types" list={ReducerTypeList} /> */}
    </Admin>
  );
}
