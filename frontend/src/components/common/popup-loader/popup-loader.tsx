import React from "react";

import Loader from "@components/common/loader/loader";
import Popup from "@src/components/common/popup/popup";

import { LoaderSizes } from "@components/common/loader/loader.enum";

function PopupLoader() {
  return (
    <Popup>
      <Loader size={LoaderSizes["100X100"]} />
    </Popup>
  );
}

export default PopupLoader;
