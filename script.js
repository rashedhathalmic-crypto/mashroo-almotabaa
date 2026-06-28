import { db } from "./firebase.js";

import {
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";
const form = document.getElementById("orderForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const order = {

    orderNo: "2026-" + Date.now(),

    customer: document.getElementById("customer").value,

    project: document.getElementById("project").value,

    drawingNo: document.getElementById("drawingNo").value,

    partNo: document.getElementById("partNo").value,

    glassType: document.getElementById("glassType").value,

    thickness: Number(document.getElementById("thickness").value),

    width: Number(document.getElementById("width").value),

    height: Number(document.getElementById("height").value),

    qty: Number(document.getElementById("qty").value),

    receivedDate: document.getElementById("receivedDate").value,

    deliveryDate: document.getElementById("deliveryDate").value,

    priority: document.getElementById("priority").value,

    notes: document.getElementById("notes").value,

    status: "جديد",

    stage: "استلام",

    progress: 0,

    createdAt: new Date().toISOString()

};

    try {
        await addDoc(collection(db, "orders"), order);

        alert("✅ تم حفظ أمر الإنتاج بنجاح");

        form.reset();

    } catch (error) {
        console.error(error);
        alert("حدث خطأ أثناء الحفظ: " + error.message);
    }
});
