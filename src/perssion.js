import router from "./router";
import { getToken } from "./utils/auth";

// 路由守卫
const whileList = ["/login", "/404"];
router.beforeEach((to, from, next) => {
  const token = getToken();
  //判断有无token
  if (token) {//有
    next();
  } else {//无
    //判断白名单
    if (whileList.includes(to.path)) {
      next();
    } else {
      next("/login");
    }
  }
});
