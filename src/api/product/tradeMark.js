// 主要是获取品牌管理的数据
import request from "@/utils/request";
// 获取品牌列表接口
// /admin/product/baseTrademark/{page}/{limit}
export const reqTradeMarkList = (page, limit) =>
  request({
    url: `/admin/product/baseTrademark/${page}/${limit}`,
    method: "get",
  });
// 处理添加品牌 /admin/product/baseTrademark/save   带参品牌名称 品牌logo
// 对于新增id是服务器给的 不需要传递
// 修改品牌数据 /admin/product/baseTrademark/update  id 品牌名称 logo
export const reqAddOrUpdateTradeMark = (tradeMark) => {
  // 如果有id代表修改
  if (tradeMark.id) {
    return request({
      url: "/admin/product/baseTrademark/update",
      method: "put",
      data: tradeMark,
    });
  } else {
    // 新增品牌
    return request({
      url: "/admin/product/baseTrademark/save",
      method: "post",
      data: tradeMark,
    });
  }
};
// 删除品牌 /admin/product/baseTrademark/remove/{id}
export const reqDeleteTrandMark = (id) =>
  request({
    url: `/admin/product/baseTrademark/remove/${id}`,
    method: "delete",
  });
