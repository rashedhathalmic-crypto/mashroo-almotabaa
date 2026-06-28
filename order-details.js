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
order.orderNo || id;

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

document.getElementById("priority").textContent =
order.priority || "-";

document.getElementById("status").textContent =
order.status || "-";

const progress = order.progress || 0;

document.getElementById("progressBar").value = progress;

document.getElementById("progressText").textContent =
progress + "%";
}

loadOrder();
