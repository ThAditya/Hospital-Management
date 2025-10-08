import React from "react";

const Medicine = () => {
  const medicines = [
    { id: 1, name: "Vitamin C", exp: "2025-04-13", mfg: "2021-12-13", price: 1500, qty: 150 },
    { id: 2, name: "Paracetamol", exp: "2025-05-13", mfg: "2022-04-04", price: 4500, qty: 225 },
    { id: 3, name: "Actos", exp: "2026-12-10", mfg: "2022-04-04", price: 2500, qty: 205 },
    { id: 4, name: "Amoxicillin", exp: "2024-12-13", mfg: "2021-01-13", price: 1200, qty: 275 },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Out of Stock</h2>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">ID</th>
            <th className="p-2">Drug Name</th>
            <th className="p-2">Expire Date</th>
            <th className="p-2">Manufacture Date</th>
            <th className="p-2">Price</th>
            <th className="p-2">Qty</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((m) => (
            <tr key={m.id} className="border-b">
              <td className="p-2">{m.id}</td>
              <td className="p-2">{m.name}</td>
              <td className="p-2">{m.exp}</td>
              <td className="p-2">{m.mfg}</td>
              <td className="p-2">{m.price}</td>
              <td className="p-2">{m.qty}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Medicine;
