import { commonRequest } from "./axios";


export async function addDeal(deal) {
    const response = await commonRequest.post("/deal", deal);
    return response.data;
}
export async function fetchCategories() {
    const response = await commonRequest.get("/shop/categories");
    return response.data;
}
export async function fetchDeals(props?: any) {
    // commonRequest.defaults.he
    const response = await commonRequest.get("/shop/deals", { params: { ...props } });
    return response.data;
}
export async function fetchBanner(props?: any) {
    const response = await commonRequest.get("/shop/banners", { params: { ...props } });
    return response.data;
}
export async function getDealsDetail(props?: any) {
    const response = await commonRequest.get("/shop/deals", { params: { ...props } });
    return response.data;
}

export async function favoriteDeal(id) {
    const response = await commonRequest.patch(`/shop/deals/favorite/${id}`);
    return response.data;
}

export async function cancelFavoriteDeal(id) {
    const response = await commonRequest.delete(`/shop/deals/favorite/${id}`);
    return response.data;
}

export async function commentDeal({id, content}) {
    const response = await commonRequest.post(`/deal${id}/comment`,{
        content
    });
    return response.data;
}

export async function likeDealComment({dealId, commentId, isLike}) {
    const response = await commonRequest.post(`/deal${dealId}/comment/${commentId}/like`,{
        isLike
    });
    return response.data;
}

export async function getPushDeals() {
    const response = await commonRequest.get(`/shop/deals/pusheds`)
    return response.data;
}
