import { db } from "./firebase.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function loadOrder() {

    if (!id) {
        alert("رقم أمر الإنتاج غير موجود");
        return;
    }

    const snap = await getDoc(doc(db, "orders", id));

    if (!snap.exists()) {
        alert("أمر الإنتاج غير موجود");
        return;
    }

    const order = snap.data();

    document.getElementById("orderNo").textContent =
        "أمر الإنتاج رقم: " + (order.orderNo || id);

    document.getElementById("customer").textContent =
        order.customer || "-";

    document.getElementById("project").textContent =
        order.project || "-";

    document.getElementById("drawingNo").textContent =
        order.drawingNo || "-";

    document.getElementById("partNo").textContent =
        order.partNo || "-";

    document.getElementById("glassType").textContent =
        order.glassType || "-";

    document.getElementById("thickness").textContent =
        order.thickness || "-";

    document.getElementById("width").textContent =
        order.width || "-";

    document.getElementById("height").textContent =
        order.height || "-";

    document.getElementById("qty").textContent =
        order.qty || "-";
const url =
    window.location.origin +
    "/order-details.html?id=" + id;

document.getElementById("qrCode").src =
    "https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=" +
    encodeURIComponent(url);
}

loadOrder();
