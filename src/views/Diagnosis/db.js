let medicines = [
  {
    medicine_id: "NIZA15",
    medicine_name: "AXID CAP 150mg",
    medicine_type: "내복약",
    medicine_unit: "C",
    quantity: ""
  },
  {
    medicine_id: "IRES",
    medicine_name: "IRESSA Tab 250mg",
    medicine_type: "내복약",
    medicine_unit: "T",
    quantity: ""
  },
  {
    medicine_id: "ROPIN1",
    medicine_name: "ONIROL Tab 1mg",
    medicine_type: "내복약",
    medicine_unit: "T",
    quantity: ""
  },
  {
    medicine_id: "ROXN",
    medicine_name: "ROXAN Cap 75mg",
    medicine_type: "내복약",
    medicine_unit: "C",
    quantity: ""
  },
  {
    medicine_id: "RT150",
    medicine_name: "URANTAC Tab 150mg",
    medicine_type: "내복약",
    medicine_unit: "T",
    quantity: ""
  }
];


export function search(value) {
  if (value) {
    const medicineData = medicines.filter( medicine => {
      if (medicine.medicine_id.toLowerCase().includes(value) || medicine.medicine_name.toLowerCase().includes(value)) {
        return medicine
      }
    })
    return medicineData;
  }
}

