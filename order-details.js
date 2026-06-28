import { db } from "./firebase.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const params = new URLSearchParams(window.location.search);

const id = params.get("id");

async function loadOrder() {

    if (!id) return;

    const snap = await getDoc(doc(db, "orders", id));

    if (!snap.exists()) {
        alert("أمر الإنتاج غير موجود");
        return;
    }

    const order = snap.data();

    document.getElementById("orderNo").textContent =
        "رقم المستند: " + id;

    document.getElementById("customer").textContent =
        order.customer;

    document.getElementById("glassType").textContent =
        order.glassType;

    document.getElementById("width").textContent =
        order.width + " مم";

    document.getElementById("height").textContent =
        order.height + " مم";

    document.getElementById("qty").textContent =
        order.qty;

    document.getElementById("status").textContent =
        order.status;

}

loadOrder();
