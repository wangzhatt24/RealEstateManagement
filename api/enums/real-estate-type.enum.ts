export enum SaleRealEstateEnum {
  can_ho_chung_cu = 'Bán căn hộ chung cư',
  nha_rieng = 'Bán nhà riêng',
  nha_biet_thu = 'Bán nhà biệt thự',
  nha_mat_pho = 'Bán nhà mặt phố',
  shophouse = 'Bán shophouse, nhà phố thương mại',
  dat_nen_du_an = 'Bán đất nền dự án',
  dat = 'Bán đất',
  trang_trai = 'Bán trang trại',
  khu_nghi_duong = 'Bán khu nghỉ dưỡng',
  kho_nha_xuong = 'Bán kho, nhà xưởng',
  bat_dong_san_khac = 'Bán bất động sản khác',
}

export enum RentalRealEstateEnum {
  can_ho_chung_cu = 'Cho thuê căn hộ chung cư',
  nha_rieng = 'Cho thuê nhà riêng',
  nha_biet_thu = 'Cho thuê nhà biệt thự',
  nha_mat_pho = 'Cho thuê nhà mặt phố',
  shophouse = 'Cho thuê shophouse, nhà phố thương mại',
  nha_tro_phong_tro = 'Cho thuê nhà trọ, phòng trọ',
  van_phong = 'Cho thuê văn phòng',
  cua_hang = 'Cho thuê cửa hàng',
  bat_dong_san_khac = 'Cho thuê bất động sản khác',
}

export type RealEstateType = SaleRealEstateEnum | RentalRealEstateEnum;