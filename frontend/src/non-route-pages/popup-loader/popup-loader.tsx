import React from "react";

import Loader from "@components/common/loader/loader";
import Popup from "@src/components/common/popup/popup";

import { LoaderSizes } from "@components/common/loader/loader.enum";

import { IPageCommonProps } from "@interfaces/page-common-props.interface";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function PopupLoader(_props: IPageCommonProps) {
  return (
    <Popup>
      <Loader size={LoaderSizes["100X100"]} />
    </Popup>
  );
}

export default PopupLoader;
