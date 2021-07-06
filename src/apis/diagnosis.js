import axios from "axios";

// 약품검색 
export async function searchMedicine(keyword) {
  const medicines = await axios.get(`/diagnostic/medicine?keyword=${keyword}`);
  // console.log(medicines.data)
  return medicines.data
}