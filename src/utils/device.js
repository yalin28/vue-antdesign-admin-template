export const DEVICE_TYPE = {
  DESKTOP: "desktop",
  TABLET: "tablet",
  MOBILE: "mobile",
};

export const deviceEnquire = function (callback) {
  if (typeof window === "undefined" || !window.matchMedia) return;

  const mqlMobile = window.matchMedia("(max-width: 576px)");
  const mqlTablet = window.matchMedia("(min-width: 576.01px) and (max-width: 1199px)");
  const mqlDesktop = window.matchMedia("(min-width: 1199.01px)");

  const check = () => {
    if (mqlMobile.matches) {
      callback && callback(DEVICE_TYPE.MOBILE);
    } else if (mqlTablet.matches) {
      callback && callback(DEVICE_TYPE.TABLET);
    } else {
      callback && callback(DEVICE_TYPE.DESKTOP);
    }
  };

  if (mqlMobile.addEventListener) {
    mqlMobile.addEventListener("change", check);
    mqlTablet.addEventListener("change", check);
    mqlDesktop.addEventListener("change", check);
  } else if (mqlMobile.addListener) {
    mqlMobile.addListener(check);
    mqlTablet.addListener(check);
    mqlDesktop.addListener(check);
  }

  check();
};
