import Axios from "axios-observable";
import { delay, map, Observable, of, switchMap } from "rxjs";
import { Product } from "../entities/product";
import { API_BASE_URL } from "../env";

type ProductsRequestData = {
  products: Product[];
};

const delayed$ = of(null).pipe(delay(2000));

const Endpoint = Axios.create({
  baseURL: API_BASE_URL,
});

export const getProducts$ = (): Observable<Product[]> => {
  const response$ = Endpoint.get<ProductsRequestData>("products").pipe(
    map((response) => response.data.products)
  );
  return delayed$.pipe(switchMap(() => response$));
};

export const getProduct$ = (slug: Product["slug"]): Observable<Product> => {
  const response$ = Endpoint.get<ProductsRequestData>(
    `products?slug=${slug}`
  ).pipe(map((response) => response.data.products[0]));
  return delayed$.pipe(switchMap(() => response$));
};
