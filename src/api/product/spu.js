import request from "@/utils/request";
// 获取spu列表 /admin/product/{page}/{limit} page limit category3id
export const reqSpuList = (page, limit, category3Id) =>
  request({
    url: `/admin/product/${page}/${limit}`,
    method: "get",
    params: { category3Id },
  });

//   获取spu信息的 /admin/product/getSpuById/{spuId}
export const reqSpu = (spuId) =>
  request({
    url: `/admin/product/getSpuById/${spuId}`,
  });
// 获取品牌信息 /admin/product/baseTrademark/getTrademarkList
export const reqTradeMarkList = () =>
  request({
    url: "/admin/product/baseTrademark/getTrademarkList",
  });
//   获取图片 /admin/product/spuImageList/{spuId}
export const reqImageList = (spuId) =>
  request({
    url: `/admin/product/spuImageList/${spuId}`,
  });
//   获取销售属性  整个平台销售属性一共三个 /admin/product/baseSaleAttrList
export const reqBaseSaleAttrList = () =>
  request({ url: "/admin/product/baseSaleAttrList" });

//  修改 添加spu都是一样的  唯一的区别就是是否带id /admin/product/saveSpuInfo
export const reqAddOrUpdataSpu = (spuInfo) => {
  if (spuInfo.id) {
    return request({
      url: "/admin/product/updateSpuInfo",
      method: "post",
      data: spuInfo,
    });
  } else {
    return request({
      url: "/admin/product/saveSpuInfo",
      method: "post",
      data: spuInfo,
    });
  }
};
//删除spu /admin/product/deleteSpu/{spuId}
export const reqDeleteSpu = (spuId) =>
  request({
    url: `/admin/product/deleteSpu/${spuId}`,
    method:'delete'
  });


  //获取spu图片列表 /admin/product/spuImageList/{spuId}
  export const reqSpuImageList = (spuId) =>
    request({
      url: `/admin/product/spuImageList/${spuId}`,
      method: "get",
    });
  //获取销售属性列表 /admin/product/spuSaleAttrList/{spuId}
  export const reqSpuSaleAttrList = (spuId) =>
    request({
      url: `/admin/product/spuSaleAttrList/${spuId}`,
      method: "get",
    });
  //  获取平台属性 /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
  export const reqAttrInfoList = (category1Id, category2Id, category3Id) =>
    request({
      url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
      method: "get",
    });
    //添加sku /admin/product/saveSkuInfo
    export const reqAddsku = (skuinfo) =>
      request({
        url: "/admin/product/saveSkuInfo",
        method: "post",
        data: skuinfo,
      });
    //  列表数据接口/admin/product/findBySpuId/{spuId}
    export const reqSkuList = (spuId) =>
      request({
        url: `/admin/product/findBySpuId/${spuId}`,
      });


