import React from "react";
import { useSelector, useDispatch } from "react-redux";

import LoaderErrorComponent from "@components/common/loader-error-component/loader-error-component";
import SingleProductCard from "@components/product-list-page/single-product-card/single-product-card";

import { IRootReducerState } from "@action-reducers/root.reducer";

import { loadMoreProductList } from "@action-reducers/product-list/product-list.action";

import { IProductListSectionPropTypes } from "@components/product-list-page/product-list-section/product-list-section.interface";

import styles from "./product-list-section.module.scss";

function ProductListSection({ className = "" }: IProductListSectionPropTypes) {
  const isLoading = useSelector(
    (state: IRootReducerState) => state.productList.isLoading,
  );
  const errors = useSelector(
    (state: IRootReducerState) => state.productList.errors,
  );
  const products = useSelector(
    (state: IRootReducerState) => state.productList.products,
  );
  const pagination = useSelector(
    (state: IRootReducerState) => state.productList.pagination,
  );
  const isLoadingMoreInProgress = useSelector(
    (state: IRootReducerState) => state.productList.isLoadingMoreInProgress,
  );
  const loadMoreError = useSelector(
    (state: IRootReducerState) => state.productList.loadMoreError,
  );

  const dispatch = useDispatch();

  const { currentPage, lastPage } = pagination || {};

  const hasError = errors && errors.length > 0;
  return (
    <div className={`prodLstSec ${className}`}>
      <div className={styles.cntntWrap}>
        <LoaderErrorComponent
          className={styles.lodrErrCmpt}
          isLoading={isLoading}
          errors={errors}
        />
        {!hasError && !isLoading && (
          <>
            {(!products || products.length === 0) && (
              <p className={`typo_body_1 ${styles.noRsltMsg}`}>
                No Product found
              </p>
            )}
            {products?.length > 0 && (
              <ul className={styles.productList}>
                {products.map((item) => (
                  <li className={styles.productItm} key={item.id}>
                    <SingleProductCard {...item} />
                  </li>
                ))}
              </ul>
            )}
            {currentPage < lastPage && !isLoadingMoreInProgress && (
              <div className={styles.loadMoreBtnWrap}>
                <button
                  type="button"
                  className={`${styles.loadMoreBtn} typo_heading_4`}
                  onClick={() => dispatch(loadMoreProductList())}
                >
                  Load More
                </button>
              </div>
            )}
            <div className={styles.loadMoreLodngNErrCmptWrap}>
              <LoaderErrorComponent
                isLoading={isLoadingMoreInProgress}
                errors={loadMoreError}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductListSection;
