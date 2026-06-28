import { db } from "./firebase.js";

import {
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

const form = document.getElementById("orderForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const order = {
        customer: document.getElementById("customer").value,
        glassType: document.getElementById("glassType").value,
        width: Number(document.getElementById("width").value),
        height: Number(document.getElementById("height").value),
        qty: Number(document.getElementById("qty").value),
        date: new Date().toISOString(),
        status: "جديد"
    };

    try {
        await addDoc(collection(db, "orders"), order);

        alert("✅ تم حفظ أمر الإنتاج");

        form.reset();

    } catch (err) {
        console.error(err);
        alert("حدث خطأ أثناء الحفظ");
    }
});
