//sku
import request from '@/utils/request'
//sku列表接口 /admin/product/list/{page}/{limit}
export const reqSkuList = (page, limit) =>
  request({
    url: `/admin/product/list/${page}/${limit}`,
  });
//  上架 /admin/product/onSale/{skuId}
export const reqonSale = (skuId) =>
  request({
    url: `/admin/product/onSale/${skuId}`,
  });
//  下架 /admin/product/cancelSale/{skuId}
export const reqcancelSale = (skuId) =>
  request({
    url: `/admin/product/cancelSale/${skuId}`,
  });
//  获取sku详情 抽屉 /admin/product/getSkuById/{skuId}
export const reqSkuById = (skuId) =>
  request({
    url: `/admin/product/getSkuById/${skuId}`,
  });