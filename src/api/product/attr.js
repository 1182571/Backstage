// 平台属性
import request from "@/utils/request";
// 获取一级分类的数据 /admin/product/getCategory1
export const reqCategory1List = () =>
  request({
    url: "/admin/product/getCategory1",
    method: "get",
  });
//   二级分类数据 /admin/product/getCategory2/{category1Id}
export const reqCategory2List = (category1Id) =>
  request({
    url: `/admin/product/getCategory2/${category1Id}`,
    method: "get",
  });
//   三级分类 /admin/product/getCategory3/{category2Id}
export const reqCategory3List = (category2Id) =>
  request({
    url: `/admin/product/getCategory3/${category2Id}`,
    method: "get",
  });
//   获取平台属性数据 /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqAttrList = (category1Id, category2Id, category3Id) =>
  request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method:'get'
  });
//   添加属性与属性值 /admin/product/saveAttrInfo POST 
export const reqAddOrUpdate = (data) =>
  request({
    url: "/admin/product/saveAttrInfo",
    data,
    method:'post'
  });
