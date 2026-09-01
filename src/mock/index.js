import Mock from "mockjs";
import { prodUseMock } from "@/config/index";

if (prodUseMock || import.meta.env?.DEV) {
  console.log("[mock] mounting mockjs services");
  import("./services/auth");
  import("./services/user");
  import("./services/manage");
  import("./services/other");
  import("./services/article");

  Mock.setup({
    timeout: 300,
  });
  console.log("[mock] mockjs services mounted");
}
